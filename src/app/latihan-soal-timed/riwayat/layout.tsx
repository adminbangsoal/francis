"use client";
import withAuth from "@/app/components/withAuth";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import MediaQuery from "react-responsive";
import { RiwayatLatihanContextProvider } from "../context/RiwayatLatihanContext";
function RiwayatTimedLatihanSoalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RiwayatLatihanContextProvider>
      <div className="relative">
        <MediaQuery maxWidth={1023}>
          <div className="sticky top-0 z-30 flex items-center justify-between bg-white px-5 py-3 font-600 text-gray-700">
            <div className="flex items-center gap-x-2">
              <Image
                src="/logo-black.svg"
                width={18}
                height={18}
                alt="bangsoal-logo"
              />
              <h5>Latsol Berwaktu</h5>
            </div>
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({
                  variant: "bsPrimary",
                }),
              )}
            >
              Dashboard
            </Link>
          </div>
        </MediaQuery>
        <div>{children}</div>
      </div>
    </RiwayatLatihanContextProvider>
  );
}

export default withAuth(RiwayatTimedLatihanSoalLayout);
