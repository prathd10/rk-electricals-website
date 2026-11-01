// POST /api/admin-otp-send  { email, password }
// Step 1 of admin login: checks the password, then emails a 6-digit code.
// The real session stays on the server until the code is verified.
import crypto from 'node:crypto'
import { adminClient, anonClient } from './_lib/supabaseAdmin.js'
import { sendEmail, readBody } from './_lib/resend.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { email, password } = readBody(req)
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

    // 1. Verify credentials
    const { data: authData, error: authError } = await anonClient().auth.signInWithPassword({ email, password })
    if (authError || !authData.session) return res.status(401).json({ error: 'Incorrect email or password' })

    // 2. Generate a 6-digit code and store only its hash
    const otp = crypto.randomInt(100000, 1000000).toString()
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex')
    const token = crypto.randomUUID()

    const { error: upsertError } = await adminClient().from('admin_otp').upsert(
      {
        token,
        email,
        otp_hash: otpHash,
        access_token: authData.session.access_token,
        refresh_token: authData.session.refresh_token,
        expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
        attempts: 0,
        created_at: new Date().toISOString(),
      },
      { onConflict: 'email' } // one active code per email
    )
    if (upsertError) throw upsertError

    // 3. Email the code
    await sendEmail({
      to: email,
      subject: `${otp} — Your Admin Login Code`,
      html: `
        <div style="font-family:Georgia,serif;max-width:420px;margin:0 auto;padding:40px 32px;background:#faf8f5;border:1px solid #e8e2d9">
          <p style="font-size:11px;font-weight:bold;letter-spacing:.3em;text-transform:uppercase;color:#7a6a55;margin:0 0 24px">R K Electricals · Admin Portal</p>
          <h1 style="font-size:22px;font-weight:normal;color:#1a3329;margin:0 0 16px">Your login code</h1>
          <div style="font-size:48px;font-weight:bold;letter-spacing:12px;color:#1a3329;margin:32px 0;padding:24px;background:white;border:1px solid #e8e2d9;text-align:center">${otp}</div>
          <p style="color:#888;font-size:13px;line-height:1.6">Enter this code on the login screen. It expires in <strong>5 minutes</strong>.</p>
          <p style="color:#bbb;font-size:12px;margin-top:24px">If you did not try to log in, ignore this email.</p>
        </div>`,
    })

    // Return only the lookup token
    return res.status(200).json({ token })
  } catch (err) {
    console.error('admin-otp-send error:', err)
    return res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}
