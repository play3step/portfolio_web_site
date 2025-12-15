export type AppId =
  | "moreview"
  | "planding"
  | "maplelink"
  | "zoopzoop"
  | "settings"
  | "siri";

export interface AppConfig {
  id: AppId;
  label: string;
  icon: string;
}
