import * as React from "react";
import { cn } from "../../lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const ChatInput = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex w-full resize-none rounded-md bg-dark/50 px-3 py-2 text-sm placeholder:text-light/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-light",
          "transition-all duration-200 focus:bg-dark/70 focus:ring-1 focus:ring-primary/50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
ChatInput.displayName = "ChatInput";

export { ChatInput };
