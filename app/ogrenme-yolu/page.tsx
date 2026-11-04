"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AnatomyViewer3D = dynamic(() => import("@/components/AnatomyViewer3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[460px] rounded-xl bg-[#eff4ff] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 rounded-full border-2 border-[#006591]/20 border-t-[#006591] animate-spin" />
        <span className="font-mono text-xs text-[#006591] tracking-wider font-semibold">
          3D OMURGA VE NÖRAL YOL YÜKLENİYOR...
        </span>
      </div>
    </div>
  ),
});

export default function OgrenmeYoluPage() {
  const [difficulty, setDifficulty] = useState<"kolay" | "orta" | "zor">("zor");
  const [dailyGoal, setDailyGoal] = useState<number>(100);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      <Navbar activePath="/ogrenme-yolu" />

      <main className="w-full pt-20 bg-[#f8f9ff]">
        {/* ================= SUB-HEADER TOOLBAR (Stitch 1:1) ================= */}
        <section className="w-full bg-[#ffffff] border-b border-[#e5eeff] shadow-sm mb-6">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col gap-4">
            {/* Breadcrumb & Top Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#41474d] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#006591]">
                    school
                  </span>
                  Tıp Fakültesi Müfredatı
                </span>
                <span className="text-[#c1c7ce] text-[12px]">/</span>
                <span className="text-[12px] font-bold text-[#003752] uppercase font-archivo">
                  Öğrenme Yolu Haritası
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#006591] font-mono text-[11px] font-semibold">
                  DÖNEM 1 & 2 • 2024-2026
                </span>
              </div>

              {/* Global Live Stats Pill Cluster */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#eff4ff] text-[#0b1c30]">
                  <span className="material-symbols-outlined text-[18px] text-[#6d001c]">
                    local_fire_department
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] text-[#003752] font-bold leading-none font-archivo">
                      14 Günlük Seri
                    </span>
                    <span className="text-[10px] text-[#41474d] leading-none mt-0.5">
                      Kesintisiz Diseksiyon
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#eff4ff] text-[#0b1c30]">
                  <span className="material-symbols-outlined text-[18px] text-[#006591]">
                    bolt
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] text-[#003752] font-bold leading-none font-archivo">
                      65 / {dailyGoal} XP
                    </span>
                    <span className="text-[10px] text-[#41474d] leading-none mt-0.5">
                      Bugünkü Hedef %65
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#e5eeff] text-[#003752]">
                  <span className="material-symbols-outlined text-[18px]">analytics</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] text-[#003752] font-bold leading-none font-archivo">
                      %42 Hakimiyet
                    </span>
                    <span className="text-[10px] text-[#41474d] leading-none mt-0.5">
                      Komite Ortalaması
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls Row: Filter Selector & Difficulty Segments */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-1">
              {/* Committee Scope Selector */}
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-lg bg-[#003752] text-white text-[13px] font-medium shadow-xs flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">menu_book</span>
                  Dönem 1 & 2 Komiteleri
                </button>
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#41474d] text-[13px] transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">stethoscope</span>
                  Dönem 3 Klinik Anatomi
                </button>
                <Link
                  href="/zilli-sinav"
                  className="px-3.5 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#41474d] text-[13px] transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">alarm</span>
                  TUS & Zilli Sınav Hazırlık
                </Link>
              </div>

              {/* Difficulty Segmented Control */}
              <div className="flex items-center justify-between sm:justify-end gap-3">
                <span className="text-[11px] text-[#41474d] uppercase tracking-wider font-bold font-archivo">
                  Zorluk Seviyesi:
                </span>
                <div className="p-1 rounded-xl bg-[#eff4ff] flex items-center gap-1 border border-[#e5eeff]">
                  <button
                    type="button"
                    onClick={() => setDifficulty("kolay")}
                    className={`px-3 py-1 rounded-lg text-[12px] font-archivo font-bold transition-all ${
                      difficulty === "kolay"
                        ? "bg-[#ffffff] text-[#003752] shadow-xs"
                        : "text-[#41474d] hover:text-[#0b1c30]"
                    }`}
                  >
                    Kolay
                  </button>
                  <button
                    type="button"
                    onClick={() => setDifficulty("orta")}
                    className={`px-3 py-1 rounded-lg text-[12px] font-archivo font-bold transition-all ${
                      difficulty === "orta"
                        ? "bg-[#ffffff] text-[#003752] shadow-xs"
                        : "text-[#41474d] hover:text-[#0b1c30]"
                    }`}
                  >
                    Orta
                  </button>
                  <button
                    type="button"
                    onClick={() => setDifficulty("zor")}
                    className={`px-3.5 py-1 rounded-lg text-[12px] font-archivo font-bold shadow-xs flex items-center gap-1 transition-all ${
                      difficulty === "zor"
                        ? "bg-[#ffffff] text-[#003752]"
                        : "text-[#41474d] hover:text-[#0b1c30]"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6d001c]" />
                    Zor (Komite Düzeyi)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MAIN 3-COLUMN GRID (Stitch 1:1) ================= */}
        <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* COLUMN 1: Curriculum Module Tracker (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#e5eeff] shadow-sm flex flex-col gap-3 cursor-pointer hover:scale-[1.025] hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006591]" />
                    <h2 className="text-[16px] text-[#003752] font-bold uppercase tracking-tight font-archivo">
                      Komite Müfredat Modülleri
                    </h2>
                  </div>
                  <span className="font-mono text-[11px] text-[#41474d]">4 Modül</span>
                </div>
                <p className="text-[13px] text-[#41474d] leading-relaxed">
                  Ulusal ÇEP standartlarına uyumlu teorik ve pratik kadavra öğrenme akışı.
                </p>
                <Link
                  href="/atlas"
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] text-[#003752] text-[13px] font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                  <span>Bölüm ve Derinliği Düzenle</span>
                </Link>
              </div>

              {/* Module 01 (Active) */}
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#e5eeff] shadow-sm space-y-4 cursor-pointer hover:scale-[1.025] hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded bg-[#e5eeff] text-[10px] font-bold uppercase text-[#006591] font-archivo">
                      Bölüm 01
                    </span>
                    <h3 className="text-[17px] text-[#003752] font-bold font-archivo">
                      Lokomotor Sistem Temelleri
                    </h3>
                    <p className="text-[12px] text-[#41474d]">
                      Osteoloji & Artroloji • Aksiyel ve Apendiküler İskelet
                    </p>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-[#006591]/10 text-[#006591] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">format_h4</span>
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-[11px] text-[#41474d]">
                    <span>İlerleme Seviyesi</span>
                    <span className="text-[#003752] font-bold">%60</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#eff4ff] overflow-hidden">
                    <div className="h-full bg-[#006591] rounded-full w-[60%]" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/atlas"
                    className="px-3 py-2 rounded-xl bg-[#003752] hover:bg-[#1f4e6b] text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">play_circle</span>
                    <span>Derse Devam Et</span>
                  </Link>
                  <Link
                    href="/atlas?region=locomotor"
                    className="px-3 py-2 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] text-[#006591] text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
                    <span>3D Bölgeyi Aç</span>
                  </Link>
                </div>
              </div>

              {/* Module 02 */}
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#e5eeff] shadow-sm space-y-3 cursor-pointer hover:scale-[1.025] hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[10px] font-bold uppercase text-[#41474d] font-archivo">
                      Bölüm 02
                    </span>
                    <h3 className="text-[17px] text-[#003752] font-semibold font-archivo">
                      Topografik Miyoloji ve Gövde
                    </h3>
                    <p className="text-[12px] text-[#41474d]">
                      Gövde duvarı kasları, diyafram, ekstremite kompartmanları.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#ffdada] text-[#6d001c] font-mono text-[10px] font-bold shrink-0">
                    Hedef %90
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-[11px] text-[#41474d]">
                    <span>Mevcut Hakimiyet</span>
                    <span className="font-bold text-[#0b1c30]">%35</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#eff4ff] overflow-hidden">
                    <div className="h-full bg-[#003752]/40 rounded-full w-[35%]" />
                  </div>
                </div>
              </div>

              {/* Module 03 */}
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#e5eeff] shadow-sm space-y-3 opacity-80 cursor-pointer hover:scale-[1.025] hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[10px] font-bold uppercase text-[#41474d] font-archivo">
                      Bölüm 03
                    </span>
                    <h3 className="text-[17px] text-[#003752] font-semibold font-archivo">
                      Kardiyovasküler & Visseral Ağ
                    </h3>
                    <p className="text-[12px] text-[#41474d]">
                      Kalp odacıkları, koroner dolaşım, trunkus çölyakus dalları.
                    </p>
                  </div>
                  <span className="w-7 h-7 rounded-full bg-[#eff4ff] text-[#41474d] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[#41474d] text-[11px]">
                  <span className="material-symbols-outlined text-[14px]">timer</span>
                  <span>Bölüm 02 tamamlandıktan sonra açılır</span>
                </div>
              </div>

              {/* Module 04 */}
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#e5eeff] shadow-sm space-y-3 opacity-75 cursor-pointer hover:scale-[1.025] hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[10px] font-bold uppercase text-[#41474d] font-archivo">
                        Bölüm 04
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#ffdada] text-[#6d001c] font-mono text-[10px] font-bold">
                        KOMİTE FİNALİ
                      </span>
                    </div>
                    <h3 className="text-[17px] text-[#003752] font-semibold font-archivo">
                      Nöroanatomi & Zilli Spot Sınav
                    </h3>
                    <p className="text-[12px] text-[#41474d]">
                      Merkezi sinir sistemi traktusları, kranial sinir foraminaları.
                    </p>
                  </div>
                  <span className="w-7 h-7 rounded-full bg-[#eff4ff] text-[#41474d] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                  </span>
                </div>
              </div>

              {/* Mobile Atlas Eşzamanlaması */}
              <div className="p-5 rounded-2xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[#003752] font-bold uppercase font-archivo">
                    Mobil Atlas Eşzamanlaması
                  </span>
                  <span className="font-mono text-[11px] text-[#006591] font-semibold">
                    Canlı Senkron
                  </span>
                </div>
                <p className="text-[12px] text-[#41474d]">
                  Kadavra laboratuvarında iPad ve mobil cihazınızdan diseksiyon notlarınıza anında erişin.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="rounded-xl overflow-hidden shadow-xs bg-[#ffffff] p-1.5 flex flex-col items-center border border-[#e5eeff]">
                    <div className="w-full h-36 relative overflow-hidden rounded-lg bg-[#eff4ff]">
                      <Image
                        src="/screens/learn.png"
                        alt="Anatomi 3D Mobil Müfredat Ekranı"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <span className="mt-2 text-[11px] text-[#0b1c30] font-semibold">
                      Müfredat Ağacı
                    </span>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-xs bg-[#ffffff] p-1.5 flex flex-col items-center border border-[#e5eeff]">
                    <div className="w-full h-36 relative overflow-hidden rounded-lg bg-[#eff4ff]">
                      <Image
                        src="/screens/exam-phone.png"
                        alt="Anatomi 3D Diseksiyon Soru Kartı"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <span className="mt-2 text-[11px] text-[#0b1c30] font-semibold">
                      Zilli Spot Kartı
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 2: Interactive 3D Tree & Stepper Pathway (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Interactive 3D Spine and Neural Pathway Viewport */}
              <div className="relative rounded-2xl bg-[#ffffff] border border-[#e5eeff] shadow-sm overflow-hidden p-4">
                <div className="flex items-center justify-between mb-3 px-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006591] animate-pulse" />
                    <span className="text-[12px] text-[#003752] font-bold uppercase tracking-tight font-archivo">
                      3D Omurga & Nöral Yol Simülasyonu
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#eff4ff] font-mono text-[10px] text-[#41474d]">
                      Aksis: Y-Rot
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#e5eeff] text-[#006591] font-mono text-[10px] font-semibold">
                      100% Zoom
                    </span>
                  </div>
                </div>

                <div className="relative w-full rounded-xl overflow-hidden bg-[#eff4ff]">
                  <div className="w-full h-[460px] rounded-xl overflow-hidden">
                    <AnatomyViewer3D
                      modelId="skeletal"
                      showCard={false}
                      showHud={false}
                      showLayersWidget={false}
                      showLayerSwitcher={false}
                      showCameraControls={false}
                      showFooter={false}
                      height="h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Duolingo-style Stepper Learning Tree Path */}
              <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#e5eeff] shadow-sm flex flex-col gap-6">
                <div className="flex items-center justify-between pb-2">
                  <div>
                    <span className="text-[11px] text-[#006591] uppercase font-bold font-archivo">
                      Adım Adım Yol Haritası
                    </span>
                    <h3 className="text-[22px] text-[#003752] font-bold font-archivo">
                      Kemik & Eklem İlerleme Düğümleri
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#eff4ff] text-[#003752] text-[11px] font-bold uppercase font-archivo">
                    Seviye 2 / 5
                  </span>
                </div>

                {/* Stepper Pathway Nodes Stack */}
                <div className="relative flex flex-col items-center gap-6 py-2">
                  {/* Node 1.1 (Active) */}
                  <div className="relative w-full flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-[#006591] text-white shadow-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-105 relative z-10">
                      <span className="material-symbols-outlined text-[36px]">play_arrow</span>
                      <span className="absolute inset-0 rounded-full bg-[#006591]/30 animate-ping" />
                    </div>
                    <span className="mt-2 text-[15px] text-[#003752] font-bold font-archivo">
                      Node 1.1: Kafatası & Nörokranium
                    </span>
                    <span className="text-[11px] text-[#41474d]">
                      Norma Frontalis • Foramen Magnum • Sfenoid
                    </span>

                    {/* Interactive Step Card */}
                    <div className="mt-3 w-full max-w-md p-4 rounded-xl bg-[#eff4ff] border border-[#dce9ff] shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[#006591]">
                          <span className="material-symbols-outlined text-[18px]">verified</span>
                          <span className="text-[11px] uppercase font-bold font-archivo">
                            Aktif İstasyon
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-[#ffffff] text-[#003752] font-mono text-[11px] font-bold shadow-xs">
                          +25 XP
                        </span>
                      </div>
                      <h4 className="text-[14px] text-[#003752] font-bold leading-tight font-archivo">
                        Kafatası Foramenleri & Çıkış Yapan Kranial Sinirler
                      </h4>
                      <p className="text-[12px] text-[#41474d] leading-relaxed">
                        12 Klinik Soru • 3D Kesitsel Diseksiyon Pratiği • Terminologia Anatomica Eşleşmesi.
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-[#41474d] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px]">schedule</span>
                          Tahmini Süre: 8 Dk
                        </span>
                        <Link
                          href="/atlas?region=head-neck"
                          className="px-4 py-1.5 rounded-lg bg-[#003752] hover:bg-[#1f4e6b] text-white text-[12px] font-semibold transition-all shadow-xs"
                        >
                          İstasyona Başla
                        </Link>
                      </div>
                    </div>

                    <div className="w-1 h-8 bg-[#006591]/40 my-1" />
                  </div>

                  {/* Node 1.2 (Unlocked) */}
                  <div className="relative w-full flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-[#ffffff] border-2 border-[#006591] shadow-md flex items-center justify-center cursor-pointer hover:bg-[#eff4ff] transition-colors z-10 text-[#003752]">
                      <span className="material-symbols-outlined text-[28px] text-[#006591]">
                        accessibility_new
                      </span>
                    </div>
                    <span className="mt-2 text-[14px] text-[#003752] font-semibold font-archivo">
                      Node 1.2: Columna Vertebralis & Omurga
                    </span>
                    <span className="text-[11px] text-[#41474d]">
                      C1-C7, T1-T12, L1-L5 Eğrilikleri ve Diskuslar
                    </span>
                    <div className="w-1 h-8 bg-[#c1c7ce]/40 my-1" />
                  </div>

                  {/* Node 1.3 (Locked) */}
                  <div className="relative w-full flex flex-col items-center opacity-65">
                    <div className="w-14 h-14 rounded-full bg-[#eff4ff] text-[#41474d] flex items-center justify-center z-10 border border-[#e5eeff]">
                      <span className="material-symbols-outlined text-[24px]">lock</span>
                    </div>
                    <span className="mt-2 text-[13px] text-[#41474d] font-semibold font-archivo">
                      Node 1.3: Thorax & Sternokostal Eklemler
                    </span>
                    <span className="text-[10px] text-[#72787e]">Açmak için Node 1.2&apos;yi tamamlayın</span>
                    <div className="w-1 h-8 bg-[#c1c7ce]/30 my-1" />
                  </div>

                  {/* Node 1.4 (Locked) */}
                  <div className="relative w-full flex flex-col items-center opacity-50">
                    <div className="w-14 h-14 rounded-full bg-[#eff4ff] text-[#41474d] flex items-center justify-center z-10 border border-[#e5eeff]">
                      <span className="material-symbols-outlined text-[24px]">lock</span>
                    </div>
                    <span className="mt-2 text-[13px] text-[#41474d] font-semibold font-archivo">
                      Node 1.4: Pelvis Kemikleri & Foramenler
                    </span>
                    <span className="text-[10px] text-[#72787e]">Kilitli Bölüm</span>
                    <div className="w-1 h-8 bg-[#c1c7ce]/30 my-1" />
                  </div>

                  {/* Node 1.5 (Special Milestone: Zilli Sınav) */}
                  <div className="relative w-full flex flex-col items-center">
                    <Link
                      href="/zilli-sinav"
                      className="w-18 h-18 p-1 rounded-2xl bg-[#ffdada] shadow-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-105 z-10"
                    >
                      <div className="w-16 h-16 rounded-xl bg-[#6d001c] flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-[32px]">
                          notifications_active
                        </span>
                      </div>
                    </Link>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="text-[15px] text-[#6d001c] font-bold font-archivo">
                        Node 1.5: Zilli Sınav Masası Komite Spot Testi
                      </span>
                    </div>
                    <span className="text-[11px] text-[#41474d]">
                      45 Saniye Geri Sayım • 20 Kadavra İstasyonu • Gerçekçi Zil
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 3: Daily Goals, Gamification & Heatmap (3 Cols) */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              {/* 28-day Study Heatmap Card */}
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#e5eeff] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] text-[#003752] font-bold font-archivo">
                    Çalışma Isı Haritası
                  </span>
                  <span className="text-[11px] text-[#006591] font-semibold">Son 28 Gün</span>
                </div>

                {/* Heatmap Mini Grid (7 cols x 4 rows) */}
                <div className="grid grid-cols-7 gap-1.5 pt-1">
                  {[
                    0, 25, 50, 100, 100, 75, 100,
                    30, 100, 100, 70, 15, 100, 100,
                    100, 80, 100, 0, 45, 100, 100,
                    100, 100, 100, 100, 100, 85, 65,
                  ].map((xp, idx) => (
                    <div
                      key={idx}
                      className={`h-6 rounded transition-transform hover:scale-110 cursor-pointer ${
                        xp === 0
                          ? "bg-[#eff4ff]"
                          : xp < 50
                          ? "bg-[#006591]/30"
                          : xp < 85
                          ? "bg-[#006591]/70"
                          : "bg-[#006591]"
                      } ${idx === 27 ? "animate-pulse ring-2 ring-[#006591]/40" : ""}`}
                      title={`${xp} XP`}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-[#41474d] text-[10px] pt-1">
                  <span>Daha az</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-[#eff4ff]" />
                    <span className="w-2.5 h-2.5 rounded bg-[#006591]/30" />
                    <span className="w-2.5 h-2.5 rounded bg-[#006591]/70" />
                    <span className="w-2.5 h-2.5 rounded bg-[#006591]" />
                  </div>
                  <span>Daha çok</span>
                </div>

                {/* XP Target Toggle Buttons */}
                <div className="pt-2 border-t border-[#e5eeff] space-y-2">
                  <span className="text-[11px] text-[#41474d] font-semibold">
                    Günlük Hedef Seviyesi
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[20, 50, 100].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setDailyGoal(val)}
                        className={`py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all ${
                          dailyGoal === val
                            ? "bg-[#003752] text-white shadow-xs"
                            : "bg-[#eff4ff] text-[#41474d] hover:bg-[#e5eeff]"
                        }`}
                      >
                        {val} XP
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Badges preview */}
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#e5eeff] shadow-sm space-y-3">
                <span className="text-[15px] text-[#003752] font-bold font-archivo block">
                  Kazanılan Rozetler
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-[#eff4ff] flex flex-col items-center gap-1">
                    <Image src="/badges/streak-14.png" alt="14 Günlük Seri" width={36} height={36} />
                    <span className="text-[10px] font-bold text-[#003752]">14 Gün</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#eff4ff] flex flex-col items-center gap-1">
                    <Image src="/badges/master-skeleton.png" alt="Osteo Ustası" width={36} height={36} />
                    <span className="text-[10px] font-bold text-[#003752]">Osteo</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#eff4ff] flex flex-col items-center gap-1">
                    <Image src="/badges/xp-500.png" alt="500 XP" width={36} height={36} />
                    <span className="text-[10px] font-bold text-[#003752]">500 XP</span>
                  </div>
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
