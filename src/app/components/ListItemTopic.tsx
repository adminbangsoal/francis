import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";

export default function ListItemTopic({
  title,
  icon,
  slug,
}: Readonly<{
  title: string;
  icon: string;
  slug: string;
}>) {
  return (
    <li>
      <Link href={`latihan-soal/${slug}`}>
        <NavigationMenuLink asChild>
          <div className="group relative flex h-full w-full select-none items-center justify-start overflow-hidden rounded-md px-6 py-3 no-underline shadow-none outline-none transition-[transform,box-shadow] duration-500 ease-out-back before:absolute before:inset-0 before:bg-gradient-to-br before:from-emerald-300 before:to-emerald-600 before:opacity-0 before:transition-[opacity] hover:-rotate-3 hover:scale-105 hover:shadow-xl before:hover:opacity-100 focus:shadow-md">
            <Image
              src={icon}
              alt={`${title} nav link icon`}
              width={512}
              height={512}
              className="absolute -right-4 size-20 text-surface-400 mix-blend-multiply"
            />
            <p className="z-10 font-600 transition-colors group-hover:text-white">
              {title}
            </p>
          </div>
        </NavigationMenuLink>
      </Link>
    </li>
  );
}
