import React, { useState, FormEvent, useEffect, useRef } from "react";
import { MessageCircle, Paperclip, Mic, CornerDownLeft } from "lucide-react";
import { Button } from "./ui/button";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "./ui/chat-bubble";
import { ChatInput } from "./ui/chat-input";
import { ExpandableChat, ExpandableChatHeader, ExpandableChatBody, ExpandableChatFooter } from "./ui/expandable-chat";
import { ChatMessageList } from "./ui/chat-message-list";
import { useI18n } from "../hooks/useI18n";
import { useContext } from "react";
import { ContactContext } from "../App";

// Type for chat messages
interface Message {
  id: number;
  content: string;
  sender: "user" | "ai";
}

interface ContactChatProps {
  isVisible: boolean;
  onClose: () => void;
}

export function ContactChat({ isVisible, onClose }: ContactChatProps) {
  const { t, lang } = useI18n();
  const { setShowChat } = useContext(ContactContext);
  // Initialize messages with a greeting as default state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Initial placeholder",
      sender: "ai",
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Keep track if chat has been opened at least once
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  // Update greeting message when language changes
  useEffect(() => {
    setMessages([{
      id: 1,
      content: t('contact.messages.greeting'),
      sender: "ai",
    }]);
  }, [lang, t]);

  // Handle visibility changes
  useEffect(() => {
    if (isVisible && !hasBeenOpened) {
      setHasBeenOpened(true);
    }
  }, [isVisible, hasBeenOpened]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle chat submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(), // Use timestamp for more reliable IDs
      content: input,
      sender: "user" as const
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setHasSubmitted(true);

    // Simulate AI response after delay
    setTimeout(() => {
      // Generate response based on keywords
      let responseKey = 'default';
      
      const lowerCaseInput = input.toLowerCase();
      if (lowerCaseInput.includes("hello") || lowerCaseInput.includes("hi") || 
          lowerCaseInput.includes("olá") || lowerCaseInput.includes("oi")) {
        responseKey = 'hello';
      } else if (lowerCaseInput.includes("project") || lowerCaseInput.includes("work") || 
                lowerCaseInput.includes("projeto") || lowerCaseInput.includes("trabalho")) {
        responseKey = 'project';
      } else if (lowerCaseInput.includes("email") || lowerCaseInput.includes("contact") || 
                lowerCaseInput.includes("contato")) {
        responseKey = 'contact';
      } else if (lowerCaseInput.includes("price") || lowerCaseInput.includes("cost") || 
                lowerCaseInput.includes("preço") || lowerCaseInput.includes("custo")) {
        responseKey = 'pricing';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          content: t(`contact.messages.${responseKey}`),
          sender: "ai",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  // Handle chat opening/closing
  const handleChatOpenChange = (isOpen: boolean) => {
    // Connect the button's state with our app state
    setShowChat(isOpen);
  };

  // Only render if the chat has been opened at least once
  if (!hasBeenOpened && !isVisible) {
    return null;
  }

  return (
    <div className="expandable-chat-container">
      <ExpandableChat
        size="lg"
        position="bottom-right"
        icon={<MessageCircle className="h-6 w-6" />}
        controlledOpen={isVisible}
        onOpenChange={handleChatOpenChange}
      >
        <ExpandableChatHeader className="flex-col text-center justify-center bg-gradient-to-r from-primary/10 to-secondary/10">
          <h1 className="text-xl font-semibold text-light animate-pulse-subtle">{t('contact.title')} ✨</h1>
          <p className="text-sm text-light/70">
            {t('contact.subtitle')}
          </p>
        </ExpandableChatHeader>

        <ExpandableChatBody className="bg-darker/50 expandable-chat-body">
          <ChatMessageList>
            {/* Render only if we have messages */}
            {messages.length > 0 && messages.map((message) => (
              <ChatBubble
                key={message.id}
                variant={message.sender === "user" ? "sent" : "received"}
              >
                <ChatBubbleAvatar
                  className="h-8 w-8 shrink-0 transition-transform duration-300 hover:scale-110"
                  src={
                    message.sender === "user"
                      ? "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                      : "/img/logo.webp"
                  }
                  fallback={message.sender === "user" ? "You" : "GF"}
                />
                <ChatBubbleMessage
                  variant={message.sender === "user" ? "sent" : "received"}
                >
                  {message.content}
                </ChatBubbleMessage>
              </ChatBubble>
            ))}

            {isLoading && (
              <ChatBubble variant="received">
                <ChatBubbleAvatar
                  className="h-8 w-8 shrink-0"
                  src="/img/logo.webp"
                  fallback="GF"
                />
                <ChatBubbleMessage isLoading />
              </ChatBubble>
            )}
            <div ref={messagesEndRef} />
          </ChatMessageList>
        </ExpandableChatBody>

        <ExpandableChatFooter className="bg-dark/80 expandable-chat-footer">
          <form
            onSubmit={handleSubmit}
            className="relative rounded-lg border border-primary/20 bg-dark/50 focus-within:ring-1 focus-within:ring-primary/50 p-1"
          >
            <ChatInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('contact.placeholder')}
              className="min-h-12 resize-none rounded-lg border-0 p-3 shadow-none focus-visible:ring-0 chat-input"
            />
            <div className="flex items-center p-2 pt-0 mt-2 justify-between">
              <div className="flex">
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="text-light hover:text-primary transition-colors hover:scale-110 active:scale-95 duration-200"
                >
                  <Paperclip className="w-4 h-4 transition-transform hover:rotate-12" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="text-light hover:text-primary transition-colors hover:scale-110 active:scale-95 duration-200"
                >
                  <Mic className="w-4 h-4 transition-transform hover:rotate-12" />
                </Button>
              </div>
              <Button 
                type="submit" 
                size="sm" 
                className="ml-auto gap-1.5 transition-all duration-300 hover:translate-x-0.5 active:translate-x-0 active:scale-95 input-button"
                disabled={!input.trim()}
              >
                {t('contact.sendButton')}
                <CornerDownLeft className="w-3.5 h-3.5" />
              </Button>
            </div>
          </form>
        </ExpandableChatFooter>
      </ExpandableChat>
    </div>
  );
}
