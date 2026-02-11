import * as React from "react";

import { cn } from "@/lib/utils";
import { InputVariants } from "./style";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "active";
  color?: "white" | "emerald";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "active", color = "white", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(InputVariants({ variant, color }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
