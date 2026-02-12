// libs
import type { Metadata } from "next";

// styles
import "react-virtualized/styles.css";
import "./globals.scss";

// providers
import Script from "next/script";
import Providers from "./providers";

import { Toaster } from "react-hot-toast";
import { MainLayout } from "./components/MainLayout";

export const metadata: Metadata = {
  title: "BangSoal",
  description:
    "BangSoal merupakan platform terbaik untuk persiapan UTBK dan ujian mandiri!",
  manifest: "/manifest.webmanifest",
  twitter: {
    site: "@bangsoalcoid",
    card: "summary_large_image",
    title: "BangSoal",
    description:
      "Gratis latihan ribuan soal UTBK dan ujian mandiri di BangSoal!",
    images: [
      {
        url: "https://bangsoal.s3.ap-southeast-1.amazonaws.com/static/bs-logo.png",
        alt: "BangSoal Logo",
      },
    ],
  },
  metadataBase: new URL("https://bangsoal.co.id"),
  openGraph: {
    title: "BangSoal",
    description:
      "BangSoal merupakan platform terbaik untuk persiapan UTBK dan ujian mandiri!",
    images: [
      {
        url: "https://bangsoal.s3.ap-southeast-1.amazonaws.com/static/bs-logo.png",
        alt: "BangSoal Logo",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(t){function e(){var e=this||self;e.globalThis=e,delete t.prototype._T_}"object"!=typeof globalThis&&(this?e():(t.defineProperty(t.prototype,"_T_",{configurable:!0,get:e}),_T_))}(Object);`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-M8NGWXK801" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-M8NGWXK801');
        `}
      </Script>
      <body className={`relative bg-surface-100`}>
        <Toaster />
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
