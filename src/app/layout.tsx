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

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://balochistan-connect.gov.pk";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "Balochistan Connect | Government & Citizen Complaint Portal",
  description: "Report civic issues, track complaint statuses, explore tourist locations, and stay updated on announcements in Balochistan.",
  keywords: ["Balochistan", "Complaint Portal", "Civic Services", "Gwadar", "Quetta", "Tourism Balochistan"],
  openGraph: {
    title: "Balochistan Connect | Government & Citizen Portal",
    description: "Report civic issues, track complaint statuses, explore tourist locations, and stay updated on announcements in Balochistan.",
    url: appUrl,
    siteName: "Balochistan Connect",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Balochistan Connect Portal Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Balochistan Connect | Government & Citizen Portal",
    description: "Report civic issues, track complaint statuses, explore tourist locations, and stay updated on announcements in Balochistan.",
    images: ["/og-image.png"],
  },
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
