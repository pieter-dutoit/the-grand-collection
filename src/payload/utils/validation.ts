export const validateSlug = (value: string | null | undefined) => {
  if (
    typeof value !== 'string' ||
    !value.match(/^[a-z0-9#]+(?:-[a-z0-9]+)*$/)
  ) {
    return 'Invalid slug. Example: my-page'
  }

  return true
}

export const validateSlugFriendly = (value: string | null | undefined) => {
  if (typeof value !== 'string' || !value.match(/^[a-zA-Z0-9 \-&\/]+$/)) {
    return 'Invalid name. Only letters, numbers, and spaces are allowed.'
  }

  return true
}

export const validatePostalCode = (value: string | null | undefined) => {
  if (typeof value !== 'string' || !/^\d{4}$/.test(value)) {
    return 'Postal code must be exactly 4 digits'
  }

  return true
}

const safeParseUrl = (value: unknown) => {
  if (typeof value !== 'string') return null

  try {
    return new URL(value)
  } catch {
    return null
  }
}

export const validateGoogleMapsEmbedUrl = (
  value: string | null | undefined
) => {
  if (!value) return 'Maps embed URL is required'

  const url = safeParseUrl(value)
  if (!url) return 'Invalid URL'

  if (url.protocol !== 'https:') {
    return 'Maps embed URL must start with https://'
  }

  const allowedHosts = new Set(['www.google.com', 'google.com'])
  const isAllowedHost =
    allowedHosts.has(url.hostname) || url.hostname.endsWith('.google.com')

  if (!isAllowedHost) {
    return 'Maps embed URL must be from google.com'
  }

  if (!url.pathname.startsWith('/maps/embed')) {
    return 'Maps embed URL must start with /maps/embed'
  }

  return true
}

export const validateGoogleMapsLink = (value: string | null | undefined) => {
  if (!value) return true

  const url = safeParseUrl(value)
  if (!url) return 'Invalid URL'

  if (url.protocol !== 'https:') {
    return 'Maps link must start with https://'
  }

  const allowedHosts = new Set([
    'maps.app.goo.gl',
    'www.google.com',
    'google.com'
  ])
  const isAllowedHost =
    allowedHosts.has(url.hostname) ||
    url.hostname.endsWith('.google.com') ||
    url.hostname.endsWith('.goo.gl')

  if (!isAllowedHost) {
    return 'Maps link must be from maps.app.goo.gl or google.com'
  }

  return true
}
