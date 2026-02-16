"use client";
import { getCookie } from "cookies-next";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import Onboarding from "./Onboarding";

export default function OnboardingWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Wait for Redux state to be rehydrated
    // Check if token exists in localStorage as fallback
    const tokenFromStorage = typeof window !== "undefined" ? window.localStorage.getItem("token") : null;
    const hasToken = user.token || tokenFromStorage;

    if (!hasToken) {
      // Give it a moment for redux-persist to rehydrate
      const timeout = setTimeout(() => {
        const finalToken = user.token || (typeof window !== "undefined" ? window.localStorage.getItem("token") : null);
        if (!finalToken) {
          console.error("Token not found, redirecting to login");
          router.push("/login");
          return;
        }
        setIsCheckingAuth(false);
      }, 200);

      return () => clearTimeout(timeout);
    }

    setIsCheckingAuth(false);
  }, [user.token, router]);

  useEffect(() => {
    if (isCheckingAuth) return;

    // Try to get email from cookie first, fallback to query param
    const emailFromCookie = getCookie("email");
    const emailFromQuery = searchParams.get("email");
    const emailFromProfile = user.profile?.email;

    const finalEmail = emailFromCookie || emailFromQuery || emailFromProfile;

    if (!finalEmail) {
      console.error("Email not found in cookies, query params, or profile");
      router.push("/login");
      return;
    }

    setEmail(finalEmail);
    setIsLoading(false);
  }, [searchParams, router, isCheckingAuth, user.profile?.email]);

  if (isCheckingAuth || isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!email) {
    return null;
  }

  return <Onboarding />;
}
