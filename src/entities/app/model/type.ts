export type AppId =
  | "moreview"
  | "planding"
  | "maplelink"
  | "zoopzoop"
  | "deemo"
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

export interface Project {
  id: string;
  title: string;
  image: string;
  tags: string[];
  introduce: string;
}
