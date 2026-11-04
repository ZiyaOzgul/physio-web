"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IPhoneFrame from "@/components/IPhoneFrame";
import TabletFrame from "@/components/TabletFrame";
import type { DissectionLayersState } from "@/components/AnatomyViewer3D";
import { useLanguage } from "@/context/LanguageContext";

const AnatomyViewer3D = dynamic(() => import("@/components/AnatomyViewer3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] rounded-2xl bg-[#eff4ff] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-[#006591]/20 border-t-[#006591] animate-spin" />
        <span className="font-mono text-xs text-[#006591] tracking-wider font-semibold">
          3D DEVICE SCENE LOADING...
        </span>
      </div>
    </div>
  ),
});

export default function CihazDeneyimiPage() {
  const { t, language } = useLanguage();
  const [activeMode, setActiveMode] = useState<"all" | "tablet" | "phone">("all");
  const [syncLayers, setSyncLayers] = useState<DissectionLayersState>({
    skeleton: true,
    muscle: true,
    vascular: true,
    nervous: false,
    organs: true,
  });
  const [syncMuscleOpacity, setSyncMuscleOpacity] = useState<number>(0.85);

  const toggleSyncLayer = (key: keyof DissectionLayersState) => {
    setSyncLayers((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (!Object.values(next).some(Boolean)) {
        next[key] = true;
      }
      return next;
    });
  };

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

            {/* Live Synchronized Dissection Control Strip */}
            <div className="w-full p-3 sm:p-4 rounded-2xl bg-[#ffffff] border border-[#dce9ff] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-[#003752] uppercase font-archivo tracking-wide">
                    {language === "tr"
                      ? "Canlı Cihazlar Arası Katman Senkronizasyonu"
                      : "Live Cross-Device Dissection Sync"}
                  </span>
                  <span className="text-[11px] text-[#41474d]">
                    {language === "tr"
                      ? "Aşağıdaki katmanları açıp kapattığınızda hem Tablet hem Telefon 3D modeli eşzamanlı güncellenir."
                      : "Toggling layers below updates both the Tablet and Phone 3D viewports simultaneously in real time."}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                {(
                  [
                    { key: "skeleton", label: t.viewer.skeleton },
                    { key: "muscle", label: t.viewer.muscle },
                    { key: "vascular", label: t.viewer.vascular },
                    { key: "nervous", label: t.viewer.nervous },
                    { key: "organs", label: t.viewer.organs },
                  ] as const
                ).map((item) => {
                  const active = syncLayers[item.key];
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => toggleSyncLayer(item.key)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold font-archivo uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                        active
                          ? "bg-[#003752] text-white shadow-xs"
                          : "bg-[#eff4ff] text-[#41474d] hover:text-[#003752]"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          active ? "bg-[#39b8fd]" : "bg-[#c1c7ce]"
                        }`}
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}

                {syncLayers.muscle && (
                  <button
                    type="button"
                    onClick={() =>
                      setSyncMuscleOpacity((prev) => (prev > 0.4 ? 0.25 : 0.85))
                    }
                    className="px-2.5 py-1.5 rounded-lg bg-[#dce9ff] hover:bg-[#c9e6ff] text-[#003752] text-[11px] font-mono font-bold transition-all cursor-pointer"
                  >
                    {syncMuscleOpacity < 0.4
                      ? language === "tr"
                        ? "KAS: %25 SOYULMUŞ"
                        : "MUSCLE: 25% PEELED"
                      : language === "tr"
                      ? "KAS SOY (%25)"
                      : "PEEL MUSCLE (25%)"}
                  </button>
                )}
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
                        activeLayers={syncLayers}
                        onLayersChange={setSyncLayers}
                        muscleOpacity={syncMuscleOpacity}
                        onMuscleOpacityChange={setSyncMuscleOpacity}
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
                    <IPhoneFrame showSelector={false}>
                      <AnatomyViewer3D
                        activeLayers={syncLayers}
                        onLayersChange={setSyncLayers}
                        muscleOpacity={syncMuscleOpacity}
                        onMuscleOpacityChange={setSyncMuscleOpacity}
                        showCard={false}
                        showHud={false}
                        showLayersWidget={false}
                        showLayerSwitcher={false}
                        showCameraControls={false}
                        showFooter={false}
                        height="h-full"
                      />
                    </IPhoneFrame>
                  </div>
                </div>
              )}

              {activeMode === "tablet" && (
                <div className="w-full flex justify-center">
                  <div className="w-full max-w-4xl">
                    <TabletFrame title="iPad Pro 13'' • 3D Dissection Studio">
                      <AnatomyViewer3D
                        activeLayers={syncLayers}
                        onLayersChange={setSyncLayers}
                        muscleOpacity={syncMuscleOpacity}
                        onMuscleOpacityChange={setSyncMuscleOpacity}
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
                  <IPhoneFrame showSelector={false}>
                    <AnatomyViewer3D
                      activeLayers={syncLayers}
                      onLayersChange={setSyncLayers}
                      muscleOpacity={syncMuscleOpacity}
                      onMuscleOpacityChange={setSyncMuscleOpacity}
                      showCard={false}
                      showHud={false}
                      showLayersWidget={false}
                      showLayerSwitcher={false}
                      showCameraControls={false}
                      showFooter={false}
                      height="h-full"
                    />
                  </IPhoneFrame>
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
                  {language === "tr" ? "Geniş Tuval • Amfi • Laboratuvar" : "Wide Canvas • Lecture Hall • Lab"}
                </span>
                <h2 className="text-[32px] text-[#003752] font-bold uppercase font-archivo">
                  {language === "tr" ? "Tablet & iPad Deneyimi" : "Tablet & iPad Experience"}
                </h2>
                <p className="text-[14px] text-[#41474d]">
                  {language === "tr"
                    ? "Tıp fakültesi ders notlarınız, PDF slaytlarınız ve 3D kadavra modeli aynı anda ekranda. Stylus ile doğrudan anatomik yapı üzerine klinik notlar düşün."
                    : "Keep your medical lecture notes, PDF slides, and 3D cadaver specimen side by side on screen. Annotate directly onto anatomical structures with your stylus."}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#eff4ff] text-[#003752] font-mono text-[11px] font-semibold">
                  {language === "tr" ? "Apple Pencil 2 & Pro Uyumlu" : "Apple Pencil 2 & Pro Ready"}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#eff4ff] text-[#006591] font-mono text-[11px] font-semibold">
                  {language === "tr" ? "Samsung S-Pen Destekli" : "Samsung S-Pen Supported"}
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
                      {language === "tr" ? "Diseksiyon Çizim Katmanı & Not Alma" : "Dissection Sketch Layer & Annotation"}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#ffffff] text-[#003752] font-mono text-[11px] font-semibold">
                    {language === "tr" ? "4096 Basınç Kademesi" : "4096 Pressure Levels"}
                  </span>
                </div>

                <div className="relative w-full h-72 rounded-xl bg-[#ffffff] overflow-hidden flex items-center justify-center p-6 border border-[#e5eeff]">
                  <div className="relative z-10 w-full max-w-md flex flex-col gap-3">
                    <div className="flex items-center justify-between bg-[#eff4ff] p-2 rounded-lg border border-[#dce9ff]">
                      <span className="font-mono text-[12px] text-[#006591] font-bold">
                        {language === "tr" ? "N. ISCHIADICUS (SİYATİK SİNİR)" : "N. ISCHIADICUS (SCIATIC NERVE)"}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#dce9ff] text-[#003752] text-[10px] font-bold font-archivo">
                        {language === "tr" ? "L4 - S3 KÖKLERİ" : "L4 - S3 ROOTS"}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#ffffff] text-[#0b1c30] text-[12px] shadow-sm flex items-start gap-2 border border-[#e5eeff]">
                      <span className="material-symbols-outlined text-[16px] text-[#006591] shrink-0 mt-0.5">
                        edit
                      </span>
                      <p className="leading-relaxed">
                        {language === "tr"
                          ? "Klinik İpucu: Foramen suprapiriforme yerine infrapiriformeden çıkar. M. piriformis spazmında tuzak nöropati (Piriformis Sendromu) gelişir."
                          : "Clinical Pearl: Exits through the infrapiriform foramen. Spasm of m. piriformis causes nerve entrapment (Piriformis Syndrome)."}
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
                      {language === "tr"
                        ? "GoodNotes veya Notlar uygulamasıyla yan yana 50/50 çalışma."
                        : "50/50 side-by-side multitasking with GoodNotes or Apple Notes."}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#ffffff] border border-[#dce9ff]">
                    <span className="font-mono text-[11px] text-[#006591] font-bold block">
                      DICOM 4K
                    </span>
                    <p className="text-[11px] text-[#41474d] mt-1">
                      {language === "tr"
                        ? "BT ve MR kesitlerini 3D kadavra diseksiyonuyla eş zamanlı kaydırma."
                        : "Synchronized scrolling of CT and MRI slices alongside 3D dissection."}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#ffffff] border border-[#dce9ff]">
                    <span className="font-mono text-[11px] text-[#006591] font-bold block">
                      {language === "tr" ? "PROJEKSİYON" : "PROJECTION"}
                    </span>
                    <p className="text-[11px] text-[#41474d] mt-1">
                      {language === "tr"
                        ? "AirPlay ile amfi tahtasına gecikmesiz sunum yansıtma."
                        : "Zero-latency AirPlay mirroring onto lecture hall projectors."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Specification Card */}
              <div className="lg:col-span-5 rounded-2xl bg-[#dce9ff] p-6 flex flex-col justify-between gap-4 border border-[#c9e6ff]">
                <div className="flex flex-col gap-1">
                  <span className="px-3 py-1 rounded-full bg-[#ffffff] text-[#003752] text-[10px] font-bold uppercase font-archivo self-start">
                    {language === "tr" ? "Donanım Spesifikasyonu" : "Hardware Specifications"}
                  </span>
                  <h3 className="text-[22px] text-[#003752] font-bold font-archivo">
                    {language === "tr" ? "Tablet Optimize Özellikleri" : "Tablet Optimized Matrix"}
                  </h3>
                  <p className="text-[12px] text-[#41474d]">
                    {language === "tr"
                      ? "iPad Pro ve Galaxy Tab S9 donanım hızlandırma matrisi."
                      : "Hardware acceleration profile for iPad Pro and Galaxy Tab S9."}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="p-2.5 rounded-lg bg-[#ffffff] flex items-center justify-between">
                    <span className="text-[13px] text-[#0b1c30]">{language === "tr" ? "Kare Hızı (FPS)" : "Frame Rate (FPS)"}</span>
                    <span className="font-mono text-[12px] text-[#003752] font-bold">120 Hz ProMotion</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#ffffff] flex items-center justify-between">
                    <span className="text-[13px] text-[#0b1c30]">{language === "tr" ? "Pencil Gecikme Süresi" : "Stylus Latency"}</span>
                    <span className="font-mono text-[12px] text-[#006591] font-bold">{language === "tr" ? "9 ms Ultra Düşük" : "9 ms Ultra-Low"}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#ffffff] flex items-center justify-between">
                    <span className="text-[13px] text-[#0b1c30]">{language === "tr" ? "Dokunma Örnekleme" : "Touch Sampling"}</span>
                    <span className="font-mono text-[12px] text-[#0b1c30] font-bold">{language === "tr" ? "240 Hz Algı" : "240 Hz Sensing"}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#ffffff] flex items-center justify-between">
                    <span className="text-[13px] text-[#0b1c30]">{language === "tr" ? "Eşzamanlı Çoklu Pencere" : "Multi-Window Engine"}</span>
                    <span className="font-mono text-[12px] text-[#0b1c30] font-bold">Stage Manager</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#003752] text-white flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold uppercase font-archivo">
                      {language === "tr" ? "Apple Pencil Hover Desteği" : "Apple Pencil Hover Support"}
                    </span>
                    <span className="text-[11px] text-white/80">
                      {language === "tr"
                        ? "Kalemi dokundurmadan kas orijin ve insersiyolarını önizleyin."
                        : "Preview muscle origins and insertions before touching the display."}
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
                {language === "tr" ? "Gerçek Arayüz Vitrini" : "Authentic UI Showcase"}
              </span>
              <h2 className="text-[32px] text-[#003752] font-bold uppercase font-archivo">
                {language === "tr" ? "Gerçek Mobil Deneyim • Canlı Ekran Görüntüleri" : "Authentic Mobile Experience • Live Captures"}
              </h2>
              <p className="text-[14px] text-[#41474d]">
                {language === "tr"
                  ? "Mobil uygulamamızdan alınan gerçek ekran kesitleri: Sırt diseksiyonu, omurga sinir katmanları, 28 günlük çalışma serisi ve sistem hakimiyeti takip matrisi."
                  : "Direct captures from our mobile app: Dorsal dissection, spinal nerve roots, 28-day study streak calendar, and system mastery tracking matrix."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-items-center">
              {/* Phone Frame 1: Dorsal Dissection */}
              <div className="flex flex-col items-center gap-4">
                <IPhoneFrame
                  screenSrc="/screens/dorsal.png"
                  altText={language === "tr" ? "Sırt ve omurga katmanları mobil 3D diseksiyon görünümü" : "Dorsal and spinal layers mobile 3D dissection view"}
                  caption={language === "tr" ? "Sırt & Omurga Diseksiyonu" : "Dorsal & Spine Dissection"}
                />
                <div className="text-center max-w-xs">
                  <span className="text-[15px] text-[#003752] font-bold uppercase font-archivo block">
                    {language === "tr" ? "Sırt & Omurga Diseksiyonu" : "Dorsal & Spine Dissection"}
                  </span>
                  <p className="text-[12px] text-[#41474d] mt-1">
                    {language === "tr"
                      ? "Kaslar, bağlar, omurilik sinirleri ve atardamarların çoklu filtre seçimi."
                      : "Multi-filter isolation of muscles, ligaments, spinal nerves, and arterial branches."}
                  </p>
                </div>
              </div>

              {/* Phone Frame 2: Streak & Profile */}
              <div className="flex flex-col items-center gap-4">
                <IPhoneFrame
                  screenSrc="/screens/streak2.png"
                  altText={language === "tr" ? "Çalışma serisi ve sistem hakimiyeti profil ekranı" : "Study streak and system mastery profile screen"}
                  caption={language === "tr" ? "Profil & Başarı Takibi" : "Profile & Mastery Tracking"}
                />
                <div className="text-center max-w-xs">
                  <span className="text-[15px] text-[#003752] font-bold uppercase font-archivo block">
                    {language === "tr" ? "Seri & Hakimiyet Matrisi" : "Streak & Mastery Matrix"}
                  </span>
                  <p className="text-[12px] text-[#41474d] mt-1">
                    {language === "tr"
                      ? "28 günlük ısı haritası, komite puanı ve günlük XP takibi."
                      : "28-day study heatmap, committee score, and daily XP progression."}
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
