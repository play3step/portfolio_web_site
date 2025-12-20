"use client";

import { useState } from "react";

import { InitialScreen } from "./InitialScreen";
import { MessageList } from "./MessageList";
import { QuickOptions } from "./QuickOptions";
import { ChatInput } from "./ChatInput";
import { Message, QUICK_OPTIONS } from "@/src/entities";

export const ChatbotWindow = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionClick = (option: (typeof QUICK_OPTIONS)[0]) => {
    setMessages((prev) => [...prev, { type: "user", content: option.label }]);
    setIsLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: "여기에 응답이 들어갑니다." },
      ]);
      setIsLoading(false);
    }, 500);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { type: "user", content: input }]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: "메시지를 받았습니다." },
      ]);
      setIsLoading(false);
    }, 800);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="h-full flex flex-col bg-linear-to-b from-gray-50 to-white">
      {!hasMessages ? (
        <InitialScreen />
      ) : (
        <MessageList messages={messages} isLoading={isLoading} />
      )}

      <div className="p-6 pt-4 space-y-3">
        <QuickOptions
          options={QUICK_OPTIONS}
          onSelect={handleOptionClick}
          disabled={isLoading}
        />
        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={handleSendMessage}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};
