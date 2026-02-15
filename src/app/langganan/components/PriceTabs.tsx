"use client";

import Logo from "@/components/Logo";
import MeshGradient from "@/components/MeshGradient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubcscriptionType } from "@/types/payment";

export default function PriceTab({
  setChoosenType,
}: {
  choosenType: string;
  setChoosenType: (value: SubcscriptionType) => void;
}) {
  return (
    <Tabs
      onValueChange={(value) => {
        // Mixpanel.track("Clicked subscription_type", { type: value });
        setChoosenType(value as SubcscriptionType);
      }}
      defaultValue="setia"
      className="flex w-full max-w-screen-md flex-col items-center self-center"
    >
      <TabsContent
        onClick={() => setChoosenType("pemula")}
        value="pemula"
        className="w-[80vw] max-w-md rounded-xl border-4 border-surface-100 bg-gradient-to-br from-surface-200 to-surface-300 p-4 shadow-2xl ring-1 ring-surface-300"
      >
        <div className="flex flex-col gap-5 text-content-300">
          <div className="flex justify-between">
            <h3 className="text-center text-xl font-500">Pelajar Pemula</h3>
            <Logo
              className="size-8"
              stroke="stroke-gray-800"
              fill="fill-gray-800"
            />
          </div>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <h2 className="text-4xl font-700 text-content-100 lg:text-5xl">
              Rp24.999
            </h2>
            <p className="shrink-0 text-xl font-700 opacity-70">/ bulan</p>
          </div>
          <div className="flex flex-col items-center gap-2 sm:items-start sm:gap-8">
            <p className="text-xl font-600 sm:text-3xl">x1 bulan</p>
            <div className="w-fit rounded-full border border-surface-300 bg-surface-200 px-5 py-1 text-sm sm:text-base">
              total <span className="line-through">Rp30.000</span> Rp24.999
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        onClick={() => setChoosenType("setia")}
        value="setia"
        className="w-[80vw] max-w-md rounded-xl bg-[url('/bg-mesh-horizontal.webp')] bg-cover bg-center p-5 shadow-2xl"
      >
        <div className="flex flex-col gap-5 text-emerald-700 mix-blend-color-burn">
          <div className="flex justify-between">
            <h3 className="text-center text-xl font-500">Pelajar Setia</h3>
            <Logo
              className="size-8"
              stroke="stroke-emerald-600"
              fill="fill-emerald-600"
            />
          </div>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <h2 className="text-4xl font-700 lg:text-5xl">Rp23.333</h2>
            <p className="shrink-0 text-xl font-700 opacity-70">/ bulan</p>
          </div>
          <div className="flex flex-col items-center gap-2 sm:items-start sm:gap-8">
            <p className="text-xl font-600 sm:text-3xl">x3 bulan</p>
            <div className="w-fit rounded-full border border-surface-400 bg-surface-300 px-5 py-1 text-sm sm:text-base">
              total <span className="line-through">Rp90.000</span> Rp69.999
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        onClick={() => setChoosenType("ambis")}
        value="ambis"
        forceMount
        className="relative w-[80vw] max-w-md  overflow-hidden rounded-xl p-5 shadow-2xl data-[state=inactive]:hidden"
      >
        <MeshGradient colors={["#34d399", "#5eead4", "#3b82f6", "#c4b5fd"]} />
        <div className="flex flex-col gap-5 text-gray-700 mix-blend-color-burn">
          <div className="flex justify-between">
            <h3 className="text-center text-xl font-500">Pelajar Ambis</h3>
            <Logo
              className="size-8"
              stroke="stroke-gray-800"
              fill="fill-gray-800"
            />
          </div>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <h2 className="text-4xl font-700 lg:text-5xl">Rp21.666</h2>
            <p className="shrink-0 text-xl font-700 opacity-70">/ bulan</p>
          </div>
          <div className="flex flex-col items-center gap-2 sm:items-start sm:gap-8">
            <p className="text-xl font-600 sm:text-3xl">x6 bulan</p>
            <div className="w-fit rounded-full border border-surface-400 bg-surface-300 px-5 py-1 text-sm sm:text-base">
              total <span className="line-through">Rp180.000</span> Rp129.999
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsList className="mt-10 flex w-full *:flex-1">
        <TabsTrigger value="pemula" className="relative">
          1 bulan
        </TabsTrigger>
        <TabsTrigger value="setia" className="relative">
          3 bulan
          <div className="absolute -right-3 -top-5 z-10 flex size-12 rotate-12 items-center justify-center text-xs font-700 text-emerald-600">
            <i className="i-ph-seal-duotone absolute h-full w-full" />
            <p>-10%</p>
          </div>
        </TabsTrigger>
        <TabsTrigger value="ambis" className="relative">
          6 bulan
          <div className="absolute -right-3 -top-5 z-10 flex size-12 rotate-12 items-center justify-center text-xs font-700 text-emerald-600">
            <i className="i-ph-seal-duotone absolute h-full w-full" />
            <p>-20%</p>
          </div>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
