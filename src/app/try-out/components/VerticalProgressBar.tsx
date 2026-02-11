import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ProgressBarCVAProps, ProgressBarVariants } from "./style";

interface VerticalProgressBarProps extends ProgressBarCVAProps {
  progress: number;
}

export const VerticalProgressBar = ({
  progress,
  ...cvaProps
}: VerticalProgressBarProps) => {
  const cappedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="w-8 overflow-hidden rounded-full bg-gray-200 p-1">
      <motion.div
        className={cn(ProgressBarVariants(cvaProps))}
        initial={{ height: 0 }}
        animate={{ height: `${cappedProgress}%` }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%" }}
      />
    </div>
  );
};
