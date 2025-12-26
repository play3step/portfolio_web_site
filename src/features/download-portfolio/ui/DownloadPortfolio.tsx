"use client";

import { downloadHelpers } from "../lib/downloadHelpers";
import { useState } from "react";

export const DownloadPortfolio = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("kakao") || userAgent.includes("instagram")) {
      window.open("/portfolio.pdf", "_blank");
      return;
    }

    setIsLoading(true);
    await downloadHelpers("/portfolio.pdf", "hyeon's portfolio.pdf");
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className={`
        px-4 py-1.5 rounded-full text-[12px] font-medium transition-all
        ${
          isLoading
            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
            : "bg-white text-black hover:bg-white/90 active:scale-95"
        }
      `}
    >
      {isLoading ? "Downloading..." : "Get Portfolio"}
    </button>
  );
};
