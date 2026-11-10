import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import CrosshairCursor from '@/components/CrosshairCursor';

// 配置字体 (OptimaRoman)
const optimaFont = localFont({
  src: './fonts/OptimaRoman.woff2',
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://chivalrycieux.github.io'),
  title: {
    default: 'Lry | Projects',
    template: '%s | Lry',
  },
  description: '个人项目集',
  openGraph: {
    siteName: 'Lry Projects',
    locale: 'zh_CN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-cn">
      <body className={optimaFont.variable}>
        {children}
        <CrosshairCursor />
      </body>
    </html>
  );
}
