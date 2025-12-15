import { DockItem } from "@/src/shared";

const BottomDock = () => {
  return (
    <section className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.37)] flex items-center justify-center gap-3 px-4 py-3 rounded-2xl">
      <DockItem item={{ label: "settings" }} />
      <DockItem item={{ label: "moreview" }} />
      <DockItem item={{ label: "planding" }} />
      <DockItem item={{ label: "maplelink" }} />
      <DockItem item={{ label: "zoopzoop" }} />
      <DockItem item={{ label: "siri" }} />
    </section>
  );
};

export default BottomDock;
