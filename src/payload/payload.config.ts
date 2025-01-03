import path from 'path'
import sharp from 'sharp'

import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { s3Storage } from '@payloadcms/storage-s3'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { HomePage } from './globals/home-page'

import { Guesthouses } from './collections/guesthouses'
import { ContactPersons } from './collections/contact-persons'
import { SocialMediaPlatforms } from './collections/social-media-platforms'
import { Amenities } from './collections/amenities'
import { Users } from './collections/users'
import { Media } from './collections/media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

console.log('Resolved path:', path.resolve(dirname, './globals/home-page'))

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname)
    }
  },
  globals: [HomePage],
  collections: [
    Amenities,
    Users,
    Media,
    Guesthouses,
    ContactPersons,
    SocialMediaPlatforms
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts')
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || ''
  }),
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media'
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
      fileSize: 10000000
    }
  }
})
