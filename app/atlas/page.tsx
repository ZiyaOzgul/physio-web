"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { DissectionLayersState, AnatomyGender, SelectedNodeInfo } from "@/components/AnatomyViewer3D";
import { useLanguage } from "@/context/LanguageContext";

const AnatomyViewer3D = dynamic(() => import("@/components/AnatomyViewer3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-stage flex items-center justify-center">
      <div className="w-9 h-9 rounded-full border-2 border-line-strong border-t-accent animate-spin" />
    </div>
  ),
});

type LayerKey = keyof DissectionLayersState;
type L10n = { tr: string; en: string };

/** The five layer groups of the web viewer (each one is one or two of the app's twelve layers). */
const LAYERS: ReadonlyArray<{ key: LayerKey; name: L10n; latin: string; holds: L10n; color: string }> = [
  { key: "skeleton", name: { tr: "İskelet", en: "Skeleton" }, latin: "Systema skeletale", holds: { tr: "Kemikler, dişler", en: "Bones, teeth" }, color: "#d9ccae" },
  { key: "muscle", name: { tr: "Kaslar", en: "Muscles" }, latin: "Systema musculare", holds: { tr: "İskelet kasları, tendonlar", en: "Skeletal muscles, tendons" }, color: "#982c29" },
  { key: "vascular", name: { tr: "Damarlar", en: "Vessels" }, latin: "Systema cardiovasculare", holds: { tr: "Arterler ve venler", en: "Arteries and veins" }, color: "#b8494b" },
  { key: "nervous", name: { tr: "Sinirler", en: "Nerves" }, latin: "Systema nervosum", holds: { tr: "Beyin, omurilik, periferik sinirler", en: "Brain, spinal cord, peripheral nerves" }, color: "#c9a23a" },
  { key: "organs", name: { tr: "Organlar", en: "Organs" }, latin: "Splanchnologia", holds: { tr: "İç organlar, kalp, akciğerler", en: "Viscera, heart, lungs" }, color: "#6b3a2b" },
];

/** The app's twelve layers, for the structure panel. */
const RAW_LAYER: Record<string, L10n> = {
  skin: { tr: "Deri", en: "Skin" },
  muscular: { tr: "Kas", en: "Muscle" },
  joints: { tr: "Eklem", en: "Joints" },
  ligaments: { tr: "Bağ", en: "Ligaments" },
  skeletal: { tr: "İskelet", en: "Skeleton" },
  arterial: { tr: "Arter", en: "Arteries" },
  venous: { tr: "Ven", en: "Veins" },
  lymphatic: { tr: "Lenf", en: "Lymphatics" },
  nervous: { tr: "Merkezi sinir sistemi", en: "Central nervous system" },
  peripheralNerves: { tr: "Periferik sinir", en: "Peripheral nerves" },
  organs: { tr: "Organ", en: "Organs" },
  senseOrgans: { tr: "Duyu organı", en: "Sense organs" },
};

const PRESETS: ReadonlyArray<{ id: string; name: L10n; layers: DissectionLayersState; opacity: number }> = [
  { id: "locomotor", name: { tr: "Kas ve iskelet", en: "Muscle & bone" }, layers: { skeleton: true, muscle: true, vascular: false, nervous: false, organs: false }, opacity: 1 },
  { id: "deep", name: { tr: "Kasları incelt", en: "Thin the muscles" }, layers: { skeleton: true, muscle: true, vascular: true, nervous: true, organs: true }, opacity: 0.2 },
  { id: "vessels", name: { tr: "Damarlar", en: "Vessels" }, layers: { skeleton: true, muscle: false, vascular: true, nervous: false, organs: false }, opacity: 1 },
  { id: "organs", name: { tr: "Organlar", en: "Organs" }, layers: { skeleton: true, muscle: false, vascular: true, nervous: false, organs: true }, opacity: 1 },
  { id: "neuro", name: { tr: "Sinirler", en: "Nerves" }, layers: { skeleton: true, muscle: false, vascular: false, nervous: true, organs: false }, opacity: 1 },
];

/** ?region=… from the home page index → a starting preset. */
const REGION_PRESET: Record<string, string> = {
  "head-neck": "neuro",
  neuro: "neuro",
  brain: "neuro",
  thorax: "organs",
  heart: "vessels",
  abdomen: "organs",
  pelvis: "locomotor",
  skeletal: "locomotor",
  locomotor: "locomotor",
  muscular: "locomotor",
};

