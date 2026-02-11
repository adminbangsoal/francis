"use client";

import withAuth from "../components/withAuth";
import { LatihanProvider } from "./context/LatihanContext";

function NewLatihanSoalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LatihanProvider>
      <div>{children}</div>
    </LatihanProvider>
  );
}

export default withAuth(NewLatihanSoalLayout);
