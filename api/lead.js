// Vercel serverless function: POST /api/lead
// Saves a website inquiry to Supabase, then emails it to the shop via Resend.
// The lead is saved first, so a failed email never loses an inquiry.
//
// Vercel → Project → Settings → Environment Variables:
//   RESEND_API_KEY  — Resend API key
//   EMAIL_FROM      — optional, default "R K Electricals <leads@rkelectricals.online>"
//   LEAD_NOTIFY_TO  — optional, default "support.rkelectricals@gmail.com"
//   VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY — already set for the site

import { sendEmail, esc, plain, readBody } from './_lib/resend.js'

const MAX = { name: 120, phone: 30, email: 160, service_type: 120, message: 3000 }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const body = readBody(req)
  const lead = {}
  for (const key of Object.keys(MAX)) {
    const v = body[key]
    if (v != null && String(v).trim()) lead[key] = String(v).trim().slice(0, MAX[key])
  }
  if (!lead.name || !lead.phone) return res.status(400).json({ error: 'Name and phone are required' })

  // 1. Save the lead (anon key + RLS policy that allows public inserts into leads)
  const url = process.env.VITE_SUPABASE_URL
  const anon = process.env.VITE_SUPABASE_ANON_KEY
  try {
    const r = await fetch(`${url}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        apikey: anon,
        Authorization: `Bearer ${anon}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(lead),
    })
    if (!r.ok) throw new Error(`Supabase ${r.status}: ${await r.text()}`)
  } catch (err) {
    console.error('lead save failed:', err)
    return res.status(500).json({ error: 'Could not submit your request. Please call or WhatsApp us.' })
  }

  // 2. Email it (failure is logged but the visitor still sees success — the lead is saved)
  try {
    await emailLead(lead)
  } catch (err) {
    console.error('lead email failed:', err)
  }

  return res.status(200).json({ ok: true })
}

async function emailLead(lead) {
  const to = (process.env.LEAD_NOTIFY_TO || 'support.rkelectricals@gmail.com').split(',').map(s => s.trim()).filter(Boolean)

  const name = esc(lead.name)
  const phone = esc(lead.phone)
  const service = esc(lead.service_type) || 'General Inquiry'
  const digits = lead.phone.replace(/\D/g, '')
  const intl = digits.length === 10 ? `91${digits}` : digits
  const when = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })

  const row = (label, value) => value
    ? `<tr><td style="padding:10px 0;color:#7a6a55;font-size:12px;text-transform:uppercase;letter-spacing:.1em;width:110px;vertical-align:top">${label}</td><td style="padding:10px 0;color:#1a3329;font-size:15px">${value}</td></tr>`
    : ''

  const html = `
    <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;padding:36px 32px;background:#faf8f5;border:1px solid #e8e2d9">
      <p style="font-size:11px;font-weight:bold;letter-spacing:.3em;text-transform:uppercase;color:#7a6a55;margin:0 0 20px">R K Electricals · New Inquiry</p>
      <h1 style="font-size:22px;font-weight:normal;color:#1a3329;margin:0 0 20px">${name} — ${service}</h1>
      <table style="width:100%;border-collapse:collapse;border-top:1px solid #e8e2d9">
        ${row('Phone', phone)}
        ${row('Email', esc(lead.email))}
        ${row('Service', service)}
        ${row('Message', esc(lead.message).replace(/\n/g, '<br>'))}
        ${row('Received', when)}
      </table>
      ${digits ? `
      <div style="margin-top:28px">
        <a href="tel:+${intl}" style="display:inline-block;background:#1a3329;color:#fff;text-decoration:none;padding:12px 22px;font-size:13px;margin:0 8px 8px 0">Call ${phone}</a>
        <a href="https://wa.me/${intl}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:12px 22px;font-size:13px;margin:0 8px 8px 0">WhatsApp</a>
      </div>` : ''}
      <p style="color:#aaa;font-size:12px;margin-top:24px">This inquiry is also saved in the admin panel under Leads.</p>
    </div>`

  await sendEmail({
    to,
    subject: `New inquiry: ${plain(lead.name)} — ${plain(lead.service_type) || 'General Inquiry'}`,
    html,
    replyTo: lead.email ? plain(lead.email) : undefined,
  })
}

