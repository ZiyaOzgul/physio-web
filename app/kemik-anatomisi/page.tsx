"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OsteologyViewer3D from "@/components/OsteologyViewer3D";
import { useLanguage } from "@/context/LanguageContext";
import {
  BONE_SUBANATOMY_SPECS,
  findBoneSubanatomyById,
  findBoneSubanatomyByPartId,
} from "@/content/boneSubanatomy";
import type {
  BoneLandmarkRegionGroup,
  BoneLandmarkSpec,
  BoneSubanatomySpec,
  MuscleAttachmentSpec,
} from "@/content/boneSubanatomy/domain";

type InspectorTab = "anatomy" | "muscles" | "landmarks";
type RegionFilter = "all" | BoneLandmarkRegionGroup;
type PickerCategory = "all" | "upper-limb" | "lower-limb" | "axial" | "cranium";

const CATEGORY_NAMES: Record<PickerCategory, { tr: string; en: string }> = {
  all: { tr: "Tüm Kemikler", en: "All Bones" },
  "upper-limb": { tr: "Üst Ekstremite", en: "Upper Limb" },
  "lower-limb": { tr: "Alt Ekstremite", en: "Lower Limb" },
  axial: { tr: "Aksiyel İskelet", en: "Axial Skeleton" },
  cranium: { tr: "Kranyum & Yüz", en: "Cranium & Face" },
};

const SURFACE_NAMES: Record<string, { tr: string; en: string }> = {
  anterior: { tr: "Ön Yüz (Anterior)", en: "Anterior Surface" },
  posterior: { tr: "Arka Yüz (Posterior)", en: "Posterior Surface" },
  medial: { tr: "İç Yan (Medial)", en: "Medial Surface" },
  lateral: { tr: "Dış Yan (Lateral)", en: "Lateral Surface" },
  superior: { tr: "Üst Yüz (Superior)", en: "Superior Surface" },
  inferior: { tr: "Alt Yüz (Inferior)", en: "Inferior Surface" },
};

