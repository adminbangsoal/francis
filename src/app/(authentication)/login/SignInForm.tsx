"use client";
import { Button } from "@/components/ui/button";
// Removed unused imports: Form, FormField, FormItem, FormLabel, FormMessage, Input, Modal
// Manual auth has been disabled - only Google Sign In is available
import { auth, googleProvider } from "@/lib/firebase";
import {
  // useForgotPasswordMutation, // Disabled - manual auth removed
  useGoogleSignInMutation,
} from "@/redux/api/authApi";
// import { SigninFormSchema } from "@/types/schema/auth"; // Disabled - manual auth removed
// import { zodResolver } from "@hookform/resolvers/zod"; // Disabled - manual auth removed
import { signInWithPopup } from "firebase/auth";
import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react"; // Disabled - manual auth removed
// import { useForm } from "react-hook-form"; // Disabled - manual auth removed
import toast from "react-hot-toast";
// import { z } from "zod"; // Disabled - manual auth removed
import { InfiniteSlider } from "../../components/InfiniteSlider";
import { SIGNUP_COPYWRITING, UNI_LOGOS } from "./constants";

interface ResetPasswordStep {
  resetPasswordStep: number;
  setResetPasswordStep: (step: number) => void;
}

export const SignInForm = ({
  resetPasswordStep,
  setResetPasswordStep,
}: ResetPasswordStep) => {
  const pathname = usePathname();
  const isLogin = pathname == "/login";
  // Removed: forgotPasswordModal, resetPasswordSent, form, login, forgotPassword states and functions
  // Manual auth has been disabled - only Google Sign In is available

  const [
    googleSignIn,
    {
      isSuccess: isGoogleSignInSuccess,
      data: googleData,
      isLoading: isGoogleSignInLoading,
    },
  ] = useGoogleSignInMutation();

  const handleGoogleSignIn = async () => {
    try {
      // Check if Firebase config is available
      if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        toast.error(
          "Firebase belum dikonfigurasi. Silakan set environment variables.",
        );
        return;
      }

      // Sign in with Google using Firebase
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      // Send ID token to backend
      await googleSignIn({ idToken });
    } catch (error: any) {
      console.error("Google Sign In error:", error);
      if (error.code === "auth/popup-closed-by-user") {
        toast.error("Popup ditutup. Silakan coba lagi.");
      } else if (error.code === "auth/popup-blocked") {
        toast.error("Popup diblokir. Silakan izinkan popup untuk domain ini.");
      } else {
        toast.error(
          `Google Sign In gagal: ${error.message || "Terjadi kesalahan"}`,
        );
      }
    }
  };

  // Removed: handleForgotPassword and related useEffect hooks
  // Manual auth has been disabled - only Google Sign In is available

  return (
    <div className="mx-5 flex h-full flex-col justify-center gap-10 md:mx-16 lg:flex-row lg:items-center lg:pt-10">
      <div className="-mx-4 hidden w-full lg:block lg:w-1/2">
        <InfiniteSlider images={UNI_LOGOS} />
      </div>
      <div className="lg:w-1/2">
        <div className="-mx-10 -mb-8 overflow-hidden md:overflow-visible lg:w-full lg:self-end">
          <div className="w-full min-w-[380px] -skew-x-12 overflow-hidden rounded-2xl bg-emerald-100/50 p-4 shadow-lg">
            <div className="rounded-2xl bg-white py-8 md:py-16">
              <div className="flex min-h-[420px] skew-x-12 flex-col items-center justify-center gap-3 px-10 py-4 md:h-auto md:gap-6 lg:min-h-[550px] lg:gap-10">
                <div className="flex flex-col gap-2 text-center lg:-mt-20">
                  <p className="mx-8 text-2xl font-bold text-gray-950 md:mx-6 lg:text-4xl">
                    {SIGNUP_COPYWRITING[isLogin ? "login" : "register"].header}
                  </p>
                  <p className="mx-6 text-gray-500 md:mx-6 lg:text-lg">
                    {SIGNUP_COPYWRITING[isLogin ? "login" : "register"].caption}
                  </p>
                </div>

                <div className="w-full">
                  <div className="mt-4 flex w-full flex-col items-center gap-5">
                    <Button
                      type="button"
                      onClick={handleGoogleSignIn}
                      variant="outline"
                      className="w-full max-w-md rounded-full"
                      loading={isGoogleSignInLoading}
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Masuk dengan Google
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
