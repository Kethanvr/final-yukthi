import { ChatSession, ChatMessage } from "../types";

// Store chat sessions in memory
export const mockChatSessions: ChatSession[] = [];

// Helper to create a new chat session
export function createChatSession(scanId: string, profileId: string): ChatSession {
  const session: ChatSession = {
    id: `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    scanId,
    profileId,
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  mockChatSessions.push(session);
  return session;
}

// Get chat session by scan and profile
export function getChatSession(scanId: string, profileId: string): ChatSession | undefined {
  return mockChatSessions.find((s) => s.scanId === scanId && s.profileId === profileId);
}

// Add message to session
export function addMessageToSession(
  sessionId: string,
  role: "user" | "ai",
  text: string
): void {
  const session = mockChatSessions.find((s) => s.id === sessionId);
  if (session) {
    const message: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role,
      text,
      timestamp: new Date().toISOString(),
    };
    session.messages.push(message);
    session.updatedAt = new Date().toISOString();
  }
}

// Clear chat session (when profile switches)
export function clearChatSession(sessionId: string): void {
  const session = mockChatSessions.find((s) => s.id === sessionId);
  if (session) {
    session.messages = [];
    session.updatedAt = new Date().toISOString();
  }
}

// Get or create chat session
export function getOrCreateChatSession(scanId: string, profileId: string): ChatSession {
  const existing = getChatSession(scanId, profileId);
  if (existing) {
    return existing;
  }
  return createChatSession(scanId, profileId);
}

