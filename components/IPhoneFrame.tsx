"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ScreenItem {
  id: string;
  name: string;
  badge: string;
  src: string;
  description: string;
}

const SCREENS: ScreenItem[] = [
  {
    id: "streak",
    name: "Streak & Profil",
    badge: "28 GÜNLÜK SERİ",
    src: "/screens/streak2.png",
    description: "28 günlük çalışma serisi, 100 XP komite hedefi ve anatomik sistem hakimiyeti.",
  },
  {
    id: "exam",
    name: "Zilli Sınav Masası",
    badge: "45 SN GERİ SAYIM",
    src: "/screens/exam-phone.png",
    description: "Kadavra masası gerçeğinde 45 saniyelik zil periyotları ve iğneli yapı tespiti.",
  },
  {
    id: "atlas",
    name: "3D Diseksiyon",
    badge: "6 KATMAN",
    src: "/screens/atlas.png",
    description: "Kas, iskelet, damar ve organ katmanlarını derinlemesine diseke edin.",
  },
  {
    id: "learn",
    name: "Öğrenme Yolu",
    badge: "KOMİTE MÜFREDATI",
    src: "/screens/learn.png",
    description: "Dönem ve komite bazlı interaktif öğrenme haritası ve çıkmış sorular.",
  },
  {
    id: "dorsal",
    name: "Sırt & Omurga",
    badge: "TOPOGRAFİK",
    src: "/screens/dorsal.png",
    description: "Sırt ve paravertebral derin kas planlarının 3 boyutlu anatomik ilişkisi.",
  },
];

interface IPhoneFrameProps {
  className?: string;
  initialScreen?: string;
  onScreenChange?: (screen: ScreenItem) => void;
  showSelector?: boolean;
  screenSrc?: string;
  altText?: string;
  caption?: string;
  children?: React.ReactNode;
}

export default function IPhoneFrame({
  className = "",
  initialScreen = "streak",
  onScreenChange,
  showSelector = true,
  screenSrc,
  altText,
  caption,
  children,
}: IPhoneFrameProps) {
  const [activeId, setActiveId] = useState(initialScreen);
  const activeScreen = SCREENS.find((s) => s.id === activeId) || SCREENS[0];

  const currentSrc = screenSrc || activeScreen.src;
  const currentAlt = altText || activeScreen.name;
  const currentCaption = caption || activeScreen.description;

  const handleSelect = (screen: ScreenItem) => {
    setActiveId(screen.id);
    if (onScreenChange) onScreenChange(screen);
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Screen Selector Pills */}
      {showSelector && !screenSrc && (
        <div className="flex flex-wrap justify-center gap-1.5 p-1.5 mb-6 bg-[#ffffff] rounded-2xl border border-[#e5eeff] shadow-sm max-w-full">
          {SCREENS.map((screen) => {
            const isSelected = screen.id === activeId;
            return (
              <button
                key={screen.id}
                onClick={() => handleSelect(screen)}
                className={`px-3.5 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5 font-medium ${
                  isSelected
                    ? "bg-[#003752] text-white font-semibold shadow-sm scale-102"
                    : "text-[#41474d] hover:text-[#003752] hover:bg-[#eff4ff]"
                }`}
              >
                <span>{screen.name}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39b8fd]" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Realistic iPhone Device Container */}
      <div className="relative group perspective-1000">
        {/* Soft Ambient Shadow */}
        <div className="absolute -inset-4 bg-gradient-to-tr from-[#006591]/10 via-[#1f4e6b]/5 to-transparent rounded-[60px] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Outer Titanium Chassis */}
        <div className="relative w-[285px] sm:w-[315px] h-[580px] sm:h-[640px] bg-gradient-to-b from-[#2d3748] via-[#1a202c] to-[#171923] rounded-[52px] sm:rounded-[56px] p-[10px] sm:p-[11px] shadow-[0_20px_50px_-12px_rgba(0,55,82,0.25),0_0_0_1px_rgba(255,255,255,0.15),inset_0_1px_2px_rgba(255,255,255,0.4)] transition-transform duration-500 ease-out hover:scale-[1.01]">
          {/* Side Buttons - Left (Action + Volume) */}
          <div className="absolute -left-[3px] top-[108px] w-[3px] h-[24px] bg-[#2d3748] rounded-l-sm" />
          <div className="absolute -left-[3px] top-[146px] w-[3px] h-[46px] bg-[#2d3748] rounded-l-sm" />
          <div className="absolute -left-[3px] top-[204px] w-[3px] h-[46px] bg-[#2d3748] rounded-l-sm" />

          {/* Side Button - Right (Power) */}
          <div className="absolute -right-[3px] top-[158px] w-[3px] h-[70px] bg-[#2d3748] rounded-r-sm" />

          {/* Inner Display Bezel */}
          <div className="relative w-full h-full bg-black rounded-[42px] sm:rounded-[45px] overflow-hidden border-[4px] border-[#0a0d14] shadow-inner">
            
            {/* Screen Content Container */}
            <div className="relative w-full h-full bg-[#030d17] flex flex-col">
              
              {/* Dynamic Island & iOS Status Bar */}
              <div className="relative z-30 pt-2.5 px-6 pb-1 flex items-center justify-between text-[11px] font-semibold text-white tracking-tight select-none">
                <span className="w-10">09:41</span>

                {/* Dynamic Island Capsule */}
                <div className="w-[84px] sm:w-[92px] h-[24px] sm:h-[26px] bg-black rounded-full flex items-center justify-between px-2.5 shadow-sm border border-neutral-800">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#39b8fd] animate-ping opacity-75" />
                    <span className="w-2 h-2 rounded-full bg-[#006591] -ml-3" />
                    <span className="text-[9px] text-[#39b8fd] font-mono pl-1">TA2</span>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10141a] border border-neutral-700 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-sky-500/40" />
                  </div>
                </div>

                {/* Status Bar Icons */}
                <div className="w-10 flex items-center justify-end gap-1.5 text-slate-200">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.79-1.79C9.09 19.64 10.49 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                  </svg>
                  <div className="w-5 h-2.5 border border-white/80 rounded-[3px] p-[1px] flex items-center">
                    <div className="h-full w-3/4 bg-white rounded-[1px]" />
                  </div>
                </div>
              </div>

              {/* Main App Display Area */}
              <div className="relative flex-1 w-full overflow-hidden bg-[#020b14]">
                {children ? (
                  children
                ) : (
                  <>
                    <Image
                      key={currentSrc}
                      src={currentSrc}
                      alt={currentAlt}
                      fill
                      sizes="(max-width: 640px) 285px, 315px"
                      className="object-cover object-top transition-all duration-300 select-none"
                      priority
                    />

                    {/* Subtle Glass Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
                    
                    {/* Active Screen Info Capsule at bottom */}
                    <div className="absolute bottom-5 left-3 right-3 bg-[#ffffff]/95 backdrop-blur-md rounded-xl p-2.5 border border-[#e5eeff] shadow-lg text-left">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[11px] font-bold text-[#003752]">
                          {screenSrc ? currentAlt : activeScreen.name}
                        </span>
                        <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#eff4ff] text-[#006591] border border-[#dce9ff] font-bold">
                          {screenSrc ? "CANLI GÖRÜNÜM" : activeScreen.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#41474d] leading-tight">
                        {currentCaption}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Home Indicator Bar */}
              <div className="relative z-30 pb-2 pt-1 flex justify-center bg-black">
                <div className="w-28 h-1 bg-white/70 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
