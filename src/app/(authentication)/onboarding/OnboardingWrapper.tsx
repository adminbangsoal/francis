"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import Onboarding from "./Onboarding";

export default function OnboardingWrapper() {
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for Redux state to be rehydrated
    // Check if token exists in localStorage as fallback
    const tokenFromStorage =
      typeof window !== "undefined"
        ? window.localStorage.getItem("token")
        : null;
    const hasToken = user.token || tokenFromStorage;

    if (!hasToken) {
      // Give redux-persist a moment to rehydrate
      const timeout = setTimeout(() => {
        const finalToken =
          user.token ||
          (typeof window !== "undefined"
            ? window.localStorage.getItem("token")
            : null);
        if (!finalToken) {
          console.error("Token not found, redirecting to login");
          router.push("/login");
          return;
        }
        setIsReady(true);
      }, 100);

      return () => clearTimeout(timeout);
    }

    setIsReady(true);
  }, [user.token, router]);

  // Email is already in user.profile.email from Redux state (persisted)
  // No need to check cookies or query params
  if (!isReady) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return <Onboarding />;
}
