"use client";
import { SekuensialAside } from "../components/Aside/SekuensialAside";

function LatihanSoalSekuensialLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex lg:flex-row">
      <SekuensialAside />
      <div className="grow">{children}</div>
    </div>
  );
}

export default LatihanSoalSekuensialLayout;
