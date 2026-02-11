// assets
import heroBgMesh from "@public/hero-bg-mesh.webp";
import heroMaskBottom from "@public/hero-mask-bottom.svg";
import heroMaskTop from "@public/hero-mask-top.svg";

// components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Quiz from "./Quiz";

// libs
import Image from "next/image";

export default function HeroFooter() {
  return (
    <div className="relative flex w-full flex-col py-8 md:flex-row">
      <div className="flex basis-[30%] flex-col justify-center gap-4 self-start px-5 pb-10 pt-20 sm:px-10 sm:pt-32 md:pb-0 md:pr-0">
        <h2 className="text-center text-3xl font-600 text-white md:text-left">
          Bank soal terlengkap untuk kamu yang terambis
        </h2>
        <p className="text-center text-emerald-200 md:text-left">
          Tingkatkan latihanmu dengan ribuan soal asli UTBK, SNBT, SIMAK UI, dan
          ujian mandiri PTN lainnya.
        </p>
      </div>
      <Tabs
        defaultValue="tab1"
        orientation="vertical"
        className="flex basis-[70%] items-center pl-5 md:pl-10"
      >
        <TabsList
          aria-label="UTBK category tabs"
          className="z-10 -mr-8 mt-12 flex shrink-0 flex-col self-start rounded-2xl border border-surface-100/30 bg-surface-100/40 p-2 shadow-xl backdrop-blur-2xl *:rounded-lg *:px-2 *:py-5 *:text-emerald-800 *:transition-colors"
        >
          <TabsTrigger
            value="tab1"
            className="border border-transparent hover:bg-emerald-700/10 data-[state=active]:cursor-default data-[state=active]:border-emerald-700 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-highlight data-[state=active]:shadow-white/25"
          >
            <i className="i-ph-brain-duotone size-9" />
          </TabsTrigger>
          <TabsTrigger
            value="tab2"
            className="border border-transparent hover:bg-emerald-700/10 data-[state=active]:cursor-default data-[state=active]:border-emerald-700 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-highlight data-[state=active]:shadow-white/25"
          >
            <i className="i-ph-lightbulb-filament-duotone size-9" />
          </TabsTrigger>
          <TabsTrigger
            value="tab3"
            className="border border-transparent hover:bg-emerald-700/10 data-[state=active]:cursor-default data-[state=active]:border-emerald-700 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-highlight data-[state=active]:shadow-white/25"
          >
            <i className="i-ph-book-open-text-duotone size-9" />
          </TabsTrigger>
          <TabsTrigger
            value="tab4"
            className="border border-transparent hover:bg-emerald-700/10 data-[state=active]:cursor-default data-[state=active]:border-emerald-700 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-highlight data-[state=active]:shadow-white/25"
          >
            <i className="i-ph-math-operations-bold size-9" />
          </TabsTrigger>
        </TabsList>
        <div className="grow rounded-l-3xl bg-gradient-to-br from-surface-300/60 to-surface-300/20 py-3 pl-3 backdrop-blur-2xl">
          <TabsContent value="tab1">
            <Quiz topic="pu" />
          </TabsContent>
          <TabsContent value="tab2">
            <Quiz topic="ppu" />
          </TabsContent>
          <TabsContent value="tab3">
            <Quiz topic="pbm" />
          </TabsContent>
          <TabsContent value="tab4">
            <Quiz topic="pk" />
          </TabsContent>
        </div>
      </Tabs>
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <Image src={heroBgMesh} alt="" className="h-full w-full" />
        <Image src={heroMaskTop} alt="" className="absolute top-0 w-full" />
        <Image
          src={heroMaskBottom}
          alt=""
          className="absolute bottom-0 w-full"
        />
      </div>
    </div>
  );
}
