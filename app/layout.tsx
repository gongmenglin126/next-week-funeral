import type { Metadata } from "next";
import "./globals.css";
import "./chapter-one.css";

export const metadata: Metadata = {
  title: "下周的葬礼",
  description: "一款以浏览器调查为核心的悬疑解谜游戏原型。",
  openGraph: {
    title: "下周的葬礼",
    description: "一场未完成的旅行。通过她留下的电脑，寻找行程背后的秘密。",
    images: ["https://next-week-funeral.gonglin556.chatgpt.site/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "下周的葬礼",
    description: "一场未完成的旅行。通过她留下的电脑，寻找行程背后的秘密。",
    images: ["https://next-week-funeral.gonglin556.chatgpt.site/og.png"],
  },
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
