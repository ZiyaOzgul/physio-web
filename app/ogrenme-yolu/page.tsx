"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t, language } = useLanguage();
  const [difficulty, setDifficulty] = useState<"kolay" | "orta" | "zor">("zor");
  const [committeeScope, setCommitteeScope] = useState<"term12" | "term3">("term12");
  const [dailyGoal, setDailyGoal] = useState<number>(100);

  const xpReward = difficulty === "kolay" ? 15 : difficulty === "orta" ? 20 : 25;
  const targetMastery = difficulty === "kolay" ? 75 : difficulty === "orta" ? 85 : 90;

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
                  {t.learnPage.curriculum}
                </span>
                <span className="text-[#c1c7ce] text-[12px]">/</span>
                <span className="text-[12px] font-bold text-[#003752] uppercase font-archivo">
                  {t.learnPage.roadmap}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#006591] font-mono text-[11px] font-semibold">
                  {t.learnPage.period}
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
                      {t.learnPage.streak14}
                    </span>
                    <span className="text-[10px] text-[#41474d] leading-none mt-0.5">
                      {t.learnPage.uninterrupted}
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
                      {t.learnPage.todayGoal} %65
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#e5eeff] text-[#003752]">
                  <span className="material-symbols-outlined text-[18px]">analytics</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] text-[#003752] font-bold leading-none font-archivo">
                      {t.learnPage.masteryPercent}
                    </span>
                    <span className="text-[10px] text-[#41474d] leading-none mt-0.5">
                      {t.learnPage.committeeAverage}
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
                  onClick={() => setCommitteeScope("term12")}
                  className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    committeeScope === "term12"
                      ? "bg-[#003752] text-white shadow-xs"
                      : "bg-[#eff4ff] hover:bg-[#e5eeff] text-[#41474d]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">menu_book</span>
                  {t.learnPage.term12Committees}
                </button>
                <button
                  type="button"
                  onClick={() => setCommitteeScope("term3")}
                  className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    committeeScope === "term3"
                      ? "bg-[#003752] text-white shadow-xs"
                      : "bg-[#eff4ff] hover:bg-[#e5eeff] text-[#41474d]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">stethoscope</span>
                  {t.learnPage.term3Clinical}
                </button>
                <Link
                  href="/zilli-sinav"
                  className="px-3.5 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#41474d] text-[13px] transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">alarm</span>
                  {t.learnPage.tusExamPrep}
                </Link>
              </div>

              {/* Difficulty Segmented Control */}
              <div className="flex items-center justify-between sm:justify-end gap-3">
                <span className="text-[11px] text-[#41474d] uppercase tracking-wider font-bold font-archivo">
                  {t.learnPage.difficultyLabel}
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
                    {t.learnPage.easy}
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
                    {t.learnPage.medium}
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
                    {t.learnPage.hard}
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
                      {language === "tr" ? "Komite Müfredat Modülleri" : "Committee Curriculum Modules"}
                    </h2>
                  </div>
                  <span className="font-mono text-[11px] text-[#41474d]">
                    {language === "tr" ? "4 Modül" : "4 Modules"}
                  </span>
                </div>
                <p className="text-[13px] text-[#41474d] leading-relaxed">
                  {committeeScope === "term12"
                    ? language === "tr"
                      ? "Ulusal ÇEP standartlarına uyumlu Dönem 1-2 teorik ve pratik kadavra öğrenme akışı."
                      : "National core curriculum-aligned Year 1-2 theoretical and practical cadaver workflow."
                    : language === "tr"
                    ? "Dönem 3 klinik korelasyon, cerrahi topografi ve patolojik vaka diseksiyon akışı."
                    : "Year 3 clinical correlation, surgical topography, and pathological case dissection workflow."}
                </p>
                <Link
                  href="/atlas"
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] text-[#003752] text-[13px] font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                  <span>
                    {language === "tr" ? "Bölüm ve Derinliği Düzenle" : "Configure Section & Depth"}
                  </span>
                </Link>
              </div>

              {/* Module 01 (Active) */}
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#e5eeff] shadow-sm space-y-4 cursor-pointer hover:scale-[1.025] hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded bg-[#e5eeff] text-[10px] font-bold uppercase text-[#006591] font-archivo">
                      {language === "tr" ? "Bölüm 01" : "Module 01"}
                    </span>
                    <h3 className="text-[17px] text-[#003752] font-bold font-archivo">
                      {language === "tr" ? "Lokomotor Sistem Temelleri" : "Locomotor System Foundations"}
                    </h3>
                    <p className="text-[12px] text-[#41474d]">
                      {language === "tr"
                        ? "Osteoloji & Artroloji • Aksiyel ve Apendiküler İskelet"
                        : "Osteology & Arthrology • Axial and Appendicular Skeleton"}
                    </p>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-[#006591]/10 text-[#006591] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">format_h4</span>
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-[11px] text-[#41474d]">
                    <span>{language === "tr" ? "İlerleme Seviyesi" : "Progress Level"}</span>
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
                    <span>{language === "tr" ? "Derse Devam Et" : "Resume Lesson"}</span>
                  </Link>
                  <Link
                    href="/atlas?region=locomotor"
                    className="px-3 py-2 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] text-[#006591] text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
                    <span>{language === "tr" ? "3D Bölgeyi Aç" : "Open 3D Region"}</span>
                  </Link>
                </div>
              </div>

              {/* Module 02 */}
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#e5eeff] shadow-sm space-y-3 cursor-pointer hover:scale-[1.025] hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[10px] font-bold uppercase text-[#41474d] font-archivo">
                      {language === "tr" ? "Bölüm 02" : "Module 02"}
                    </span>
                    <h3 className="text-[17px] text-[#003752] font-semibold font-archivo">
                      {language === "tr" ? "Topografik Miyoloji ve Gövde" : "Topographic Myology & Trunk"}
                    </h3>
                    <p className="text-[12px] text-[#41474d]">
                      {language === "tr"
                        ? "Gövde duvarı kasları, diyafram, ekstremite kompartmanları."
                        : "Trunk wall muscles, diaphragm, and limb compartments."}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#ffdada] text-[#6d001c] font-mono text-[10px] font-bold shrink-0">
                    {language === "tr" ? `Hedef %${targetMastery}` : `Target ${targetMastery}%`}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-[11px] text-[#41474d]">
                    <span>{language === "tr" ? "Mevcut Hakimiyet" : "Current Mastery"}</span>
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
                      {language === "tr" ? "Bölüm 03" : "Module 03"}
                    </span>
                    <h3 className="text-[17px] text-[#003752] font-semibold font-archivo">
                      {language === "tr" ? "Kardiyovasküler & Visseral Ağ" : "Cardiovascular & Visceral Network"}
                    </h3>
                    <p className="text-[12px] text-[#41474d]">
                      {language === "tr"
                        ? "Kalp odacıkları, koroner dolaşım, trunkus çölyakus dalları."
                        : "Heart chambers, coronary circulation, and celiac trunk branches."}
                    </p>
                  </div>
                  <span className="w-7 h-7 rounded-full bg-[#eff4ff] text-[#41474d] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[#41474d] text-[11px]">
                  <span className="material-symbols-outlined text-[14px]">timer</span>
                  <span>
                    {language === "tr"
                      ? "Bölüm 02 tamamlandıktan sonra açılır"
                      : "Unlocks upon completing Module 02"}
                  </span>
                </div>
              </div>

              {/* Module 04 */}
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#e5eeff] shadow-sm space-y-3 opacity-75 cursor-pointer hover:scale-[1.025] hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[10px] font-bold uppercase text-[#41474d] font-archivo">
                        {language === "tr" ? "Bölüm 04" : "Module 04"}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#ffdada] text-[#6d001c] font-mono text-[10px] font-bold">
                        {language === "tr" ? "KOMİTE FİNALİ" : "BLOCK FINAL"}
                      </span>
                    </div>
                    <h3 className="text-[17px] text-[#003752] font-semibold font-archivo">
                      {language === "tr" ? "Nöroanatomi & Zilli Spot Sınav" : "Neuroanatomy & Timed Bell Spot"}
                    </h3>
                    <p className="text-[12px] text-[#41474d]">
                      {language === "tr"
                        ? "Merkezi sinir sistemi traktusları, kranial sinir foraminaları."
                        : "Central nervous system tracts and cranial nerve exit foramina."}
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
                    {language === "tr" ? "Mobil Atlas Eşzamanlaması" : "Mobile Atlas Synchronization"}
                  </span>
                  <span className="font-mono text-[11px] text-[#006591] font-semibold">
                    {language === "tr" ? "Canlı Senkron" : "Live Sync"}
                  </span>
                </div>
                <p className="text-[12px] text-[#41474d]">
                  {language === "tr"
                    ? "Kadavra laboratuvarında iPad ve mobil cihazınızdan diseksiyon notlarınıza anında erişin."
                    : "Access your dissection notes instantly on iPad and mobile inside the cadaver lab."}
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
                      {language === "tr" ? "Müfredat Ağacı" : "Curriculum Tree"}
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
                      {language === "tr" ? "Zilli Spot Kartı" : "Bell Spot Card"}
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
                      {t.learnPage.spineNeuralTitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#eff4ff] font-mono text-[10px] text-[#41474d]">
                      {t.learnPage.axisYRot}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#e5eeff] text-[#006591] font-mono text-[10px] font-semibold">
                      {t.learnPage.zoom100}
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
                      {t.learnPage.stepperTitle}
                    </span>
                    <h3 className="text-[22px] text-[#003752] font-bold font-archivo">
                      {t.learnPage.stepperSub}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#eff4ff] text-[#003752] text-[11px] font-bold uppercase font-archivo">
                    {t.learnPage.level25}
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
                      {t.learnPage.node1Title}
                    </span>
                    <span className="text-[11px] text-[#41474d]">
                      {t.learnPage.node1Sub}
                    </span>

                    {/* Interactive Step Card */}
                    <div className="mt-3 w-full max-w-md p-4 rounded-xl bg-[#eff4ff] border border-[#dce9ff] shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[#006591]">
                          <span className="material-symbols-outlined text-[18px]">verified</span>
                          <span className="text-[11px] uppercase font-bold font-archivo">
                            {t.learnPage.activeStation}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-[#ffffff] text-[#003752] font-mono text-[11px] font-bold shadow-xs">
                          +{xpReward} XP
                        </span>
                      </div>
                      <h4 className="text-[14px] text-[#003752] font-bold leading-tight font-archivo">
                        {language === "tr"
                          ? "Kafatası Foramenleri & Çıkış Yapan Kranial Sinirler"
                          : "Cranial Foramina & Exiting Cranial Nerves"}
                      </h4>
                      <p className="text-[12px] text-[#41474d] leading-relaxed">
                        {language === "tr"
                          ? "12 Klinik Soru • 3D Kesitsel Diseksiyon Pratiği • Terminologia Anatomica Eşleşmesi."
                          : "12 Clinical Questions • 3D Cross-Sectional Dissection • TA2 Nomenclature."}
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-[#41474d] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px]">schedule</span>
                          {language === "tr" ? "Tahmini Süre: 8 Dk" : "Est. Time: 8 Min"}
                        </span>
                        <Link
                          href="/atlas?region=head-neck"
                          className="px-4 py-1.5 rounded-lg bg-[#003752] hover:bg-[#1f4e6b] text-white text-[12px] font-semibold transition-all shadow-xs"
                        >
                          {language === "tr" ? "İstasyona Başla" : "Start Station"}
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
                      {language === "tr"
                        ? "Node 1.2: Columna Vertebralis & Omurga"
                        : "Node 1.2: Columna Vertebralis & Spine"}
                    </span>
                    <span className="text-[11px] text-[#41474d]">
                      {language === "tr"
                        ? "C1-C7, T1-T12, L1-L5 Eğrilikleri ve Diskuslar"
                        : "C1-C7, T1-T12, L1-L5 Curvatures & Intervertebral Discs"}
                    </span>
                    <div className="w-1 h-8 bg-[#c1c7ce]/40 my-1" />
                  </div>

                  {/* Node 1.3 (Locked) */}
                  <div className="relative w-full flex flex-col items-center opacity-65">
                    <div className="w-14 h-14 rounded-full bg-[#eff4ff] text-[#41474d] flex items-center justify-center z-10 border border-[#e5eeff]">
                      <span className="material-symbols-outlined text-[24px]">lock</span>
                    </div>
                    <span className="mt-2 text-[13px] text-[#41474d] font-semibold font-archivo">
                      {language === "tr"
                        ? "Node 1.3: Thorax & Sternokostal Eklemler"
                        : "Node 1.3: Thorax & Sternocostal Joints"}
                    </span>
                    <span className="text-[10px] text-[#72787e]">
                      {language === "tr"
                        ? "Açmak için Node 1.2'yi tamamlayın"
                        : "Complete Node 1.2 to unlock"}
                    </span>
                    <div className="w-1 h-8 bg-[#c1c7ce]/30 my-1" />
                  </div>

                  {/* Node 1.4 (Locked) */}
                  <div className="relative w-full flex flex-col items-center opacity-50">
                    <div className="w-14 h-14 rounded-full bg-[#eff4ff] text-[#41474d] flex items-center justify-center z-10 border border-[#e5eeff]">
                      <span className="material-symbols-outlined text-[24px]">lock</span>
                    </div>
                    <span className="mt-2 text-[13px] text-[#41474d] font-semibold font-archivo">
                      {language === "tr"
                        ? "Node 1.4: Pelvis Kemikleri & Foramenler"
                        : "Node 1.4: Pelvic Bones & Foramina"}
                    </span>
                    <span className="text-[10px] text-[#72787e]">
                      {language === "tr" ? "Kilitli Bölüm" : "Locked Section"}
                    </span>
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
                        {language === "tr"
                          ? "Node 1.5: Zilli Sınav Masası Komite Spot Testi"
                          : "Node 1.5: Bell Exam Table Committee Spot Test"}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#41474d]">
                      {language === "tr"
                        ? "45 Saniye Geri Sayım • 20 Kadavra İstasyonu • Gerçekçi Zil"
                        : "45s Countdown • 20 Cadaver Stations • Realistic Bell"}
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
                    {language === "tr" ? "Çalışma Isı Haritası" : "Study Heatmap"}
                  </span>
                  <span className="text-[11px] text-[#006591] font-semibold">
                    {language === "tr" ? "Son 28 Gün" : "Last 28 Days"}
                  </span>
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
                  <span>{language === "tr" ? "Daha az" : "Less"}</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-[#eff4ff]" />
                    <span className="w-2.5 h-2.5 rounded bg-[#006591]/30" />
                    <span className="w-2.5 h-2.5 rounded bg-[#006591]/70" />
                    <span className="w-2.5 h-2.5 rounded bg-[#006591]" />
                  </div>
                  <span>{language === "tr" ? "Daha çok" : "More"}</span>
                </div>

                {/* XP Target Toggle Buttons */}
                <div className="pt-2 border-t border-[#e5eeff] space-y-2">
                  <span className="text-[11px] text-[#41474d] font-semibold">
                    {language === "tr" ? "Günlük Hedef Seviyesi" : "Daily XP Target"}
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[20, 50, 100].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setDailyGoal(val)}
                        className={`py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
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
                  {language === "tr" ? "Kazanılan Rozetler" : "Earned Badges"}
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-[#eff4ff] flex flex-col items-center gap-1">
                    <Image src="/badges/streak-14.png" alt="14 Günlük Seri" width={36} height={36} />
                    <span className="text-[10px] font-bold text-[#003752]">
                      {language === "tr" ? "14 Gün" : "14 Days"}
                    </span>
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
