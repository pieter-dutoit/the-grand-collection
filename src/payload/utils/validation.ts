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
  if (typeof value !== 'string' || !value.match(/^[a-zA-Z0-9 \-&]+$/)) {
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
