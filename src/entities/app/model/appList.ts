import { AppConfig } from "./type";

export const appList: AppConfig[] = [
  {
    id: "moreview",
    label: "MoreView",
    icon: "/icon/moreview.svg",
    windowProps: { width: 800, height: 600 },
  },
  {
    id: "planding",
    label: "Planding",
    icon: "/icon/planding.svg",
    windowProps: { width: 800, height: 600 },
  },
  {
    id: "maplelink",
    label: "Maplelink",
    icon: "/icon/maplelink.svg",
    windowProps: { width: 800, height: 600 },
  },
  {
    id: "zoopzoop",
    label: "ZoopZoop",
    icon: "/icon/zoopzoop.svg",
    windowProps: { width: 800, height: 600 },
  },
  {
    id: "settings",
    label: "Settings",
    icon: "/icon/settings.svg",
    windowProps: { width: 600, height: 500 },
  },
  {
    id: "siri",
    label: "Siri",
    icon: "/icon/siri.svg",
    windowProps: { width: 400, height: 600 },
  },
];

export const getAppById = (id: string): AppConfig | undefined => {
  return appList.find((app) => app.id === id);
};
