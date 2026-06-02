import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Balochistan Connect | Government & Citizen Complaint Portal",
  description: "Report civic issues, track complaint statuses, explore tourist locations, and stay updated on announcements in Balochistan.",
  keywords: ["Balochistan", "Complaint Portal", "Civic Services", "Gwadar", "Quetta", "Tourism Balochistan"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-brand-light text-foreground dark:bg-brand-dark">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
