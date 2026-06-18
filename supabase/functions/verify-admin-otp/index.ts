import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { token, otp } = await req.json()
    if (!token || !otp) return json({ error: 'Token and OTP required' }, 400)

    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    // Fetch the OTP record
    const { data: record, error } = await adminClient
      .from('admin_otp')
      .select()
      .eq('token', token)
      .single()

    if (error || !record) {
      return json({ error: 'Session expired. Please log in again.' }, 401)
    }

    // Check expiry
    if (new Date(record.expires_at) < new Date()) {
      await adminClient.from('admin_otp').delete().eq('token', token)
      return json({ error: 'OTP has expired. Please log in again.' }, 401)
    }

    // Check max attempts (3 tries)
    if (record.attempts >= 3) {
      await adminClient.from('admin_otp').delete().eq('token', token)
      return json({ error: 'Too many incorrect attempts. Please log in again.' }, 401)
    }

    // Hash the submitted OTP and compare
    const submittedHash = await sha256(otp.trim())
    if (submittedHash !== record.otp_hash) {
      await adminClient.from('admin_otp').update({ attempts: record.attempts + 1 }).eq('token', token)
      const remaining = 2 - record.attempts
      return json({ error: `Incorrect code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.` }, 401)
    }

    // OTP correct — delete record and return the real session
    await adminClient.from('admin_otp').delete().eq('token', token)

    return json({
      access_token: record.access_token,
      refresh_token: record.refresh_token,
    })
  } catch (err) {
    console.error('verify-admin-otp error:', err)
    return json({ error: 'Something went wrong. Please try again.' }, 500)
  }
})

async function sha256(input: string): Promise<string> {
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input))
  return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('')
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
