"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { auth, googleProvider } from "@/lib/firebase";
import {
  useForgotPasswordMutation,
  useGoogleSignInMutation,
  useLoginMutation,
} from "@/redux/api/authApi";
import { SigninFormSchema } from "@/types/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithPopup } from "firebase/auth";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
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
  const [forgotPasswordModal, setForgotPasswordModal] =
    useState<boolean>(false);
  const [resetPasswordSent, setResetPasswordSent] = useState<boolean>(false);

  const form = useForm<z.infer<typeof SigninFormSchema>>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = form;

  const [
    login,
    {
      isSuccess: isLoginSuccess,
      data: loginData,
      isLoading: isLoginLoading,
      error: loginError,
    },
  ] = useLoginMutation();

  const [
    googleSignIn,
    {
      isSuccess: isGoogleSignInSuccess,
      data: googleData,
      isLoading: isGoogleSignInLoading,
    },
  ] = useGoogleSignInMutation();

  const [
    forgotPassword,
    { isSuccess: isForgotPasswordSuccess, isLoading: isForgotPasswordLoading },
  ] = useForgotPasswordMutation();

  const onSubmitForm = async (values: z.infer<typeof SigninFormSchema>) => {
    if (!values.password) {
      form.setError("password", { message: "Password harus diisi" });
      return;
    }

    await login({
      email: values.email,
      password: values.password,
    });
  };

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

  const handleForgotPassword = async () => {
    const email = form.getValues("email");
    if (!email) {
      form.setError("email", {
        message: "Email harus diisi untuk reset password",
      });
      return;
    }
    await forgotPassword({ email });
    setResetPasswordSent(true);
  };

  useEffect(() => {
    if (isForgotPasswordSuccess) {
      setResetPasswordSent(true);
    }
  }, [isForgotPasswordSuccess]);

  // Reset form error when modal closes
  useEffect(() => {
    if (!forgotPasswordModal) {
      setResetPasswordSent(false);
    }
  }, [forgotPasswordModal]);

  return (
    <div className="mx-5 flex h-full flex-col justify-center gap-10 md:mx-16 lg:flex-row lg:items-center lg:pt-10">
      <div className="-mx-4 hidden w-full lg:block lg:w-1/2">
        <InfiniteSlider images={UNI_LOGOS} />
      </div>
      <Form {...form}>
        <form className="lg:w-1/2">
          <div className="-mx-10 -mb-8 overflow-hidden md:overflow-visible lg:w-full lg:self-end">
            <div className="w-full min-w-[380px] -skew-x-12 overflow-hidden rounded-2xl bg-emerald-100/50 p-4 shadow-lg">
              <div className="rounded-2xl bg-white py-8 md:py-16">
                <div className="flex min-h-[420px] skew-x-12 flex-col items-center justify-center gap-3 px-10 py-4 md:h-auto md:gap-6 lg:min-h-[550px] lg:gap-10">
                  <div className="flex flex-col gap-2 text-center lg:-mt-20">
                    <p className="mx-8 text-2xl font-bold text-gray-950 md:mx-6 lg:text-4xl">
                      {
                        SIGNUP_COPYWRITING[isLogin ? "login" : "register"]
                          .header
                      }
                    </p>
                    <p className="mx-6 text-gray-500 md:mx-6 lg:text-lg">
                      {
                        SIGNUP_COPYWRITING[isLogin ? "login" : "register"]
                          .caption
                      }
                    </p>
                  </div>

                  <div className="w-full">
                    <div className="mt-4 flex w-full flex-col items-center gap-5">
                      <div className="w-full max-w-md">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <Input
                                type="email"
                                placeholder="Email"
                                {...field}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="w-full max-w-md">
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <Input
                                type="password"
                                placeholder="Password"
                                {...field}
                              />
                              <FormMessage />
                              {loginError && (
                                <p className="mt-2 text-xs font-bold text-red-700">
                                  {(loginError as any)?.data?.error?.message ||
                                    "Email atau password salah"}
                                </p>
                              )}
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Button
                          type="button"
                          onClick={() => setForgotPasswordModal(true)}
                          variant="link"
                          className="flex w-fit text-center text-sm lg:mr-6"
                        >
                          Lupa password?
                        </Button>
                      </div>
                      <Button
                        onClick={handleSubmit(onSubmitForm)}
                        variant={"bsPrimary"}
                        className="w-full max-w-md rounded-full"
                        loading={isLoginLoading}
                      >
                        Masuk
                      </Button>
                      <div className="relative w-full max-w-md">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="text-muted-foreground bg-white px-2">
                            Atau
                          </span>
                        </div>
                      </div>
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
          <Modal open={forgotPasswordModal} setOpen={setForgotPasswordModal}>
            {resetPasswordSent ? (
              <>
                <h2 className="text-2xl font-bold">
                  Email Reset Password Terkirim
                </h2>
                <p className="mt-4 text-gray-600">
                  Kami telah mengirimkan link reset password ke email Anda.
                  Silakan cek inbox dan folder spam Anda.
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Link reset password berlaku selama 1 jam.
                </p>
                <Button
                  onClick={() => {
                    setForgotPasswordModal(false);
                    setResetPasswordSent(false);
                  }}
                  variant={"bsPrimary"}
                  className="mb-2 mt-4"
                >
                  Tutup
                </Button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold">Lupa Password</h2>
                <p className="mt-2 text-gray-600">
                  Masukkan email Anda dan kami akan mengirimkan link reset
                  password.
                </p>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="mt-4">
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder="Email" {...field} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  onClick={handleForgotPassword}
                  variant={"bsPrimary"}
                  className="mb-2 mt-4"
                  loading={isForgotPasswordLoading}
                >
                  Kirim Link Reset Password
                </Button>
              </>
            )}
          </Modal>
        </form>
      </Form>
    </div>
  );
};
