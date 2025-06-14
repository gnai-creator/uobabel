import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LegalBanner from "./components/LegalBanner"; // ou ajuste o caminho
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UO Babel - Survival Hardcore",
  description: "UO Babel - Survival Hardcore",
};

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
        <Toaster richColors position="top-center" />
        <LegalBanner />
      </body>
    </html>
  );
}
