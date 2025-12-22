export interface Message {
  type: "user" | "bot";
  content: string;
  timestamp?: Date;
  isTyping?: boolean;
}

export interface QuickOption {
  id: string;
  label: string;
  category?: string;
  hasFollowUp?: boolean;
}
