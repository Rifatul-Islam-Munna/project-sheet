import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarComponent from "@/components/custom/Navbar/Navbar";
import Footer from "@/components/custom/footer/Footer";
import { Toaster } from "@/components/ui/sonner"
import NextTopLoader from 'nextjs-toploader';
import QueryWrapper from "@/components/wrapper/QueryWrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notes care",
  description: "Get Noted digitally ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryWrapper>

      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader />
        <NavbarComponent/>
        {children}
        <Footer/>
        <Toaster/>
      </body>
      </QueryWrapper>
    </html>
  );
}
