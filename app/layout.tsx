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
    "Trailbliz helps students build professional profiles, track coding progress, discover internships and job opportunities, and move forward in their careers.",

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

  openGraph: {
    type: "website",
    url: "https://www.trailbliz.in",
    siteName: "Trailbliz",
    title: "Trailbliz | Your Next Opportunity Starts Here",
    description:
      "Build your student profile, showcase your skills, track coding progress and discover internships and job opportunities.",
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
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}