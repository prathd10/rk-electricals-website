export const imagekitConfig = {
  urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT || '',
  publicKey:   import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY || '',
}

export function getImageKitUrl(path, transforms = {}) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  const base = imagekitConfig.urlEndpoint.replace(/\/$/, '')
  return `${base}/${path.replace(/^\//, '')}`
}

export async function uploadToImageKit(file, folder = 'rk-electricals') {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('fileName', file.name)
  formData.append('folder', folder)
  formData.append('publicKey', imagekitConfig.publicKey)

  const authResp = await fetch('/api/imagekit-auth')
  if (!authResp.ok) throw new Error('ImageKit auth failed — ensure server auth endpoint is configured')
  const auth = await authResp.json()

  formData.append('signature', auth.signature)
  formData.append('expire',    auth.expire)
  formData.append('token',     auth.token)

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
