import type { Metadata, Viewport } from "next";
import { Doto, Geist, Geist_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Navbar } from "../components/common/navbar";
import { SmoothScroll } from "@/components/common/smooth-scroll";

import "./globals.css";
import { Footer } from "../components/common/footer";
import { FAB } from "@/components/common/fab";

import OgImage from "./opengraph-image.png";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lenvx.dev",
    template: "%s | Lenvx.dev",
  },
  description: "Personal portfolio of Lenvx, a 15-year-old developer and producer.",
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://lenvx.dev"
      : "http://localhost:3000",
  ),
  alternates: {
    canonical: "https://lenvx.dev",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: {
      default: "Lenvx.dev",
      template: "%s | Lenvx.dev",
    },
    images: [
      {
        url: OgImage.src,
        width: OgImage.width,
        height: OgImage.height,
      },
    ],
    description: "Personal portfolio of Lenvx, a 15-year-old developer and producer.",
    type: "website",
    locale: "en_US",
    url: "https://lenvx.dev",
    siteName: "Lenvx.dev",
  },
  twitter: {
    card: "summary_large_image",
    site: "@lenvx",
    creator: "@lenvx",
    images: [
      {
        url: OgImage.src,
        width: OgImage.width,
        height: OgImage.height,
      },
    ],
  },
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${doto.variable} antialiased`}
        >
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:z-[1000] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:rounded-full focus:bg-background focus:text-foreground focus:border focus:border-border"
          >
            Skip to content
          </a>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SmoothScroll>
              <FAB />
              <Navbar />
              <div id="content">{children}</div>
              <Footer />
            </SmoothScroll>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
