"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { getScanResultById } from "@/lib/mockData/scanResults";
import { getOrCreateChatSession, addMessageToSession } from "@/lib/mockData/chatHistory";
import { generateChatResponse } from "@/lib/utils/chatSimulator";
import { useApp } from "@/lib/context/AppContext";
import { Button } from "@/components/ui/Button";

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const scanId = params.scanId as string;
  const { currentProfile } = useApp();
  
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentProfile) return;

    const scanResult = getScanResultById(scanId);
    if (!scanResult) return;

    const session = getOrCreateChatSession(scanId, currentProfile.id);
    setMessages(session.messages);

    // Add initial AI message if empty
    if (session.messages.length === 0) {
      const welcomeMsg = {
        role: "ai" as const,
        text: `Hello! I'm here to help you understand ${scanResult.product.name} and how it relates to ${currentProfile.name}'s health profile. What would you like to know?`,
      };
      setMessages([welcomeMsg]);
      addMessageToSession(session.id, "ai", welcomeMsg.text);
    }
  }, [scanId, currentProfile]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
        >
          ←
        </button>
        <div className="flex-1">
          <h1 className="font-semibold text-gray-900">AI Assistant</h1>
          <p className="text-xs text-gray-600">
            Analyzing for {currentProfile?.name}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
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
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about this product..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isLoading}
            className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center disabled:opacity-50"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}


