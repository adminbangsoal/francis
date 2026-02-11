import { buttonVariants } from "@/components/ui/button";
import { useWindowsBreakpoints } from "@/lib/hooks/useWindowBreakpoints";
import Image from "next/image";
import Link from "next/link";
const UpgradePremiumContainer = () => {
  const { isDesktopBreakpoint } = useWindowsBreakpoints();

  return (
    <div className="relative h-64 w-full">
      <Image
        alt="pembahasan placeholder"
        src="/pembahasan-placeholder.png"
        objectFit="contain"
        fill={true}
      />
      <div className="flex h-full w-full items-center justify-center">
        <Link
          // onClick={() => {
          //   Mixpanel.track("Clicked Upgrade to see pembahasan");
          // }}
          href="/langganan"
          className={buttonVariants({
            variant: "bsPrimary",
            size: isDesktopBreakpoint ? "lg" : "sm",
          })}
        >
          Upgrade untuk melihat pembahasan!
        </Link>
      </div>
    </div>
  );
};

export default UpgradePremiumContainer;
