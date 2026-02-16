"use client";
import Iconify from "@/components/Iconify";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  useCreatePaymentMutation,
  useLazyCheckReferralCodeQuery,
} from "@/redux/api/paymentApi";
import { SubcscriptionType } from "@/types/payment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PRICELIST } from "../data/price";

const ChooseButton = ({
  choosenType,
}: {
  choosenType: SubcscriptionType;
  setToken: (value: string) => void;
}) => {
  const router = useRouter();

  const [createPayment, { data, isSuccess, isLoading }] =
    useCreatePaymentMutation();

  const [referralCode, setReferralCode] = useState<string>("");
  const [isReferralError, setIsReferralError] = useState<boolean>(false);

  const [
    checkReferral,
    { isError, data: referralData, isFetching: isReferralFetching },
  ] = useLazyCheckReferralCodeQuery();

  const form = useForm<{
    referralCode: string;
  }>();

  const { handleSubmit, reset } = form;

  const onSubmit = handleSubmit(async (data) => {
    const { isError, data: referralData } = await checkReferral({
      code: data.referralCode,
    });
    setIsReferralError(isError);
    if (!isError) {
      setReferralCode(data.referralCode);
    }
  });

  useEffect(() => {
    if (isSuccess) {
      (window as any).snap.pay(data?.data.token, {
        onSuccess: function (result: any) {
          toast.success("Pembayaran berhasil!");
          router.push("/dashboard");
        },
      });
    }
  }, [data, isSuccess]);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Button
        loading={isLoading}
        id="pay-button"
        onClick={() => {
          // Mixpanel.track("Create Payment", { subscription_type: choosenType });
          createPayment({
            subscription_type: choosenType,
          });
        }}
        className={cn(
          buttonVariants({ variant: "bsPrimary" }),
          "w-full max-w-screen-md",
        )}
      >
        Pilih
      </Button>
      {/* Referral code section - hidden from UI but logic remains intact */}
      <div className="hidden">
        <div className="relative my-4 flex h-10 w-full max-w-screen-md items-center justify-center px-10">
          <div className="h-[1px] w-full max-w-screen-md bg-gray-300"></div>
          <p className="absolute bg-white px-2 text-sm font-500 text-gray-500">
            atau
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <div className="w-full max-w-md rounded-lg bg-gray-200 px-4 py-3 md:px-8 md:py-6">
              <span className="flex items-center">
                <i className="i-ph-gift-bold h-[20px] w-[20px]" />
                <p className="pl-2 text-base font-bold">Punya referral?</p>
              </span>
              <div className="pt-4 font-600">
                <p className="text-sm text-gray-600 sm:text-base">
                  Kamu bisa dapatkan potongan layanan BangSoal dengan menggunakan
                  kode referral partner BangSoal!
                </p>
              </div>
              {referralData?.data && referralData?.data.discount != 0 && (
                <DiscountedPrice
                  firstPrice={PRICELIST[choosenType].total}
                  secondPrice={
                    PRICELIST[choosenType].total - referralData.data.discount
                  }
                />
              )}
              {!referralData || referralData.data.discount == 0 ? (
                <div>
                  <div className="mt-5 flex h-[40px] gap-2">
                    <FormField
                      control={form.control}
                      name="referralCode"
                      render={({ field }) => {
                        return (
                          <Input
                            placeholder="Kode Referral"
                            className={cn(
                              isReferralError &&
                                "h-[40px] !border-2 border-solid !border-rose-700 focus-visible:ring-0 focus-visible:ring-offset-0",
                            )}
                            {...field}
                          />
                        );
                      }}
                    />
                    <Button
                      type="submit"
                      variant="bsPrimary"
                      className="flex h-[40px] w-[40px] items-center justify-center rounded-full"
                    >
                      <i className="i-ph-arrow-right h-[20px] w-[20px]" />
                    </Button>
                  </div>
                  {referralData &&
                    referralData.data.discount == 0 &&
                    !isError &&
                    !isReferralFetching && (
                      <div className="mt-4 flex items-center rounded-lg border border-rose-700 bg-rose-100 py-1 pl-3 text-sm text-rose-600">
                        <i className="i-ph-exclamation-mark mr-2 " />
                        Kode referral sudah pernah digunakan.
                      </div>
                    )}
                </div>
              ) : (
                <Button
                  variant="bsPrimary"
                  type="button"
                  className="mt-6 w-full"
                  onClick={() => {
                    createPayment({
                      subscription_type: choosenType,
                      referal_code: referralCode,
                    });
                  }}
                >
                  Gunakan
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

const DiscountedPrice = ({
  firstPrice,
  secondPrice,
}: {
  firstPrice: number;
  secondPrice: number;
}) => {
  return (
    <div>
      <div className="flex items-center pt-5">
        <span className="flex items-end text-gray-500">
          <h5 className="hidden sm:block">Rp</h5>
          <h4 className="text-3xl font-semibold line-through sm:!-ml-2">
            {Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            })
              .format(firstPrice)
              .substring(2)}
          </h4>
        </span>
        <Iconify
          icon="material-symbols:chevron-right-rounded"
          className="h-[16px] w-[16px] text-gray-400 md:h-[36px] md:w-[36px]"
        />
        <span className="flex items-end">
          <h5 className="hidden sm:block">Rp</h5>
          <h4 className="text-3xl font-semibold sm:!-ml-2">
            {Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            })
              .format(secondPrice)
              .substring(2)}
          </h4>
        </span>
      </div>
      <div className="mt-4 flex w-fit items-center rounded-lg border border-green-700 bg-green-100 px-3 py-1 pl-3 text-xs text-green-600 sm:text-sm">
        <i className="i-ph-info mr-2 " />
        Kode referral hanya dapat digunakan satu kali.
      </div>
    </div>
  );
};

export default ChooseButton;
