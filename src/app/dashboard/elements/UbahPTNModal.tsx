"use client";
import { PTNChoices } from "@/app/(authentication)/login/interface";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Modal, ModalI } from "@/components/ui/modal";
import SearchableDropdown from "@/components/ui/searchable-dropdown";
import { useGetAllPTNQuery } from "@/redux/api/ptnApi";
import { useUpdateUserMutation } from "@/redux/api/usersApi";
import { updateProfile } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { PTN } from "@/types";
import { UpdatePTNFormSchema } from "@/types/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DismissibleBox } from "../latihan-soal/DismissibleBox";

export const UbahPTNModal = ({ open, setOpen }: ModalI) => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.user);

  const defaultValues = {
    choosen_university_one: profile?.choosen_university_one ?? "",
    choosen_major_one: profile?.choosen_major_one ?? "",
    choosen_university_two: profile?.choosen_university_two ?? "",
    choosen_major_two: profile?.choosen_major_two ?? "",
    choosen_university_three: profile?.choosen_university_three ?? "",
    choosen_major_three: profile?.choosen_major_three ?? "",
  };
  const form = useForm<z.infer<typeof UpdatePTNFormSchema>>({
    resolver: zodResolver(UpdatePTNFormSchema),
    defaultValues,
  });
  const { setValue, watch, getValues, handleSubmit, trigger, reset } = form;
  const { data: ptnData } = useGetAllPTNQuery();
  const [updateProfilePTN, { data: updatedUser, isLoading, isSuccess }] =
    useUpdateUserMutation();

  const ptnList: PTN[] = ptnData?.data ?? [];
  const ptnOptions = ptnList?.map(({ name }) => name) ?? [];
  const uniOne = watch("choosen_university_one");
  const uniTwo = watch("choosen_university_two");
  const uniThree = watch("choosen_university_three");
  const majorOne = watch("choosen_major_one");
  const majorTwo = watch("choosen_major_two");

  const [selectedPTN, setSelectedPTN] = useState<PTNChoices>({
    one: null,
    two: null,
    three: null,
  });
  const getDefaultStep = () => {
    if (defaultValues.choosen_university_three) {
      return 3;
    } else if (defaultValues.choosen_university_two) {
      return 2;
    } else {
      return 1;
    }
  };

  const [step, setStep] = useState<number>(getDefaultStep());

  // Update selectedPTN when university values change
  useEffect(() => {
    if (ptnList && ptnList.length > 0) {
      setSelectedPTN({
        one: uniOne ? ptnList.find(({ name }) => name === uniOne) ?? null : null,
        two: uniTwo ? ptnList.find(({ name }) => name === uniTwo) ?? null : null,
        three: uniThree ? ptnList.find(({ name }) => name === uniThree) ?? null : null,
      });
    }
  }, [uniOne, uniTwo, uniThree, ptnList]);

  // Clear major fields when university is cleared
  useEffect(() => {
    if (!uniOne || !majorOne) {
      setValue("choosen_major_one", "");
    }
  }, [uniOne, majorOne, setValue]);

  useEffect(() => {
    if (!uniTwo || !majorTwo) {
      setValue("choosen_major_two", "");
    }
  }, [uniTwo, majorTwo, setValue]);

  useEffect(() => {
    if (!uniThree) {
      setValue("choosen_major_three", "");
    }
  }, [uniThree, setValue]);

  useEffect(() => {
    if (isSuccess && updatedUser) {
      dispatch(updateProfile(updatedUser.data));
      setOpen(false);
    }
  }, [isSuccess, updatedUser]);

  const onSubmit = async (data: z.infer<typeof UpdatePTNFormSchema>) => {
    await updateProfilePTN(data);
  };
  return (
    <Modal open={open} setOpen={setOpen} onClose={() => reset()}>
      <div>
        <div className="flex flex-row items-center gap-1 py-2 lg:gap-2">
          <Image
            src={"/icons/Target.svg"}
            alt="target"
            width={40}
            height={40}
          />
          <p className="text-2xl font-bold"> Ubah Target PTN</p>
        </div>
        <DismissibleBox
          text="Untuk meningkatkan akurasi, kamu boleh sesuaikan dengan pilihanmu di SNBT, ya!"
          stateless
        />
        <Form {...form}>
          <form className="hide-scrollbar flex max-h-[70vh] w-full flex-col gap-2 overflow-y-scroll py-8 md:px-4 lg:max-h-full">
            <p className="flex flex-row text-gray-400">
              Pilihan Pertama{" "}
              <span className="ml-1 -translate-y-1 text-red-500 dark:text-red-900">
                *
              </span>
            </p>
            <div className="flex flex-col gap-4 lg:flex-row">
              <FormField
                control={form.control}
                name="choosen_university_one"
                render={({ field, fieldState }) => {
                  return (
                    <FormItem className="w-full lg:w-1/2">
                      <>
                        <FormLabel>Apa target PTN kamu?</FormLabel>
                        <SearchableDropdown
                          {...field}
                          triggerValidation={trigger}
                          setValue={setValue}
                          onValueChange={() => {
                            setValue("choosen_major_one", "");
                          }}
                          options={ptnOptions}
                          defaultValue={defaultValues?.choosen_university_one}
                          placeholder="Pilih PTN"
                          error={fieldState.error}
                        />
                      </>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="choosen_major_one"
                render={({ field, fieldState }) => {
                  return (
                    <FormItem className="w-full lg:w-1/2">
                      <>
                        <FormLabel>Apa jurusan impian kamu?</FormLabel>
                        <SearchableDropdown
                          {...field}
                          triggerValidation={trigger}
                          setValue={setValue}
                          options={selectedPTN.one?.prodi ?? []}
                          defaultValue={defaultValues?.choosen_major_one}
                          placeholder="Pilih Prodi"
                          error={fieldState.error}
                          disabled={!uniOne}
                        />
                      </>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            {(step >= 2 || (majorOne && uniTwo)) && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-1 lg:gap-2">
                  <p className="text-gray-400">Pilihan Kedua</p>
                  <Button
                    size={"sm"}
                    onClick={(e) => {
                      e.stopPropagation();
                      setStep(1);
                      setValue("choosen_university_two", "");
                      setValue("choosen_university_three", "");
                      setValue("choosen_major_two", "");
                      setValue("choosen_major_three", "");
                    }}
                    variant={"danger"}
                  >
                    Hapus
                  </Button>
                </div>
                <div className="flex flex-col gap-4 lg:flex-row">
                  <FormField
                    control={form.control}
                    name="choosen_university_two"
                    render={({ field, fieldState }) => {
                      return (
                        <FormItem className="w-full lg:w-1/2">
                          <>
                            <FormLabel>Apa target PTN kamu?</FormLabel>
                            <SearchableDropdown
                              {...field}
                              triggerValidation={trigger}
                              setValue={setValue}
                              onValueChange={() => {
                                setValue("choosen_major_two", "");
                              }}
                              options={ptnOptions}
                              defaultValue={
                                defaultValues?.choosen_university_two
                              }
                              placeholder="Pilih PTN"
                              error={fieldState.error}
                            />
                          </>

                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="choosen_major_two"
                    render={({ field, fieldState }) => {
                      return (
                        <FormItem className="w-full lg:w-1/2">
                          <>
                            <FormLabel>Apa jurusan impian kamu?</FormLabel>
                            <SearchableDropdown
                              {...field}
                              triggerValidation={trigger}
                              setValue={setValue}
                              options={selectedPTN.two?.prodi ?? []}
                              defaultValue={defaultValues?.choosen_major_two}
                              placeholder="Pilih Prodi"
                              error={fieldState.error}
                            />
                          </>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>
            )}

            {(step >= 3 || (majorTwo && uniThree)) && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-1 lg:gap-2">
                  <p className="text-gray-400">Pilihan Ketiga</p>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation;
                      setStep(2);
                      setValue("choosen_university_three", "");
                      setValue("choosen_major_three", "");
                    }}
                    variant={"danger"}
                    size={"sm"}
                  >
                    Hapus
                  </Button>
                </div>
                <div className="flex flex-col gap-4 lg:flex-row">
                  <FormField
                    control={form.control}
                    name="choosen_university_three"
                    render={({ field, fieldState }) => {
                      return (
                        <FormItem className="w-full lg:w-1/2">
                          <>
                            <FormLabel>Apa target PTN kamu?</FormLabel>
                            <SearchableDropdown
                              {...field}
                              triggerValidation={trigger}
                              setValue={setValue}
                              onValueChange={() => {
                                setValue("choosen_major_three", "");
                              }}
                              options={ptnOptions}
                              defaultValue={
                                defaultValues?.choosen_university_three
                              }
                              placeholder="Pilih PTN"
                              error={fieldState.error}
                            />
                          </>

                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="choosen_major_three"
                    render={({ field, fieldState }) => {
                      return (
                        <FormItem className="w-full lg:w-1/2">
                          <>
                            <FormLabel>Apa jurusan impian kamu?</FormLabel>
                            <SearchableDropdown
                              {...field}
                              triggerValidation={trigger}
                              setValue={setValue}
                              options={selectedPTN.three?.prodi ?? []}
                              defaultValue={defaultValues?.choosen_major_three}
                              placeholder="Pilih Prodi"
                              error={fieldState.error}
                            />
                          </>

                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>
            )}
            <div className="flex flex-row justify-end pt-4">
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setStep(step + 1);
                }}
                disabled={step == 3}
                variant={"bsGrayLight"}
              >
                <p>Tambahkan pilihan</p>
                <i className="i-ph-plus size-5" />
              </Button>
            </div>
            <div className="mb-4 flex flex-row justify-end gap-4 pt-8">
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  reset();
                }}
                disabled={isLoading}
                variant={"danger"}
              >
                Batalkan
              </Button>
              <Button
                onClick={handleSubmit(onSubmit)}
                variant={"bsPrimary"}
                loading={isLoading}
              >
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
