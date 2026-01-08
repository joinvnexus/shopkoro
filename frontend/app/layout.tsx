import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

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
  description:
    "ইলেকট্রনিক্স, ফ্যাশন, বিউটি - সবকিছু এক জায়গায়। ফ্রি ডেলিভারি, ক্যাশ অন ডেলিভারি, এবং ৭ দিন রিটার্ন গ্যারান্টি সহ।",
  keywords: "ই-কমার্স, অনলাইন শপিং, বাংলাদেশ, ইলেকট্রনিক্স, ফ্যাশন, বিউটি",
};

/**
 * RootLayout component serves as the main layout wrapper for the application
 * It sets up the HTML structure with language set to Bengali (bn)
 * and includes global components like Navbar, Footer, and Toaster
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        {/* 🔹 Global Header */}
        <Navbar />

        {/* 🔹 Page Content */}
        <main className="flex-1 pt-0">{children}</main>

        {/* 🔹 Global Footer */}
        <Footer />

        {/* 🔹 Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
