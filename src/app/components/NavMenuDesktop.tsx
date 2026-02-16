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
              href="/langganan"
              className={navigationMenuTriggerStyle()}
              // onClick={() => {
              //   Mixpanel.track("Clicked Langganan Page Navbar");
              // }}
            >
              Langganan
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
            <Link href="/coming-soon/tryout-akbar" className={navigationMenuTriggerStyle()}>
              Try out
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="/coming-soon/war-soal"
              className={navigationMenuTriggerStyle()}
              // onClick={() => {
              //   Mixpanel.track("Clicked BangCatatan Page Navbar");
              // }}
            >
              War Soal
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link
              href="/leaderboard"
              className={navigationMenuTriggerStyle()}
              // onClick={() => {
              //   Mixpanel.track("Clicked Leaderboard Page Navbar");
              // }}
            >
              Leaderboard
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="https://wa.me/6287808417027?text=Haloo%20Bang Admin!"
              className={navigationMenuTriggerStyle()}
              target="_blank"
              rel="noopener noreferrer"
              // onClick={() => {
              //   Mixpanel.track("Clicked hubungi kami navbar");
              // }}
            >
              Hubungi Kami
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
