import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
});

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = withBundleAnalyzer(withPayload(nextConfig));
