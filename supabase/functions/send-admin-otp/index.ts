import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return json({ error: 'Email and password required' }, 400)
    }

    // 1. Verify credentials — use regular client so we get a real session back
    const authClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
    )
    const { data: authData, error: authError } = await authClient.auth.signInWithPassword({ email, password })
    if (authError || !authData.session) {
      return json({ error: 'Incorrect email or password' }, 401)
    }

    // 2. Generate a 6-digit OTP and SHA-256 hash it
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpHash = await sha256(otp)

    // 3. Store OTP + session tokens in admin_otp table (service role bypasses RLS)
    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )
    const token = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString()

    // Upsert on email — atomically replaces any previous OTP for this email
    const { error: upsertError } = await adminClient.from('admin_otp').upsert(
      {
        token,
        email,
        otp_hash: otpHash,
        access_token: authData.session.access_token,
        refresh_token: authData.session.refresh_token,
        expires_at: expiresAt,
        attempts: 0,
        created_at: new Date().toISOString(),
      },
      { onConflict: 'email' }
    )
    if (upsertError) throw upsertError

    // 4. Send OTP email via Resend
    const resendKey = Deno.env.get('RESEND_API_KEY')
    if (!resendKey) throw new Error('RESEND_API_KEY not set')

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'RK Electricals <onboarding@resend.dev>',
        to: [email],
        subject: `${otp} — Your Admin Login Code`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 420px; margin: 0 auto; padding: 40px 32px; background: #faf8f5; border: 1px solid #e8e2d9;">
            <p style="font-size: 11px; font-weight: bold; letter-spacing: 0.3em; text-transform: uppercase; color: #7a6a55; margin: 0 0 24px;">R.K. Electricals · Admin Portal</p>
            <h1 style="font-size: 22px; font-weight: normal; color: #1a3329; margin: 0 0 16px;">Your login code</h1>
            <div style="font-size: 48px; font-weight: bold; letter-spacing: 12px; color: #1a3329; margin: 32px 0; padding: 24px; background: white; border: 1px solid #e8e2d9; text-align: center;">${otp}</div>
            <p style="color: #888; font-size: 13px; line-height: 1.6;">Enter this code on the login screen. It expires in <strong>5 minutes</strong>.</p>
            <p style="color: #bbb; font-size: 12px; margin-top: 24px;">If you did not try to log in, ignore this email.</p>
          </div>
        `,
      }),
    })

    if (!emailRes.ok) {
      const errBody = await emailRes.text()
      throw new Error(`Resend error: ${errBody}`)
    }

    // Return only the lookup token — session stays server-side until OTP passes
    return json({ token })
  } catch (err) {
    console.error('send-admin-otp error:', err)
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
