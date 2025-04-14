import React from "react";
import { cn } from "../../lib/utils";

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sent" | "received";
}

export const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ className, variant = "received", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex w-max max-w-[75%] chat-message",
          variant === "sent" ? "ml-auto chat-message-sent" : "mr-auto chat-message-received",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ChatBubble.displayName = "ChatBubble";

export interface ChatBubbleAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  fallback?: string;
}

export const ChatBubbleAvatar = React.forwardRef<HTMLDivElement, ChatBubbleAvatarProps>(
  ({ className, src, fallback, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border border-primary bg-dark/50",
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            className="h-full w-full rounded-full object-cover"
            alt={fallback || "Avatar"}
          />
        ) : (
          <span className="text-xs font-medium">{fallback || "?"}</span>
        )}
      </div>
    );
  }
);
ChatBubbleAvatar.displayName = "ChatBubbleAvatar";

export interface ChatBubbleMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sent" | "received";
  isLoading?: boolean;
}

export const ChatBubbleMessage = React.forwardRef<HTMLDivElement, ChatBubbleMessageProps>(
  ({ className, variant = "received", isLoading = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "ml-2 rounded-xl px-4 py-2 text-sm transition-all hover:shadow-md",
          {
            "bg-primary text-white hover:bg-primary/90": variant === "sent",
            "bg-dark/50 text-light hover:bg-dark/60": variant === "received",
          },
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-current"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-current" style={{ animationDelay: "0.2s" }}></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-current" style={{ animationDelay: "0.4s" }}></div>
          </div>
        ) : (
          children
        )}
      </div>
    );
  }
);
ChatBubbleMessage.displayName = "ChatBubbleMessage";
