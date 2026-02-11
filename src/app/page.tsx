"use client";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Comparison from "./components/SectionComparison";
import Features from "./components/SectionFeatures";
import Hero from "./components/SectionHero";
import Pricing from "./components/SectionPricing";
import SignUp from "./components/SectionSignUp";

export default function Home() {
  const user = useAppSelector((state) => state.user);
  const route = useRouter();

  useEffect(() => {
    if (user.token) {
      route.push("/dashboard");
    }
  }, [user.token]);

  return (
    <main className="flex min-h-screen flex-col items-stretch">
      <Hero />
      <Features />
      <Comparison />
      {/* <Testimonials /> */}
      <Pricing />
      <SignUp />
    </main>
  );
}
