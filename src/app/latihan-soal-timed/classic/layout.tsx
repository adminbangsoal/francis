"use client";

import { KlasikAside } from "../components/Aside/KlasikAside";

function LatihanSoalKlasikLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full lg:flex-row ">
      <KlasikAside />
      <div className="w-full">{children}</div>
    </div>
  );
}

export default LatihanSoalKlasikLayout;
