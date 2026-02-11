"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetProfileDashboardQuery } from "@/redux/api/dashboardApi";
import {
  useGetTryoutRegistrationQuery,
  useRegisterTryoutMutation,
} from "@/redux/api/usersApi";
import dayjs from "dayjs";
import Link from "next/link";
import MediaQuery from "react-responsive";
import BerlanggananCard from "./components/BerlanggananCard";
import ChallengeCard from "./components/ChallengeCard";
import RegistrationSections from "./components/RegistrationSections";
import TryoutInfoCard from "./components/TryoutInfoCard";
import TryoutSubjectsCard from "./components/TryoutSubjectsCard";

const TRYOUTID = "89fcaa0f-80bd-4242-ab2c-33b2e6d265ed";

const TryoutPage = () => {
  const { data } = useGetTryoutRegistrationQuery({
    tryoutId: TRYOUTID,
  });
  const [mutate, { isLoading }] = useRegisterTryoutMutation();
  const { data: profileData } = useGetProfileDashboardQuery();
  const isAlreadySubscribed = dayjs().isBefore(
    dayjs(profileData?.data.validity.timestamp),
  );

  return (
    <section>
      <MediaQuery maxWidth={1024}>
        <div className="flex flex-col items-center px-5 pb-10">
          <div className="mb-10 flex flex-col items-center gap-y-3">
            <h1 className="text-center text-3xl font-600 text-white">
              Try Out
            </h1>
            <div className="h-[2px] w-36 bg-white bg-opacity-40"></div>
          </div>
          <TryoutInfoCard />
          <TryoutSubjectsCard />
          <RegistrationSections
            isAlreadyRegistered={data?.data?.created_at != undefined}
            isEligible={data?.data?.is_eligable}
            tryoutId={TRYOUTID}
          />
          {data?.data?.created_at && (
            <div className="mt-2 w-full max-w-xl py-1">
              {data.data.validated || data.data.is_eligable ? (
                <Link
                  href="/try-out"
                  className={cn(
                    buttonVariants({
                      variant: "bsPrimary",
                    }),
                    "my-5 w-full text-center text-sm font-600",
                  )}
                >
                  Mulai Sekarang!{" "}
                  <i className="i-ph-arrow-right-bold ml-1 mt-0.5 size-4" />
                </Link>
              ) : (
                <h2 className="my-5 flex w-full items-center gap-x-1 rounded-xl border-2 border-opacity-30 bg-white px-2 py-1 text-center text-sm font-600 text-gray-600">
                  <i className="i-ph-timer-bold size-4" /> Sedang proses
                  verifikasi dokumen
                </h2>
              )}
            </div>
          )}
        </div>
      </MediaQuery>
      <MediaQuery minWidth={1024}>
        <div className="mt-8 w-full max-w-2xl pb-5">
          <TryoutInfoCard />
          <div className="grid grid-flow-row grid-cols-2 grid-rows-2 gap-2">
            <div className="col-span-1 row-span-3">
              <TryoutSubjectsCard />
            </div>
            <div className="col-span-1 row-span-1">
              <BerlanggananCard />
            </div>
            <div className="col-span-1 row-span-2">
              {data?.data?.created_at ? (
                <div className="flex h-full items-center rounded-2xl bg-[#064E3B33]">
                  {data.data.validated || data.data.is_eligable ? (
                    <Link
                      href="/try-out"
                      className="my-5 flex h-full w-full items-center  justify-center rounded-xl border border-emerald-500 bg-emerald-400 text-center text-lg font-bold text-white duration-150 hover:bg-emerald-500"
                    >
                      Mulai Sekarang!
                    </Link>
                  ) : (
                    <h2 className="my-5 w-full text-center text-lg font-bold text-white">
                      <i className="i-ph-timer-bold size-4" /> Sedang proses
                      verifikasi dokumen
                    </h2>
                  )}
                </div>
              ) : isAlreadySubscribed ? (
                <div className=" flex h-full items-center ">
                  <Button
                    onClick={() => {
                      mutate({
                        tryoutId: TRYOUTID,
                      });
                    }}
                    loading={isLoading}
                    variant="bsPrimary"
                    className=" flex h-full w-full items-center gap-x-1 !rounded-sm after:rounded-sm hover:scale-100"
                  >
                    Daftar sekarang{" "}
                    <i className="i-ph-arrow-right-bold mt-0.5 size-5" />
                  </Button>
                </div>
              ) : (
                <ChallengeCard tryoutId={TRYOUTID} />
              )}
            </div>
          </div>
        </div>
      </MediaQuery>
    </section>
  );
};

export default TryoutPage;
