import React from "react";

export const Header = () => {
  return (
    <header
      className="
      fixed top-0 left-0 right-0 z-50 w-full h-12
     bg-[#1d1d1f]/80 backdrop-blur-md border-b border-white/10 flex 
     justify-between items-center px-4
     text-white"
    >
      <p>hyeon&apos;s portfolio</p>
      <div className="cursor-pointer">download</div>
    </header>
  );
};
