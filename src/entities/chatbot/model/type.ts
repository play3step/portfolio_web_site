export interface Message {
  type: "user" | "bot";
  content: string;
  timestamp?: Date;
  isTyping?: boolean;
  action?: MessageAction;
}

export interface MessageAction {
  type: "openWindow";
  windowId: string;
  label?: string;
}

export interface QuickOption {
  id: string;
  label: string;
  category?: string;
  hasFollowUp?: boolean;
}
