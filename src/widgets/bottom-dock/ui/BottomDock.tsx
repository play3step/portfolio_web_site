"use client";

import { DockItem, appList } from "@/src/entities";
import { useWindowState } from "@/src/features";

const BottomDock = () => {
  const openWindow = useWindowState((state) => state.openWindow);

  return (
    <section
      className="
    w-fit bg-white/10 backdrop-blur-2xl 
    border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.37)] 
    flex items-center justify-center gap-3 px-4 py-3 rounded-2xl"
    >
      {appList.map((app) => (
        <DockItem
          key={app.id}
          id={app.id}
          label={app.label}
          icon={app.icon}
          onClick={() => openWindow(app.id)}
        />
      ))}
    </section>
  );
};

export default BottomDock;
