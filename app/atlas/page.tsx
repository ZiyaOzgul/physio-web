"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { DissectionLayersState, AnatomyGender, SelectedNodeInfo } from "@/components/AnatomyViewer3D";
import { useLanguage } from "@/context/LanguageContext";

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
    nameEn: string;
    latin: string;
    ta2: string;
    category: string;
    categoryEn: string;
    importance: string;
    importanceEn: string;
    examRate: string;
    examRateEn: string;
    innervation: string;
    innervationEn: string;
    icon: string;
    clinicalNote: string;
    clinicalNoteEn: string;
  }
> = {
  heart: {
    name: "Cor (Kalp) & Dolaşım",
    nameEn: "Cor (Heart) & Circulation",
    latin: "Myocardium, Endocardium & Pericardium",
    ta2: "TA2: 3951",
    category: "Dolaşım & Angiologia",
    categoryEn: "Circulation & Angiology",
    importance: "★★★★★ (Kritik)",
    importanceEn: "★★★★★ (Critical)",
    examRate: "%92 Sorulma Oranı",
    examRateEn: "92% Exam Yield",
    innervation: "Plexus Cardiacus",
    innervationEn: "Cardiac Plexus",
    icon: "cardiology",
    clinicalNote:
      "Apex cordis sol 5. interkostal aralıkta, linea medioclavicularis'in 8-9 cm lateralinde palpe edilir. Sulcus coronarius ve sulcus interventricularis anterior referans alınmalıdır.",
    clinicalNoteEn:
      "Apex cordis is palpated at the left 5th intercostal space, 8-9 cm lateral to the midclavicular line. Sulcus coronarius and anterior interventricular sulcus serve as primary landmarks.",
  },
  muscular: {
    name: "Systema Musculare (Kas Sistemi)",
    nameEn: "Systema Musculare (Muscular System)",
    latin: "Musculi trunci, capitis et extremitatum",
    ta2: "TA2: 2100",
    category: "Miyoloji",
    categoryEn: "Myology",
    importance: "★★★★★ (Temel)",
    importanceEn: "★★★★★ (Essential)",
    examRate: "%95 Sorulma Oranı",
    examRateEn: "95% Exam Yield",
    innervation: "Spinal & Kranial Sinirler",
    innervationEn: "Spinal & Cranial Nerves",
    icon: "accessibility",
    clinicalNote:
      "Fascia lata, karpal tünel ve trigonum femorale (Scarpa üçgeni) sınırları pratik kadavra sınavlarında en çok sorulan diseksiyon bölgeleridir.",
    clinicalNoteEn:
      "Fascia lata, the carpal tunnel, and boundaries of the femoral triangle (Scarpa's triangle) are the most frequently pinned dissection sites in practical board exams.",
  },
  skeletal: {
    name: "Systema Skeletale (İskelet)",
    nameEn: "Systema Skeletale (Skeleton)",
    latin: "Skeleton axiale et appendiculare",
    ta2: "TA2: 1001",
    category: "Osteoloji",
    categoryEn: "Osteology",
    importance: "★★★★☆ (Temel)",
    importanceEn: "★★★★☆ (Foundation)",
    examRate: "%88 Sorulma Oranı",
    examRateEn: "88% Exam Yield",
    innervation: "Periosteal Sinirler",
    innervationEn: "Periosteal Nerves",
    icon: "skeleton",
    clinicalNote:
      "Foramen magnum, canalis caroticus, os sphenoidale sella turcica ve foramen obturatum kemik masası sınavlarının vazgeçilmez sorularıdır.",
    clinicalNoteEn:
      "Foramen magnum, carotid canal, sella turcica of the sphenoid bone, and obturator foramen are indispensable high-yield stations on osteology exam tables.",
  },
  brain: {
    name: "Systema Nervosum (Nöroanatomi)",
    nameEn: "Systema Nervosum (Neuroanatomy)",
    latin: "Encephalon, Medulla Spinalis et Nervi",
    ta2: "TA2: 5400",
    category: "Nöroanatomi",
    categoryEn: "Neuroanatomy",
    importance: "★★★★★ (Klinik)",
    importanceEn: "★★★★★ (Clinical)",
    examRate: "%96 Sorulma Oranı",
    examRateEn: "96% Exam Yield",
    innervation: "Kranial Çiftler (I - XII)",
    innervationEn: "Cranial Pairs (CN I - XII)",
    icon: "neurology",
    clinicalNote:
      "Willis poligonu, capsula interna traktusları ve 12 kranial sinirin kafatası tabanındaki çıkış delikleri OSCE sınavlarının çekirdeğidir.",
    clinicalNoteEn:
      "Circle of Willis, internal capsule tracts, and cranial base exit foramina of all 12 cranial nerves form the core of neuroanatomy OSCE stations.",
  },
  abdomen: {
    name: "Organa Abdominalia (Visseral Organlar)",
    nameEn: "Organa Abdominalia (Visceral Organs)",
    latin: "Gaster, Hepar, Pancreas et Intestinum",
    ta2: "TA2: 4200",
    category: "Splanknoloji",
    categoryEn: "Splanchnology",
    importance: "★★★★☆ (Uygulamalı)",
    importanceEn: "★★★★☆ (Practical)",
    examRate: "%90 Sorulma Oranı",
    examRateEn: "90% Exam Yield",
    innervation: "N. Vagus & Splanchnic Sinirler",
    innervationEn: "Vagus & Splanchnic Nerves",
    icon: "medical_services",
    clinicalNote:
      "Foramen omentale (Winslow), bursa omentalis sınırları ve trunkus çölyakus dallanmaları kadavra pratik sınavlarının en popüler istasyonlarıdır.",
    clinicalNoteEn:
      "Omental foramen (Winslow), lesser sac boundaries, and celiac trunk trifurcation branches are among the highest-yield visceral cadaver practical stations.",
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
  const { t, language } = useLanguage();
  const [gender, setGender] = useState<AnatomyGender>("male");
  const [selectedNode, setSelectedNode] = useState<SelectedNodeInfo | null>(null);
  const [selectedStructure, setSelectedStructure] = useState<string>("muscular");
  const [muscleOpacity, setMuscleOpacity] = useState<number>(0.85);
  const [layers, setLayers] = useState<DissectionLayersState>({
    skeleton: true,
    muscle: true,
    vascular: true,
    nervous: false,
    organs: true,
  });

  const handleGenderChange = (nextGender: AnatomyGender) => {
    setGender(nextGender);
    setSelectedNode(null);
    // Ensure organs layer is visible when switching to female so mammary/pelvic organs are shown
    if (nextGender === "female" && !layers.organs) {
      setLayers((prev) => ({ ...prev, organs: true }));
    }
  };

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
    setSelectedNode(null);
    setSelectedStructure(structureId);
    if (!layers[layerKey]) {
      setLayers((prev) => ({ ...prev, [layerKey]: true }));
    }
  };

  const handle3DLayerClick = (layerKey: keyof DissectionLayersState) => {
    const map: Record<keyof DissectionLayersState, string> = {
      skeleton: "skeletal",
      muscle: "muscular",
      vascular: "heart",
      nervous: "brain",
      organs: "abdomen",
    };
    const nextStructure = map[layerKey];
    if (nextStructure) {
      setSelectedStructure(nextStructure);
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

  const localizedLayerDefs = [
    {
      key: "skeleton" as keyof DissectionLayersState,
      structureId: "skeletal",
      title: language === "tr" ? "İskelet (Osteologia)" : "Skeleton (Osteology)",
      latin: "Skeleton Axiale & Appendiculare",
      details: language === "tr" ? "206 Kemik • Eksenel & Ekstremite" : "206 Bones • Axial & Appendicular",
      colorDot: "bg-slate-400",
    },
    {
      key: "muscle" as keyof DissectionLayersState,
      structureId: "muscular",
      title: language === "tr" ? "Kas Sistemi (Myologia)" : "Muscular System (Myology)",
      latin: "Musculi Trunci & Extremitatum",
      details: language === "tr" ? "640+ Kas • Yüzeysel & Derin Plan" : "640+ Muscles • Superficial & Deep",
      colorDot: "bg-rose-500",
    },
    {
      key: "vascular" as keyof DissectionLayersState,
      structureId: "heart",
      title: language === "tr" ? "Dolaşım & Damarlar (Angiologia)" : "Cardiovascular (Angiology)",
      latin: "Aorta, V. Cava, Kalp & Tüm Damar Ağacı",
      details: language === "tr" ? "Tüm Arterler, Venler & Koroner Dolaşım" : "Arteries, Veins & Coronary Tree",
      colorDot: "bg-red-500",
    },
    {
      key: "nervous" as keyof DissectionLayersState,
      structureId: "brain",
      title: language === "tr" ? "Sinir Sistemi (Neurologia)" : "Nervous System (Neurology)",
      latin: "Encephalon, Medulla & Bütün Sinir Uçları",
      details: language === "tr" ? "Beyin + Omurilik + Tüm Periferik Sinir Uçları" : "Brain + Spinal Cord + Peripheral Nerves",
      colorDot: "bg-amber-500",
    },
    {
      key: "organs" as keyof DissectionLayersState,
      structureId: "abdomen",
      title: language === "tr" ? "Organların Tamamı (Splanchnologia)" : "Visceral Organs (Splanchnology)",
      latin: "Organa Visceralia, Thoracica & Abdominalia",
      details: language === "tr" ? "Akciğerler, Karaciğer, Mide, Böbrekler, Dalak" : "Lungs, Liver, Stomach, Kidneys, Spleen",
      colorDot: "bg-emerald-500",
    },
  ];

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
                  {t.atlasPage.subTitle}
                </span>
                <span className="text-[#c1c7ce] font-mono">/</span>
                <span className="font-mono text-[#0b1c30] font-semibold bg-[#eff4ff] px-2.5 py-1 rounded text-[11px] tracking-tight shrink-0 whitespace-nowrap">
                  {language === "tr" ? "Systema Corporis Humani (Diseksiyon Masası)" : "Systema Corporis Humani (Dissection Table)"}
                </span>
              </div>

              <div className="flex items-center gap-1 bg-[#eff4ff] p-1 rounded-lg shrink-0 whitespace-nowrap">
                <button
                  type="button"
                  onClick={applyPresetAll}
                  className="px-3 py-1 text-[11px] font-bold font-archivo rounded whitespace-nowrap transition-all cursor-pointer text-[#41474d] hover:text-[#0b1c30] hover:bg-[#dce9ff]"
                >
                  {t.atlasPage.presetAll}
                </button>
                <button
                  type="button"
                  onClick={applyPresetPeel}
                  className="px-3 py-1 text-[11px] font-bold font-archivo rounded whitespace-nowrap transition-all cursor-pointer text-[#41474d] hover:text-[#0b1c30] hover:bg-[#dce9ff]"
                >
                  {t.atlasPage.peelAll}
                </button>
                <button
                  type="button"
                  onClick={applyPresetSkeletonVascular}
                  className="px-3 py-1 text-[11px] font-bold font-archivo rounded whitespace-nowrap transition-all cursor-pointer text-[#41474d] hover:text-[#0b1c30] hover:bg-[#dce9ff]"
                >
                  {language === "tr" ? "İSKELET & VASKÜLER" : "SKELETON & VESSELS"}
                </button>
                <button
                  type="button"
                  onClick={applyPresetOrgans}
                  className="px-3 py-1 text-[11px] font-bold font-archivo rounded whitespace-nowrap transition-all cursor-pointer text-[#41474d] hover:text-[#0b1c30] hover:bg-[#dce9ff]"
                >
                  {t.atlasPage.presetOrgans}
                </button>
                <button
                  type="button"
                  onClick={applyPresetNeuro}
                  className="px-3 py-1 text-[11px] font-bold font-archivo rounded whitespace-nowrap transition-all cursor-pointer text-[#41474d] hover:text-[#0b1c30] hover:bg-[#dce9ff]"
                >
                  {t.atlasPage.presetNeuro}
                </button>
                <Link
                  href="/kemik-anatomisi"
                  className="px-3 py-1 text-[11px] font-bold font-archivo rounded whitespace-nowrap transition-all cursor-pointer bg-[#003752] text-white hover:bg-[#1f4e6b] shadow-xs flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">skeleton</span>
                  <span>{language === "tr" ? "KEMİK ANATOMİSİ (43 KEMİK)" : "BONE ANATOMY (43 BONES)"}</span>
                </Link>
              </div>
            </div>

            {/* Right: Gender Switcher, Active Layers Indicator & Quick Toggle */}
            <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
              {/* Male / Female Model Toggle */}
              <div className="flex items-center gap-1 bg-[#eff4ff] p-1 rounded-lg border border-[#dce9ff]">
                <button
                  type="button"
                  onClick={() => handleGenderChange("male")}
                  className={`px-2.5 py-1 text-[11px] font-bold font-archivo rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                    gender === "male"
                      ? "bg-[#003752] text-white shadow-xs"
                      : "text-[#41474d] hover:text-[#0b1c30]"
                  }`}
                >
                  <span>♂</span>
                  <span>{language === "tr" ? "ERKEK" : "MALE"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleGenderChange("female")}
                  className={`px-2.5 py-1 text-[11px] font-bold font-archivo rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                    gender === "female"
                      ? "bg-[#9e1c4e] text-white shadow-xs"
                      : "text-[#41474d] hover:text-[#0b1c30]"
                  }`}
                >
                  <span>♀</span>
                  <span>{language === "tr" ? "KADIN" : "FEMALE"}</span>
                </button>
              </div>

              <div className="flex items-center gap-2 bg-[#eff4ff] px-3 py-1 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[11px] font-bold text-[#003752]">
                  {activeCount} / 5 {t.atlasPage.activeLayers}
                </span>
              </div>
              <button
                type="button"
                onClick={applyPresetAll}
                className="px-3 py-1 text-[11px] font-semibold text-[#006591] hover:bg-[#eff4ff] rounded-lg transition-all cursor-pointer"
              >
                {t.atlasPage.openAll}
              </button>
              <button
                type="button"
                onClick={applyPresetPeel}
                className="px-3 py-1 text-[11px] font-semibold text-[#006591] hover:bg-[#eff4ff] rounded-lg transition-all cursor-pointer"
              >
                {t.atlasPage.peelAll}
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
                      {t.atlasPage.dissectionLayersTitle}
                    </h2>
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-[#006591] bg-[#e5eeff] px-2 py-0.5 rounded">
                    {activeCount}/5 {t.atlasPage.activeLayers}
                  </span>
                </div>
                <p className="text-[12px] text-[#41474d]">
                  {t.atlasPage.dissectionLayersSubtitle}
                </p>

                {/* Male / Female Anatomical Model Selector inside Panel */}
                <div className="grid grid-cols-2 gap-1.5 bg-[#eff4ff] p-1 rounded-xl border border-[#dce9ff]">
                  <button
                    type="button"
                    onClick={() => handleGenderChange("male")}
                    className={`py-2 px-3 rounded-lg text-[11px] font-bold font-archivo transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      gender === "male"
                        ? "bg-[#003752] text-white shadow-sm"
                        : "text-[#003752] hover:bg-[#dce9ff]"
                    }`}
                  >
                    <span className="text-[13px]">♂</span>
                    <span>{language === "tr" ? "Erkek Modeli" : "Male Model"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenderChange("female")}
                    className={`py-2 px-3 rounded-lg text-[11px] font-bold font-archivo transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      gender === "female"
                        ? "bg-[#9e1c4e] text-white shadow-sm"
                        : "text-[#003752] hover:bg-[#dce9ff]"
                    }`}
                  >
                    <span className="text-[13px]">♀</span>
                    <span>{language === "tr" ? "Kadın Modeli" : "Female Model"}</span>
                  </button>
                </div>

                {/* Quick Presets within Panel */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={applyPresetAll}
                    className="py-1 px-2 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003752] text-[10px] font-bold font-archivo transition-all text-center cursor-pointer"
                  >
                    {t.atlasPage.presetAll}
                  </button>
                  <button
                    type="button"
                    onClick={applyPresetPeel}
                    className="py-1 px-2 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003752] text-[10px] font-bold font-archivo transition-all text-center cursor-pointer"
                  >
                    {t.atlasPage.peelAll}
                  </button>
                  <button
                    type="button"
                    onClick={applyPresetOrgans}
                    className="py-1 px-2 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003752] text-[10px] font-bold font-archivo transition-all text-center cursor-pointer"
                  >
                    {language === "tr" ? "İSKELET & ORGAN" : "SKELETON & ORGANS"}
                  </button>
                </div>

                {/* Layer List with Interactive On/Off Toggle Switches */}
                <div className="flex flex-col gap-2 pt-1">
                  {localizedLayerDefs.map((item) => {
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
                              {isActive ? (language === "tr" ? "AÇIK" : "ON") : (language === "tr" ? "KAPALI" : "OFF")}
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
                              title={`${item.title} (${isActive ? (language === "tr" ? "Kapat" : "Hide") : (language === "tr" ? "Aç" : "Show")})`}
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
                                {t.atlasPage.musclePeeling}
                              </span>
                              <span className="font-mono text-[11px] font-bold text-[#006591]">
                                %{Math.round(muscleOpacity * 100)} {t.atlasPage.opacity}
                              </span>
                            </div>
                            <div className="grid grid-cols-4 gap-1">
                              {[
                                { label: t.atlasPage.full, val: 1.0 },
                                { label: "%85", val: 0.85 },
                                { label: t.atlasPage.peel, val: 0.5 },
                                { label: t.atlasPage.thin, val: 0.2 },
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

                {/* 3D Osteoloji / Kemik Anatomisi Hızlı Erişim */}
                <div className="mt-2 p-3.5 rounded-xl bg-gradient-to-br from-[#003752] to-[#006591] text-white flex flex-col gap-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold font-archivo uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">skeleton</span>
                      {language === "tr" ? "3D Osteoloji Atlası" : "3D Osteology Atlas"}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-white/20 text-[10px] font-mono font-bold">
                      43 KEMİK
                    </span>
                  </div>
                  <p className="text-[11px] text-sky-100 leading-snug">
                    {language === "tr"
                      ? "Femur, humerus, skapula ve tüm kemikleri tek tek izole inceleyin; numaralı çıkıntıları ve kas tutunmalarını görün."
                      : "Inspect isolated 3D bones with numbered landmarks, tubercles, and muscle attachments."}
                  </p>
                  <Link
                    href="/kemik-anatomisi"
                    className="self-start mt-0.5 px-3 py-1.5 rounded-lg bg-white text-[#003752] hover:bg-sky-50 text-[11px] font-bold flex items-center gap-1 transition-all shadow-xs"
                  >
                    <span>{language === "tr" ? "Kemik Anatomisini Aç" : "Open Bone Anatomy"}</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Dynamic Structure Inspector Card */}
              <div className="bg-[#ffffff] rounded-2xl p-4 border border-[#e5eeff] shadow-sm flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col text-left min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#39b8fd] animate-pulse shrink-0" />
                      <span className="text-[10px] text-[#006591] uppercase font-bold tracking-wider font-archivo">
                        {t.atlasPage.activeStructure}
                      </span>
                    </div>
                    <h3 className="text-[18px] text-[#003752] font-bold font-archivo leading-snug mt-0.5">
                      {selectedNode
                        ? language === "tr"
                          ? selectedNode.tr
                          : selectedNode.en
                        : language === "tr"
                        ? currentDetail.name
                        : currentDetail.nameEn}
                    </h3>
                    <span className="text-[11px] text-[#41474d] italic">
                      {selectedNode
                        ? selectedNode.la || selectedNode.en
                        : currentDetail.latin}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {selectedNode && (
                      <button
                        type="button"
                        onClick={() => setSelectedNode(null)}
                        className="px-2 py-1 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003752] font-mono text-[10px] font-bold cursor-pointer"
                        title={language === "tr" ? "Katman görünümüne dön" : "Back to layer view"}
                      >
                        ✕
                      </button>
                    )}
                    <div className="w-9 h-9 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#003752]">
                      <span className="material-symbols-outlined text-[20px]">{currentDetail.icon}</span>
                    </div>
                  </div>
                </div>

                {/* Metadata & Metric Badges */}
                <div className="grid grid-cols-2 gap-2 bg-[#eff4ff] p-2.5 rounded-xl">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-[#41474d] font-mono">
                      {selectedNode
                        ? language === "tr"
                          ? "YAPI KODU"
                          : "NODE ID"
                        : language === "tr"
                        ? "TA2 KODU"
                        : "TA2 CODE"}
                    </span>
                    <span className="font-mono text-[12px] font-bold text-[#003752] truncate">
                      {selectedNode ? selectedNode.id : currentDetail.ta2}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-[#41474d] font-mono">{language === "tr" ? "KOMİTE ÖNEMİ" : "IMPORTANCE"}</span>
                    <span className="text-[12px] font-bold text-[#6d001c]">
                      {language === "tr" ? currentDetail.importance : currentDetail.importanceEn}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-[#41474d] font-mono">
                      {selectedNode
                        ? language === "tr"
                          ? "TARAF / YÖN"
                          : "LATERALITY"
                        : language === "tr"
                        ? "SINAV SIKLIĞI"
                        : "EXAM FREQUENCY"}
                    </span>
                    <span className="font-mono text-[12px] font-bold text-[#006591]">
                      {selectedNode
                        ? selectedNode.side === "left"
                          ? language === "tr"
                            ? "Sol (Sinister)"
                            : "Left (Sinister)"
                          : selectedNode.side === "right"
                          ? language === "tr"
                            ? "Sağ (Dexter)"
                            : "Right (Dexter)"
                          : language === "tr"
                          ? "Orta Hat (Mediana)"
                          : "Midline (Median)"
                        : language === "tr"
                        ? currentDetail.examRate
                        : currentDetail.examRateEn}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-[#41474d] font-mono">
                      {selectedNode
                        ? language === "tr"
                          ? "SİSTEM / KATMAN"
                          : "SYSTEM / LAYER"
                        : language === "tr"
                        ? "İNERVASYON"
                        : "INNERVATION"}
                    </span>
                    <span className="text-[12px] font-medium text-[#0b1c30] truncate">
                      {selectedNode
                        ? language === "tr"
                          ? currentDetail.category
                          : currentDetail.categoryEn
                        : language === "tr"
                        ? currentDetail.innervation
                        : currentDetail.innervationEn}
                    </span>
                  </div>
                </div>

                {/* Clinical Notes */}
                <div className="bg-[#eff4ff]/80 p-3 rounded-xl flex flex-col gap-1 border border-[#e5eeff]">
                  <span className="text-[11px] text-[#003752] font-bold font-archivo flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-[#006591]">
                      clinical_notes
                    </span>
                    {t.atlasPage.clinicalNoteTitle}
                  </span>
                  <p className="text-[11px] text-[#41474d] leading-relaxed">
                    {selectedNode && (selectedNode.descTr || selectedNode.descEn)
                      ? language === "tr"
                        ? selectedNode.descTr || selectedNode.descEn
                        : selectedNode.descEn || selectedNode.descTr
                      : language === "tr"
                      ? currentDetail.clinicalNote
                      : currentDetail.clinicalNoteEn}
                  </p>
                </div>

                {/* Inspector Action Buttons */}
                <div className="pt-1">
                  <Link
                    href="/zilli-sinav"
                    className="w-full py-2.5 px-3 rounded-xl bg-[#003752] hover:bg-[#1f4e6b] text-white text-[12px] font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">timer</span>
                    <span>{t.atlasPage.startExamWithRegion}</span>
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
                      {selectedNode
                        ? language === "tr"
                          ? selectedNode.tr
                          : selectedNode.en
                        : language === "tr"
                        ? currentDetail.name
                        : currentDetail.nameEn}{" "}
                      ({activeCount} {t.atlasPage.activeLayers})
                    </span>
                  </div>

                  {/* Telemetry */}
                  <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 bg-[#ffffff]/95 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl shadow-sm border border-[#e5eeff] font-mono text-[10px] sm:text-[11px] text-[#41474d] shrink-0">
                    <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-[#003752]">
                      {gender === "male"
                        ? language === "tr"
                          ? "♂ Erkek"
                          : "♂ Male"
                        : language === "tr"
                        ? "♀ Kadın"
                        : "♀ Female"}
                    </span>
                    <span className="text-[#c1c7ce] hidden sm:inline">•</span>
                    <span className="text-[#006591] font-semibold hidden sm:inline">BodyParts3D</span>
                  </div>
                </div>

                {/* Pure 3D WebGL Canvas with Live Multi-Layer Dissection Support */}
                <div className="w-full h-full flex items-center justify-center relative">
                  <AnatomyViewer3D
                    activeLayers={layers}
                    onLayersChange={setLayers}
                    onSelectLayer={handle3DLayerClick}
                    onSelectNode={setSelectedNode}
                    gender={gender}
                    onGenderChange={handleGenderChange}
                    showGenderSwitcher={true}
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
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
