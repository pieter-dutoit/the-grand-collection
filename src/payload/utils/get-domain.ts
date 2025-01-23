export function getDomain(): string {
  const domain =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    process.env.VERCEL_BRANCH_URL

  return domain || 'localhost:3000'
}
