import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

const s3BucketPath =
  process.env.S3_BUCKET_PATH || process.env.NEXT_PUBLIC_S3_BUCKET_PATH || ''

const remotePatterns: NonNullable<NextConfig['images']>['remotePatterns'] =
  (() => {
    if (!s3BucketPath) return []

    try {
      const { hostname, pathname, port, protocol } = new URL(s3BucketPath)
      const normalizedPath = pathname === '/' ? '' : pathname.replace(/\/$/, '')
      const normalizedProtocol = protocol.replace(':', '')

      if (normalizedProtocol !== 'http' && normalizedProtocol !== 'https') {
        return []
      }

      return [
        {
          protocol: normalizedProtocol,
          hostname,
          port: port || '',
          pathname: `${normalizedPath}/**`,
          search: ''
        }
      ]
    } catch {
      return []
    }
  })()

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: false
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns,
    loader: 'custom',
    loaderFile: './src/lib/next-image-loader.ts'
  }
}

module.exports = withBundleAnalyzer(withPayload(nextConfig))
