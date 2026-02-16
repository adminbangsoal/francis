import type { Metadata } from "next";
import OnboardingWrapper from "./OnboardingWrapper";

export const metadata: Metadata = {
  title: "BangSoal",
  description: "Onboarding",
};

const OnboardPage = () => {
  return (
    <div className="h-screen w-full">
      <OnboardingWrapper />
    </div>
  );
};
export default OnboardPage;
