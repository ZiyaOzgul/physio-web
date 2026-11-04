"use client";

import React, { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  activePath?: string;
}

export default function Navbar({ activePath = "/" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Ana Sayfa" },
    { href: "/atlas", label: "3D Atlas & Katmanlar" },
    { href: "/ogrenme-yolu", label: "Öğrenme Yolu" },
    { href: "/zilli-sinav", label: "Zilli Sınav Masası" },
    { href: "/cihaz-deneyimi", label: "Cihaz Deneyimi" },
    { href: "/topluluk-ve-indir", label: "Topluluk & İndir" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#ffffff]/95 backdrop-blur-xl border-b border-[#e5eeff] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
          <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg bg-[#003752] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <span className="material-symbols-outlined text-[20px] sm:text-[22px]">view_in_ar</span>
          </div>
          <div className="flex flex-col whitespace-nowrap">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-bold uppercase tracking-tight text-[#003752] text-[16px] sm:text-[17px] leading-tight font-archivo">
                ANATOMI 3D
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase px-2 py-0.5 rounded bg-[#e5eeff] text-[#006591] font-semibold tracking-wide">
                Tıp Fakültesi Sürümü
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#41474d] leading-tight">
              Klinik ve Dijital Anatomi Sistemi
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links - Single Line */}
        <nav className="hidden xl:flex items-center gap-1 text-[#41474d] shrink-0">
          {navLinks.map((link) => {
            const isActive = activePath === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-[14px] transition-colors rounded-lg whitespace-nowrap ${
                  isActive
                    ? "bg-[#e5eeff] text-[#003752] font-semibold shadow-sm"
                    : "hover:bg-[#eff4ff] hover:text-[#0b1c30]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <Link
            href="/atlas"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#006591] text-[13px] font-semibold transition-all whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[17px]">deployed_code</span>
            <span>Web Atlası Başlat</span>
          </Link>
          <Link
            href="/topluluk-ve-indir"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg bg-[#003752] hover:bg-[#1f4e6b] text-white text-[13px] font-semibold shadow-sm transition-all whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[17px]">install_mobile</span>
            <span className="hidden sm:inline">Uygulamayı İndir</span>
            <span className="sm:hidden">İndir</span>
          </Link>
          <div className="hidden sm:flex w-8 h-8 rounded-full bg-[#003752] items-center justify-center text-white shrink-0 ml-0.5 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#003752] hover:bg-[#eff4ff] rounded-lg transition-colors ml-0.5"
            aria-label="Menüyü Aç"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#ffffff] border-b border-[#e5eeff] px-6 py-4 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                activePath === link.href
                  ? "bg-[#e5eeff] text-[#003752] font-semibold"
                  : "text-[#41474d] hover:bg-[#eff4ff]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#e5eeff] flex flex-col gap-2">
            <Link
              href="/atlas"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-[#eff4ff] text-[#006591] font-semibold text-sm"
            >
              Web Atlası Başlat
            </Link>
            <Link
              href="/topluluk-ve-indir"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-[#003752] text-white font-semibold text-sm"
            >
              Uygulamayı İndir
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
