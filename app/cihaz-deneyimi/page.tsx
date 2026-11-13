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
    <div className="w-full h-full min-h-[240px] bg-stage flex items-center justify-center">
      <div className="w-9 h-9 rounded-full border-2 border-line-strong border-t-accent animate-spin" />
    </div>
  ),
});

type Mode = "all" | "tablet" | "phone";

/**
 * Devices: the same model in a tablet and a phone frame, driven by one set of layer switches, and what really differs
 * between the layouts. No hardware figures: nothing here has been benchmarked.
 */
export default function DevicePage() {
  const { t, language } = useLanguage();
  const tr = language === "tr";
  const [mode, setMode] = useState<Mode>("all");
  const [layers, setLayers] = useState<DissectionLayersState>({
    skeleton: true,
    muscle: true,
    vascular: false,
    nervous: false,
    organs: false,
  });
  const [muscleOpacity, setMuscleOpacity] = useState(1);

  const toggle = (key: keyof DissectionLayersState) =>
    setLayers((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (!Object.values(next).some(Boolean)) next[key] = true;
      return next;
    });

  const viewer = (
    <AnatomyViewer3D
      activeLayers={layers}
      onLayersChange={setLayers}
      muscleOpacity={muscleOpacity}
      onMuscleOpacityChange={setMuscleOpacity}
      showCard={false}
      showHud={false}
      showLayersWidget={false}
      showLayerSwitcher={false}
      showCameraControls={false}
      showFooter={false}
      height="h-full"
    />
  );

  const layerItems = [
    { key: "skeleton", label: t.viewer.skeleton },
    { key: "muscle", label: t.viewer.muscle },
    { key: "vascular", label: t.viewer.vascular },
    { key: "nervous", label: t.viewer.nervous },
    { key: "organs", label: t.viewer.organs },
  ] as const;

  const modes: ReadonlyArray<{ id: Mode; label: string }> = [
    { id: "all", label: tr ? "İkisi" : "Both" },
    { id: "tablet", label: "Tablet" },
    { id: "phone", label: tr ? "Telefon" : "Phone" },
  ];

  const layouts = tr
    ? [
        { title: "Telefon", body: "Dikey kullanım. Model ekranın tamamını alır; bir yapıya dokununca adı ve açıklaması alttan açılan panelde gelir." },
        { title: "Tablet", body: "Yapı paneli modelin yanında açılır, model küçülmez. Ana sayfa metin ve model olarak iki sütuna ayrılır." },
        { title: "Web", body: "Bu sitedeki atlas aynı modeli tarayıcıda gösterir; fareyle döndürür, tekerlekle yakınlaştırırsınız." },
      ]
    : [
        { title: "Phone", body: "Portrait. The model takes the whole screen; tap a structure and its name and description come up in a sheet from the bottom." },
        { title: "Tablet", body: "The structure panel opens beside the model, which keeps its size. The home screen splits into a text column and the model." },
        { title: "Web", body: "The atlas on this site shows the same model in the browser; drag to rotate, scroll to zoom." },
      ];

  return (
    <div className="min-h-screen flex flex-col bg-ground text-ink">
      <Navbar activePath="/cihaz-deneyimi" />

      <main className="w-full pt-20">
        <section className="w-full border-b border-line">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pt-12 lg:pt-16 pb-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <span className="kicker">{tr ? "Telefon · tablet · web" : "Phone · tablet · web"}</span>
                <h1 className="mt-4 font-archivo font-semibold text-ink text-[44px] sm:text-[56px] leading-[0.98]">
                  {tr ? "Aynı model, her ekranda." : "One model, on every screen."}
                </h1>
                <p className="mt-5 text-[17px] leading-relaxed text-ink-soft max-w-[54ch]">
                  {tr
                    ? "Aşağıdaki iki çerçeve aynı 3D modeli gösterir. Katmanları açıp kapatın; ikisi birlikte değişir."
                    : "The two frames below show the same 3D model. Switch layers on and off; both change together."}
                </p>
              </div>

              <div className="flex rounded-[10px] border border-line-strong overflow-hidden self-start lg:self-auto" role="tablist">
                {modes.map((m, i) => (
                  <button
                    key={m.id}
                    type="button"
                    role="tab"
                    aria-selected={mode === m.id}
                    onClick={() => setMode(m.id)}
                    className={`h-10 px-4 font-archivo font-semibold uppercase tracking-wide text-[14px] transition-colors cursor-pointer ${
                      i > 0 ? "border-l border-line-strong" : ""
                    } ${mode === m.id ? "bg-accent-700 text-white" : "text-ink-soft hover:text-ink"}`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="kicker mr-2">{tr ? "Katmanlar" : "Layers"}</span>
              {layerItems.map((item) => {
                const on = layers[item.key];
                return (
                  <button
                    key={item.key}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(item.key)}
                    className={`h-9 px-3.5 rounded-[10px] border font-archivo font-semibold uppercase tracking-wide text-[13px] transition-colors cursor-pointer ${
                      on ? "bg-accent-700 border-accent-700 text-white" : "border-line-strong text-ink-soft hover:text-ink hover:border-ink"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
              {mode !== "phone" && (
                <div className={mode === "all" ? "w-full lg:w-3/5" : "w-full max-w-4xl"}>
                  <TabletFrame title={tr ? "Tablet" : "Tablet"}>{viewer}</TabletFrame>
                </div>
              )}
              {mode !== "tablet" && (
                <div className={mode === "all" ? "w-full lg:w-2/5 flex justify-center" : "w-full flex justify-center"}>
                  <IPhoneFrame showSelector={false}>{viewer}</IPhoneFrame>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="w-full border-b border-line">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-16 lg:py-20">
            <div className="max-w-2xl">
              <span className="kicker">{tr ? "Düzenler" : "Layouts"}</span>
              <h2 className="mt-3 font-archivo font-semibold text-ink text-[36px] sm:text-[44px] leading-[1.02]">
                {tr ? "Ekrana göre ne değişir?" : "What changes with the screen"}
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 border-t border-line">
              {layouts.map((l, i) => (
                <div
                  key={l.title}
                  className={`pt-6 pb-8 md:pb-0 ${i > 0 ? "md:pl-8 md:border-l border-line" : ""} ${i < 2 ? "md:pr-8 border-b md:border-b-0 border-line" : ""}`}
                >
                  <h3 className="font-archivo font-semibold text-ink text-[26px] leading-tight">{l.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{l.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-16 lg:py-20">
            <div className="max-w-2xl">
              <span className="kicker">{tr ? "Uygulamadan görüntüler" : "From the app"}</span>
              <h2 className="mt-3 font-archivo font-semibold text-ink text-[36px] sm:text-[44px] leading-[1.02]">
                {tr ? "Telefondaki ekranlar" : "The screens on a phone"}
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
              <IPhoneFrame
                screenSrc="/screens/back.webp"
                altText={tr ? "Sırt bölgesi, katmanlar açık" : "The back region with layers on"}
                caption={tr ? "Atlas: sırt bölgesi" : "Atlas: the back"}
              />
              <IPhoneFrame
                screenSrc="/screens/atlas-part.webp"
                altText={tr ? "Atlasta seçilen bir yapının paneli" : "The panel of a selected structure in the atlas"}
                caption={tr ? "Atlas: dokunulan yapının adı ve açıklaması" : "Atlas: the name and description of a tapped structure"}
              />
            </div>
            <div className="mt-12 flex justify-center">
              <Link
                href="/atlas"
                className="group inline-flex items-center gap-2.5 h-12 px-6 rounded-[10px] bg-accent-700 hover:bg-accent-800 text-white font-archivo font-semibold uppercase tracking-wide text-[16px] transition-colors"
              >
                {tr ? "Web atlasını aç" : "Open the web atlas"}
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1" aria-hidden>
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
