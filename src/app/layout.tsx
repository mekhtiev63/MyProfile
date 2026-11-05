import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import SkipLink from "@/components/SkipLink";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["600", "700"],
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

const siteUrl = "https://ruslanmekhtiev.ru";
const title = "Мехтиев Руслан — разработчик и общественный деятель";
const description =
  "Backend в МТС · СПК Тимирязевки · работа с МГД и городом.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Мехтиев Руслан",
  },
  description,
  applicationName: "Мехтиев Руслан",
  authors: [{ name: "Мехтиев Руслан" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "Мехтиев Руслан",
    title,
    description,
    images: [
      {
        url: "/portrait.jpg",
        width: 706,
        height: 1024,
        alt: "Мехтиев Руслан",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/portrait.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="/portrait-560.webp"
          imageSrcSet="/portrait-560.webp 560w, /portrait.webp 706w"
          imageSizes="(max-width: 768px) 350px, 380px"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
