"use client";

import { useWindowsBreakpoints } from "@/lib/hooks/useWindowBreakpoints";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import { QueryParams } from "@/types";
import * as Tabs from "@radix-ui/react-tabs";
import { useRouter } from "next/navigation";
import Nav from "../components/Navbar";
import withAuth from "../components/withAuth";
import { ProfileSettings } from "./elements/ProfileSettings";
import RiwayatSection from "./elements/RiwayatSections";
import { Catatanmu } from "./latihan-soal/Catatanmu";
import { LatihanSoalSettings } from "./latihan-soal/LatihanSoalSettings";
import { tabsTriggerStyle } from "./style";

const DashboardContent = ({ searchParams }: { searchParams: QueryParams }) => {
  const user = useAppSelector((state) => state.user);
  const { isDesktopBreakpoint } = useWindowsBreakpoints();
  const router = useRouter();

  return (
    <>
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
            <Tabs.Trigger
              className={cn(tabsTriggerStyle)}
              value="try-out"
              onClick={() => router.push("/coming-soon/tryout-akbar")}
            >
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
          <Tabs.Content value="riwayat">
            <RiwayatSection />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
};

export default withAuth(DashboardContent);
