import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CrosshairCursor from "@/components/CrosshairCursor";

// 配置衬线体 (用于大标题)
const serifFont = localFont({
  src: "./fonts/OptimaRoman.woff2", // 路径相对于 layout.tsx
  variable: "--font-serif",       // 定义 CSS 变量名
  display: "swap",
});

// 配置无衬线体 (用于 UI 文字)
const sansFont = localFont({
  src: "./fonts/OptimaRoman.woff2",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lry | Projects",
  description: "个人项目集",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-cn">
      <body className={`${serifFont.variable} ${sansFont.variable}`}>
        {children}
        <CrosshairCursor />
      </body>
    </html>
  );
}
