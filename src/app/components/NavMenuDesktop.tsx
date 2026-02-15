// components
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// libs
import Link from "next/link";
import { LatihanSoalNav } from "./LatihanSoalNav";

export default function NavMenuDesktop() {
  return (
    <div>
      <NavigationMenu className="hidden lg:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link
              // onClick={() => {
              //   Mixpanel.track("Clicked Langganan Page Navbar");
              // }}
              href="/langganan"
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Langganan
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Link href="/latihan-soal">Latihan soal</Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <LatihanSoalNav />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/coming-soon/tryout-akbar" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Try out
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              // onClick={() => {
              //   Mixpanel.track("Clicked BangCatatan Page Navbar");
              // }}
              href="/bang-catatan"
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                BangCatatan
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link
              // onClick={() => {
              //   Mixpanel.track("Clicked Leaderboard Page Navbar");
              // }}
              href="/leaderboard"
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Leaderboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              // onClick={() => {
              //   Mixpanel.track("Clicked hubungi kami navbar");
              // }}
              href="https://wa.me/6282336666530?text=Haloo%20BangSoal!"
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Hubungi Kami
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
