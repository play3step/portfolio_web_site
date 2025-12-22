export type AppId =
  | "moreview"
  | "planding"
  | "maplelink"
  | "zoopzoop"
  | "settings"
  | "chatbot";

export interface WindowProps {
  width?: number;
  height?: number;
}

export interface AppConfig {
  id: AppId;
  label: string;
  icon: string;
  windowProps?: WindowProps;
}
