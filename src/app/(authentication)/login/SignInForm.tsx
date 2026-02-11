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
import {
  useForgotPasswordEmailMutation,
  useForgotPasswordMutation,
  useLoginEmailMutation,
  useSendMailOtpMutation,
  useSendOtpResetPasswordMutation,
  useVerifyForgotPasswordOtpMutation,
  useVerifyMailOtpMutation,
} from "@/redux/api/authApi";
import { SigninFormSchema } from "@/types/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import dayjs from "dayjs";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InfiniteSlider } from "../../components/InfiniteSlider";
import { OTPInput } from "../../components/OTPInput";
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

  const [passwordLoginModal, setPasswordLoginModal] = useState<boolean>(false);

  const [phoneNumberLoginModal, setPhoneNumberLoginModal] =
    useState<boolean>(false);

  const isLogin = pathname == "/login";
  const [otpValue, setOtpValue] = useState<string>("");
  const [showOTPInput, setShowOTPInput] = useState<boolean>(false);

  const form = useForm<z.infer<typeof SigninFormSchema>>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { handleSubmit } = form;

  const [isForgotPasswordEmail, setIsForgotPasswordEmail] =
    useState<boolean>(false);
  const [
    sendEmailOTP,
    {
      isSuccess: isEmailOtpSuccess,
      isLoading: isOtpEmailLoading,
      error: emailOtpError,
      isError: isEmailOtpError,
    },
  ] = useSendMailOtpMutation();
  const [
    verifyEmailOtp,
    { isSuccess: isVerifyEmailOtpSuccess, error, isError },
  ] = useVerifyMailOtpMutation();
  const [loginEmailUser, { isSuccess: isLoginEmailUserSuccess, data }] =
    useLoginEmailMutation();

  const [
    sendForgotPasswordEmail,
    {
      isSuccess: isSendForgotPasswordEmailSuccess,
      reset: resetForgotPasswordEmail,
    },
  ] = useForgotPasswordEmailMutation();
  const [
    verifyForgotPasswordEmailOtp,
    {
      isSuccess: isVerifyForgotPasswordEmailOtpSuccess,
      reset: resetVerifyForgotPasswordEmailOtp,
    },
  ] = useVerifyForgotPasswordOtpMutation();

  const [
    sendOTPReset,
    {
      isSuccess: isSendOtpResetSuccess,
      isLoading: isOtpResetLoading,
      error: otpResetError,
      reset,
    },
  ] = useSendOtpResetPasswordMutation();

  const [
    forgotPasswordMutation,
    { isSuccess: isForgotPasswordSuccess, isLoading: isForgotPasswordLoading },
  ] = useForgotPasswordMutation();

  const onSubmitForm = async (values: z.infer<typeof SigninFormSchema>) => {
    if (!showOTPInput) {
      setCookie("email", values.email, {
        expires: dayjs().add(2, "hour").toDate(),
      });
      await sendEmailOTP({ email: values.email });
    } else {
      const body = { ...values, otp: otpValue };
      if (isLogin) {
        await verifyEmailOtp(body);
      }
    }
  };

  useEffect(() => {
    if (isEmailOtpSuccess) {
      setShowOTPInput(true);
    }
    if (isVerifyEmailOtpSuccess) {
      redirect("/onboarding");
    }
  }, [isVerifyEmailOtpSuccess, isEmailOtpSuccess]);

  useEffect(() => {
    if (!passwordLoginModal && !phoneNumberLoginModal) {
      reset();
      setOtpValue("");
      setShowOTPInput(false);
      form.reset();
      setIsForgotPasswordEmail(false);
      resetForgotPasswordEmail();
    }
  }, [passwordLoginModal, phoneNumberLoginModal]);

  const onSubmitLoginPasswordForm = async (
    values: z.infer<typeof SigninFormSchema>,
  ) => {
    if (isForgotPasswordEmail) {
      // Mixpanel.track("Submit Forgot Password OTP", { email: values.email });
      await verifyForgotPasswordEmailOtp({
        email: values.email,
        otp: otpValue,
      });
    } else {
      // Mixpanel.track("Submit Login Email", { email: values.email });
      await loginEmailUser({
        email: values.email,
        password: values.password as string,
      });
    }
  };

  useEffect(() => {
    if (isLoginEmailUserSuccess) {
      if (!data?.data.user.onboard_date) {
        redirect("/onboarding");
      } else {
        redirect("/dashboard");
      }
    }

    if (isForgotPasswordSuccess || isVerifyForgotPasswordEmailOtpSuccess) {
      redirect("/dashboard");
    }
  }, [
    isEmailOtpSuccess,
    isForgotPasswordSuccess,
    isLoginEmailUserSuccess,
    isVerifyForgotPasswordEmailOtpSuccess,
  ]);

  useEffect(() => {
    if (isEmailOtpError) {
      if (
        (emailOtpError as any)?.status == 405 ||
        (emailOtpError as any)?.status == 406
      ) {
        setPasswordLoginModal(true);
      }
    }
  }, [isEmailOtpError]);

  useEffect(() => {
    if (!passwordLoginModal) {
      resetVerifyForgotPasswordEmailOtp();
      setIsForgotPasswordEmail(false);
      reset();
      setResetPasswordStep(0);
    }
  }, [passwordLoginModal]);

  useEffect(() => {
    if (isSendOtpResetSuccess) {
      setResetPasswordStep(1);
    }
  }, [isSendOtpResetSuccess]);

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
                    <p className="ml-8 text-2xl font-bold text-gray-950 md:ml-6 lg:text-4xl">
                      {
                        SIGNUP_COPYWRITING[isLogin ? "login" : "register"]
                          .header
                      }
                    </p>
                    <p className="ml-6 text-gray-500 md:ml-6 lg:text-lg">
                      {
                        SIGNUP_COPYWRITING[isLogin ? "login" : "register"]
                          .caption
                      }
                    </p>
                  </div>

                  <div className="w-full">
                    <div className="mt-4 flex w-full flex-col gap-5">
                      {showOTPInput ? (
                        <div className="mt-0 flex md:justify-center">
                          <OTPInput
                            heading={"Cek email masuk (inbox) dan spam Anda"}
                            setValue={setOtpValue}
                            errorMesage={(error as any)?.data?.error?.message}
                          />
                        </div>
                      ) : (
                        <div className="-ml-4 mr-1 md:-ml-4 md:mr-2">
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
                      )}
                      <div className="flex justify-center">
                        <Button
                          type="button"
                          onClick={async () => {
                            setPhoneNumberLoginModal(true);
                            // Mixpanel.track("Forgot Email");
                          }}
                          variant="link"
                          className="flex w-fit text-center text-sm lg:mr-6"
                        >
                          Lupa email terdaftar?
                        </Button>
                      </div>
                      <Button
                        onClick={handleSubmit(onSubmitForm)}
                        variant={"bsPrimary"}
                        className="-ml-6 mr-2 rounded-full md:-ml-8 md:mr-4"
                        loading={isOtpEmailLoading}
                      >
                        {showOTPInput ? "Submit" : "Lanjut"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal open={passwordLoginModal} setOpen={setPasswordLoginModal}>
            {resetPasswordStep == 0 && (
              <>
                {isSendForgotPasswordEmailSuccess ? (
                  <div className="flex md:justify-center">
                    <OTPInput
                      heading={"Cek email masuk (inbox) dan spam Anda"}
                      setValue={setOtpValue}
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold">
                      Masuk menggunakan password anda
                    </h2>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div>
                            <Input
                              type="password"
                              placeholder="Password"
                              {...field}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <button
                      type="button"
                      onClick={async () => {
                        setIsForgotPasswordEmail(true);
                        await sendForgotPasswordEmail({
                          email: form.getValues("email"),
                        });
                      }}
                      className="overflow flex h-fit w-fit justify-start text-sm underline"
                    >
                      Lupa Password? Kirim OTP via email untuk reset
                    </button>
                  </>
                )}
                <Button
                  onClick={handleSubmit(onSubmitLoginPasswordForm)}
                  variant={"bsPrimary"}
                  className="mb-2 mt-4"
                  loading={isOtpResetLoading || isForgotPasswordLoading}
                >
                  Masuk
                </Button>
              </>
            )}
          </Modal>
          <Modal
            open={phoneNumberLoginModal}
            setOpen={setPhoneNumberLoginModal}
          >
            {resetPasswordStep == 1 ? (
              <>
                <h2 className="text-2xl font-bold">Masuk Menggunakan OTP</h2>
                <div className="flex md:justify-center">
                  <OTPInput setValue={setOtpValue} />
                </div>
                <Button
                  type="button"
                  onClick={async () => {
                    const values = form.getValues();
                    // Mixpanel.track("Clicked Forgot Password", {
                    //   email: values.email,
                    // });
                    await forgotPasswordMutation({
                      phone_number: `+62${values.phone_number?.slice(1)}`,
                      otp: otpValue,
                    });
                  }}
                  variant={"bsPrimary"}
                  className="mb-2"
                  loading={isOtpResetLoading || isForgotPasswordLoading}
                >
                  Masuk
                </Button>
              </>
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel required>Nomor Whatsapp Terdaftar</FormLabel>
                        <Input
                          className="mb-2 mt-2"
                          type="number"
                          placeholder="Nomor Whatsapp"
                          {...field}
                        />
                        <p className="mt-2 text-xs font-bold text-red-700">
                          {(error as any)?.data?.error?.message}
                        </p>
                        <Button
                          type="button"
                          onClick={async () => {
                            const phoneNumber = form
                              .getValues("phone_number")
                              ?.slice(1);
                            await sendOTPReset({
                              phone_number: `+62${phoneNumber}`,
                            });
                          }}
                          variant="bsPrimary"
                          className="mt-4 w-full"
                          loading={isOtpResetLoading}
                        >
                          Kirim OTP
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </Modal>
        </form>
      </Form>
    </div>
  );
};
