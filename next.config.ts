import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* 优化配置 */
  images: {
    // 全部图片均为本地资产,无需 remotePatterns
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
  experimental: {
    optimizePackageImports: ['three', '@react-three/drei', 'maath'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        // 指纹无关但内容稳定的静态资产,长缓存 + 重复访问零请求
        source: '/(images|models|fonts)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  staticPageGenerationTimeout: 60,
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
