import path from 'path'
import sharp from 'sharp'

import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { s3Storage } from '@payloadcms/storage-s3'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { HomePage } from './globals/home-page'
import { AllGuesthousesPage } from './globals/all-guesthouses-page'
import { Logos } from './globals/logos'
import { AboutUsPage } from './globals/about-us-page'

import { Guesthouses } from './collections/guesthouses'
import { ContactPersons } from './collections/contact-persons'
import { SocialMediaPlatforms } from './collections/social-media-platforms'
import { Amenities } from './collections/amenities'
import { Users } from './collections/users'
import { Media } from './collections/media'
import { SEOMedia } from './collections/seo-media'
import { Rooms } from './collections/rooms'
import { Beds } from './collections/beds'
import { RichtextSections } from './collections/richtext-section'
import { Articles } from './collections/articles'
import { Destinations } from './collections/destinations'
import { Faqs } from './collections/faqs'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  routes: {
    admin: '/cms/admin',
    api: '/cms/api'
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname)
    },
    components: {
      views: {
        dashboard: {
          Component: '@/payload/components/dashboard-wrapper'
        }
      }
    }
  },
  globals: [Logos, HomePage, AboutUsPage, AllGuesthousesPage],
  collections: [
    Articles,
    Destinations,
    Faqs,
    Amenities,
    Beds,
    Users,
    Media,
    SEOMedia,
    Guesthouses,
    Rooms,
    ContactPersons,
    SocialMediaPlatforms,
    RichtextSections
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts')
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
    connectOptions: {
      dbName: process.env.DATABASE_NAME || 'test'
    }
  }),
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media'
        },
        'seo-media': {
          prefix: 'media/seo'
        }
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || ''
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT
      }
    })
  ],
  sharp,
  upload: {
    limits: {
      fileSize: 4500000
    }
  },
  email: nodemailerAdapter({
    defaultFromAddress: 'contact@pieterdutoit.dev',
    defaultFromName: 'Payload CMS',
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    }
  })
})
