"use client";

import { Message } from "../model/type";
import { useEffect, useState } from "react";

interface ChatMessageProps {
  message: Message;
  onTypingComplete?: () => void;
  onActionClick?: (action: NonNullable<Message["action"]>) => void;
}

export const ChatMessage = ({
  message,
  onTypingComplete,
  onActionClick,
}: ChatMessageProps) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (message.type === "bot" && message.isTyping && !isTypingComplete) {
      let index = 0;
      setDisplayedContent("");

      const typingInterval = setInterval(() => {
        if (index < message.content.length) {
          setDisplayedContent((prev) => prev + message.content[index]);
          index++;
        } else {
          setIsTypingComplete(true);
          clearInterval(typingInterval);
          onTypingComplete?.();
        }
      }, 30);

      return () => clearInterval(typingInterval);
    } else {
      // 유저 메시지 바로 표시
      setDisplayedContent(message.content);
      setIsTypingComplete(true);
    }
  }, [message.content, message.type, message.isTyping, isTypingComplete]);

  return (
    <div
      className={`flex ${
        message.type === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div className="flex flex-col gap-2 max-w-[75%]">
        <div
          className={`px-5 py-3 rounded-3xl text-base ${
            message.type === "user"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {displayedContent}
        </div>
        {isTypingComplete && message.action && (
          <button
            onClick={() => onActionClick?.(message.action!)}
            className="self-start px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full text-sm font-medium transition-colors"
          >
            {message.action.label || "자세히 보기"}
          </button>
        )}
      </div>
    </div>
  );
};
