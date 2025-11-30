"use client";

import { useState, useEffect, useRef } from "react";
import { getScanResultById } from "@/lib/mockData/scanResults";
import { getOrCreateChatSession, addMessageToSession } from "@/lib/mockData/chatHistory";
import { generateChatResponse } from "@/lib/utils/chatSimulator";
import { useApp } from "@/lib/context/AppContext";
import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

interface InlineChatProps {
  scanId: string;
}

export function InlineChat({ scanId }: InlineChatProps) {
  const { currentProfile } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentProfile || !isOpen) return;

    const scanResult = getScanResultById(scanId);
    if (!scanResult) return;

    const session = getOrCreateChatSession(scanId, currentProfile.id);
    setMessages(
      session.messages
        .filter((msg) => msg.role === "user" || msg.role === "ai")
        .map((msg) => ({ role: msg.role as "user" | "ai", text: msg.text }))
    );

    if (session.messages.length === 0) {
      const welcomeMsg = {
        role: "ai" as const,
        text: `Hello! I'm here to help you understand ${scanResult.product.name} and how it relates to ${currentProfile.name}'s health profile. What would you like to know?`,
      };
      setMessages([welcomeMsg]);
      addMessageToSession(session.id, "ai", welcomeMsg.text);
    }
  }, [scanId, currentProfile, isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim() || !currentProfile) return;

    const scanResult = getScanResultById(scanId);
    if (!scanResult) return;

    const userMessage = { role: "user" as const, text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    const session = getOrCreateChatSession(scanId, currentProfile.id);
    addMessageToSession(session.id, "user", userMessage.text);

    try {
      const risks = scanResult.dataPoints.map(
        (dp) => `${dp.label}: ${dp.value}${dp.explanation ? ` (${dp.explanation})` : ""}`
      );

      const response = await generateChatResponse(userMessage.text, {
        product: scanResult.product,
        profile: currentProfile,
        risks,
        isUnsafe: scanResult.verdict.badge === "UNSAFE",
      });

      const aiMessage = { role: "ai" as const, text: response };
      setMessages((prev) => [...prev, aiMessage]);
      addMessageToSession(session.id, "ai", response);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-slate-600 hover:bg-slate-700 text-white rounded-lg px-4 py-3 md:py-4 font-medium transition-colors flex items-center justify-center gap-2"
        >
          <span>Ask AI About This Product</span>
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div
          ref={chatContainerRef}
          className="fixed md:relative bottom-0 left-0 right-0 md:bottom-auto md:left-auto md:right-auto w-full md:w-full bg-white border-t md:border border-gray-200 rounded-t-2xl md:rounded-xl shadow-xl md:shadow-sm z-50 md:z-auto flex flex-col"
          style={{
            height: isOpen ? "70vh" : "0",
            maxHeight: "600px",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 md:px-5 py-3 md:py-4 border-b border-gray-200">
            <div>
              <h3 className="font-semibold text-gray-900">AI Assistant</h3>
              <p className="text-xs text-gray-600">
                Analyzing for {currentProfile?.name}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 md:px-5 py-4 md:py-5 space-y-3 md:space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm md:text-base ${
                    msg.role === "user"
                      ? "bg-slate-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-3 md:px-4 py-2 md:py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 px-4 md:px-5 py-3 md:py-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about this product..."
                className="flex-1 px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim() || isLoading}
                className="w-10 h-10 bg-slate-600 text-white rounded-lg flex items-center justify-center disabled:opacity-50 hover:bg-slate-700 transition-colors"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

