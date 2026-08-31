import type { Metadata } from "next";
import "./globals.css";
import "./chapter-one.css";

export const metadata: Metadata = {
  title: "下周的葬礼",
  description: "一款以浏览器调查为核心的悬疑解谜游戏原型。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
