"use client";

import { useBackgroundStore, backgrounds } from "@/src/entities";
import Image from "next/image";

export const BackgroundImage = () => {
  const currentBackgroundId = useBackgroundStore(
    (state) => state.currentBackgroundId
  );

  const currentBackground =
    backgrounds.find((bg) => bg.id === currentBackgroundId) || backgrounds[0];

  return (
    <Image
      key={currentBackground.id}
      src={currentBackground.path}
      alt="background"
      fill
      className="object-cover -z-10 transition-opacity duration-500"
      priority
      quality={95}
      sizes="100vw"
    />
  );
};
