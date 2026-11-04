"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IPhoneFrame from "@/components/IPhoneFrame";
import TabletFrame from "@/components/TabletFrame";
import { useLanguage } from "@/context/LanguageContext";

const AnatomyViewer3D = dynamic(() => import("@/components/AnatomyViewer3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] rounded-2xl bg-[#eff4ff] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-[#006591]/20 border-t-[#006591] animate-spin" />
        <span className="font-mono text-xs text-[#006591] tracking-wider font-semibold">
          3D CİHAZ SAHNESİ YÜKLENİYOR...
        </span>
      </div>
    </div>
  ),
});

export default function CihazDeneyimiPage() {
  const { t, language } = useLanguage();
  const [activeMode, setActiveMode] = useState<"all" | "tablet" | "phone">("all");

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      <Navbar activePath="/cihaz-deneyimi" />

      <main className="w-full pt-20 bg-[#f8f9ff]">
        {/* ================= SUB-HEADER ECOSYSTEM RIBBON (Stitch 1:1) ================= */}
        <div className="w-full bg-[#eff4ff] border-b border-[#e5eeff] py-3 px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-[#dce9ff] text-[#003752] font-mono text-[11px] font-bold">
              {t.devicePage.ecosystemBadge}
            </span>
            <span className="text-[#41474d] text-[13px] hidden md:inline">
              {t.devicePage.ecosystemDesc}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[#0b1c30] font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-[#006591] animate-pulse" />
              <span>{t.devicePage.cloudSyncActive}</span>
            </div>
            <a
              href="#cihaz-karsilastirma"
              className="text-[#006591] hover:text-[#003752] text-[12px] font-bold font-archivo uppercase tracking-wider transition-colors hidden sm:inline-block"
            >
              {t.devicePage.deviceMatrixLink}
            </a>
          </div>
        </div>

        {/* ================= SECTION 1: DUAL DEVICE HERO (Stitch 1:1) ================= */}
        <section className="w-full px-4 sm:px-6 lg:px-12 pt-6 sm:pt-8 pb-10 sm:pb-14 max-w-7xl mx-auto">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div className="flex flex-col gap-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#dce9ff] text-[#006591] text-[11px] font-bold uppercase tracking-wider font-archivo">
                    {t.devicePage.hardwarePerf}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#eff4ff] text-[#41474d] font-mono text-[11px]">
                    {t.devicePage.metalVulkan}
                  </span>
                </div>
                <h1 className="text-[30px] sm:text-[44px] text-[#003752] font-bold uppercase tracking-tight font-archivo leading-tight">
                  {t.devicePage.heroTitle}
                </h1>
                <p className="text-[14px] sm:text-[16px] text-[#41474d] leading-relaxed">
                  {t.devicePage.heroDesc}
                </p>
              </div>

              {/* Mode switch pills */}
              <div className="flex items-center bg-[#ffffff] p-1 rounded-xl shadow-xs border border-[#e5eeff] overflow-x-auto max-w-full scrollbar-none">
                <button
                  type="button"
                  onClick={() => setActiveMode("all")}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-[12px] font-bold font-archivo uppercase transition-all whitespace-nowrap ${
                    activeMode === "all"
                      ? "bg-[#003752] text-white shadow-xs"
                      : "text-[#41474d] hover:text-[#0b1c30]"
                  }`}
                >
                  <span className="sm:hidden">{t.devicePage.allShort}</span>
                  <span className="hidden sm:inline">{t.devicePage.allModes}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode("tablet")}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-[12px] font-bold font-archivo uppercase transition-all whitespace-nowrap ${
                    activeMode === "tablet"
                      ? "bg-[#003752] text-white shadow-xs"
                      : "text-[#41474d] hover:text-[#0b1c30]"
                  }`}
                >
                  {t.devicePage.tabletMode}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode("phone")}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-[12px] font-bold font-archivo uppercase transition-all whitespace-nowrap ${
                    activeMode === "phone"
                      ? "bg-[#003752] text-white shadow-xs"
                      : "text-[#41474d] hover:text-[#0b1c30]"
                  }`}
                >
                  {t.devicePage.phoneMode}
                </button>
              </div>
            </div>

            {/* Realistic Device Showcase Stage (Tablet & Phone) */}
            <div className="w-full flex justify-center items-center py-4">
              {activeMode === "all" && (
                <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
                  {/* Tablet View */}
                  <div className="w-full lg:w-3/5">
                    <TabletFrame title="iPad Pro 13'' • 3D Dissection Studio">
                      <AnatomyViewer3D
                        modelId="muscular"
                        showCard={false}
                        showHud={false}
                        showLayersWidget={false}
                        showLayerSwitcher={false}
                        showCameraControls={false}
                        showFooter={false}
                        height="h-full"
                      />
                    </TabletFrame>
                  </div>

                  {/* Phone View */}
                  <div className="w-full lg:w-2/5 flex justify-center">
                    <IPhoneFrame
                      screenSrc="/screens/exam-phone.png"
                      altText="Anatomi 3D iPhone Zilli Sınav Ekranı"
                      caption={language === "tr" ? "Masa #01: Abdomen Regio • 45s Geri Sayım" : "Station #01: Abdomen Regio • 45s Countdown"}
                      showSelector={false}
                    />
                  </div>
                </div>
              )}

              {activeMode === "tablet" && (
                <div className="w-full flex justify-center">
                  <div className="w-full max-w-4xl">
                    <TabletFrame title="iPad Pro 13'' • 3D Dissection Studio">
                      <AnatomyViewer3D
                        modelId="muscular"
                        showCard={false}
                        showHud={false}
                        showLayersWidget={false}
                        showLayerSwitcher={false}
                        showCameraControls={false}
                        showFooter={false}
                        height="h-full"
                      />
                    </TabletFrame>
                  </div>
                </div>
              )}

              {activeMode === "phone" && (
                <div className="w-full flex justify-center py-2">
                  <IPhoneFrame
                    initialScreen="exam"
                    showSelector={true}
                  />
                </div>
              )}
            </div>

            {/* Quick Platform Capability Micro-Trio */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#ffffff] border border-[#e5eeff] shadow-sm flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#006591] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">tablet_mac</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-[#003752] font-archivo">
                    {language === "tr" ? "iPad & Android Tablet" : "iPad & Android Tablet"}
                  </span>
                  <p className="text-[12px] text-[#41474d] mt-0.5 leading-relaxed">
                    {language === "tr"
                      ? "Basınç duyarlı stylus ile kadavra diseksiyon eskizleri, çift pencere PDF ve amfi ders kayıtları."
                      : "Pressure-sensitive stylus sketching, side-by-side PDF slide annotation and lecture viewing."}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#ffffff] border border-[#e5eeff] shadow-sm flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#006591] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">smartphone</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-[#003752] font-archivo">
                    {language === "tr" ? "Akıllı Telefon Mobil" : "Smartphone Mobile"}
                  </span>
                  <p className="text-[12px] text-[#41474d] mt-0.5 leading-relaxed">
                    {language === "tr"
                      ? "Tek elle kadavra salonu kontrolü, zilli sınav spot kartları ve intern nöbet modu."
                      : "One-handed cadaver lab navigation, bell exam spot cards and clinical night-shift lookups."}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#ffffff] border border-[#e5eeff] shadow-sm flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#006591] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">sync_saved_locally</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-[#003752] font-archivo">
                    {language === "tr" ? "480 MB Çevrimdışı Bellek" : "480 MB Offline Storage"}
                  </span>
                  <p className="text-[12px] text-[#41474d] mt-0.5 leading-relaxed">
                    {language === "tr"
                      ? "Sinyal almayan morfoloji bodrumlarında bile tam 3D kas-iskelet ve damar erişimi."
                      : "Full 3D anatomical access even inside windowless anatomy basement dissecting rooms."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 2: TABLET / IPAD DEEP DIVE (Stitch 1:1) ================= */}
        <section className="w-full px-6 lg:px-12 py-16 bg-[#ffffff] border-y border-[#e5eeff]" id="cihaz-karsilastirma">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-1 max-w-xl">
                <span className="text-[11px] text-[#006591] uppercase font-bold tracking-widest font-archivo">
                  Geniş Tuval • Amfi • Laboratuvar
                </span>
                <h2 className="text-[32px] text-[#003752] font-bold uppercase font-archivo">
                  Tablet & iPad Deneyimi
                </h2>
                <p className="text-[14px] text-[#41474d]">
                  Tıp fakültesi ders notlarınız, PDF slaytlarınız ve 3D kadavra modeli aynı anda ekranda. Stylus ile doğrudan anatomik yapı üzerine klinik notlar düşün.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#eff4ff] text-[#003752] font-mono text-[11px] font-semibold">
                  Apple Pencil 2 & Pro Uyumlu
                </span>
                <span className="px-3 py-1 rounded-full bg-[#eff4ff] text-[#006591] font-mono text-[11px] font-semibold">
                  Samsung S-Pen Destekli
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Feature 1: Apple Pencil Interaction Visual Box */}
              <div className="lg:col-span-7 rounded-2xl bg-[#eff4ff] p-6 flex flex-col justify-between gap-6 border border-[#dce9ff]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#6d001c]" />
                    <span className="text-[16px] text-[#003752] font-bold font-archivo">
                      Diseksiyon Çizim Katmanı & Not Alma
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#ffffff] text-[#003752] font-mono text-[11px] font-semibold">
                    4096 Basınç Kademesi
                  </span>
                </div>

                <div className="relative w-full h-72 rounded-xl bg-[#ffffff] overflow-hidden flex items-center justify-center p-6 border border-[#e5eeff]">
                  <div className="relative z-10 w-full max-w-md flex flex-col gap-3">
                    <div className="flex items-center justify-between bg-[#eff4ff] p-2 rounded-lg border border-[#dce9ff]">
                      <span className="font-mono text-[12px] text-[#006591] font-bold">
                        N. ISCHIADICUS (SİYATİK SİNİR)
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#dce9ff] text-[#003752] text-[10px] font-bold font-archivo">
                        L4 - S3 KÖKLERİ
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#ffffff] text-[#0b1c30] text-[12px] shadow-sm flex items-start gap-2 border border-[#e5eeff]">
                      <span className="material-symbols-outlined text-[16px] text-[#006591] shrink-0 mt-0.5">
                        edit
                      </span>
                      <p className="leading-relaxed">
                        Klinik İpucu: Foramen suprapiriforme yerine infrapiriformeden çıkar. M. piriformis spazmında tuzak nöropati (Piriformis Sendromu) gelişir.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-[#ffffff] border border-[#dce9ff]">
                    <span className="font-mono text-[11px] text-[#006591] font-bold block">
                      SPLIT-VIEW
                    </span>
                    <p className="text-[11px] text-[#41474d] mt-1">
                      GoodNotes veya Notlar uygulamasıyla yan yana 50/50 çalışma.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#ffffff] border border-[#dce9ff]">
                    <span className="font-mono text-[11px] text-[#006591] font-bold block">
                      DICOM 4K
                    </span>
                    <p className="text-[11px] text-[#41474d] mt-1">
                      BT ve MR kesitlerini 3D kadavra diseksiyonuyla eş zamanlı kaydırma.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#ffffff] border border-[#dce9ff]">
                    <span className="font-mono text-[11px] text-[#006591] font-bold block">
                      PROJEKSİYON
                    </span>
                    <p className="text-[11px] text-[#41474d] mt-1">
                      AirPlay ile amfi tahtasına gecikmesiz sunum yansıtma.
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Specification Card */}
              <div className="lg:col-span-5 rounded-2xl bg-[#dce9ff] p-6 flex flex-col justify-between gap-4 border border-[#c9e6ff]">
                <div className="flex flex-col gap-1">
                  <span className="px-3 py-1 rounded-full bg-[#ffffff] text-[#003752] text-[10px] font-bold uppercase font-archivo self-start">
                    Donanım Spesifikasyonu
                  </span>
                  <h3 className="text-[22px] text-[#003752] font-bold font-archivo">
                    Tablet Optimize Özellikleri
                  </h3>
                  <p className="text-[12px] text-[#41474d]">
                    iPad Pro ve Galaxy Tab S9 donanım hızlandırma matrisi.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="p-2.5 rounded-lg bg-[#ffffff] flex items-center justify-between">
                    <span className="text-[13px] text-[#0b1c30]">Kare Hızı (FPS)</span>
                    <span className="font-mono text-[12px] text-[#003752] font-bold">120 Hz ProMotion</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#ffffff] flex items-center justify-between">
                    <span className="text-[13px] text-[#0b1c30]">Pencil Gecikme Süresi</span>
                    <span className="font-mono text-[12px] text-[#006591] font-bold">9 ms Ultra Düşük</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#ffffff] flex items-center justify-between">
                    <span className="text-[13px] text-[#0b1c30]">Dokunma Örnekleme</span>
                    <span className="font-mono text-[12px] text-[#0b1c30] font-bold">240 Hz Algı</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#ffffff] flex items-center justify-between">
                    <span className="text-[13px] text-[#0b1c30]">Eşzamanlı Çoklu Pencere</span>
                    <span className="font-mono text-[12px] text-[#0b1c30] font-bold">Stage Manager</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#003752] text-white flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold uppercase font-archivo">
                      Apple Pencil Hover Desteği
                    </span>
                    <span className="text-[11px] text-white/80">
                      Kalemi dokundurmadan kas orijin ve insersiyolarını önizleyin.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 3: REAL MOBILE SCREENSHOTS (Stitch 1:1) ================= */}
        <section className="w-full px-6 lg:px-12 py-16">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            <div className="flex flex-col gap-2 text-center items-center max-w-2xl mx-auto">
              <span className="px-3 py-1 rounded-full bg-[#dce9ff] text-[#003752] text-[11px] font-bold uppercase font-archivo">
                Gerçek Arayüz Vitrini
              </span>
              <h2 className="text-[32px] text-[#003752] font-bold uppercase font-archivo">
                Gerçek Mobil Deneyim • Canlı Ekran Görüntüleri
              </h2>
              <p className="text-[14px] text-[#41474d]">
                Mobil uygulamamızdan alınan gerçek ekran kesitleri: Sırt diseksiyonu, omurga sinir katmanları, 28 günlük çalışma serisi ve sistem hakimiyeti takip matrisi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-items-center">
              {/* Phone Frame 1: Dorsal Dissection */}
              <div className="flex flex-col items-center gap-4">
                <IPhoneFrame
                  screenSrc="/screens/dorsal.png"
                  altText="Sırt ve omurga katmanları mobil 3D diseksiyon görünümü"
                  caption="Sırt & Omurga Diseksiyonu"
                />
                <div className="text-center max-w-xs">
                  <span className="text-[15px] text-[#003752] font-bold uppercase font-archivo block">
                    Sırt & Omurga Diseksiyonu
                  </span>
                  <p className="text-[12px] text-[#41474d] mt-1">
                    Kaslar, bağlar, omurilik sinirleri ve atardamarların çoklu filtre seçimi.
                  </p>
                </div>
              </div>

              {/* Phone Frame 2: Streak & Profile */}
              <div className="flex flex-col items-center gap-4">
                <IPhoneFrame
                  screenSrc="/screens/streak2.png"
                  altText="Çalışma serisi ve sistem hakimiyeti profil ekranı"
                  caption="Profil & Başarı Takibi"
                />
                <div className="text-center max-w-xs">
                  <span className="text-[15px] text-[#003752] font-bold uppercase font-archivo block">
                    Seri & Hakimiyet Matrisi
                  </span>
                  <p className="text-[12px] text-[#41474d] mt-1">
                    28 günlük ısı haritası, komite puanı ve günlük XP takibi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
