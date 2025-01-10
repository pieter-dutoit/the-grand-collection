# The Grand Collection Public Facing Website

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Architecture

### Overview

- Next.js 15 App Router
- Payload CMS
- MongoDB Database
- Cloudflare R2 Object Storage
- Shadcn/UI Components

## File Organisation

### 1. Frontend & Payload CMS

The payload and frontend code is stored separately using [grouped routes](https://nextjs.org/docs/app/getting-started/project-structure#route-groups-and-private-folders).

#### 1.1 Payload Configuration

Payload config files are located in the `src/payload` directory.

### 2. File locations

Files are split by _route_ as explained in the [NextJS Documentation](https://nextjs.org/docs/app/getting-started/project-structure#split-project-files-by-feature-or-route)

#### 2.1 Exceptions

Shared files are stored in the `src` directory, including:

- hooks
- fonts
- global / shared UI components, including Shadcn components.

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

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Payload CMS Documentation](https://payloadcms.com/docs/getting-started/what-is-payload)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Theme Generator](https://www.realtimecolors.com/?colors=2e2e2e-f3f3f1-6c705c-cdc7b2-517671&fonts=Inter-Inter)
