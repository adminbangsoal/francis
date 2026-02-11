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
import { cn } from "@/lib/utils";
import {
  useGetProfileDashboardQuery,
  useUploadProfilePictureMutation,
} from "@/redux/api/dashboardApi";
import { useUpdateUserMutation } from "@/redux/api/usersApi";
import { updateProfile } from "@/redux/features/userSlice";
import { RootState, useAppSelector } from "@/redux/store";
import { User } from "@/types";
import { EditAccountFormSchema } from "@/types/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { PlanCardVariant } from "../style";

export const AccountDetails = () => {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const { data: profileData } = useGetProfileDashboardQuery();

  const { profile } = useAppSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof EditAccountFormSchema>>({
    resolver: zodResolver(EditAccountFormSchema),
    defaultValues: {
      full_name: profile?.full_name,
      highschool: profile?.highschool,
      phone_number: profile?.phone_number.replace("+62", "0"),
      profile_picture: profile?.profile_img,
    },
  });
  const { handleSubmit, setValue } = form;

  const onSubmitEdit = async (
    values: z.infer<typeof EditAccountFormSchema>,
  ) => {
    setIsEdit(false);
    await updateUser({
      full_name: values.full_name,
      highschool: values.highschool,
      phone_number: values.phone_number,
      profile_img: profilePicture as string,
    });
  };

  const ref = useRef<HTMLInputElement>(null);
  const [uploadProfilePicture, { isSuccess, data, isLoading }] =
    useUploadProfilePictureMutation();
  const [updateUser, { isSuccess: successUpdated, data: updatedUser }] =
    useUpdateUserMutation();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
      await uploadProfilePicture({ file: file });
    }
  };

  useEffect(() => {
    if (isSuccess && profilePicture) {
      setProfilePicture(data?.data.url as string);
      setValue("profile_picture", data?.data.url as string);
    }
  }, [isSuccess, profilePicture]);

  useEffect(() => {
    if (profileData) {
      setValue("full_name", profileData.data.name);
      setValue("highschool", profileData.data.highschool);
      setValue("phone_number", profile?.phone_number);
      setValue("profile_picture", profileData.data.profile_picture ?? "");
      setProfilePicture(profileData.data.profile_picture ?? "");
    }
  }, [profileData]);

  useEffect(() => {
    if (successUpdated) {
      dispatch(
        updateProfile({
          ...(profile as User),
          profile_img: updatedUser?.data?.profile_img as string,
          full_name: updatedUser?.data.full_name as string,
        }),
      );
    }
  }, [successUpdated]);

  return (
    <div className="flex max-h-[80vh] flex-col gap-3 overflow-y-scroll px-3 md:h-full lg:overflow-y-auto">
      <div>
        <div className={cn(isEdit ? "text-emerald-600" : "text-gray-600")}>
          {isEdit ? (
            <button
              disabled={isLoading}
              onClick={handleSubmit(onSubmitEdit)}
              className="flex w-full flex-row items-center justify-end gap-3"
            >
              <CheckIcon />
              <p> Save changes</p>
            </button>
          ) : (
            <button
              onClick={() => {
                setIsEdit(true);
              }}
              className="flex w-full flex-row items-center justify-end gap-3"
            >
              <i className="i-ph-pencil-simple h-5 w-5 shrink-0 text-gray-600" />
              <p>Edit profile</p>
            </button>
          )}
        </div>
      </div>
      <div className="flex grid-cols-3 flex-col gap-3 py-3 md:grid md:items-start">
        <div className="flex flex-col items-center">
          {/* image field */}
          <Image
            src={profilePicture ?? "/icons/User.svg"}
            width={160}
            height={160}
            alt="Thumbnail"
            className={cn(
              "h-44 w-44 shrink-0 rounded-full bg-slate-200 object-cover",
              !profilePicture && "p-6",
            )}
          />
          {isEdit && (
            <div className="mt-4 flex flex-row items-center justify-center divide-x divide-gray-300 md:col-span-1">
              <button
                className="text-nowrap px-2 font-bold text-blue-600"
                onClick={() => {
                  if (ref && "current" in ref) ref?.current?.click();
                }}
              >
                Edit
              </button>
              <button
                className="text-nowrap px-2 font-bold text-red-600"
                onClick={() => {
                  setProfilePicture(null);
                  if (ref && "current" in ref) (ref.current as any).value = "";
                }}
              >
                Remove
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={ref as React.MutableRefObject<HTMLInputElement>}
                onChange={handleImageChange}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 md:col-span-2">
          <div className="flex flex-col gap-4">
            <Form {...form}>
              <form className="flex w-full flex-col gap-5">
                <div className="mr-1 md:mr-2">
                  <FormField
                    disabled={!isEdit}
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <>
                          <FormLabel>Name</FormLabel>
                          <Input placeholder="Full Name" {...field} />
                        </>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    disabled
                    control={form.control}
                    name="highschool"
                    render={({ field }) => (
                      <FormItem>
                        <>
                          <FormLabel>SMA</FormLabel>
                          <Input placeholder="High School" {...field} />
                        </>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    disabled
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <>
                          <FormLabel>Nomor Handphone</FormLabel>
                          <Input placeholder="Nomor Handphone" {...field} />
                        </>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-lg font-bold">Paket BangSoalmu</p>
            <div
              className={cn(
                PlanCardVariant({ variant: "pemula" }),
                "w-full md:w-96",
              )}
            >
              {profileData?.data.subscription != null ? (
                <>
                  <div className="flex justify-between">
                    <h3 className="text-center text-xl font-500">
                      Pelajar {profileData?.data.subscription.subscription_type}
                    </h3>
                  </div>
                  <div
                    className={cn(
                      "rounded-full border border-gray-300 px-4 py-3",
                    )}
                  >
                    <p>berlaku s/d {profileData.data.validity.label}</p>
                  </div>
                </>
              ) : (
                <div>Tidak Ada Paket Berlangganan</div>
              )}
            </div>
            {!profileData?.data.subscription && (
              <>
                <p className="text-sm text-gray-700">
                  Upgrade akunmu untuk melihat pembahasan!{" "}
                </p>
                <div>
                  <Button
                    variant={"bsPrimary"}
                    onClick={() => {
                      // Mixpanel.identify(profile?.full_name as string);
                      // Mixpanel.track("Clicked Lihat paket berlangganan");
                      router.push("/langganan");
                    }}
                  >
                    Lihat Paket Berlangganan
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
