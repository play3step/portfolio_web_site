import { AppConfig } from "./type";

export const appList: AppConfig[] = [
  {
    id: "moreview",
    label: "MoreView",
    icon: "/icon/moreview.svg",
  },
  {
    id: "planding",
    label: "Planding",
    icon: "/icon/planding.svg",
  },
  {
    id: "maplelink",
    label: "Maplelink",
    icon: "/icon/maplelink.svg",
  },
  {
    id: "zoopzoop",
    label: "ZoopZoop",
    icon: "/icon/zoopzoop.svg",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "/icon/settings.svg",
  },
  {
    id: "siri",
    label: "Siri",
    icon: "/icon/siri.svg",
  },
];

export const getAppById = (id: string): AppConfig | undefined => {
  return appList.find((app) => app.id === id);
};
