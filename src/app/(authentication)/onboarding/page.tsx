import { getCookie } from "cookies-next";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Onboarding from "./Onboarding";

export const metadata: Metadata = {
  title: "BangSoal",
  description: "Onboarding",
};

const OnboardPage = async () => {
  const email = getCookie("email", { cookies });

  if (!email) {
    console.error("Email not found in cookies");
    redirect("/login");
  }

  return (
    <div className="h-screen w-full">
      <Onboarding />
    </div>
  );
};
export default OnboardPage;
