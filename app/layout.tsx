import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://www.bradyhaisfield.com"),
  title: "Brady Haisfield",
  description:
    "Brady Haisfield builds at the intersection of real estate and technology. Portfolio, projects, and resume.",
  openGraph: {
    title: "Brady Haisfield — Real Estate × Technology",
    description:
      "Brady Haisfield builds at the intersection of real estate and technology. Portfolio, projects, and resume.",
    url: "https://www.bradyhaisfield.com",
    siteName: "Brady Haisfield",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brady Haisfield — Real Estate × Technology",
    description:
      "Brady Haisfield builds at the intersection of real estate and technology.",
  },
};

// Allow zooming in on mobile, but floor the scale at 1 so the layout can't be
// pinch-zoomed out below its proper fit.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
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
    >
      <head>
        {/* Clash Grotesk — display face (Fontshare). Geist + Geist Mono via next/font above. */}
        {/* Preconnect to the Fontshare CDN so the hero display font (the LCP element) loads sooner. */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
