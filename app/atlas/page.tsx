"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { DissectionLayersState } from "@/components/AnatomyViewer3D";

const AnatomyViewer3D = dynamic(() => import("@/components/AnatomyViewer3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[640px] rounded-2xl bg-[#0a1926] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-sky-400/30 border-t-sky-400 animate-spin" />
        <span className="font-mono text-xs text-sky-300 tracking-wider font-semibold">
          3D DİSEKSİYON ATLASI YÜKLENİYOR...
        </span>
      </div>
    </div>
  ),
});

const STRUCTURE_DETAILS: Record<
  string,
  {
    name: string;
    latin: string;
    ta2: string;
    category: string;
    importance: string;
    examRate: string;
    innervation: string;
    icon: string;
    clinicalNote: string;
  }
> = {
  heart: {
    name: "Cor (Kalp) & Dolaşım",
    latin: "Myocardium, Endocardium & Pericardium",
    ta2: "TA2: 3951",
    category: "Dolaşım & Angiologia",
    importance: "★★★★★ (Kritik)",
    examRate: "%92 Sorulma Oranı",
    innervation: "Plexus Cardiacus",
    icon: "cardiology",
    clinicalNote:
      "Apex cordis sol 5. interkostal aralıkta, linea medioclavicularis'in 8-9 cm lateralinde palpe edilir. Sulcus coronarius ve sulcus interventricularis anterior referans alınmalıdır.",
  },
  muscular: {
    name: "Systema Musculare (Kas Sistemi)",
    latin: "Musculi trunci, capitis et extremitatum",
    ta2: "TA2: 2100",
    category: "Miyoloji",
    importance: "★★★★★ (Temel)",
    examRate: "%95 Sorulma Oranı",
    innervation: "Spinal & Kranial Sinirler",
    icon: "accessibility",
    clinicalNote:
      "Fascia lata, karpal tünel ve trigonum femorale (Scarpa üçgeni) sınırları pratik kadavra sınavlarında en çok sorulan diseksiyon bölgeleridir.",
  },
  skeletal: {
    name: "Systema Skeletale (İskelet)",
    latin: "Skeleton axiale et appendiculare",
    ta2: "TA2: 1001",
    category: "Osteoloji",
    importance: "★★★★☆ (Temel)",
    examRate: "%88 Sorulma Oranı",
    innervation: "Periosteal Sinirler",
    icon: "skeleton",
    clinicalNote:
      "Foramen magnum, canalis caroticus, os sphenoidale sella turcica ve foramen obturatum kemik masası sınavlarının vazgeçilmez sorularıdır.",
  },
  brain: {
    name: "Systema Nervosum (Nöroanatomi)",
    latin: "Encephalon, Medulla Spinalis et Nervi",
    ta2: "TA2: 5400",
    category: "Nöroanatomi",
    importance: "★★★★★ (Klinik)",
    examRate: "%96 Sorulma Oranı",
    innervation: "Kranial Çiftler (I - XII)",
    icon: "neurology",
    clinicalNote:
      "Willis poligonu, capsula interna traktusları ve 12 kranial sinirin kafatası tabanındaki çıkış delikleri OSCE sınavlarının çekirdeğidir.",
  },
  abdomen: {
    name: "Organa Abdominalia (Visseral Organlar)",
    latin: "Gaster, Hepar, Pancreas et Intestinum",
    ta2: "TA2: 4200",
    category: "Splanknoloji",
    importance: "★★★★☆ (Uygulamalı)",
    examRate: "%90 Sorulma Oranı",
    innervation: "N. Vagus & Splanchnic Sinirler",
    icon: "medical_services",
    clinicalNote:
      "Foramen omentale (Winslow), bursa omentalis sınırları ve trunkus çölyakus dallanmaları kadavra pratik sınavlarının en popüler istasyonlarıdır.",
  },
};