const OPACITIES: ReadonlyArray<{ value: number; tr: string; en: string }> = [
  { value: 1, tr: "Tam", en: "Full" },
  { value: 0.5, tr: "%50", en: "50%" },
  { value: 0.2, tr: "%20", en: "20%" },
];

export default function AtlasPage() {
  const { language } = useLanguage();
  const tr = language === "tr";
  const l = (x: L10n) => (tr ? x.tr : x.en);

  const [gender, setGender] = useState<AnatomyGender>("male");
  const [selected, setSelected] = useState<SelectedNodeInfo | null>(null);
  const [opacity, setOpacity] = useState(1);
  const [preset, setPreset] = useState<string | null>("locomotor");
  const [layers, setLayers] = useState<DissectionLayersState>(PRESETS[0]!.layers);

  // A region link from the home page opens the atlas on a matching preset (read once, on the client).
  useEffect(() => {
    const region = new URLSearchParams(window.location.search).get("region");
    const p = PRESETS.find((x) => x.id === (region ? REGION_PRESET[region] : undefined));
    if (!p) return;
    const id = window.setTimeout(() => {
      setPreset(p.id);
      setLayers(p.layers);
      setOpacity(p.opacity);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const applyPreset = (id: string) => {
    const p = PRESETS.find((x) => x.id === id);
    if (!p) return;
    setPreset(id);
    setLayers(p.layers);
    setOpacity(p.opacity);
  };

  const toggleLayer = (key: LayerKey) => {
    setPreset(null);
    setLayers((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      return Object.values(next).some(Boolean) ? next : prev; // at least one layer stays on
    });
  };

  const switchBody = (next: AnatomyGender) => {
    setGender(next);
    setSelected(null);
  };

  const sideText = (side: string | null | undefined) =>
    side === "left" ? (tr ? "Sol" : "Left") : side === "right" ? (tr ? "Sağ" : "Right") : null;

  const segment = (on: boolean, first: boolean) =>
    `h-9 px-3.5 font-archivo font-semibold uppercase tracking-wide text-[13px] transition-colors cursor-pointer ${
      first ? "" : "border-l border-line-strong"
    } ${on ? "bg-accent-700 text-white" : "text-ink-soft hover:text-ink"}`;

  return (
    <div className="min-h-screen flex flex-col bg-ground text-ink">
      <Navbar activePath="/atlas" />

      <main className="w-full pt-20">
        {/* Title row: what this is, which body, quick starting points. */}
        <section className="w-full border-b border-line">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div>
              <span className="kicker">{tr ? "Tüm vücut · 12 katman" : "Whole body · 12 layers"}</span>
              <h1 className="mt-2 font-archivo font-semibold text-ink text-[40px] sm:text-[48px] leading-none">{tr ? "3D Atlas" : "3D Atlas"}</h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex rounded-[10px] border border-line-strong overflow-hidden" role="tablist" aria-label={tr ? "Model" : "Model"}>
                <button type="button" role="tab" aria-selected={gender === "male"} onClick={() => switchBody("male")} className={segment(gender === "male", true)}>
                  {tr ? "Erkek" : "Male"}
                </button>
                <button type="button" role="tab" aria-selected={gender === "female"} onClick={() => switchBody("female")} className={segment(gender === "female", false)}>
                  {tr ? "Kadın" : "Female"}
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={preset === p.id}
                    onClick={() => applyPreset(p.id)}
                    className={`h-9 px-3 rounded-[10px] border text-[13px] transition-colors cursor-pointer ${
                      preset === p.id ? "border-accent-700 text-accent-700 bg-accent-100" : "border-line text-ink-soft hover:text-ink hover:border-line-strong"
                    }`}
                  >
                    {l(p.name)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* The model. */}
            <div className="lg:col-span-8">
              <div className="relative w-full h-[440px] sm:h-[580px] lg:h-[760px] rounded-[14px] border border-line overflow-hidden bg-stage">
                <AnatomyViewer3D
                  activeLayers={layers}
                  onLayersChange={setLayers}
                  onSelectNode={setSelected}
                  gender={gender}
                  onGenderChange={switchBody}
                  muscleOpacity={opacity}
                  onMuscleOpacityChange={setOpacity}
                  showCard={false}
                  showHud={false}
                  showLayersWidget={false}
                  showLayerSwitcher={false}
                  showCameraControls={true}
                  showFooter={false}
                  height="h-full"
                />
              </div>
              <p className="mt-3 text-[12px] text-ink-muted">
                {tr
                  ? "Sürükle: döndür · Tekerlek: yakınlaştır · Tıkla: yapıyı seç."
                  : "Drag to rotate · scroll to zoom · click to select a structure."}
              </p>
            </div>

            {/* Layers, then the selected structure. */}
            <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-28">
              <div>
                <h2 className="kicker">{tr ? "Katmanlar" : "Layers"}</h2>
                <ul className="mt-3 border-t border-line">
                  {LAYERS.map((layer) => {
                    const on = layers[layer.key];
                    return (
                      <li key={layer.key} className="border-b border-line">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={on}
                          onClick={() => toggleLayer(layer.key)}
                          className="w-full flex items-center gap-3 py-3 text-left cursor-pointer group"
                        >
                          <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: layer.color, opacity: on ? 1 : 0.35 }} />
                          <span className="flex-1 min-w-0">
                            <span className={`block font-archivo font-semibold text-[19px] leading-tight ${on ? "text-ink" : "text-ink-muted"}`}>
                              {l(layer.name)}
                            </span>
                            <span className="block text-[12px] text-ink-soft truncate">{l(layer.holds)}</span>
                          </span>
                          <span className={`w-10 h-6 rounded-full p-0.5 flex items-center transition-colors ${on ? "bg-accent-700" : "bg-line-strong"}`}>
                            <span className={`w-5 h-5 rounded-full bg-white transition-transform ${on ? "translate-x-4" : ""}`} />
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {layers.muscle && (
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-[13px] text-ink-soft">{tr ? "Kas opaklığı" : "Muscle opacity"}</span>
                    <div className="flex rounded-[10px] border border-line-strong overflow-hidden">
                      {OPACITIES.map((o, i) => (
                        <button
                          key={o.value}
                          type="button"
                          aria-pressed={opacity === o.value}
                          onClick={() => {
                            setPreset(null);
                            setOpacity(o.value);
                          }}
                          className={`h-8 px-3 text-[13px] font-data transition-colors cursor-pointer ${i > 0 ? "border-l border-line-strong" : ""} ${
                            opacity === o.value ? "bg-accent-700 text-white" : "text-ink-soft hover:text-ink"
                          }`}
                        >
                          {tr ? o.tr : o.en}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-[14px] border border-line bg-card p-5" aria-live="polite">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="kicker">{tr ? "Seçili yapı" : "Selected structure"}</h2>
                  {selected && (
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      aria-label={tr ? "Seçimi kaldır" : "Clear selection"}
                      className="-mt-1 -mr-1 w-8 h-8 rounded-[10px] flex items-center justify-center text-ink-soft hover:text-ink hover:bg-fill cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  )}
                </div>

                {selected ? (
                  <>
                    <p className="mt-2 font-archivo font-semibold text-ink text-[26px] leading-tight">{selected.la || (tr ? selected.tr : selected.en)}</p>
                    {selected.la && <p className="text-[15px] text-ink-soft">{tr ? selected.tr : selected.en}</p>}
                    <p className="mt-3 text-[12px] uppercase tracking-[0.12em] text-accent-700">
                      {[selected.rawLayer && RAW_LAYER[selected.rawLayer] ? l(RAW_LAYER[selected.rawLayer]) : null, sideText(selected.side)]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    {(tr ? selected.descTr || selected.descEn : selected.descEn || selected.descTr) ? (
                      <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                        {tr ? selected.descTr || selected.descEn : selected.descEn || selected.descTr}
                      </p>
                    ) : null}
                    <p className="mt-4 text-[12px] text-ink-muted">
                      {tr ? "Açıklama yapay zekâyla yazıldı, uzman incelemesi bekliyor." : "Description written with AI, awaiting expert review."}
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                    {tr
                      ? "Modelde bir yapıya tıklayın: Latince adı, Türkçesi, katmanı ve açıklaması burada görünür."
                      : "Click a structure on the model: its Latin name, translation, layer and description show up here."}
                  </p>
                )}
              </div>

              <Link
                href="/kemik-anatomisi"
                className="group flex items-center justify-between gap-4 py-4 border-y border-line text-ink hover:text-accent-700 transition-colors"
              >
                <span>
                  <span className="block font-archivo font-semibold text-[19px] leading-tight">{tr ? "Kemik atlası" : "Bone atlas"}</span>
                  <span className="block text-[13px] text-ink-soft">
                    {tr ? "43 kemik tek tek: röperler ve kas tutunma yerleri" : "43 bones one by one: landmarks and muscle attachments"}
                  </span>
                </span>
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1" aria-hidden>
                  arrow_forward
                </span>
              </Link>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
