// analytics

// components
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// libs
import { useSendOtpResetPasswordMutation } from "@/redux/api/authApi";
import { useFormStatus } from "react-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type FormValues = {
  phone: string;
};

export default function ForgotDialog() {
  const form = useForm<FormValues>();

  const { pending } = useFormStatus();

  const [
    sendOTPReset,
    {
      isSuccess: isSendOtpResetSuccess,
      isLoading: isOtpResetLoading,
      error: otpResetError,
      reset,
    },
  ] = useSendOtpResetPasswordMutation();

  const sendOTPResetPromise = async (phone: string) => {
    try {
      await sendOTPReset({ phone_number: "+62" + phone }).unwrap();
    } catch (err) {
      throw new Error(String(err));
      reset();
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    sendOTPResetPromise(data.phone);

    if (isOtpResetLoading) {
      toast.loading("Sending OTP...");
    } else if (isSendOtpResetSuccess) {
      form.reset();
      toast.success(`OTP sent successfully to ${data.phone}!`);
    } else if (otpResetError) {
      toast.error(`${(otpResetError as any)?.data?.error?.message}`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="mr-16"
          onClick={async () => {
            // Mixpanel.track("Forgot Email");
          }}
        >
          Lupa email terdaftar?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Santai, masuk pake WA aja!</DialogTitle>
          <DialogDescription>
            Apabila kamu lupa email terdaftar, kita akan coba kirim OTP lewat
            nomor Whatsapp-mu.
          </DialogDescription>
        </DialogHeader>
        <div className="py-5">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex w-full max-w-sm flex-col gap-3"
                  >
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>
                            Nomor Whatsapp Terdaftar
                          </FormLabel>
                          <Input
                            className="mb-2 mt-2"
                            type="number"
                            placeholder="Nomor Whatsapp"
                            required
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormMessage />
                    <DialogFooter>
                      <Button
                        type="submit"
                        variant={"bsPrimary"}
                        loading={pending}
                        aria-disabled={pending}
                        disabled={pending}
                        className="group mt-6 gap-1.5 *:transition hover:bg-gray-200 dark:hover:bg-slate-900"
                      >
                        <p className="translate-x-[13px] group-hover:translate-x-0">
                          Kirim OTP
                        </p>
                        <i className="i-ph-arrow-circle-right size-5 -translate-x-[13px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </CarouselItem>
              {/* <CarouselItem>
                <h2 className="text-2xl font-bold">Masuk Menggunakan OTP</h2>
                <div className="flex md:justify-center">
                  <OTPInput setValue={setOtpValue} />
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    onClick={async () => {
                      const values = form.getValues();
                      Mixpanel.track("Clicked Forgot Password", {
                        email: values.email,
                      });
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
                </DialogFooter>
              </CarouselItem> */}
            </CarouselContent>
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
}
