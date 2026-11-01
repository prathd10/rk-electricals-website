// POST /api/admin-otp-verify  { token, otp }
// Step 2 of admin login: checks the emailed code and hands back the real session.
import crypto from 'node:crypto'
import { adminClient } from './_lib/supabaseAdmin.js'
import { readBody } from './_lib/resend.js'

const MAX_ATTEMPTS = 3

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { token, otp } = readBody(req)
    if (!token || !otp) return res.status(400).json({ error: 'Token and OTP required' })

    const db = adminClient()
    const { data: record, error } = await db.from('admin_otp').select().eq('token', token).single()
    if (error || !record) return res.status(401).json({ error: 'Session expired. Please log in again.' })

    if (new Date(record.expires_at) < new Date()) {
      await db.from('admin_otp').delete().eq('token', token)
      return res.status(401).json({ error: 'OTP has expired. Please log in again.' })
    }

    if (record.attempts >= MAX_ATTEMPTS) {
      await db.from('admin_otp').delete().eq('token', token)
      return res.status(401).json({ error: 'Too many incorrect attempts. Please log in again.' })
    }

    // Constant-time comparison of the hashes
    const submitted = crypto.createHash('sha256').update(String(otp).trim()).digest()
    const stored = Buffer.from(record.otp_hash, 'hex')
    const match = stored.length === submitted.length && crypto.timingSafeEqual(stored, submitted)

    if (!match) {
      await db.from('admin_otp').update({ attempts: record.attempts + 1 }).eq('token', token)
      const remaining = MAX_ATTEMPTS - 1 - record.attempts
      if (remaining <= 0) {
        await db.from('admin_otp').delete().eq('token', token)
        return res.status(401).json({ error: 'Too many incorrect attempts. Please log in again.' })
      }
      return res.status(401).json({ error: `Incorrect code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.` })
    }

    // Correct — single use, so delete it and return the session
    await db.from('admin_otp').delete().eq('token', token)
    return res.status(200).json({ access_token: record.access_token, refresh_token: record.refresh_token })
  } catch (err) {
    console.error('admin-otp-verify error:', err)
    return res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}
