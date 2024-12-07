export const validateSlug = (value: string | null | undefined) => {
  if (
    typeof value !== 'string' ||
    !value.match(/^[a-z0-9#]+(?:-[a-z0-9]+)*$/)
  ) {
    return 'Invalid slug. Example: my-page'
  }

  return true
}
