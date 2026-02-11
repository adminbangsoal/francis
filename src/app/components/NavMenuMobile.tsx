"use client";

// components
import Logo from "@/components/Logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// libs
import Link from "next/link";

// utils
import { cn } from "@/lib/utils";
import { useGetSubjectsQuery } from "@/redux/api/latihanSoalApi";

export default function NavMenuMobile() {
  const { data } = useGetSubjectsQuery();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="flex lg:hidden">
          <i className="i-ph-list-bold my-auto size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="top" className="block lg:hidden">
        <SheetHeader>
          <SheetTitle>
            <Link
              className="flex items-center gap-1 font-700 text-content-200"
              href="/"
            >
              <Logo className="size-8" />
              BangSoal
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-start pt-5">
          <Link
            href="/langganan"
            className={cn(buttonVariants({ variant: "link" }), "text-base")}
          >
            Langganan
          </Link>
          <Accordion type="single" collapsible className="w-full px-4">
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className="pb-2 pt-2">
                Latihan soal
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                {data?.data.map(({ slug, alternate_name }) => {
                  return (
                    <Link
                      key={slug}
                      href={`/latihan-soal/${slug}`}
                      className={cn(
                        buttonVariants({ variant: "link" }),
                        "text-base",
                      )}
                    >
                      {alternate_name}
                    </Link>
                  );
                })}

                <Link
                  href="/latihan-soal-timed"
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "text-base",
                  )}
                >
                  <i className="i-ph-timer-bold mr-1 size-5 lg:size-10" /> Mode
                  Berwaktu
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Link
            href="/try-out"
            className={cn(buttonVariants({ variant: "link" }), "text-base")}
          >
            Try out
          </Link>
          <Link
            href="/bang-catatan"
            className={cn(buttonVariants({ variant: "link" }), "text-base")}
          >
            BangCatatan
          </Link>
          <Link
            href="/leaderboard"
            className={cn(buttonVariants({ variant: "link" }), "text-base")}
          >
            Leaderboard
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
