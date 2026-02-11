"use client";
import { Modal, ModalI } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import * as Tabs from "@radix-ui/react-tabs";
import { tabsTriggerStyle } from "../style";
import { AccountDetails } from "./AccountDetails";
export const AccountModal = ({ open, setOpen }: ModalI) => {
  return (
    <div>
      <Modal open={open} setOpen={setOpen}>
        <Tabs.Root defaultValue="details">
          <div className="flex flex-row items-center justify-between">
            <Tabs.List className="sticky top-0 flex flex-row gap-4 bg-white py-3 text-3xl ">
              <Tabs.Trigger
                onClick={(e) => e.stopPropagation()}
                className={cn(tabsTriggerStyle)}
                value="details"
              >
                Account Details
              </Tabs.Trigger>
              {/* <Tabs.Trigger
                onClick={(e) => e.stopPropagation()}
                className={cn(tabsTriggerStyle)}
                value="notifications"
              >
                Notifications
              </Tabs.Trigger> */}
            </Tabs.List>
            <button
              className="shrink-0"
              onClick={() => {
                setOpen(false);
              }}
            >
              <i className="i-ph-x-circle-bold h-8 w-8 shrink-0 text-surface-300" />
            </button>
          </div>
          <Tabs.Content value="details">
            <AccountDetails />
          </Tabs.Content>
          {/* <Tabs.Content value="notifications">
            <AccountDetails />
          </Tabs.Content> */}
        </Tabs.Root>
      </Modal>
    </div>
  );
};
