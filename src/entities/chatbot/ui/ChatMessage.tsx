"use client";

import { Message } from "../model/type";
import { useEffect, useState } from "react";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
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
      <div
        className={`max-w-[75%] px-5 py-3 rounded-3xl text-base ${
          message.type === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {displayedContent}
      </div>
    </div>
  );
};
