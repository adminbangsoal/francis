// libs
import { Metadata } from "next";

// utils
import Script from "next/script";
import LanggananContainer from "./components/LanggananContainer";

export const metadata: Metadata = {
  title: "Langganan | BangSoal",
  description:
    "BangSoal merupakan platform terbaik untuk persiapan UTBK dan ujian mandiri!",
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
