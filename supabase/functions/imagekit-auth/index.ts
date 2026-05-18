// ================================================================
// Supabase Edge Function: imagekit-auth
// Generates secure signature, token, and expiry for client-side uploads.
// ================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const privateKey = Deno.env.get('IMAGEKIT_PRIVATE_KEY')
    if (!privateKey) {
      throw new Error('IMAGEKIT_PRIVATE_KEY environment variable is not set in Supabase.')
    }

    const token = crypto.randomUUID()
    const expire = Math.floor(Date.now() / 1000) + 600 // Signature expires in 10 minutes

    const encoder = new TextEncoder()
    const keyData = encoder.encode(privateKey)
    const messageData = encoder.encode(token + expire)

    // Import the private key for HMAC-SHA1 signature generation
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-1" },
      false,
      ["sign"]
    )

    // Sign the token + expire payload
    const signatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, messageData)
    
    // Convert signature from array buffer to hex string
    const signature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("")

    return new Response(
      JSON.stringify({ token, expire, signature }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
