import type { Metadata } from "next";
import type { ReactNode } from "react";
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
  metadataBase: new URL("https://www.trailbliz.in"),

  title: {
    default: "Trailbliz | Student Career & Opportunity Platform",
    template: "%s | Trailbliz",
  },

  description:
    "Trailbliz helps students build professional profiles, showcase projects and skills, track coding progress, discover internships and job opportunities, and move forward in their careers.",

  applicationName: "Trailbliz",

  authors: [
    {
      name: "Trailbliz",
      url: "https://www.trailbliz.in",
    },
  ],

  creator: "Trailbliz",
  publisher: "Trailbliz",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      {
        url: "/trailbliz-icon.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/trailbliz-icon.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],

    shortcut: "/trailbliz-icon.png",

    apple: [
      {
        url: "/trailbliz-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  openGraph: {
    type: "website",
    url: "https://www.trailbliz.in",
    siteName: "Trailbliz",

    title: "Trailbliz | Your Next Opportunity Starts Here",

    description:
      "Build your student profile, showcase your skills and projects, track coding progress, and discover internships and job opportunities.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Trailbliz - Student Career Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Trailbliz | Your Next Opportunity Starts Here",

    description:
      "Build your profile, showcase your skills and discover internships and job opportunities.",

    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}