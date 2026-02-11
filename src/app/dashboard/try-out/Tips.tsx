import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CrownIcon } from "lucide-react";
import { verticalSliderVariants } from "../constants";
import { DUMMY_WRONG_ANSWERS } from "../dummy";
import { DashboardBoxContainer } from "../elements/DashboardBoxContainer";
import { TOQuestionCard } from "../elements/TOQuestionCard";

export const Tips = () => {
  const data = DUMMY_WRONG_ANSWERS;
  return (
    <DashboardBoxContainer variant={"warning"}>
      <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
        <div className="flex flex-col justify-start md:w-1/2">
          <p className="flex flex-row items-center gap-2 text-lg">
            <i className="i-ph-lightbulb-duotone w-6 text-yellow-500" />
            <span>Tips UTBK</span>
          </p>
          <p>
            Review try out-mu, pelajari pembahasan soal yang salah untuk
            memperbaiki dan meningkatkan pemahamanmu.
          </p>
          <div>
            <Button className="text-white" variant={"bsPrimary"}>
              <CrownIcon /> Lihat Pembahasan
            </Button>
          </div>
        </div>
        <div className="hide-scrollbar max-h-40 overflow-y-scroll md:w-1/2">
          <motion.div
            className={cn("flex flex-col items-center gap-10 md:py-4")}
            variants={verticalSliderVariants(data.length)}
            animate="animate"
          >
            {data.concat(data.slice(0, 2)).map((wrong_answer, idx) => {
              return <TOQuestionCard key={idx} {...wrong_answer} />;
            })}
          </motion.div>
        </div>
      </div>
    </DashboardBoxContainer>
  );
};
