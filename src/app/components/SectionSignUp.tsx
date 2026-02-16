"use client";

import { RootState, useAppSelector } from "@/redux/store";

// components
import { Button } from "@/components/ui/button";

// libs
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const user = useAppSelector((state: RootState) => state.user);

  if (!!user.profile) {
    return <></>; // hide if user is logged in
  }

  return (
    <section className="flex flex-col items-center -space-y-16 px-5 py-20 sm:-space-y-28 sm:px-10 lg:flex-row lg:-space-x-16 lg:space-y-0 lg:px-20">
      <div className="flex w-full flex-col drop-shadow-2xl lg:w-auto lg:flex-1 lg:flex-row">
        <div className="px:10 flex flex-col justify-center gap-5 rounded-t-3xl bg-surface-100 px-10 py-8 lg:grow lg:rounded-l-3xl lg:rounded-r-none lg:pl-20 lg:pr-0">
          <h1 className="text-center text-4xl font-600 text-content-100 lg:text-left">
            Tunggu apa lagi?
          </h1>
          <p className="text-balance text-center text-lg font-500 text-content-300 lg:text-left">
            Jamin kesuksesanmu dan masuki PTN impian bersama BangSoal!
          </p>
        </div>
        <Image
          src="/slant-left.svg"
          alt="Slant left"
          width={120}
          height={400}
          className="hidden lg:block"
        />
        <Image
          src="/slant-top.svg"
          alt="Slant top"
          width={400}
          height={120}
          className="w-full lg:hidden"
        />
      </div>
      <div className="flex w-full flex-col lg:w-auto lg:flex-1 lg:flex-row">
        <Image
          src="/slant-right.svg"
          alt="Slant right"
          width={120}
          height={400}
          className="hidden lg:block"
        />
        <Image
          src="/slant-bottom.svg"
          alt="Slant bottom"
          width={400}
          height={120}
          className="w-full lg:hidden"
        />
        <div className="flex grow flex-col justify-center gap-5 rounded-b-3xl bg-emerald-300 px-10 py-8 lg:rounded-l-none lg:rounded-r-3xl lg:pl-0 lg:pr-20">
          <Button
            onClick={() => router.push("/login")}
            className="rounded-full bg-white !font-600 text-emerald-700 hover:bg-emerald-100"
          >
            Gabung sekarang!
          </Button>
        </div>
      </div>
    </section>
  );
}
