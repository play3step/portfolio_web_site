"use client";

import { DockItem } from "@/src/shared";
import { useWindowState } from "../../app-window";

const BottomDock = () => {
  const openWindow = useWindowState((state) => state.openWindow);

  return (
    <section
      className="
    w-fit bg-white/10 backdrop-blur-2xl 
    border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.37)] 
    flex items-center justify-center gap-3 px-4 py-3 rounded-2xl"
    >
      <DockItem
        item={{ label: "settings" }}
        onClick={() => openWindow("settings")}
      />
      <DockItem
        item={{ label: "moreview" }}
        onClick={() => openWindow("moreview")}
      />
      <DockItem
        item={{ label: "planding" }}
        onClick={() => openWindow("planding")}
      />
      <DockItem
        item={{ label: "maplelink" }}
        onClick={() => openWindow("maplelink")}
      />
      <DockItem
        item={{ label: "zoopzoop" }}
        onClick={() => openWindow("zoopzoop")}
      />
      <DockItem item={{ label: "siri" }} onClick={() => openWindow("siri")} />
    </section>
  );
};

export default BottomDock;
