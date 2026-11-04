"use client";

import React from "react";

interface TabletFrameProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
}

export default function TabletFrame({
  className = "",
  children,
  title = "Physio 3D iPadOS Studio",
}: TabletFrameProps) {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Outer Glow & Ambient Shadow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#006591]/15 via-[#39b8fd]/10 to-transparent rounded-[48px] blur-2xl opacity-75 pointer-events-none" />

      {/* Realistic iPad Pro Landscape Chassis */}
      <div className="relative w-full max-w-[820px] h-[480px] sm:h-[540px] bg-gradient-to-b from-[#2d3748] via-[#1a202c] to-[#0f172a] rounded-[36px] sm:rounded-[42px] p-[10px] sm:p-[12px] shadow-[0_25px_60px_-15px_rgba(0,55,82,0.3),0_0_0_1px_rgba(255,255,255,0.12)]">
        {/* Apple Pencil Pro Attached Magnetically at Top */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-3 bg-gradient-to-r from-slate-200 via-white to-slate-200 rounded-full shadow-md flex items-center justify-between px-3 text-[8px] font-mono text-slate-700 font-bold border border-slate-300 z-30">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span> PENCIL PRO</span>
          </div>
          <span className="text-emerald-600 font-bold">%100 ŞARJ</span>
        </div>

        {/* Front Camera Dot in top bezel */}
        <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black border border-neutral-700 z-30" />

        {/* Inner Screen Display */}
        <div className="relative w-full h-full bg-[#0a1926] rounded-[24px] sm:rounded-[28px] overflow-hidden border-[3px] border-[#0a0d14] flex flex-col shadow-inner">
          {/* iPadOS Status Bar */}
          <div className="relative z-30 pt-1.5 px-5 pb-1 flex items-center justify-between text-[11px] font-semibold text-white tracking-tight select-none bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-sky-400 font-bold">09:41</span>
              <span className="text-[10px] text-slate-400 hidden sm:inline">• Salı 4 Kasım</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-sky-300 font-bold uppercase tracking-wider">
                {title}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-300 text-[10px]">
              <span className="font-mono text-emerald-400 font-bold">120Hz ProMotion</span>
              <div className="w-4 h-2 border border-white/80 rounded-[2px] p-[1px] flex items-center">
                <div className="h-full w-full bg-emerald-400 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Screen Content Container */}
          <div className="relative flex-1 w-full h-full overflow-hidden bg-[#0a1926]">
            {children}
          </div>

          {/* Home Indicator Bar */}
          <div className="relative z-30 pb-1.5 pt-0.5 flex justify-center bg-black/40 backdrop-blur-md">
            <div className="w-36 h-1 bg-white/70 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
