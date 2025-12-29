import { AppConfig } from "./type";
import { AppIcons } from "@/src/shared";

export const appList: AppConfig[] = [
  {
    id: "moreview",
    label: "MoreView",
    icon: AppIcons.moreview,
    windowProps: { width: 800, height: 600 },
  },
  {
    id: "planding",
    label: "Planding",
    icon: AppIcons.planding,
    windowProps: { width: 800, height: 600 },
  },
  {
    id: "maplelink",
    label: "Maplelink",
    icon: AppIcons.maplelink,
    windowProps: { width: 800, height: 600 },
  },
  {
    id: "zoopzoop",
    label: "ZoopZoop",
    icon: AppIcons.zoopzoop,
    windowProps: { width: 800, height: 600 },
  },
  {
    id: "deemo",
    label: "Deemo",
    icon: AppIcons.deemo,
    windowProps: { width: 800, height: 600 },
  },
  {
    id: "settings",
    label: "Settings",
    icon: AppIcons.settings,
    windowProps: { width: 600, height: 500 },
  },
  {
    id: "chatbot",
    label: "Chatbot",
    icon: AppIcons.chatbot,
    windowProps: { width: 580, height: 800 },
  },
];

export const getAppById = (id: string): AppConfig | undefined => {
  return appList.find((app) => app.id === id);
};
