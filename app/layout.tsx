import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: '護膚品牌策略 AI 產生器',
  description: '護膚品牌策略 AI 產生器 - 讓 AI 幫你打造專屬品牌策略',
  icons: {
    icon: 'https://drive.google.com/uc?export=view&id=1X9XNqxrkSKDB1aAmR3WhLrjPai7bxNso', // Put your favicon file in the public folder
    // You can also use PNG:
    // icon: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
