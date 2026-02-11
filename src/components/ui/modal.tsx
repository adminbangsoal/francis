import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

export interface ModalI {
  open: boolean;
  setOpen: (value: boolean) => void;
  children?: ReactNode;
  permanent?: boolean;
  className?: string;
  icon?: ReactNode;
  onClose?: () => void;
}

export const Modal = ({
  open,
  setOpen,
  children,
  permanent = false,
  className,
  icon,
  onClose,
}: ModalI) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50"
        />
      )}
      {open && (
        <motion.div
          key="modal-content"
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100vh", opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed inset-0 z-30 flex items-center justify-center p-4"
          onClick={(e) => {
            if (!permanent) {
              e.preventDefault();
              setOpen(false);
              if (onClose) onClose();
            }
          }}
        >
          <div
            className={cn(
              "relative z-20 flex w-full flex-col gap-3 rounded-lg bg-white p-5 shadow-xl lg:max-w-screen-md lg:px-10 lg:py-6",
              className,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {!!icon && (
              <div className="mx-auto -mt-12 flex rounded-full bg-white p-2">
                {icon}
              </div>
            )}
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
