"use client";

import { useBackgroundStore } from "@/src/entities";
import Image from "next/image";

export const BackgroundImage = () => {
  const currentBackground = useBackgroundStore(
    (state) => state.currentBackground
  );

  return (
    <Image
      key={currentBackground}
      src={currentBackground}
      alt="background"
      fill
      className="object-cover -z-10 transition-opacity duration-500"
      priority
      quality={95}
      sizes="100vw"
    />
  );
};
