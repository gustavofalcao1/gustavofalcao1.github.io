import React, { useRef, useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

export type ChatPosition = "bottom-right" | "bottom-left";
export type ChatSize = "sm" | "md" | "lg" | "xl" | "full";

const chatConfig = {
  dimensions: {
    sm: "sm:max-w-sm sm:max-h-[500px]",
    md: "sm:max-w-md sm:max-h-[600px]",
    lg: "sm:max-w-lg sm:max-h-[700px]",
    xl: "sm:max-w-xl sm:max-h-[800px]",
    full: "sm:w-full sm:h-full",
  },
  positions: {
    "bottom-right": "bottom-5 right-5",
    "bottom-left": "bottom-5 left-5",
  },
  chatPositions: {
    "bottom-right": "sm:bottom-[calc(100%+10px)] sm:right-0",
    "bottom-left": "sm:bottom-[calc(100%+10px)] sm:left-0",
  },
  states: {
    open: "pointer-events-auto opacity-100 visible scale-100 translate-y-0",
    closed: "pointer-events-none opacity-0 invisible scale-95 sm:translate-y-5",
  },
};

interface ExpandableChatProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: ChatPosition;
  size?: ChatSize;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  controlledOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ExpandableChat: React.FC<ExpandableChatProps> = ({
  className,
  position = "bottom-right",
  size = "md",
  icon,
  defaultOpen = false,
  controlledOpen,
  onOpenChange,
  children,
  ...props
}) => {
  // Use controlled state if provided, otherwise use internal state
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  
  const chatRef = useRef<HTMLDivElement>(null);

  // Update internal state when controlled state changes
  useEffect(() => {
    if (isControlled && controlledOpen !== undefined) {
      setInternalOpen(controlledOpen);
    }
  }, [controlledOpen, isControlled]);

  const toggleChat = () => {
    const newState = !isOpen;
    
    if (!isControlled) {
      setInternalOpen(newState);
    }
    
    if (onOpenChange) {
      onOpenChange(newState);
    }
  };

  return (
    <div
      className={cn(`fixed ${chatConfig.positions[position]} z-50`, className)}
      {...props}
    >
      <div
        ref={chatRef}
        className={cn(
          "flex flex-col bg-dark/95 backdrop-blur-md border border-primary/20 sm:rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-out sm:absolute sm:w-[90vw] sm:h-[80vh]",
          // Modificando o estilo mobile para ocupar apenas parte da tela, de cima para baixo
          "fixed inset-x-0 top-0 bottom-[5.5rem] rounded-b-lg", // Ajuste para deixar espaço na parte inferior
          chatConfig.chatPositions[position],
          chatConfig.dimensions[size],
          isOpen ? chatConfig.states.open : chatConfig.states.closed,
          className,
        )}
      >
        {children}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 sm:hidden text-light hover:text-primary transition-colors"
          onClick={toggleChat}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ExpandableChatToggle
        icon={icon}
        isOpen={isOpen}
        toggleChat={toggleChat}
      />
    </div>
  );
};

ExpandableChat.displayName = "ExpandableChat";

const ExpandableChatHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex items-center justify-between p-4 border-b border-primary/20", className)}
    {...props}
  />
);

ExpandableChatHeader.displayName = "ExpandableChatHeader";

const ExpandableChatBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("flex-grow overflow-y-auto", className)} {...props} />;

ExpandableChatBody.displayName = "ExpandableChatBody";

const ExpandableChatFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("border-t border-primary/20 p-4", className)} {...props} />;

ExpandableChatFooter.displayName = "ExpandableChatFooter";

interface ExpandableChatToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  isOpen: boolean;
  toggleChat: () => void;
}

const ExpandableChatToggle: React.FC<ExpandableChatToggleProps> = ({
  className,
  icon,
  isOpen,
  toggleChat,
  ...props
}) => (
  <Button
    variant="default"
    onClick={toggleChat}
    className={cn(
      "w-14 h-14 rounded-full shadow-md flex items-center justify-center hover:shadow-lg hover:shadow-black/30 transition-all duration-300 chat-button",
      isOpen ? "bg-secondary hover:bg-secondary/90" : "bg-primary hover:bg-primary/90",
      "animate-bounce-subtle hover:animate-none",
      className,
    )}
    {...props}
  >
    {isOpen ? (
      <X className="h-6 w-6 transition-transform duration-200 ease-out" />
    ) : (
      icon || <MessageCircle className="h-6 w-6 transition-transform duration-200 ease-out hover:scale-110" />
    )}
  </Button>
);

ExpandableChatToggle.displayName = "ExpandableChatToggle";

export {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
};
