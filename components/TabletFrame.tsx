"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface TabletFrameProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
}

export default function TabletFrame({
  className = "",
  children,
  title = "Anatomi 3D",
}: TabletFrameProps) {
  const { language } = useLanguage();
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Outer Glow & Ambient Shadow */}
      <div className="hidden opacity-75 pointer-events-none" />

      {/* Realistic iPad Pro Landscape Chassis */}
      <div className="relative w-full max-w-[820px] h-[340px] sm:h-[480px] md:h-[540px] bg-gradient-to-b from-[#424244] via-[#2b2b2d] to-[#0f172a] rounded-[28px] sm:rounded-[42px] p-[8px] sm:p-[12px]">
        {/* Front Camera Dot in top bezel */}
        <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black border border-neutral-700 z-30" />

        {/* Inner Screen Display */}
        <div className="relative w-full h-full bg-stage rounded-[24px] sm:rounded-[28px] overflow-hidden border-[3px] border-[#0a0d14] flex flex-col">
          {/* iPadOS Status Bar */}
          <div className="relative z-30 pt-1.5 px-5 pb-1 flex items-center justify-between text-[11px] font-semibold text-white tracking-tight select-none bg-black/40">
            <div className="flex items-center gap-2">
              <span className="font-data text-[10px] text-[#94bce3] font-bold">09:41</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-data text-[#b5d9fd] font-bold uppercase tracking-wider">
                {title}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[#d4d4d7] text-[10px]">
              <div className="w-4 h-2 border border-white/80 rounded-[2px] p-[1px] flex items-center">
                <div className="h-full w-full bg-white/80 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Screen Content Container */}
          <div className="relative flex-1 w-full h-full overflow-hidden bg-[#0a1926]">
            {children}
          </div>

          {/* Home Indicator Bar */}
          <div className="relative z-30 pb-1.5 pt-0.5 flex justify-center bg-black/40">
            <div className="w-36 h-1 bg-white/70 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
