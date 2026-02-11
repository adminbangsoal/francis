import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetProfileDashboardQuery } from "@/redux/api/dashboardApi";
import { RootState, useAppSelector } from "@/redux/store";
import { Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AccountModal } from "./AccountModal";
import { LogoutButton } from "./LogoutButton";
import { ProfileCard } from "./ProfileCard";
// import { ReferralCode } from "./ReferralCode";
import { TargetPTN } from "./TargetPTN";

export const ProfileSettings = () => {
  const { profile } = useAppSelector((state: RootState) => state.user);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const { data } = useGetProfileDashboardQuery();

  return (
    <div className="hide-scrollbar h-max-screen flex flex-col gap-4 overflow-y-scroll">
      <div className="flex w-full flex-row items-center justify-between lg:hidden">
        <button
          className="flex flex-row items-center gap-2 text-gray-500"
          onClick={() => {
            setOpenMenu(true);
          }}
        >
          <Settings /> Settings
        </button>
        <LogoutButton />
      </div>
      <ProfileCard
        full_name={profile?.full_name ?? ""}
        highschool={profile?.highschool ?? ""}
        points={data?.data.point || 0}
      />
      {/* <ReferralCode referalCode={data?.data.referal_code ?? " "} /> */}
      <div className="h-0.5 w-full border border-slate-200 bg-gray-300" />
      <TargetPTN />
      <Link
        onClick={() => {
          // Mixpanel.identify(profile?.full_name as string);
          // Mixpanel.track("Clicked Hubungi Kami");
        }}
        href="https://wa.me/6282336666530?text=Haloo%20BangSoal!"
        target="_blank"
        className={cn(
          buttonVariants({
            variant: "bsPrimary",
          }),
        )}
      >
        Hubungi Kami
      </Link>
      {/* <FlashcardContainer /> */}
      <AccountModal open={openMenu} setOpen={setOpenMenu} />
    </div>
  );
};
