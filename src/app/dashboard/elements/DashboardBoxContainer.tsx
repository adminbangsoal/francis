"use client";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { DashboardBoxVariant } from "../style";

interface DashboardBoxContainerI
  extends VariantProps<typeof DashboardBoxVariant> {
  className?: string;
  children: ReactNode;
}
export const DashboardBoxContainer = ({
  className,
  children,
  variant,
}: DashboardBoxContainerI) => {
  return (
    <div className={cn(DashboardBoxVariant({ variant }), className)}>
      {children}
    </div>
  );
};