function KemikAnatomisiContent() {
  const { language } = useLanguage();
  const tr = language === "tr";
  const searchParams = useSearchParams();

  const paramBone = searchParams?.get("bone") || searchParams?.get("boneId");
  const paramPart = searchParams?.get("partId");
  const paramLandmark = searchParams?.get("landmark");

  const initialSpec = useMemo(
    () =>
      findBoneSubanatomyById(paramBone) ??
      findBoneSubanatomyByPartId(paramPart) ??
      BONE_SUBANATOMY_SPECS[0]!,
    [paramBone, paramPart],
  );

  const [selectedBoneId, setSelectedBoneId] = useState<string>(initialSpec.boneId);
  const spec: BoneSubanatomySpec = useMemo(
    () => findBoneSubanatomyById(selectedBoneId) ?? initialSpec,
    [selectedBoneId, initialSpec],
  );

  // Inspector State
  const [inspectorTab, setInspectorTab] = useState<InspectorTab>("anatomy");
  const [regionFilter, setRegionFilter] = useState<RegionFilter>("all");
  const [activeLandmarkId, setActiveLandmarkId] = useState<string | null>(
    () => paramLandmark ?? spec.landmarks[0]?.id ?? null,
  );
  const [showAllZones, setShowAllZones] = useState<boolean>(true);
  const [showPins, setShowPins] = useState<boolean>(true);

  // Picker Modal State
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerCategory, setPickerCategory] = useState<PickerCategory>("all");
  const [pickerSearch, setPickerSearch] = useState("");

  // Sync when bone changes
  const handleSelectBone = (boneId: string) => {
    const nextSpec = findBoneSubanatomyById(boneId);
    setSelectedBoneId(boneId);
    setRegionFilter("all");
    setActiveLandmarkId(nextSpec?.landmarks[0]?.id ?? null);
    setIsPickerOpen(false);
  };

  const filteredLandmarks = useMemo(() => {
    if (regionFilter === "all") return spec.landmarks;
    return spec.landmarks.filter((lm) => lm.regionGroup === regionFilter);
  }, [spec.landmarks, regionFilter]);

  const activeLandmark: BoneLandmarkSpec | null = useMemo(
    () =>
      spec.landmarks.find((lm) => lm.id === activeLandmarkId) ??
      filteredLandmarks[0] ??
      spec.landmarks[0] ??
      null,
    [spec.landmarks, filteredLandmarks, activeLandmarkId],
  );

  const currentIdx = useMemo(() => {
    if (!activeLandmark) return 0;
    const idx = spec.landmarks.findIndex((lm) => lm.id === activeLandmark.id);
    return idx >= 0 ? idx : 0;
  }, [spec.landmarks, activeLandmark]);

  const handlePrev = () => {
    if (currentIdx > 0) {
      setActiveLandmarkId(spec.landmarks[currentIdx - 1]!.id);
    }
  };

  const handleNext = () => {
    if (currentIdx < spec.landmarks.length - 1) {
      setActiveLandmarkId(spec.landmarks[currentIdx + 1]!.id);
    }
  };

  // Picker bone list filtering
  const filteredBones = useMemo(() => {
    let list = BONE_SUBANATOMY_SPECS;
    if (pickerCategory === "upper-limb") {
      list = list.filter((b) => b.category === "upper-limb");
    } else if (pickerCategory === "lower-limb") {
      list = list.filter((b) => b.category === "lower-limb");
    } else if (pickerCategory === "axial") {
      list = list.filter((b) => b.category === "axial" && b.packId !== "head-neck");
    } else if (pickerCategory === "cranium") {
      list = list.filter((b) => b.packId === "head-neck");
    }

    if (pickerSearch.trim()) {
      const q = pickerSearch.toLowerCase().trim();
      list = list.filter(
        (b) =>
          b.latinName.toLowerCase().includes(q) ||
          b.title.tr.toLowerCase().includes(q) ||
          b.title.en.toLowerCase().includes(q) ||
          b.boneId.toLowerCase().includes(q),
      );
    }
    return list;
  }, [pickerCategory, pickerSearch]);

  const origoCount = useMemo(
    () => activeLandmark?.attachments.filter((a) => a.kind === "origo").length ?? 0,
    [activeLandmark],
  );
  const insertioCount = useMemo(
    () => activeLandmark?.attachments.filter((a) => a.kind === "insertio").length ?? 0,
    [activeLandmark],
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      <Navbar activePath="/kemik-anatomisi" />

      <main className="w-full pt-24 pb-16 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
        {/* Breadcrumb & Quick Info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#e5eeff] pb-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[12px] font-semibold text-[#006591]">
              <Link href="/" className="hover:underline">
                {tr ? "Ana Sayfa" : "Home"}
              </Link>
              <span>/</span>
              <Link href="/atlas" className="hover:underline">
                {tr ? "3D Atlas" : "3D Atlas"}
              </Link>
              <span>/</span>
              <span className="text-[#41474d]">{tr ? "Kemik Anatomisi (Osteoloji)" : "Bone Anatomy"}</span>
            </div>
            <h1 className="text-[26px] sm:text-[30px] font-extrabold text-[#003752] font-archivo uppercase tracking-tight">
              {tr ? "3D Osteoloji Atlası & Kemik Anatomisi" : "3D Osteology Atlas & Bone Anatomy"}
            </h1>
            <p className="text-[13px] text-[#41474d] max-w-3xl">
              {tr
                ? "Tüm kemiklerin izole 3D modelleri, numaralandırılmış anatomik çıkıntılar (tüberkül, sulkus, kondil), kas origo-insersiyo tutunma yüzeyleri ve klinik inciler."
                : "High-resolution isolated 3D bones, numbered osteological landmarks (tubercles, sulci, condyles), muscle attachments, and clinical pearls."}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              href="/atlas"
              className="px-3.5 py-2 rounded-xl bg-white border border-[#dce9ff] text-[#003752] hover:bg-[#eff4ff] text-[12px] font-semibold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">body_system</span>
              <span>{tr ? "Tüm Vücut Atlası" : "Full Body Atlas"}</span>
            </Link>
            <Link
              href="/zilli-sinav"
              className="px-3.5 py-2 rounded-xl bg-[#003752] hover:bg-[#1f4e6b] text-white text-[12px] font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">timer</span>
              <span>{tr ? "Zilli Sınav Masası" : "Bell Exam"}</span>
            </Link>
          </div>
        </div>

        {/* Selected Bone Header & Stepper Bar */}
        <div className="rounded-2xl bg-white border border-[#e5eeff] p-3 sm:p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Bone Selector Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPickerOpen(true)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#eff4ff] hover:bg-[#e0edff] border border-[#dce9ff] text-left transition-all cursor-pointer group shadow-xs"
            >
              <div className="w-10 h-10 rounded-lg bg-[#003752] text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">skeleton</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-bold text-[#003752] font-archivo truncate group-hover:text-[#006591]">
                    {tr ? spec.title.tr : spec.title.en}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white text-[#006591] font-semibold border border-[#dce9ff]">
                    {spec.latinName}
                  </span>
                </div>
                <span className="text-[11px] text-[#41474d] flex items-center gap-1">
                  <span>{spec.landmarks.length} {tr ? "anatomik işaret" : "landmarks"}</span>
                  <span>•</span>
                  <span>{tr ? "Değiştirmek için tıkla" : "Click to switch bone"}</span>
                </span>
              </div>
              <span className="material-symbols-outlined text-[20px] text-[#006591] ml-2 group-hover:translate-y-0.5 transition-transform">
                expand_more
              </span>
            </button>
          </div>

          {/* Landmark Stepper Navigation */}
          <div className="flex items-center gap-2 self-stretch md:self-auto justify-between md:justify-end">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="flex items-center gap-1 px-3 py-2 rounded-xl border border-[#dce9ff] bg-white hover:bg-[#eff4ff] text-[#003752] text-[12px] font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              <span className="hidden sm:inline">{tr ? "Önceki İşaret" : "Prev"}</span>
            </button>

            <div className="px-3 py-1.5 rounded-xl bg-[#eff4ff] text-center font-mono text-[12px] font-bold text-[#006591]">
              {currentIdx + 1} / {spec.landmarks.length}
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={currentIdx === spec.landmarks.length - 1}
              className="flex items-center gap-1 px-3 py-2 rounded-xl border border-[#dce9ff] bg-white hover:bg-[#eff4ff] text-[#003752] text-[12px] font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <span className="hidden sm:inline">{tr ? "Sonraki İşaret" : "Next"}</span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Main Work Area: 3D Viewer (Left) + Inspector Panel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: 3D Viewer Container */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
            <div className="h-[520px] sm:h-[600px] lg:h-[640px] w-full">
              <OsteologyViewer3D
                spec={spec}
                activeLandmarkId={activeLandmark?.id ?? null}
                onSelectLandmark={(id) => setActiveLandmarkId(id)}
                showAllZones={showAllZones}
                onToggleAllZones={() => setShowAllZones((v) => !v)}
                showPins={showPins}
                onTogglePins={() => setShowPins((v) => !v)}
                inspectorTab={inspectorTab}
                language={language}
              />
            </div>

            {/* Bone Summary Banner */}
            <div className="rounded-2xl bg-white border border-[#e5eeff] p-4 shadow-sm flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-[#003752] uppercase tracking-wider font-archivo flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#006591]">description</span>
                  {tr ? "Kemik Özeti & Artikülasyon" : "Bone Summary & Articulation"}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#006591] font-bold">
                  {spec.category.toUpperCase()}
                </span>
              </div>
              <p className="text-[13px] text-[#41474d] leading-relaxed">
                {tr ? spec.summary.tr : spec.summary.en}
              </p>
            </div>
          </div>

          {/* Right Column: Integrated Inspector Panel (Fixed height matching 3D viewer) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col h-[520px] sm:h-[600px] lg:h-[640px] bg-white rounded-3xl border border-[#e5eeff] shadow-sm overflow-hidden">
            {/* Top Segmented Tabs Header */}
            <div className="p-1.5 border-b border-[#eff4ff] bg-white shrink-0 grid grid-cols-3 gap-1">
              <button
                type="button"
                onClick={() => setInspectorTab("anatomy")}
                className={`py-1.5 px-1 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer truncate ${
                  inspectorTab === "anatomy"
                    ? "bg-[#003752] text-white shadow-2xs"
                    : "text-[#41474d] hover:bg-[#eff4ff] hover:text-[#003752]"
                }`}
              >
                <span className="material-symbols-outlined text-[15px] shrink-0">vital_signs</span>
                <span className="truncate">{tr ? "Anatomi" : "Anatomy"}</span>
              </button>

              <button
                type="button"
                onClick={() => setInspectorTab("muscles")}
                className={`py-1.5 px-1 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer truncate ${
                  inspectorTab === "muscles"
                    ? "bg-[#003752] text-white shadow-2xs"
                    : "text-[#41474d] hover:bg-[#eff4ff] hover:text-[#003752]"
                }`}
              >
                <span className="material-symbols-outlined text-[15px] shrink-0">fitness_center</span>
                <span className="truncate">{tr ? "Kaslar" : "Muscles"}</span>
                {activeLandmark && activeLandmark.attachments.length > 0 && (
                  <span className="px-1 py-0.2 rounded-full text-[9px] bg-sky-500/20 text-sky-800 font-mono shrink-0">
                    {activeLandmark.attachments.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setInspectorTab("landmarks")}
                className={`py-1.5 px-1 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer truncate ${
                  inspectorTab === "landmarks"
                    ? "bg-[#003752] text-white shadow-2xs"
                    : "text-[#41474d] hover:bg-[#eff4ff] hover:text-[#003752]"
                }`}
              >
                <span className="material-symbols-outlined text-[15px] shrink-0">format_list_numbered</span>
                <span className="truncate">{tr ? "İşaretler" : "List"}</span>
                <span className="px-1 py-0.2 rounded-full text-[9px] bg-slate-200 text-slate-700 font-mono shrink-0">
                  {spec.landmarks.length}
                </span>
              </button>
            </div>

            {/* Scrollable Content Container (Guaranteed never to overflow outside the card) */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 flex flex-col gap-3.5 min-h-0">
              {/* TAB 1: ANATOMİ */}
              {inspectorTab === "anatomy" && activeLandmark && (
                <>
                  {/* Landmark Header Card */}
                  <div className="flex items-start gap-2.5 border-b border-[#eff4ff] pb-3">
                    <div
                      className="w-8 h-8 rounded-lg text-white font-mono font-bold text-[13px] flex items-center justify-center shrink-0 shadow-2xs"
                      style={{ backgroundColor: activeLandmark.color }}
                    >
                      {activeLandmark.number}
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <h2 className="text-[14px] font-bold text-[#003752] font-archivo leading-snug">
                        {activeLandmark.latinName}
                      </h2>
                      <span className="text-[11.5px] font-semibold text-[#006591]">
                        {tr ? activeLandmark.name.tr : activeLandmark.name.en}
                      </span>
                      <div className="flex flex-wrap items-center gap-1 mt-1.5">
                        <span className="px-1.5 py-0.5 rounded bg-[#eff4ff] text-[#006591] text-[9.5px] font-bold font-mono">
                          {spec.regionGroupLabels[activeLandmark.regionGroup]
                            ? (tr ? spec.regionGroupLabels[activeLandmark.regionGroup].tr : spec.regionGroupLabels[activeLandmark.regionGroup].en)
                            : activeLandmark.regionGroup}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[9.5px] font-medium">
                          {SURFACE_NAMES[activeLandmark.zone.normalHint]
                            ? (tr ? SURFACE_NAMES[activeLandmark.zone.normalHint].tr : SURFACE_NAMES[activeLandmark.zone.normalHint].en)
                            : activeLandmark.zone.normalHint}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-[#41474d] uppercase tracking-wider font-archivo">
                      {tr ? "Anatomik Tanım" : "Anatomical Description"}
                    </span>
                    <p className="text-[11.5px] text-[#0b1c30] leading-relaxed">
                      {tr ? activeLandmark.description.tr : activeLandmark.description.en}
                    </p>
                  </div>

                  {/* Clinical Pearl / Note */}
                  {activeLandmark.clinicalNote && (
                    <div className="rounded-xl bg-[#fff8f7] border border-[#ffdad6] p-2.5 flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-[#ba1a1a] text-[11px] font-bold font-archivo uppercase tracking-tight">
                        <span className="material-symbols-outlined text-[15px]">medical_services</span>
                        <span>{tr ? "Klinik Önem & Patoloji" : "Clinical Pearl"}</span>
                      </div>
                      <p className="text-[11px] text-[#41474d] leading-relaxed">
                        {tr ? activeLandmark.clinicalNote.tr : activeLandmark.clinicalNote.en}
                      </p>
                    </div>
                  )}

                  {/* Neurovascular Relation */}
                  {activeLandmark.neurovascularRelation && (
                    <div className="rounded-xl bg-[#eff4ff] border border-[#dce9ff] p-2.5 flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-[#006591] text-[11px] font-bold font-archivo uppercase tracking-tight">
                        <span className="material-symbols-outlined text-[15px]">neurology</span>
                        <span>{tr ? "Damar & Sinir İlişkisi" : "Neurovascular Relation"}</span>
                      </div>
                      <span className="font-mono text-[11px] font-bold text-[#003752]">
                        {activeLandmark.neurovascularRelation.structureLatin}
                      </span>
                      <p className="text-[11px] text-[#41474d] leading-relaxed">
                        {tr
                          ? activeLandmark.neurovascularRelation.note.tr
                          : activeLandmark.neurovascularRelation.note.en}
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* TAB 2: KASLAR (ORİGO & İNSERSİYO) */}
              {inspectorTab === "muscles" && activeLandmark && (
                <>
                  <div className="flex items-center justify-between border-b border-[#eff4ff] pb-2.5">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-[#41474d] uppercase tracking-wider font-archivo">
                        {tr ? "Kas Yapışmaları" : "Muscle Attachments"}
                      </span>
                      <span className="text-[13px] font-bold text-[#003752] truncate">
                        {activeLandmark.latinName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-200">
                        {origoCount} {tr ? "Origo" : "Origin"}
                      </span>
                      <span className="px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
                        {insertioCount} {tr ? "İnsersiyo" : "Insertion"}
                      </span>
                    </div>
                  </div>

                  {activeLandmark.attachments.length === 0 ? (
                    <div className="py-6 text-center flex flex-col items-center gap-1.5 text-slate-500">
                      <span className="material-symbols-outlined text-[28px] text-slate-300">fitness_center</span>
                      <p className="text-[11.5px] leading-relaxed">
                        {tr
                          ? "Bu anatomik işaret doğrudan bir kas origo/insersiyo tutunması içermez (eklem yüzü, sinir oluğu veya foramen)."
                          : "No direct muscle attachment on this landmark (articular surface, groove, or foramen)."}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {activeLandmark.attachments.map((att: MuscleAttachmentSpec) => {
                        const isOrigo = att.kind === "origo";
                        return (
                          <div
                            key={att.id}
                            className="p-2.5 rounded-xl border border-[#e5eeff] bg-[#f8f9ff] flex flex-col gap-1.5 hover:border-[#006591] transition-colors"
                          >
                            <div className="flex items-center justify-between gap-1.5">
                              <span
                                className={`px-1.5 py-0.5 rounded text-[9.5px] font-extrabold uppercase font-mono tracking-wider ${
                                  isOrigo ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {isOrigo ? (tr ? "ORİGO" : "ORIGIN") : (tr ? "İNSERSİYO" : "INSERTION")}
                              </span>
                              <span className="font-mono text-[10px] text-[#006591] font-semibold truncate">
                                {att.innervation.nerve} {att.innervation.roots ? `(${att.innervation.roots})` : ""}
                              </span>
                            </div>

                            <div className="flex flex-col">
                              <span className="text-[12px] font-bold text-[#003752] font-archivo">
                                {att.muscleLatin}
                              </span>
                              <span className="text-[11px] text-[#41474d]">
                                {tr ? att.muscleName.tr : att.muscleName.en}
                              </span>
                            </div>

                            <div className="text-[10.5px] text-slate-600 border-t border-[#eff4ff] pt-1 flex items-start gap-1">
                              <span className="material-symbols-outlined text-[13px] text-[#006591] shrink-0 mt-0.5">
                                play_arrow
                              </span>
                              <span>{tr ? att.function.tr : att.function.en}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              {/* TAB 3: İŞARET LİSTESİ */}
              {inspectorTab === "landmarks" && (
                <>
                  {/* Region Filter Buttons */}
                  <div className="flex items-center gap-1 p-0.5 rounded-xl bg-[#eff4ff] text-[10.5px] font-semibold shrink-0">
                    <button
                      type="button"
                      onClick={() => setRegionFilter("all")}
                      className={`flex-1 py-1 rounded-lg transition-all cursor-pointer ${
                        regionFilter === "all" ? "bg-white text-[#003752] shadow-xs" : "text-[#41474d]"
                      }`}
                    >
                      {tr ? "Tümü" : "All"} ({spec.landmarks.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegionFilter("proximal")}
                      className={`flex-1 py-1 rounded-lg transition-all cursor-pointer ${
                        regionFilter === "proximal" ? "bg-white text-[#003752] shadow-xs" : "text-[#41474d]"
                      }`}
                    >
                      {tr ? "Proksimal" : "Proximal"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegionFilter("shaft")}
                      className={`flex-1 py-1 rounded-lg transition-all cursor-pointer ${
                        regionFilter === "shaft" ? "bg-white text-[#003752] shadow-xs" : "text-[#41474d]"
                      }`}
                    >
                      {tr ? "Gövde" : "Shaft"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegionFilter("distal")}
                      className={`flex-1 py-1 rounded-lg transition-all cursor-pointer ${
                        regionFilter === "distal" ? "bg-white text-[#003752] shadow-xs" : "text-[#41474d]"
                      }`}
                    >
                      {tr ? "Distal" : "Distal"}
                    </button>
                  </div>

                  {/* List Items */}
                  <div className="flex flex-col gap-1.5">
                    {filteredLandmarks.map((lm) => {
                      const isSelected = lm.id === activeLandmarkId;
                      return (
                        <button
                          key={lm.id}
                          type="button"
                          onClick={() => setActiveLandmarkId(lm.id)}
                          className={`flex items-center gap-2 p-1.5 rounded-xl text-left transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#eff4ff] border border-[#006591] shadow-2xs"
                              : "hover:bg-[#f8f9ff] border border-transparent"
                          }`}
                        >
                          <div
                            className="w-5 h-5 rounded-md text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0 shadow-2xs"
                            style={{ backgroundColor: lm.color }}
                          >
                            {lm.number}
                          </div>
                          <div className="flex flex-col min-w-0 flex-1">
                            <span className={`text-[11.5px] font-bold font-archivo truncate ${isSelected ? "text-[#006591]" : "text-[#003752]"}`}>
                              {lm.latinName}
                            </span>
                            <span className="text-[10.5px] text-[#41474d] truncate">
                              {tr ? lm.name.tr : lm.name.en}
                            </span>
                          </div>
                          {lm.attachments.length > 0 && (
                            <span className="text-[9.5px] font-mono font-semibold px-1 py-0.5 rounded bg-white text-slate-600 border border-slate-200 shrink-0">
                              {lm.attachments.length} {tr ? "kas" : "musc"}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Bottom Stepper Bar (Fixed inside panel footer) */}
            <div className="p-2.5 border-t border-[#eff4ff] bg-[#f8f9ff] shrink-0 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIdx === 0}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-[#dce9ff] bg-white hover:bg-[#eff4ff] text-[#003752] text-[11px] font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-[15px]">chevron_left</span>
                <span>{tr ? "Önceki" : "Prev"}</span>
              </button>

              <span className="font-mono text-[11px] font-bold text-[#006591]">
                {currentIdx + 1} / {spec.landmarks.length}
              </span>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentIdx === spec.landmarks.length - 1}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-[#dce9ff] bg-white hover:bg-[#eff4ff] text-[#003752] text-[11px] font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
              >
                <span>{tr ? "Sonraki" : "Next"}</span>
                <span className="material-symbols-outlined text-[15px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* BONE PICKER MODAL */}
        {isPickerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="w-full max-w-4xl max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
              {/* Modal Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#003752] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">skeleton</span>
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#003752] font-archivo">
                      {tr ? "Kemik Seçici (43 İzole Kemik)" : "Bone Picker (43 Isolated Bones)"}
                    </h3>
                    <p className="text-[12px] text-slate-500">
                      {tr ? "İncelemek istediğiniz kemiği seçin." : "Select the bone you want to inspect."}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPickerOpen(false)}
                  className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[22px]">close</span>
                </button>
              </div>

              {/* Search & Category Filter */}
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                {/* Search */}
                <div className="relative w-full sm:w-72">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-slate-400">
                    search
                  </span>
                  <input
                    type="text"
                    value={pickerSearch}
                    onChange={(e) => setPickerSearch(e.target.value)}
                    placeholder={tr ? "Kemik veya Latince ara…" : "Search bone or Latin…"}
                    className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 text-[13px] outline-none focus:border-[#006591]"
                  />
                  {pickerSearch && (
                    <button
                      type="button"
                      onClick={() => setPickerSearch("")}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 sm:pb-0">
                  {(["all", "upper-limb", "lower-limb", "axial", "cranium"] as PickerCategory[]).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setPickerCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        pickerCategory === cat
                          ? "bg-[#003752] text-white shadow-xs"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {tr ? CATEGORY_NAMES[cat].tr : CATEGORY_NAMES[cat].en}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bone Grid */}
              <div className="p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredBones.map((b) => {
                  const isCurrent = b.boneId === spec.boneId;
                  return (
                    <button
                      key={b.boneId}
                      type="button"
                      onClick={() => handleSelectBone(b.boneId)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                        isCurrent
                          ? "bg-[#eff4ff] border-[#006591] ring-2 ring-[#006591]/20 shadow-sm"
                          : "bg-white border-slate-200 hover:border-[#006591] hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold text-[#006591] uppercase">
                          {b.latinName}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {b.landmarks.length} {tr ? "nokta" : "pts"}
                        </span>
                      </div>
                      <span className="text-[14px] font-bold text-[#003752] font-archivo">
                        {tr ? b.title.tr : b.title.en}
                      </span>
                      <span className="text-[11px] text-slate-500 line-clamp-1">
                        {tr ? b.summary.tr : b.summary.en}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function KemikAnatomisiPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f8f9ff]">
          <div className="w-10 h-10 rounded-full border-3 border-sky-300 border-t-[#003752] animate-spin" />
        </div>
      }
    >
      <KemikAnatomisiContent />
    </Suspense>
  );
}
