import { useWindowState } from "../model/useWindowState";
import { BaseWindow } from "@/src/shared";

interface ManagedWindowProps {
  children: React.ReactNode;
}

export const ManagedWindow = ({ children }: ManagedWindowProps) => {
  const windows = useWindowState((state) => state.openWindows);
  const closeWindow = useWindowState((state) => state.closeWindow);

  return (
    <BaseWindow windows={windows} closeWindow={closeWindow}>
      {children}
    </BaseWindow>
  );
};
