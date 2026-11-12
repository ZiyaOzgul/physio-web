"use client";

import React, { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OsteologyViewer3D from "@/components/OsteologyViewer3D";
import { useLanguage } from "@/context/LanguageContext";
import { BONE_SUBANATOMY_SPECS, findBoneSubanatomyById, findBoneSubanatomyByPartId } from "@/content/boneSubanatomy";
import type { BoneLandmarkRegionGroup, BoneLandmarkSpec, BoneSubanatomySpec } from "@/content/boneSubanatomy/domain";

type Tab = "anatomy" | "muscles" | "landmarks";
type RegionFilter = "all" | BoneLandmarkRegionGroup;
type Category = "all" | "upper-limb" | "lower-limb" | "axial" | "cranium";
type L10n = { tr: string; en: string };

const CATEGORIES: ReadonlyArray<{ id: Category; name: L10n }> = [
  { id: "all", name: { tr: "Tümü", en: "All" } },
  { id: "upper-limb", name: { tr: "Üst ekstremite", en: "Upper limb" } },
  { id: "lower-limb", name: { tr: "Alt ekstremite", en: "Lower limb" } },
  { id: "axial", name: { tr: "Gövde", en: "Trunk" } },
  { id: "cranium", name: { tr: "Kafa ve yüz", en: "Head and face" } },
];

const SURFACE: Record<string, L10n> = {
  anterior: { tr: "Ön yüz", en: "Anterior surface" },
  posterior: { tr: "Arka yüz", en: "Posterior surface" },
  medial: { tr: "İç yan", en: "Medial side" },
  lateral: { tr: "Dış yan", en: "Lateral side" },
  superior: { tr: "Üst yüz", en: "Superior surface" },
  inferior: { tr: "Alt yüz", en: "Inferior surface" },
};

/** Same colours as the footprints baked into the osteology GLBs and the app (tokens.origo / tokens.insertio). */
const ORIGO = "#c8463c";
const INSERTIO = "#3c6ec8";

function BoneAtlas() {
  const { language } = useLanguage();
  const tr = language === "tr";
  const l = (x: L10n) => (tr ? x.tr : x.en);
  const params = useSearchParams();

  const initial = useMemo(
    () =>
      findBoneSubanatomyById(params?.get("bone") || params?.get("boneId")) ??
      findBoneSubanatomyByPartId(params?.get("partId")) ??
      BONE_SUBANATOMY_SPECS[0]!,
    [params],
  );

  const [boneId, setBoneId] = useState(initial.boneId);
  const spec: BoneSubanatomySpec = useMemo(() => findBoneSubanatomyById(boneId) ?? initial, [boneId, initial]);
  const [tab, setTab] = useState<Tab>("anatomy");
  const [region, setRegion] = useState<RegionFilter>("all");
  const [landmarkId, setLandmarkId] = useState<string | null>(() => params?.get("landmark") ?? spec.landmarks[0]?.id ?? null);
  const [showAllZones, setShowAllZones] = useState(true);
  const [showPins, setShowPins] = useState(true);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [category, setCategory] = useState<Category>("all");
  const [query, setQuery] = useState("");

  const landmarks = useMemo(
    () => (region === "all" ? spec.landmarks : spec.landmarks.filter((lm) => lm.regionGroup === region)),
    [spec.landmarks, region],
  );
  const active: BoneLandmarkSpec | null = spec.landmarks.find((lm) => lm.id === landmarkId) ?? landmarks[0] ?? spec.landmarks[0] ?? null;
  const index = active ? Math.max(0, spec.landmarks.findIndex((lm) => lm.id === active.id)) : 0;

  const bones = useMemo(() => {
    let list = BONE_SUBANATOMY_SPECS;
    if (category === "upper-limb" || category === "lower-limb") list = list.filter((b) => b.category === category);
    else if (category === "axial") list = list.filter((b) => b.category === "axial" && b.packId !== "head-neck");
    else if (category === "cranium") list = list.filter((b) => b.packId === "head-neck");
    const q = query.trim().toLocaleLowerCase(tr ? "tr" : "en");
    if (q)
      list = list.filter((b) =>
        [b.latinName, b.title.tr, b.title.en].some((s) => s.toLocaleLowerCase(tr ? "tr" : "en").includes(q)),
      );
    return list;
  }, [category, query, tr]);

  const selectBone = (id: string) => {
    const next = findBoneSubanatomyById(id);
    setBoneId(id);
    setRegion("all");
    setLandmarkId(next?.landmarks[0]?.id ?? null);
    setPickerOpen(false);
  };
  const step = (delta: number) => {
    const next = spec.landmarks[index + delta];
    if (next) setLandmarkId(next.id);
  };

  const origo = active?.attachments.filter((a) => a.kind === "origo").length ?? 0;
  const insertio = active?.attachments.filter((a) => a.kind === "insertio").length ?? 0;

  const tabs: ReadonlyArray<{ id: Tab; label: string; count?: number }> = [
    { id: "anatomy", label: tr ? "Röper" : "Landmark" },
    { id: "muscles", label: tr ? "Kaslar" : "Muscles", count: active?.attachments.length ?? 0 },
    { id: "landmarks", label: tr ? "Liste" : "List", count: spec.landmarks.length },
  ];

  const stepButton = (delta: number, disabled: boolean) => (
    <button
      type="button"
      onClick={() => step(delta)}
      disabled={disabled}
      aria-label={delta < 0 ? (tr ? "Önceki röper" : "Previous landmark") : tr ? "Sonraki röper" : "Next landmark"}
      className="w-10 h-10 rounded-[10px] border border-line-strong text-ink flex items-center justify-center hover:border-ink disabled:opacity-35 disabled:hover:border-line-strong cursor-pointer disabled:cursor-not-allowed transition-colors"
    >
      <span className="material-symbols-outlined text-[20px]">{delta < 0 ? "chevron_left" : "chevron_right"}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-ground text-ink">
      <Navbar activePath="/kemik-anatomisi" />

      <main className="w-full pt-20">
        {/* The bone being studied, and the way to another one. */}
        <section className="w-full border-b border-line">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div className="min-w-0">
              <span className="kicker">{tr ? `Kemik atlası · ${BONE_SUBANATOMY_SPECS.length} kemik` : `Bone atlas · ${BONE_SUBANATOMY_SPECS.length} bones`}</span>
              <h1 className="mt-2 font-archivo font-semibold text-ink text-[40px] sm:text-[48px] leading-none">{spec.latinName}</h1>
              <p className="mt-1 text-[16px] text-ink-soft">
                {l(spec.title)} · {spec.landmarks.length} {tr ? "röper" : "landmarks"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                className="inline-flex items-center gap-2 h-10 px-4 rounded-[10px] bg-accent-700 hover:bg-accent-800 text-white font-archivo font-semibold uppercase tracking-wide text-[14px] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden>
                  swap_horiz
                </span>
                {tr ? "Kemik değiştir" : "Change bone"}
              </button>
              <Link
                href="/atlas"
                className="inline-flex items-center h-10 px-4 rounded-[10px] border border-line-strong hover:border-ink text-ink font-archivo font-semibold uppercase tracking-wide text-[14px] transition-colors"
              >
                {tr ? "Tüm vücut" : "Whole body"}
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="h-[480px] sm:h-[600px] lg:h-[680px] w-full">
                <OsteologyViewer3D
                  spec={spec}
                  activeLandmarkId={active?.id ?? null}
                  onSelectLandmark={(id) => setLandmarkId(id)}
                  showAllZones={showAllZones}
                  onToggleAllZones={() => setShowAllZones((v) => !v)}
                  showPins={showPins}
                  onTogglePins={() => setShowPins((v) => !v)}
                  inspectorTab={tab}
                  language={language}
                />
              </div>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-6 gap-y-1 pt-4 border-t border-line">
                <h2 className="kicker pt-1">{tr ? "Kemik" : "The bone"}</h2>
                <p className="text-[15px] leading-relaxed text-ink-soft max-w-[70ch]">{l(spec.summary)}</p>
              </div>
            </div>

            {/* Inspector: one landmark at a time. */}
            <aside className="lg:col-span-5 xl:col-span-4 flex flex-col rounded-[14px] border border-line bg-card lg:h-[680px] overflow-hidden">
              <div className="flex border-b border-line shrink-0" role="tablist">
                {tabs.map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    role="tab"
                    aria-selected={tab === x.id}
                    onClick={() => setTab(x.id)}
                    className={`relative flex-1 h-12 font-archivo font-semibold uppercase tracking-wide text-[14px] transition-colors cursor-pointer ${
                      tab === x.id ? "text-ink after:absolute after:left-3 after:right-3 after:bottom-0 after:h-[2px] after:bg-accent" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {x.label}
                    {x.count !== undefined && <span className="ml-1.5 font-sans font-normal text-[12px] text-ink-muted font-data">{x.count}</span>}
                  </button>
                ))}
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto p-5">
                {tab === "anatomy" && active && (
                  <div>
                    <div className="flex items-start gap-3">
                      <span
                        className="w-8 h-8 rounded-full text-white text-[13px] font-semibold flex items-center justify-center shrink-0 font-data"
                        style={{ backgroundColor: active.color }}
                      >
                        {active.number}
                      </span>
                      <div className="min-w-0">
                        <h2 className="font-archivo font-semibold text-ink text-[24px] leading-tight">{active.latinName}</h2>
                        <p className="text-[15px] text-ink-soft">{l(active.name)}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-[12px] uppercase tracking-[0.12em] text-accent-700">
                      {[
                        spec.regionGroupLabels[active.regionGroup] ? l(spec.regionGroupLabels[active.regionGroup]) : active.regionGroup,
                        SURFACE[active.zone.normalHint] ? l(SURFACE[active.zone.normalHint]!) : null,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{l(active.description)}</p>

                    {active.clinicalNote && (
                      <div className="mt-5 pl-4 border-l-[3px] border-danger">
                        <h3 className="kicker !text-danger">{tr ? "Klinik not" : "Clinical note"}</h3>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">{l(active.clinicalNote)}</p>
                      </div>
                    )}
                    {active.neurovascularRelation && (
                      <div className="mt-5 pl-4 border-l-[3px] border-accent">
                        <h3 className="kicker">{tr ? "Damar ve sinir ilişkisi" : "Nerves and vessels"}</h3>
                        <p className="mt-1.5 font-archivo font-semibold text-ink text-[17px]">{active.neurovascularRelation.structureLatin}</p>
                        <p className="mt-1 text-[14px] leading-relaxed text-ink-soft">{l(active.neurovascularRelation.note)}</p>
                      </div>
                    )}
                  </div>
                )}

                {tab === "muscles" && active && (
                  <div>
                    <div className="flex items-center gap-4 text-[13px] text-ink-soft">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ORIGO }} />
                        {origo} {tr ? "origo" : "origin"}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: INSERTIO }} />
                        {insertio} {tr ? "insersiyo" : "insertion"}
                      </span>
                    </div>
                    {active.attachments.length === 0 ? (
                      <p className="mt-5 text-[14px] leading-relaxed text-ink-soft">
                        {tr
                          ? "Bu röpere doğrudan kas tutunmaz (eklem yüzü, oluk ya da delik)."
                          : "No muscle attaches directly to this landmark (an articular surface, groove or foramen)."}
                      </p>
                    ) : (
                      <ul className="mt-4 border-t border-line">
                        {active.attachments.map((att) => {
                          const isOrigo = att.kind === "origo";
                          return (
                            <li key={att.id} className="py-3.5 border-b border-line">
                              <div className="flex items-baseline justify-between gap-3">
                                <span className="font-archivo font-semibold text-ink text-[18px] leading-tight">{att.muscleLatin}</span>
                                <span className="text-[11px] uppercase tracking-[0.12em] shrink-0" style={{ color: isOrigo ? ORIGO : INSERTIO }}>
                                  {isOrigo ? (tr ? "Origo" : "Origin") : tr ? "İnsersiyo" : "Insertion"}
                                </span>
                              </div>
                              <p className="text-[13px] text-ink-soft">{l(att.muscleName)}</p>
                              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{l(att.function)}</p>
                              <p className="mt-1 text-[12px] text-ink-muted">
                                {att.innervation.nerve}
                                {att.innervation.roots ? ` (${att.innervation.roots})` : ""}
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                )}

                {tab === "landmarks" && (
                  <div>
                    <div className="flex rounded-[10px] border border-line-strong overflow-hidden">
                      {(["all", "proximal", "shaft", "distal"] as RegionFilter[]).map((r, i) => (
                        <button
                          key={r}
                          type="button"
                          aria-pressed={region === r}
                          onClick={() => setRegion(r)}
                          className={`flex-1 h-8 text-[12px] transition-colors cursor-pointer ${i > 0 ? "border-l border-line-strong" : ""} ${
                            region === r ? "bg-accent-700 text-white" : "text-ink-soft hover:text-ink"
                          }`}
                        >
                          {r === "all"
                            ? tr ? "Tümü" : "All"
                            : spec.regionGroupLabels[r]
                            ? l(spec.regionGroupLabels[r])
                            : r}
                        </button>
                      ))}
                    </div>
                    <ul className="mt-3 border-t border-line">
                      {landmarks.map((lm) => {
                        const on = lm.id === active?.id;
                        return (
                          <li key={lm.id} className="border-b border-line">
                            <button
                              type="button"
                              onClick={() => {
                                setLandmarkId(lm.id);
                                setTab("anatomy");
                              }}
                              className={`w-full flex items-center gap-3 py-2.5 text-left cursor-pointer transition-colors -mx-2 px-2 rounded-[10px] ${on ? "bg-accent-100" : "hover:bg-fill"}`}
                            >
                              <span
                                className="w-6 h-6 rounded-full text-white text-[11px] font-semibold flex items-center justify-center shrink-0 font-data"
                                style={{ backgroundColor: lm.color }}
                              >
                                {lm.number}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block font-archivo font-semibold text-ink text-[16px] leading-tight truncate">{lm.latinName}</span>
                                <span className="block text-[12px] text-ink-soft truncate">{l(lm.name)}</span>
                              </span>
                              {lm.attachments.length > 0 && (
                                <span className="text-[12px] text-ink-muted shrink-0 font-data">
                                  {lm.attachments.length} {tr ? "kas" : "musc."}
                                </span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>

              <div className="shrink-0 border-t border-line px-4 py-3 flex items-center justify-between">
                {stepButton(-1, index === 0)}
                <span className="text-[14px] text-ink-soft font-data">
                  {index + 1} / {spec.landmarks.length}
                </span>
                {stepButton(1, index >= spec.landmarks.length - 1)}
              </div>
            </aside>
          </div>
        </section>

        {/* Bone picker. */}
        {pickerOpen && (
          <div
            className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-ink/50"
            role="dialog"
            aria-modal="true"
            aria-label={tr ? "Kemik seç" : "Choose a bone"}
            onClick={(e) => {
              if (e.target === e.currentTarget) setPickerOpen(false);
            }}
          >
            <div className="w-full max-w-4xl max-h-[88vh] rounded-[14px] border border-line bg-ground flex flex-col overflow-hidden">
              <div className="px-5 pt-5 pb-4 border-b border-line">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="kicker">{tr ? "Kemik atlası" : "Bone atlas"}</span>
                    <h2 className="mt-1 font-archivo font-semibold text-ink text-[28px] leading-none">{tr ? "Kemik seç" : "Choose a bone"}</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPickerOpen(false)}
                    aria-label={tr ? "Kapat" : "Close"}
                    className="w-10 h-10 rounded-[10px] flex items-center justify-center text-ink-soft hover:text-ink hover:bg-fill cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[22px]">close</span>
                  </button>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <label className="relative sm:w-72">
                    <span className="sr-only">{tr ? "Ara" : "Search"}</span>
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-ink-muted" aria-hidden>
                      search
                    </span>
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={tr ? "Türkçe ya da Latince ara" : "Search in English or Latin"}
                      className="w-full h-10 pl-9 pr-3 rounded-[10px] border border-line-strong bg-card text-[14px] outline-none focus:border-accent"
                    />
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {CATEGORIES.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        aria-pressed={category === c.id}
                        onClick={() => setCategory(c.id)}
                        className={`h-10 px-3 rounded-[10px] border text-[13px] transition-colors cursor-pointer ${
                          category === c.id ? "border-accent-700 text-accent-700 bg-accent-100" : "border-line text-ink-soft hover:text-ink hover:border-line-strong"
                        }`}
                      >
                        {l(c.name)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <ul className="overflow-y-auto px-5 py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6">
                {bones.map((b) => {
                  const current = b.boneId === spec.boneId;
                  return (
                    <li key={b.boneId} className="border-b border-line">
                      <button
                        type="button"
                        onClick={() => selectBone(b.boneId)}
                        aria-current={current}
                        className={`w-full text-left py-3 cursor-pointer group ${current ? "text-accent-700" : "text-ink"}`}
                      >
                        <span className="block font-archivo font-semibold text-[18px] leading-tight group-hover:text-accent-700 transition-colors">{b.latinName}</span>
                        <span className="block text-[13px] text-ink-soft">
                          {l(b.title)} · {b.landmarks.length} {tr ? "röper" : "landmarks"}
                        </span>
                      </button>
                    </li>
                  );
                })}
                {bones.length === 0 && <li className="py-6 text-[14px] text-ink-soft">{tr ? "Eşleşen kemik yok." : "No matching bone."}</li>}
              </ul>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function BoneAtlasPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-ground">
          <div className="w-9 h-9 rounded-full border-2 border-line-strong border-t-accent animate-spin" />
        </div>
      }
    >
      <BoneAtlas />
    </Suspense>
  );
}
