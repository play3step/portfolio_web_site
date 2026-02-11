"use client";

import { useState } from "react";

import { InitialScreen } from "./InitialScreen";
import { MessageList } from "./MessageList";
import { QuickOptions } from "./QuickOptions";
import { ChatInput } from "./ChatInput";
import {
  CHAT_RESPONSES,
  Message,
  QUICK_OPTIONS,
  OPTION_GROUPS,
} from "@/src/entities";
import { useWindowState } from "@/src/features/window-manager/model/useWindowState";

export const ChatbotWindow = ({ appId }: { appId: string }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentOptionGroup, setCurrentOptionGroup] = useState("main");
  const { openWindow } = useWindowState();

  const handleOptionClick = (option: (typeof QUICK_OPTIONS)[0]) => {
    setMessages((prev) => [...prev, { type: "user", content: option.label }]);
    setIsLoading(true);

    setTimeout(() => {
      if (option.hasFollowUp) {
        setCurrentOptionGroup(option.category ?? "main");
      }

      if (option.category === "back") {
        setCurrentOptionGroup("main");
        setIsLoading(false);
        return;
      }

      const response = CHAT_RESPONSES[option.category ?? ""];
      const botMessage: Message = {
        type: "bot",
        content: typeof response === "string"
          ? response || "답변을 준비중입니다."
          : response?.content || "답변을 준비중입니다.",
        isTyping: true,
      };

      if (typeof response === "object" && response?.action) {
        botMessage.action = response.action;
      }

      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { type: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      // Gemini API 호출
      const history = messages.map((msg) => ({
        role: msg.type === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage, history }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.response || data.error || "응답을 받는데 실패했습니다."
        );
      }

      // 성공적인 응답
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: data.response,
          isTyping: true,
        },
      ]);
    } catch (error) {
      console.error("메시지 전송 오류:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            error instanceof Error
              ? error.message
              : "죄송합니다. 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
          isTyping: true,
        },
      ]);
      setIsLoading(false);
    }
  };

  const handleTypingComplete = () => {
    setIsLoading(false);
  };

  const handleActionClick = (action: NonNullable<Message["action"]>) => {
    if (action.type === "openWindow") {
      openWindow(action.windowId);
    }
  };

  const hasMessages = messages.length > 0;
  const currentOptions = OPTION_GROUPS[currentOptionGroup] || QUICK_OPTIONS;

  return (
    <div className="h-full flex flex-col bg-linear-to-b from-gray-50 to-white">
      {!hasMessages ? (
        <InitialScreen />
      ) : (
        <MessageList
          messages={messages}
          isLoading={isLoading}
          onTypingComplete={handleTypingComplete}
          onActionClick={handleActionClick}
        />
      )}

      <div className="p-6 pt-4 space-y-3">
        <QuickOptions
          options={currentOptions}
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
