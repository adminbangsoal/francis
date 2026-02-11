import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { LeaderboardData } from "@/types";
import { RankTableVariants } from "./style";
interface RankInfoAccordionI {
  data: LeaderboardData;
  myRank?: number;
}

export const RankInfoAccordion = ({ data, myRank }: RankInfoAccordionI) => {
  const {
    user: {
      full_name,
      highschool,
      first_university,
      first_major,
      second_university,
      second_major,
      third_university,
      third_major,
    },
    totalPoints,
    rank,
  } = data;

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className={cn(
          "w-full rounded-lg",
          RankTableVariants({
            variant: myRank == rank ? "my-rank" : "others",
          }),
        )}
      >
        <AccordionItem value="item" className="border-b-0">
          <AccordionTrigger className="w-full px-2 py-2 hover:no-underline ">
            <div className="grid grow border-spacing-2 grid-cols-6 place-items-center gap-4 px-2 text-left lg:grid-cols-12">
              <div className="col-span-1 font-bold">{rank}</div>
              <div className="col-span-4 w-full rounded-lg">
                <p className="font-bold">{full_name}</p>
                <p className="text-sm">{highschool}</p>
              </div>
              <div className="col-span-1 pl-4 font-bold">{totalPoints}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent
            className={cn(
              "rounded-b-lg border-t  p-2",
              myRank == rank ? "border-emerald-300/50" : "border-gray-300",
            )}
          >
            <div className="grid border-spacing-2 grid-cols-6 gap-4 px-2 text-left lg:grid-cols-12">
              <div className="col-span-2 font-bold">Pilihan 1</div>
              <div className="col-span-2 font-bold">Pilihan 2</div>
              <div className="col-span-2 font-bold">Pilihan 3</div>
            </div>
            <div className="grid border-spacing-2 grid-cols-6 gap-4 px-2 text-left lg:grid-cols-12">
              <div className="col-span-2 rounded-lg">
                <p className="font-bold">{first_university}</p>
                <p className="text-sm">{first_major}</p>
              </div>
              <div className="col-span-2 rounded-lg">
                <p className="font-bold">{second_university}</p>
                <p className="text-sm">{second_major}</p>
              </div>
              <div className="col-span-2 rounded-lg">
                <p className="font-bold">{third_university}</p>
                <p className="text-sm">{third_major}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
