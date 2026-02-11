"use client";

import SoalAside from "./components/SoalAside";
import { RiwayatLatihanSoalProvider } from "./context";

function RiwayatLatihanSoalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RiwayatLatihanSoalProvider>
      <div className="flex w-full flex-col overflow-hidden md:h-screen md:max-h-screen md:flex-row">
        <SoalAside />
        <div className="grow overflow-y-auto pt-16 md:pt-0">{children}</div>
      </div>
    </RiwayatLatihanSoalProvider>
  );
}

export default RiwayatLatihanSoalLayout;