const LAYER_DEFINITIONS: Array<{
  key: keyof DissectionLayersState;
  structureId: string;
  title: string;
  latin: string;
  details: string;
  colorDot: string;
}> = [
  {
    key: "skeleton",
    structureId: "skeletal",
    title: "İskelet (Osteologia)",
    latin: "Skeleton Axiale & Appendiculare",
    details: "206 Kemik • Eksenel & Ekstremite",
    colorDot: "bg-slate-400",
  },
  {
    key: "muscle",
    structureId: "muscular",
    title: "Kas Sistemi (Myologia)",
    latin: "Musculi Trunci & Extremitatum",
    details: "640+ Kas • Yüzeysel & Derin Plan",
    colorDot: "bg-rose-500",
  },
  {
    key: "vascular",
    structureId: "heart",
    title: "Dolaşım & Damarlar (Angiologia)",
    latin: "Aorta, V. Cava, Kalp & Tüm Damar Ağacı",
    details: "Tüm Arterler, Venler & Koroner Dolaşım",
    colorDot: "bg-red-500",
  },
  {
    key: "nervous",
    structureId: "brain",
    title: "Sinir Sistemi (Neurologia)",
    latin: "Encephalon, Medulla & Bütün Sinir Uçları",
    details: "Beyin + Omurilik + Tüm Periferik Sinir Uçları",
    colorDot: "bg-amber-500",
  },
  {
    key: "organs",
    structureId: "abdomen",
    title: "Organların Tamamı (Splanchnologia)",
    latin: "Organa Visceralia, Thoracica & Abdominalia",
    details: "Akciğerler, Karaciğer, Mide, Böbrekler, Dalak",
    colorDot: "bg-emerald-500",
  },
];

