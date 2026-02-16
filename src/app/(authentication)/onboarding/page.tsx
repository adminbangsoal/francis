import { getCookie } from "cookies-next";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Onboarding from "./Onboarding";
import { Props } from "@/types";

export const metadata: Metadata = {
  title: "BangSoal",
  description: "Onboarding",
};

const OnboardPage = async ({ searchParams }: Props) => {
  // Try to get email from cookie first, fallback to query param
  const email =
    getCookie("email", { cookies }) ||
    (searchParams?.email as string | undefined);

  if (!email) {
    console.error("Email not found in cookies or query params");
    redirect("/login");
  }

  return (
    <div className="h-screen w-full">
      <Onboarding />
    </div>
  );
};
export default OnboardPage;
