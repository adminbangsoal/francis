import useAutosizeTextArea from "@/lib/hooks/useAutosizeTextArea";
import { cn } from "@/lib/utils";
import * as React from "react";
import { useImperativeHandle, useRef } from "react";
import { InputVariants } from "./style";

export interface TextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  variant?: "active";
  color?: "white" | "emerald";
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { className, variant = "active", color = "white", value, ...props },
    ref,
  ) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    // Link the forwarded ref to the local ref
    useImperativeHandle(ref, () => textAreaRef.current!);

    useAutosizeTextArea(textAreaRef);

    return (
      <textarea
        className={cn(InputVariants({ variant, color }), className)}
        ref={textAreaRef}
        value={value}
        {...props}
      />
    );
  },
);

TextArea.displayName = "TextArea";

export { TextArea };
