import { BottomDock } from "@/src/widgets";
import AppWindow from "@/src/widgets/app-window/ui/AppWindow";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md absolute bottom-10 left-1/2 -translate-x-1/2">
        <BottomDock />
      </div>
      <AppWindow />
    </div>
  );
}
