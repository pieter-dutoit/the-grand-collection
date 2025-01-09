# The Grand Collection Public Facing Website

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

To start the development server, follow these steps:

1. Install dependencies:

```bash
pnpm install
```

2. Run the development server:

```bash
pnpm dev
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Required Variables

```bash
# Payload CMS
PAYLOAD_SECRET=your-secret-key # Generate a random string

# Database
DATABASE_URI=mongodb://localhost:27017
DATABASE_NAME=the-grand-collection

# Storage (Cloudflare R2)
S3_ENDPOINT=https://your-bucket-id.r2.cloudflarestorage.com
S3_BUCKET=your-bucket-name
S3_REGION=auto

S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Payload CMS Documentation](https://payloadcms.com/docs/getting-started/what-is-payload)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Theme Generator](https://www.realtimecolors.com/?colors=2e2e2e-f3f3f1-6c705c-cdc7b2-517671&fonts=Inter-Inter)