export default function AtlasPage() {
  const [selectedStructure, setSelectedStructure] = useState<string>("muscular");
  const [muscleOpacity, setMuscleOpacity] = useState<number>(0.85);
  const [layers, setLayers] = useState<DissectionLayersState>({
    skeleton: true,
    muscle: true,
    vascular: true,
    nervous: false,
    organs: true,
  });

  // Read URL params if opened with ?region=...
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const reg = params.get("region");
      if (reg === "head-neck" || reg === "neuro" || reg === "brain") {
        setSelectedStructure("brain");
        setLayers({ skeleton: true, muscle: false, vascular: false, nervous: true, organs: false });
      } else if (reg === "thorax" || reg === "heart") {
        setSelectedStructure("heart");
        setLayers({ skeleton: true, muscle: false, vascular: true, nervous: false, organs: false });
      } else if (reg === "abdomen") {
        setSelectedStructure("abdomen");
        setLayers({ skeleton: true, muscle: false, vascular: false, nervous: false, organs: true });
      } else if (reg === "pelvis" || reg === "skeletal") {
        setSelectedStructure("skeletal");
        setLayers({ skeleton: true, muscle: false, vascular: false, nervous: false, organs: false });
      } else if (reg === "locomotor" || reg === "muscular") {
        setSelectedStructure("muscular");
        setLayers({ skeleton: true, muscle: true, vascular: false, nervous: false, organs: false });
      }
    }
  }, []);

  const toggleLayer = (layer: keyof DissectionLayersState, structureId?: string) => {
    setLayers((prev) => {
      const nextVal = !prev[layer];
      if (nextVal && structureId) {
        setSelectedStructure(structureId);
      }
      return { ...prev, [layer]: nextVal };
    });
  };

  const handleSelectStructure = (structureId: string, layerKey: keyof DissectionLayersState) => {
    setSelectedStructure(structureId);
    if (!layers[layerKey]) {
      setLayers((prev) => ({ ...prev, [layerKey]: true }));
    }
  };

  // Quick Scope Presets
  const applyPresetAll = () => {
    setLayers({ skeleton: true, muscle: true, vascular: true, nervous: true, organs: true });
    setMuscleOpacity(0.85);
    setSelectedStructure("muscular");
  };

  const applyPresetPeel = () => {
    setLayers({ skeleton: true, muscle: true, vascular: true, nervous: true, organs: true });
    setMuscleOpacity(0.2);
    setSelectedStructure("skeletal");
  };

  const applyPresetSkeletonVascular = () => {
    setLayers({ skeleton: true, muscle: false, vascular: true, nervous: false, organs: false });
    setSelectedStructure("heart");
  };

  const applyPresetOrgans = () => {
    setLayers({ skeleton: true, muscle: false, vascular: true, nervous: false, organs: true });
    setSelectedStructure("abdomen");
  };

  const applyPresetNeuro = () => {
    setLayers({ skeleton: true, muscle: false, vascular: false, nervous: true, organs: false });
    setSelectedStructure("brain");
  };

  const activeCount = Object.values(layers).filter(Boolean).length;
  const currentDetail = STRUCTURE_DETAILS[selectedStructure] || STRUCTURE_DETAILS.muscular;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      <Navbar activePath="/atlas" />

      <main className="w-full pt-20 bg-[#f8f9ff]">
        {/* ================= SUB-HEADER & SCOPE TOOLBAR (Clean, single-line, strictly uncluttered) ================= */}
        <section className="w-full bg-[#ffffff] border-b border-[#e5eeff] shadow-sm z-30 overflow-x-auto scrollbar-none touch-pan-x">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 min-w-[720px] sm:min-w-[760px]">
            {/* Left: Breadcrumb & Scope Presets (Strictly 1 line) */}
            <div className="flex items-center gap-3 shrink-0 whitespace-nowrap">
              <div className="flex items-center gap-2 text-[#41474d] text-[12px] shrink-0 whitespace-nowrap">
                <span className="inline-flex items-center gap-1 font-semibold text-[#006591] shrink-0 whitespace-nowrap">
                  <span className="material-symbols-outlined text-[17px]">layers</span>
                  3D Atlas Studio
                </span>
                <span className="text-[#c1c7ce] font-mono">/</span>
                <span className="font-mono text-[#0b1c30] font-semibold bg-[#eff4ff] px-2.5 py-1 rounded text-[11px] tracking-tight shrink-0 whitespace-nowrap">
                  Systema Corporis Humani (Diseksiyon Masası)
                </span>
              </div>

              <div className="flex items-center gap-1 bg-[#eff4ff] p-1 rounded-lg shrink-0 whitespace-nowrap">
                <button
                  type="button"
                  onClick={applyPresetAll}
                  className="px-3 py-1 text-[11px] font-bold font-archivo rounded whitespace-nowrap transition-all cursor-pointer text-[#41474d] hover:text-[#0b1c30] hover:bg-[#dce9ff]"
                >
                  TÜM VÜCUT
                </button>
                <button
                  type="button"
                  onClick={applyPresetPeel}
                  className="px-3 py-1 text-[11px] font-bold font-archivo rounded whitespace-nowrap transition-all cursor-pointer text-[#41474d] hover:text-[#0b1c30] hover:bg-[#dce9ff]"
                >
                  KASLARI SOY
                </button>
                <button
                  type="button"
                  onClick={applyPresetSkeletonVascular}
                  className="px-3 py-1 text-[11px] font-bold font-archivo rounded whitespace-nowrap transition-all cursor-pointer text-[#41474d] hover:text-[#0b1c30] hover:bg-[#dce9ff]"
                >
                  İSKELET & VASKÜLER
                </button>
                <button
                  type="button"
                  onClick={applyPresetOrgans}
                  className="px-3 py-1 text-[11px] font-bold font-archivo rounded whitespace-nowrap transition-all cursor-pointer text-[#41474d] hover:text-[#0b1c30] hover:bg-[#dce9ff]"
                >
                  ORGANLAR
                </button>
                <button
                  type="button"
                  onClick={applyPresetNeuro}
                  className="px-3 py-1 text-[11px] font-bold font-archivo rounded whitespace-nowrap transition-all cursor-pointer text-[#41474d] hover:text-[#0b1c30] hover:bg-[#dce9ff]"
                >
                  NÖROANATOMİ
                </button>
              </div>
            </div>

            {/* Right: Active Layers Indicator & Quick Toggle (Strictly 1 line, gender/depth/search removed) */}
            <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
              <div className="flex items-center gap-2 bg-[#eff4ff] px-3 py-1 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[11px] font-bold text-[#003752]">
                  {activeCount} / 5 KATMAN AKTİF
                </span>
              </div>
              <button
                type="button"
                onClick={applyPresetAll}
                className="px-3 py-1 text-[11px] font-semibold text-[#006591] hover:bg-[#eff4ff] rounded-lg transition-all cursor-pointer"
              >
                Tümünü Aç
              </button>
              <button
                type="button"
                onClick={applyPresetPeel}
                className="px-3 py-1 text-[11px] font-semibold text-[#006591] hover:bg-[#eff4ff] rounded-lg transition-all cursor-pointer"
              >
                Kasları Soy
              </button>
            </div>
          </div>
        </section>

        {/* ================= MAIN ANATOMICAL WORKSPACE ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* LEFT COLUMN: DİSEKSİYON KATMANLARI & DİNAMİK YAPILANDIRICI (order-2 on mobile, under 3D viewer) */}
            <aside className="order-2 lg:order-1 lg:col-span-4 flex flex-col gap-4">
              {/* Layer Dissection Panel with Live On/Off Switches */}
              <div className="bg-[#ffffff] rounded-2xl p-4 border border-[#e5eeff] shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006591] text-[20px]">
                      reorder
                    </span>
                    <h2 className="text-[16px] text-[#003752] uppercase font-bold tracking-tight font-archivo">
                      Diseksiyon Katmanları
                    </h2>
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-[#006591] bg-[#e5eeff] px-2 py-0.5 rounded">
                    {activeCount}/5 AKTİF
                  </span>
                </div>
                <p className="text-[12px] text-[#41474d]">
                  Anahtarları açıp kapatarak 3D kadavra modelini katman katman diseke edin.
                </p>

                {/* Quick Presets within Panel */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={applyPresetAll}
                    className="py-1 px-2 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003752] text-[10px] font-bold font-archivo transition-all text-center cursor-pointer"
                  >
                    TÜMÜNÜ AÇ
                  </button>
                  <button
                    type="button"
                    onClick={applyPresetPeel}
                    className="py-1 px-2 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003752] text-[10px] font-bold font-archivo transition-all text-center cursor-pointer"
                  >
                    KASLARI SOY
                  </button>
                  <button
                    type="button"
                    onClick={applyPresetOrgans}
                    className="py-1 px-2 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003752] text-[10px] font-bold font-archivo transition-all text-center cursor-pointer"
                  >
                    İSKELET & ORGAN
                  </button>
                </div>

                {/* Layer List with Interactive On/Off Toggle Switches */}
                <div className="flex flex-col gap-2 pt-1">
                  {LAYER_DEFINITIONS.map((item) => {
                    const isActive = Boolean(layers[item.key]);
                    const isInspected = selectedStructure === item.structureId;

                    return (
                      <div
                        key={item.key}
                        onClick={() => handleSelectStructure(item.structureId, item.key)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          isInspected
                            ? "bg-[#eff4ff] border-[#006591] shadow-sm"
                            : "bg-[#ffffff] hover:bg-[#f8f9ff] border-[#e5eeff]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          {/* Left: Indicator & Titles */}
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`w-3.5 h-3.5 rounded-full shrink-0 ${item.colorDot}`} />
                            <div className="flex flex-col text-left truncate">
                              <span className="text-[13px] font-bold text-[#003752] truncate">
                                {item.title}
                              </span>
                              <span className="text-[11px] text-[#41474d] truncate">
                                {item.details}
                              </span>
                            </div>
                          </div>

                          {/* Right: On/Off Toggle Switch */}
                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={`font-mono text-[10px] font-bold ${
                                isActive ? "text-[#006591]" : "text-[#72787e]"
                              }`}
                            >
                              {isActive ? "AÇIK" : "KAPALI"}
                            </span>
                            <button
                              type="button"
                              role="switch"
                              aria-checked={isActive}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLayer(item.key, item.structureId);
                              }}
                              className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer flex items-center ${
                                isActive ? "bg-[#003752]" : "bg-slate-300"
                              }`}
                              title={`${item.title} katmanını ${isActive ? "kapat" : "aç"}`}
                            >
                              <div
                                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                                  isActive ? "translate-x-5" : "translate-x-0"
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        {/* Interactive Muscle Peeling / Opacity Controls when Muscle Layer is Active */}
                        {item.key === "muscle" && isActive && (
                          <div
                            className="mt-2.5 pt-2 border-t border-[#e5eeff] flex flex-col gap-1.5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-semibold text-[#003752] flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px] text-[#006591]">
                                  opacity
                                </span>
                                Kas Soyma (Diseksiyon):
                              </span>
                              <span className="font-mono text-[11px] font-bold text-[#006591]">
                                %{Math.round(muscleOpacity * 100)} Opaklık
                              </span>
                            </div>
                            <div className="grid grid-cols-4 gap-1">
                              {[
                                { label: "Tam", val: 1.0 },
                                { label: "%85", val: 0.85 },
                                { label: "Soy %50", val: 0.5 },
                                { label: "İnce %20", val: 0.2 },
                              ].map((opt) => (
                                <button
                                  key={opt.val}
                                  type="button"
                                  onClick={() => setMuscleOpacity(opt.val)}
                                  className={`py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                                    muscleOpacity === opt.val
                                      ? "bg-[#003752] text-white shadow-xs"
                                      : "bg-[#e5eeff] text-[#003752] hover:bg-[#dce9ff]"
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Structure Inspector Card */}
              <div className="bg-[#ffffff] rounded-2xl p-4 border border-[#e5eeff] shadow-sm flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-[#006591] uppercase font-bold tracking-wider font-archivo">
                      CANLI SEÇİLİ ANATOMİK YAPI
                    </span>
                    <h3 className="text-[18px] text-[#003752] font-bold font-archivo">
                      {currentDetail.name}
                    </h3>
                    <span className="text-[11px] text-[#41474d]">
                      {currentDetail.latin}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#003752]">
                    <span className="material-symbols-outlined text-[20px]">{currentDetail.icon}</span>
                  </div>
                </div>

                {/* Metadata & Metric Badges */}
                <div className="grid grid-cols-2 gap-2 bg-[#eff4ff] p-2.5 rounded-xl">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-[#41474d] font-mono">TA2 KODU</span>
                    <span className="font-mono text-[12px] font-bold text-[#003752]">
                      {currentDetail.ta2}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-[#41474d] font-mono">KOMİTE ÖNEMİ</span>
                    <span className="text-[12px] font-bold text-[#6d001c]">
                      {currentDetail.importance}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-[#41474d] font-mono">SINAV SIKLIĞI</span>
                    <span className="font-mono text-[12px] font-bold text-[#006591]">
                      {currentDetail.examRate}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-[#41474d] font-mono">İNERVASYON</span>
                    <span className="text-[12px] font-medium text-[#0b1c30]">
                      {currentDetail.innervation}
                    </span>
                  </div>
                </div>

                {/* Clinical Notes */}
                <div className="bg-[#eff4ff]/80 p-3 rounded-xl flex flex-col gap-1 border border-[#e5eeff]">
                  <span className="text-[11px] text-[#003752] font-bold font-archivo flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-[#006591]">
                      clinical_notes
                    </span>
                    Klinik Diseksiyon Notu:
                  </span>
                  <p className="text-[11px] text-[#41474d] leading-relaxed">
                    {currentDetail.clinicalNote}
                  </p>
                </div>

                {/* Inspector Action Buttons */}
                <div className="pt-1">
                  <Link
                    href="/zilli-sinav"
                    className="w-full py-2.5 px-3 rounded-xl bg-[#003752] hover:bg-[#1f4e6b] text-white text-[12px] font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">timer</span>
                    <span>Bu Bölgeyle Zilli Sınava Gir</span>
                  </Link>
                </div>
              </div>
            </aside>

            {/* RIGHT COLUMN: EXPANDED, CLEAN 3D VIEWPORT CANVAS (order-1 on mobile) */}
            <div className="order-1 lg:order-2 lg:col-span-8 flex flex-col gap-3">
              <div className="relative w-full h-[420px] sm:h-[560px] lg:h-[740px] rounded-2xl bg-[#0a1926] border border-[#e5eeff] overflow-hidden shadow-md flex flex-col">
                {/* Clean Top HUD Overlay */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-20 flex flex-wrap sm:flex-nowrap items-center justify-between pointer-events-none gap-2">
                  {/* Active Structure Badge */}
                  <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#ffffff]/95 backdrop-blur-md shadow-sm border border-[#e5eeff]">
                    <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#39b8fd] animate-pulse shrink-0" />
                    <span className="font-['Archivo_Narrow'] text-[11px] sm:text-[12px] font-bold uppercase text-[#003752] tracking-wider truncate max-w-[200px] sm:max-w-none">
                      {currentDetail.name} ({activeCount} Katman Aktif)
                    </span>
                  </div>

                  {/* Telemetry */}
                  <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 bg-[#ffffff]/95 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl shadow-sm border border-[#e5eeff] font-mono text-[10px] sm:text-[11px] text-[#41474d] shrink-0">
                    <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-[#003752]">60 FPS</span>
                    <span className="text-[#c1c7ce] hidden sm:inline">•</span>
                    <span className="text-[#006591] font-semibold hidden sm:inline">BodyParts3D</span>
                  </div>
                </div>

                {/* Pure 3D WebGL Canvas with Live Multi-Layer Dissection Support */}
                <div className="w-full h-full flex items-center justify-center relative">
                  <AnatomyViewer3D
                    activeLayers={layers}
                    onLayersChange={setLayers}
                    muscleOpacity={muscleOpacity}
                    onMuscleOpacityChange={setMuscleOpacity}
                    showCard={false}
                    showHud={false}
                    showLayersWidget={false}
                    showLayerSwitcher={true}
                    showCameraControls={true}
                    showFooter={false}
                    height="h-full"
                  />
                </div>

                {/* Subtle Interactive Guide at Bottom */}
                <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none flex items-center justify-between">
                  <div className="pointer-events-auto bg-[#003752]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-[11px] flex items-center gap-2 shadow-sm border border-sky-400/20">
                    <span className="material-symbols-outlined text-[16px] text-[#39b8fd]">
                      touch_app
                    </span>
                    <span>Modeli döndürmek için sürükleyin • Yakınlaştırmak için kaydırın</span>
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
