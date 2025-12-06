import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopKoro - বাংলাদেশের সবচেয়ে বড় অনলাইন শপিং",
  description: "ইলেকট্রনিক্স, ফ্যাশন, বিউটি - সবকিছু এক জায়গায়। ফ্রি ডেলিভারি, ক্যাশ অন ডেলিভারি, এবং ৭ দিন রিটার্ন গ্যারান্টি সহ।",
  keywords: "ই-কমার্স, অনলাইন শপিং, বাংলাদেশ, ইলেকট্রনিক্স, ফ্যাশন, বিউটি",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
