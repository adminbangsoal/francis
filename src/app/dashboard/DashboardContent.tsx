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
import { useWindowsBreakpoints } from "@/lib/hooks/useWindowBreakpoints";
import { cn } from "@/lib/utils";
import { useOnboardPasswordMutation } from "@/redux/api/authApi";
import { useGetProfileDashboardQuery } from "@/redux/api/dashboardApi";
import { useAppSelector } from "@/redux/store";
import { QueryParams } from "@/types";
import { OnboardPasswordFormSchema } from "@/types/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Tabs from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Nav from "../components/Navbar";
import withAuth from "../components/withAuth";
import { ProfileSettings } from "./elements/ProfileSettings";
import RiwayatSection from "./elements/RiwayatSections";
import TryoutHistorySection from "./elements/TryoutHistory/TryoutHistorySection";
import { Catatanmu } from "./latihan-soal/Catatanmu";
import { LatihanSoalSettings } from "./latihan-soal/LatihanSoalSettings";
import { tabsTriggerStyle } from "./style";

const DashboardContent = ({ searchParams }: { searchParams: QueryParams }) => {
  const user = useAppSelector((state) => state.user);
  const { isDesktopBreakpoint } = useWindowsBreakpoints();
  const { data, isSuccess } = useGetProfileDashboardQuery();

  const form = useForm<z.infer<typeof OnboardPasswordFormSchema>>({
    resolver: zodResolver(OnboardPasswordFormSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;
  const [changePasswordModal, setChangePasswordModal] =
    useState<boolean>(false);

  const [onboardPassword, { isSuccess: successOnboardPassword }] =
    useOnboardPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      if (!data?.data?.password) {
        setChangePasswordModal(true);
      }
    }
  }, [isSuccess]);

  const onSubmitForm = async (
    value: z.infer<typeof OnboardPasswordFormSchema>,
  ) => {
    await onboardPassword({
      password: value.password,
      phone_number: data?.data.phone_number as string,
    });
  };

  useEffect(() => {
    if (successOnboardPassword) {
      setChangePasswordModal(false);
    }
  }, [successOnboardPassword]);

  return (
    <>
      <Modal
        open={changePasswordModal}
        setOpen={setChangePasswordModal}
        permanent
      >
        <Form {...form}>
          <FormLabel>Email</FormLabel>
          <Input
            disabled
            type="email"
            placeholder="Email"
            value={user.profile?.email}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <>
                  <FormLabel>Password Baru</FormLabel>
                  <Input type="password" placeholder="Password" {...field} />
                </>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <>
                  <FormLabel>Konfirmasi Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Konfirmasi password"
                    {...field}
                  />
                </>

                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
        <Button
          onClick={handleSubmit(onSubmitForm)}
          variant={"bsPrimary"}
          // loading={isOTPLoading || isLoginLoading}
          className="mb-2 mt-4"
        >
          Buat Password
        </Button>
      </Modal>
      <div className="px-4">
        <Tabs.Root
          onValueChange={(value) => {
            // Mixpanel.identify(user.profile?.full_name as string);
            // Mixpanel.track("Tab Changed", {
            //   value: value,
            // });
          }}
          defaultValue="latihan-soal"
          className="relative"
        >
          <Nav />
          <Tabs.List className="hide-scrollbar sticky top-0 z-[11] flex h-16 flex-row gap-4 overflow-x-scroll bg-white py-3 shadow-sm lg:top-16 lg:pt-0">
            {!isDesktopBreakpoint && (
              <Tabs.Trigger className={cn(tabsTriggerStyle)} value="profile">
                Profile
              </Tabs.Trigger>
            )}

            <Tabs.Trigger className={cn(tabsTriggerStyle)} value="latihan-soal">
              Latihan Soal
            </Tabs.Trigger>
            <Tabs.Trigger className={cn(tabsTriggerStyle)} value="catatan">
              Catatanmu
            </Tabs.Trigger>
            <Tabs.Trigger className={cn(tabsTriggerStyle)} value="try-out">
              Try Out
            </Tabs.Trigger>
            <Tabs.Trigger className={cn(tabsTriggerStyle)} value="riwayat">
              Riwayat
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="profile">
            <ProfileSettings />
          </Tabs.Content>
          <Tabs.Content value="catatan">
            <Catatanmu {...searchParams} />
          </Tabs.Content>
          <Tabs.Content value="latihan-soal">
            <LatihanSoalSettings />
          </Tabs.Content>
          <Tabs.Content value="try-out">
            <TryoutHistorySection />
          </Tabs.Content>
          <Tabs.Content value="riwayat">
            <RiwayatSection />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
};

export default withAuth(DashboardContent);
