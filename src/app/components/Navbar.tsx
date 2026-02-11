"use client";

// components
import Logo from "@/components/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import NavMenuDesktop from "./NavMenuDesktop";
import NavMenuMobile from "./NavMenuMobile";

// libs
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// utils
import { cn } from "@/lib/utils";
import { logout } from "@/redux/features/userSlice";
import { RootState, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

export default function Nav() {
  const [atTop, setAtTop] = useState(true);

  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const path = usePathname();
  const isTryout = /^\/try-out/.test(path);

  if (path === "/latihan-soal" || isTryout || path === "/dashboard") {
    return (
      <nav
        className={cn(
          "sticky top-0 z-[12] h-16 items-center justify-end bg-surface-100/60 backdrop-blur-lg lg:px-20",
          isTryout ? "hidden lg:flex" : "flex",
        )}
      >
        <NavMenuDesktop />
        <NavMenuMobile />
      </nav>
    );
  } else {
    return (
      <nav
        className={cn(
          "fixed z-20 flex w-full items-center gap-3 transition-[height,padding,top] duration-700",
          atTop
            ? "top-0 h-16 px-5 sm:px-10 lg:h-20 lg:px-16"
            : "top-3 h-12 px-5 sm:px-10 lg:px-20",
        )}
      >
        <div
          className={cn(
            "flex h-full grow items-center justify-between rounded-full border bg-surface-100/60 backdrop-blur-lg transition-[border-color,padding] duration-700",
            atTop
              ? "border-surface-400/0 px-0 py-4"
              : "border-surface-400/50 px-5 py-1 sm:px-8",
          )}
        >
          <Link
            className="flex items-center gap-1 font-700 text-content-200"
            href="/"
          >
            <Logo className="size-8" />
            BangSoal
          </Link>
          <NavMenuDesktop />
          <div className="flex items-center gap-2 lg:hidden">
            <NavMenuMobile />
          </div>
        </div>
        {user.profile ? (
          <Button
            onClick={() => {
              // Mixpanel.track("Clicked Logout from Navbar");
              dispatch(logout());
            }}
            className={cn(
              buttonVariants({ variant: "bsPrimary" }),
              "hidden h-12 w-10 gap-1.5 p-0 sm:w-auto sm:px-5 lg:flex",
            )}
          >
            <p>Logout</p>
          </Button>
        ) : (
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "bsPrimary" }),
              "h-12 w-10 w-auto gap-1.5 px-5",
            )}
          >
            <p>Login</p>
          </Link>
        )}
      </nav>
    );
  }
}
