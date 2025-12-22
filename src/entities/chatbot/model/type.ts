export interface Message {
  type: "user" | "bot";
  content: string;
  timestamp?: Date;
}

export interface QuickOption {
  id: string;
  label: string;
  category?: string;
  hasFollowUp?: boolean;
}
