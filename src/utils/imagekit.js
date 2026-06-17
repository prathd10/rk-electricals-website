import { supabase, isSupabaseConfigured } from '../lib/supabase'

export const imagekitConfig = {
  urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT || '',
  publicKey:   import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY || '',
  privateKey:  import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY || '',
}

export function getImageKitUrl(path, transforms = {}) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  const base = imagekitConfig.urlEndpoint.replace(/\/$/, '')
  return `${base}/${path.replace(/^\//, '')}`
}

/**
 * Generates HMAC-SHA1 signature locally in the browser using Web Crypto API.
 * This is used as a fallback if the Supabase Edge Function is not deployed.
 */
async function generateLocalSignature(token, expire, privateKey) {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(privateKey)
  const messageData = encoder.encode(token + expire)

  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"]
  )

  const signatureBuffer = await window.crypto.subtle.sign("HMAC", cryptoKey, messageData)
  
  return Array.from(new Uint8Array(signatureBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("")
}

export async function uploadToImageKit(file, folder = 'rk-electricals') {
  if (!imagekitConfig.publicKey || !imagekitConfig.urlEndpoint) {
    throw new Error('ImageKit public key or URL endpoint is missing in your .env variables.')
  }

  const token = window.crypto.randomUUID()
  const expire = Math.floor(Date.now() / 1000) + 600 // 10 minutes expiry

  let signature = ''

  // 1. Try to generate signature via Supabase Edge Function first
  if (isSupabaseConfigured) {
    try {
      const { data: auth, error } = await supabase.functions.invoke('imagekit-auth')
      if (!error && auth?.signature) {
        signature = auth.signature
      }
    } catch (err) {
      console.warn("Supabase Edge Function 'imagekit-auth' is not deployed or not accessible. Falling back to local signature generation...", err)
    }
  }

  // 2. Fallback: local signature — development only, never in production
  if (!signature) {
    if (import.meta.env.PROD) {
      throw new Error(
        "Upload failed: deploy the Supabase Edge Function 'imagekit-auth' to enable production uploads. The private key must not be bundled into the client."
      )
    }
    if (!imagekitConfig.privateKey) {
      throw new Error(
        "Upload failed: Edge Function 'imagekit-auth' is not deployed and VITE_IMAGEKIT_PRIVATE_KEY is missing from .env (local dev only)."
      )
    }
    try {
      signature = await generateLocalSignature(token, expire, imagekitConfig.privateKey)
    } catch (err) {
      throw new Error(`Failed to generate local upload signature: ${err.message}`)
    }
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('fileName', file.name)
  formData.append('folder', folder)
  formData.append('publicKey', imagekitConfig.publicKey)
  formData.append('signature', signature)
  formData.append('expire', String(expire))
  formData.append('token', token)

  const resp = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
    method: 'POST',
    body: formData,
  })

  if (!resp.ok) {
    const err = await resp.json()
    throw new Error(err.message || 'Upload failed')
  }

  return await resp.json()
}
