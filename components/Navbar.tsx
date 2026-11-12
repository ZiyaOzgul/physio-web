"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  activePath?: string;
}

export default function Navbar({ activePath = "/" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { session, profile, signOut } = useAuth();

  useEffect(() => {
    if (typeof document === "undefined") return;
    const titlesTr: Record<string, string> = {
      "/": "Anatomi 3D | Tıp Fakültesi 3D Diseksiyon Atlası & Zilli Sınav",
      "/atlas": "3D Diseksiyon Atlası | Anatomi 3D",
      "/ogrenme-yolu": "Komite Öğrenme Yolu & Müfredat | Anatomi 3D",
      "/zilli-sinav": "Zilli Kadavra Sınavı Simülatörü (OSCE) | Anatomi 3D",
      "/cihaz-deneyimi": "Çoklu Cihaz & Tablet/Mobil Deneyimi | Anatomi 3D",
      "/topluluk-ve-indir": "Fakülte Topluluğu & Uygulamayı İndir | Anatomi 3D",
      "/kemik-anatomisi": "3D Osteoloji Atlası & Kemik Anatomisi | Anatomi 3D",
      "/profil": "Öğrenci Profili | Anatomi 3D",
      "/kvkk": "Kullanım Koşulları & KVKK Aydınlatma Metni | Anatomi 3D",
    };
    const titlesEn: Record<string, string> = {
      "/": "Anatomy 3D | Medical School 3D Dissection Atlas & Bell Exam",
      "/atlas": "3D Dissection Atlas | Anatomy 3D",
      "/ogrenme-yolu": "Committee Learning Path & Curriculum | Anatomy 3D",
      "/zilli-sinav": "Cadaver Bell Exam Simulator (OSCE) | Anatomy 3D",
      "/cihaz-deneyimi": "Cross-Device Tablet & Mobile Studio | Anatomy 3D",
      "/topluluk-ve-indir": "Faculty Study Pods & Download App | Anatomy 3D",
      "/kemik-anatomisi": "3D Bone Anatomy & Osteology Atlas | Anatomy 3D",
      "/profil": "Student Profile | Anatomy 3D",
      "/kvkk": "Terms of Use, Privacy & GDPR Compliance | Anatomy 3D",
    };
    const pathKey = activePath || window.location.pathname || "/";
    document.title =
      (language === "tr" ? titlesTr[pathKey] : titlesEn[pathKey]) ||
      (language === "tr" ? titlesTr["/"] : titlesEn["/"]);
  }, [activePath, language]);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/atlas", label: t.nav.atlas },
    { href: "/kemik-anatomisi", label: t.nav.osteology },
    { href: "/ogrenme-yolu", label: t.nav.learn },
    { href: "/zilli-sinav", label: t.nav.exam },
    { href: "/cihaz-deneyimi", label: t.nav.device },
    { href: "/topluluk-ve-indir", label: t.nav.community },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-ground border-b border-line">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" width={40} height={40} className="w-10 h-10 object-contain" />
          <div className="flex flex-col whitespace-nowrap">
            <span className="font-archivo font-semibold uppercase tracking-wide text-ink text-[19px] leading-none">
              Anatomi 3D
            </span>
            <span className="hidden 2xl:block text-[11px] text-ink-soft leading-tight mt-1">
              {t.nav.brandTagline}
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links - Single Line */}
        <nav className="hidden xl:flex items-center gap-1 text-[#5d5d60] shrink-0">
          {navLinks.map((link) => {
            const isActive = activePath === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-2.5 py-2 text-[14px] transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-ink font-semibold after:absolute after:left-2.5 after:right-2.5 after:-bottom-[23px] after:h-[2px] after:bg-accent"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Language Switcher Pill */}
          <div className="flex items-center p-0.5 rounded-lg bg-[#ececee] border border-[#e3e3e6] text-[11px] font-bold font-archivo">
            <button
              type="button"
              onClick={() => setLanguage("tr")}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                language === "tr"
                  ? "bg-[#416180] text-white"
                  : "text-[#5d5d60] hover:text-[#1d1f20]"
              }`}
              title="Türkçe"
            >
              TR
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                language === "en"
                  ? "bg-[#416180] text-white"
                  : "text-[#5d5d60] hover:text-[#1d1f20]"
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          <Link
            href="/atlas"
            className="hidden md:inline-flex xl:hidden 2xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-line-strong hover:border-ink text-ink text-[13px] font-semibold transition-colors whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[17px]">deployed_code</span>
            <span>{t.nav.startWebAtlas}</span>
          </Link>
          <Link
            href="/topluluk-ve-indir"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg bg-[#416180] hover:bg-[#2c455d] text-white text-[13px] font-semibold transition-all whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[17px]">smartphone</span>
            <span className="hidden sm:inline xl:hidden 2xl:inline">{t.nav.downloadApp}</span>
            <span className="sm:hidden xl:inline 2xl:hidden">{t.nav.downloadShort}</span>
          </Link>
          {/* Student Profile Button & Popover (real data from the shared Supabase project) */}
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              className="w-8 h-8 rounded-full bg-[#416180] hover:bg-[#2c455d] flex items-center justify-center text-white shrink-0 ml-0.5 transition-transform cursor-pointer"
              title={language === "tr" ? "Öğrenci Profili" : "Student Profile"}
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2.5 w-64 rounded-[14px] bg-[#ffffff] border border-[#e3e3e6] p-4 z-50 flex flex-col gap-3">
                {session ? (
                  <>
                    <div className="flex flex-col border-b border-[#dcdcdf] pb-2.5">
                      <span className="text-[13px] font-bold text-[#1d1f20] font-archivo truncate">
                        {typeof profile?.display_name === "object" && profile?.display_name !== null
                          ? ((profile.display_name as Record<string, string>)[language] ?? (profile.display_name as Record<string, string>).tr ?? session.user.email)
                          : (profile?.display_name ?? session.user.email)}
                      </span>
                      <span className="text-[11px] text-[#5d5d60] truncate">
                        {profile
                          ? `@${
                              typeof profile.handle === "object" && profile.handle !== null
                                ? ((profile.handle as Record<string, string>)[language] ?? (profile.handle as Record<string, string>).tr)
                                : profile.handle
                            }`
                          : session.user.email}
                      </span>
                    </div>
                    {profile && (
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 rounded-[10px] bg-[#ececee] flex flex-col">
                          <span className="text-[10px] text-[#5d5d60]">
                            {language === "tr" ? "Aktif Seri" : "Active Streak"}
                          </span>
                          <span className="text-[13px] font-bold text-[#8f3537] font-data">
                            {profile.streak} {language === "tr" ? "Gün" : "Days"}
                          </span>
                        </div>
                        <div className="p-2 rounded-[10px] bg-[#ececee] flex flex-col">
                          <span className="text-[10px] text-[#5d5d60]">
                            {language === "tr" ? "Toplam XP" : "Total XP"}
                          </span>
                          <span className="text-[13px] font-bold text-[#416180] font-data">
                            {profile.total_xp} XP
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col gap-1 pt-1">
                      <Link
                        href="/profil"
                        onClick={() => setProfileOpen(false)}
                        className="px-3 py-1.5 rounded-lg bg-[#ececee] hover:bg-[#e3e3e6] text-[#1d1f20] text-[12px] font-semibold flex items-center justify-between transition-colors"
                      >
                        <span>{language === "tr" ? "Profilim & Hesap Ayarları" : "My Profile & Account"}</span>
                        <span className="material-symbols-outlined text-[15px]">chevron_right</span>
                      </Link>
                      <Link
                        href="/kvkk"
                        onClick={() => setProfileOpen(false)}
                        className="px-3 py-1.5 rounded-lg hover:bg-[#ececee] text-[#5d5d60] text-[12px] font-medium flex items-center justify-between transition-colors"
                      >
                        <span>{language === "tr" ? "Veri & İzin Tercihleri" : "Privacy & Consent"}</span>
                        <span className="material-symbols-outlined text-[15px]">tune</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setProfileOpen(false);
                          void signOut();
                        }}
                        className="px-3 py-1.5 rounded-lg hover:bg-[#f7e5e5] text-[#b8494b] text-[12px] font-medium flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span>{language === "tr" ? "Çıkış Yap" : "Sign Out"}</span>
                        <span className="material-symbols-outlined text-[15px]">logout</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] font-bold text-[#1d1f20] font-archivo">
                        {language === "tr" ? "Henüz giriş yapmadınız" : "You are not signed in"}
                      </span>
                      <span className="text-[11px] text-[#5d5d60]">
                        {language === "tr"
                          ? "Mobil uygulamadaki hesabınızla giriş yapın."
                          : "Sign in with your mobile app account."}
                      </span>
                    </div>
                    <Link
                      href="/profil"
                      onClick={() => setProfileOpen(false)}
                      className="px-3 py-2 rounded-lg bg-[#416180] hover:bg-[#2c455d] text-white text-[12px] font-semibold text-center transition-colors"
                    >
                      {language === "tr" ? "Giriş Yap" : "Sign In"}
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#1d1f20] hover:bg-[#ececee] rounded-lg transition-colors ml-0.5"
            aria-label={mobileMenuOpen ? t.nav.menuClose : t.nav.menuOpen}
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#ffffff] border-b border-[#dcdcdf] px-6 py-4 space-y-2 animate-in slide-in-from-top-2 duration-150">
          {/* Mobile Language Switcher Row */}
          <div className="flex items-center justify-between pb-3 border-b border-[#dcdcdf]">
            <span className="text-xs font-semibold text-[#5d5d60]">Dil / Language:</span>
            <div className="flex items-center p-0.5 rounded-lg bg-[#ececee] border border-[#e3e3e6] text-[12px] font-bold font-archivo">
              <button
                type="button"
                onClick={() => setLanguage("tr")}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  language === "tr"
                    ? "bg-[#416180] text-white"
                    : "text-[#5d5d60] hover:text-[#1d1f20]"
                }`}
              >
                Türkçe (TR)
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  language === "en"
                    ? "bg-[#416180] text-white"
                    : "text-[#5d5d60] hover:text-[#1d1f20]"
                }`}
              >
                English (EN)
              </button>
            </div>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                activePath === link.href
                  ? "bg-[#dcdcdf] text-[#1d1f20] font-semibold"
                  : "text-[#5d5d60] hover:bg-[#ececee]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#dcdcdf] flex flex-col gap-2">
            <Link
              href="/profil"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg border border-[#e3e3e6] text-[#1d1f20] font-semibold text-sm"
            >
              {session
                ? language === "tr"
                  ? "Profilim"
                  : "My Profile"
                : language === "tr"
                ? "Giriş Yap"
                : "Sign In"}
            </Link>
            <Link
              href="/atlas"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-[#ececee] text-[#416180] font-semibold text-sm"
            >
              {t.nav.startWebAtlas}
            </Link>
            <Link
              href="/topluluk-ve-indir"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-[#416180] text-white font-semibold text-sm"
            >
              {t.nav.downloadApp}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
