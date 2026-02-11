"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { useGetAllPTNQuery } from "@/redux/api/ptnApi";
import { useOnboardingMutation } from "@/redux/api/usersApi";
import { onboardingFormSchema } from "@/types/schema/auth";
import { useState } from "react";

import withAuth from "@/app/components/withAuth";
import SearchableDropdown from "@/components/ui/searchable-dropdown";
import { updateProfile } from "@/redux/features/userSlice";
import { useAppSelector } from "@/redux/store";
import { PTN } from "@/types";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { PTNChoices } from "../login/interface";

const Onboarding = () => {
  const user = useAppSelector((state) => state.user);

  const form = useForm<z.infer<typeof onboardingFormSchema>>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      full_name: "",
      highschool: "",
      highschool_year: "",
      email: user.profile?.email as string,
      referral_code: "",
      source: "",
      choosen_university_one: "",
      choosen_major_one: "",
      choosen_university_two: "",
      choosen_major_two: "",
      choosen_university_three: "",
      choosen_major_three: "",
      phone_number: "",
    },
  });

  const {
    setValue,
    watch,
    getValues,
    handleSubmit,
    trigger,
    formState: { errors },
  } = form;
  const { data: ptnData } = useGetAllPTNQuery();
  const dispatch = useDispatch();

  const ptnList: PTN[] = ptnData?.data ?? [];
  const ptnOptions = ptnList?.map(({ name }) => name) ?? [];
  const uniOne = watch("choosen_university_one");
  const uniTwo = watch("choosen_university_two");
  const uniThree = watch("choosen_university_three");
  const majorOne = watch("choosen_major_one");
  const majorTwo = watch("choosen_major_two");

  const ptnValues = getValues([
    "choosen_university_one",
    "choosen_university_two",
    "choosen_university_three",
  ]);

  const [selectedPTN, setSelectedPTN] = useState<PTNChoices>({
    one: null,
    two: null,
    three: null,
  });

  useEffect(() => {
    if (ptnList) {
      setSelectedPTN({
        one: ptnList.find(({ name }) => name == ptnValues[0]) ?? null,
        two: ptnList.find(({ name }) => name == ptnValues[1]) ?? null,
        three: ptnList.find(({ name }) => name == ptnValues[2]) ?? null,
      });
    }
    if (!uniOne || !majorOne) {
      setValue("choosen_major_one", "");
      setValue("choosen_university_two", "");
      setValue("choosen_university_three", "");
    }
    if (!uniTwo || !majorTwo) {
      setValue("choosen_major_two", "");
      setValue("choosen_university_three", "");
    }
    if (!uniThree) {
      setValue("choosen_major_three", "");
    }
  }, [uniOne, uniTwo, uniThree, majorOne, majorTwo]);

  const [onboard, { isSuccess, isLoading, data }] = useOnboardingMutation();

  const onSubmit = async (data: z.infer<typeof onboardingFormSchema>) => {
    data.phone_number = `+62${data.phone_number.slice(1)}`;
    await onboard(data);
  };

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(updateProfile(data.data));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (user.profile?.onboard_date) redirect("/dashboard");
  }, [user.profile?.onboard_date]);

  return (
    <div className="mx-0 flex h-full items-center justify-center gap-10 pt-10 lg:mx-16">
      <div className="-mb-16 overflow-hidden rounded-2xl bg-emerald-300 p-4 shadow-lg">
        <div className="w-full rounded-2xl bg-white">
          <div className="relative z-10 flex flex-col items-center justify-center px-4 py-4 md:px-10">
            <p className="relative z-10 mt-6 text-center text-2xl font-bold md:mx-20 md:mt-12 md:text-3xl">
              Mulai perjalanan UTBK kamu bersama BangSoal!
            </p>
            <div className="absolute inset-x-0 top-[6%] h-24 w-full rounded-[50%] bg-gradient-to-b from-transparent to-white shadow-[0_6px_10px_-5px_rgba(0,0,0,0.2)] md:top-[8%]" />

            <Form {...form}>
              <form className="hide-scrollbar mt-10 flex h-[70vh] w-full flex-col gap-3 overflow-scroll py-8 md:px-4">
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <>
                          <FormLabel required>Nama Lengkap</FormLabel>
                          <Input placeholder="Nama Lengkap" {...field} />
                        </>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <>
                          <FormLabel required>Nomor Whatsapp</FormLabel>
                          <Input placeholder="08119950216" {...field} />
                        </>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="highschool"
                    render={({ field }) => (
                      <FormItem>
                        <>
                          <FormLabel required>Asal SMA</FormLabel>
                          <Input placeholder="SMAN 3 Jakarta" {...field} />
                        </>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="highschool_year"
                    render={({ field }) => (
                      <FormItem>
                        <>
                          <FormLabel required>Tahun Kelulusan</FormLabel>
                          <Input placeholder="2024" {...field} />
                        </>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <>
                          <FormLabel required>Email</FormLabel>
                          <Input
                            disabled
                            placeholder="bangsoal@gmail.com"
                            {...field}
                            value={getCookie("email")}
                          />
                        </>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem>
                        <>
                          <FormLabel required>
                            Dengar BangSoal dari mana?
                          </FormLabel>
                          <Input
                            placeholder="Website, Social Media, etc"
                            {...field}
                          />
                        </>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="choosen_university_one"
                    render={({ field, fieldState }) => {
                      return (
                        <FormItem>
                          <>
                            <FormLabel required>
                              Pilihan PTN{" "}
                              <span className="text-xs text-gray-400">
                                &#40;Pilihan Utama&#41;
                              </span>
                            </FormLabel>
                            <SearchableDropdown
                              {...field}
                              triggerValidation={trigger}
                              setValue={setValue}
                              options={ptnOptions}
                              placeholder="Pilih PTN"
                              error={fieldState.error}
                            />
                          </>

                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  {ptnValues[0] && (
                    <FormField
                      control={form.control}
                      name="choosen_major_one"
                      render={({ field, fieldState }) => {
                        return (
                          <FormItem>
                            <>
                              <FormLabel required>
                                Pilihan Prodi{" "}
                                <span className="text-xs text-gray-400">
                                  &#40;Pilihan Utama&#41;
                                </span>
                              </FormLabel>
                              <SearchableDropdown
                                {...field}
                                triggerValidation={trigger}
                                setValue={setValue}
                                options={selectedPTN.one?.prodi ?? []}
                                placeholder="Pilih Prodi"
                                error={fieldState.error}
                              />
                            </>

                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  )}

                  {majorOne && (
                    <FormField
                      control={form.control}
                      name="choosen_university_two"
                      render={({ field, fieldState }) => {
                        return (
                          <FormItem>
                            <>
                              <FormLabel>
                                Pilihan PTN{" "}
                                <span className="text-xs text-gray-400">
                                  &#40;Pilihan Kedua&#41;
                                </span>
                              </FormLabel>
                              <SearchableDropdown
                                {...field}
                                triggerValidation={trigger}
                                setValue={setValue}
                                options={ptnOptions}
                                placeholder="Pilih PTN"
                                error={fieldState.error}
                              />
                            </>

                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  )}

                  {majorOne && ptnValues[1] && (
                    <FormField
                      control={form.control}
                      name="choosen_major_two"
                      render={({ field, fieldState }) => {
                        return (
                          <FormItem>
                            <>
                              <FormLabel>
                                Pilihan Prodi{" "}
                                <span className="text-xs text-gray-400">
                                  &#40;Pilihan Kedua&#41;
                                </span>
                              </FormLabel>
                              <SearchableDropdown
                                {...field}
                                triggerValidation={trigger}
                                setValue={setValue}
                                options={selectedPTN.two?.prodi ?? []}
                                placeholder="Pilih Prodi"
                                error={fieldState.error}
                              />
                            </>

                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  )}

                  {majorTwo && (
                    <FormField
                      control={form.control}
                      name="choosen_university_three"
                      render={({ field, fieldState }) => {
                        return (
                          <FormItem>
                            <>
                              <FormLabel>
                                Pilihan PTN{" "}
                                <span className="text-xs text-gray-400">
                                  &#40;Pilihan Ketiga&#41;
                                </span>
                              </FormLabel>
                              <SearchableDropdown
                                {...field}
                                triggerValidation={trigger}
                                setValue={setValue}
                                options={ptnOptions}
                                placeholder="Pilih PTN"
                                error={fieldState.error}
                              />
                            </>

                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  )}

                  {majorTwo && ptnValues[2] && (
                    <FormField
                      control={form.control}
                      name="choosen_major_three"
                      render={({ field, fieldState }) => {
                        return (
                          <FormItem>
                            <>
                              <FormLabel>
                                Pilihan Prodi{" "}
                                <span className="text-xs text-gray-400">
                                  &#40;Pilihan Ketiga&#41;
                                </span>
                              </FormLabel>
                              <SearchableDropdown
                                {...field}
                                triggerValidation={trigger}
                                setValue={setValue}
                                options={selectedPTN.three?.prodi ?? []}
                                placeholder="Pilih Prodi"
                                error={fieldState.error}
                              />
                            </>

                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  )}
                </div>
                <div className="mb-4 flex flex-row justify-end pt-8">
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    variant={"bsPrimary"}
                    className="w-40 items-end"
                    loading={isLoading}
                  >
                    Kirim
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Onboarding);
