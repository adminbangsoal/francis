// libs
import { Metadata } from "next";

// utils
import Script from "next/script";
import LanggananContainer from "./components/LanggananContainer";

export const metadata: Metadata = {
  title: "Langganan | BangSoal",
  description:
    "BangSoal merupakan platform terbaik untuk persiapan UTBK dan ujian mandiri!",
  other: {
    "Content-Security-Policy":
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://snap-assets.al-pc-id-b.cdn.gtflabs.io https://api.sandbox.midtrans.com https://app.sandbox.midtrans.com https://pay.google.com https://js-agent.newrelic.com https://bam.nr-data.net https://gwk.gopayapi.com https://www.googletagmanager.com 'sha256-v8V2Y+fbkBMghFEm+ALwcLXqYbjG/N9246T4W4pt1JM='; object-src 'none'; frame-src 'self' https://app.sandbox.midtrans.com;",
  },
};

export default function Pricing() {
  const midtransUrl = process.env.NEXT_PUBLIC_MIDTRANS_URL;

  return (
    <>
      <Script
        src={midtransUrl}
        type="text/javascript"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
      />

      <LanggananContainer />
    </>
  );
}
