"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Message {
  type: "user" | "bot";
  content: string;
}

interface QuickOption {
  id: string;
  label: string;
}

export const ChatbotWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const quickOptions: QuickOption[] = [
    { id: "1", label: "자기소개가 궁금해요" },
    { id: "2", label: "진행한 프로젝트" },
    { id: "3", label: "사용 가능한 기술" },
    { id: "4", label: "연락처 알려주세요" },
    { id: "5", label: "협업 스타일 & 가치관" },
  ];

  const handleOptionClick = (option: QuickOption) => {
    addMessage("user", option.label);
    setTimeout(() => {
      addMessage("bot", "여기에 응답이 들어갑니다.");
    }, 500);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    addMessage("user", input);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      addMessage("bot", "메시지를 받았습니다.");
      setIsLoading(false);
    }, 800);
  };

  const addMessage = (type: "user" | "bot", content: string) => {
    setMessages((prev) => [...prev, { type, content }]);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="h-full flex flex-col bg-linear-to-b from-gray-50 to-white">
      {!hasMessages ? (
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="relative mb-2">
            <Image
              src={"/icon/glass.svg"}
              alt="chatbot-window-logo"
              width={200}
              height={200}
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 text-center">
            평소 궁금해 하는 모든것을
            <br />
            저에게 질문하세요
          </h2>
        </div>
      ) : (
        <div
          className="flex-1 overflow-y-auto px-6 py-6 space-y-4"
          ref={scrollRef}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-5 py-3 rounded-3xl text-base ${
                  msg.type === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-5 py-3 rounded-3xl">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="p-6 pt-4 space-y-3">
        <div className="flex flex-wrap justify-center gap-2">
          {quickOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option)}
              disabled={isLoading}
              className="
              px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 
              hover:bg-gray-50 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3">
            <button className="text-gray-400 hover:text-gray-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="궁금한게 있으신가요"
              className="flex-1 px-2 py-1 text-base text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
              disabled={isLoading}
            />

            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
