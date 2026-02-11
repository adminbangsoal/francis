import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { FC, ReactNode } from "react";
import { buttonVariants } from "./button";

export type TabMenuType = {
  id: number;
  title: string;
  icon?: string;
  content?: JSX.Element;
};

export interface TabsProps {
  tabs: TabMenuType[];
  children?: ReactNode;
  activeTab: number;
  childrenClassName?: string;
  setActiveTab: (id: number) => void;
}

export const CircleTab: FC<TabsProps> = ({
  tabs,
  children,
  activeTab,
  setActiveTab,
  childrenClassName,
}) => {
  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <div className="w-full">
      <div className="flex shrink-0 flex-col items-center">
        <ul className="hide-scrollbar flex w-full justify-stretch overflow-scroll rounded-full bg-gray-200 text-gray-500">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className="relative m-1 flex h-10 w-full cursor-pointer items-center justify-center rounded-full p-1 text-center"
              onClick={() => handleTabClick(tab.id)}
            >
              <div
                className={cn(
                  "relative z-20 flex w-full flex-row items-center justify-center gap-1 whitespace-nowrap font-bold",
                  tab.id == activeTab && "text-white",
                )}
              >
                {!!tab.icon && <i className={cn(tab.icon, "size-4")} />}
                <p>{tab.title}</p>
              </div>
              {tab.id === activeTab && (
                <motion.div
                  className={cn(
                    buttonVariants({ variant: "bsPrimary" }),
                    "absolute left-0 top-0 z-10 h-10 w-full",
                  )}
                  layoutId="underline"
                  // transition={{
                  //   type: "tween",
                  //   duration: 0.5,
                  //   ease: "easeInOut",
                  // }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeTab ? tabs[activeTab - 1].title : "empty"}
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -10, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn("rounded py-6", childrenClassName)}
        >
          {!!children ? children : tabs[activeTab - 1].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
