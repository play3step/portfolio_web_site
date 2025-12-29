import DeemoIcon from "./logo/deemo.svg";
import MoreviewIcon from "./logo/moreview.svg";
import PlandingIcon from "./logo/planding.svg";
import MaplelinkIcon from "./logo/maplelink.svg";
import ZoopzoopIcon from "./logo/zoopzoop.svg";

import SettingsIcon from "./icon/settings.svg";
import ChatbotIcon from "./icon/siri.svg";
import GlassIcon from "./icon/glass.svg";

import backgroundImage from "./background/background1.jpg";
import background2Image from "./background/background2.png";
import background3Image from "./background/background3.png";
import background4Image from "./background/background4.png";

export const BackgroundImages = {
  background1: backgroundImage,
  background2: background2Image,
  background3: background3Image,
  background4: background4Image,
} as const;

export const AppIcons = {
  moreview: MoreviewIcon,
  planding: PlandingIcon,
  maplelink: MaplelinkIcon,
  zoopzoop: ZoopzoopIcon,
  deemo: DeemoIcon,
  settings: SettingsIcon,
  chatbot: ChatbotIcon,
  glass: GlassIcon,
} as const;
