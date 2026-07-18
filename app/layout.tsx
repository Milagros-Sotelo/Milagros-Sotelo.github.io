import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = "https://milagros-sotelo.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Milagros Sotelo | Finance, Data & Business Intelligence",
    template: "%s | Milagros Sotelo",
  },
  description:
    "Professional portfolio by Milagros Sotelo featuring finance, data, business intelligence and analytics automation projects.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Milagros Sotelo | Finance, Data & Business Intelligence",
    description: "Three business-focused analytics projects with clear case studies, documented code and interactive demos.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Milagros Sotelo — Finance, Data and Business Intelligence portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Milagros Sotelo | Finance, Data & Business Intelligence",
    description: "Three business-focused analytics projects with clear case studies, documented code and interactive demos.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
