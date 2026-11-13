"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IPhoneFrame from "@/components/IPhoneFrame";
import PhonePeek from "@/components/PhonePeek";
import type { DissectionLayersState } from "@/components/AnatomyViewer3D";
import { useLanguage } from "@/context/LanguageContext";

const AnatomyViewer3D = dynamic(() => import("@/components/AnatomyViewer3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] rounded-[14px] border border-line bg-stage flex items-center justify-center">
      <div className="w-9 h-9 rounded-full border-2 border-line-strong border-t-accent animate-spin" />
    </div>
  ),
});

/**
 * Structures per region, counted from the app's own region packs (members.json of the male body); limbs = both arms
 * and both legs. Update together with the models.
 */
const REGIONS: ReadonlyArray<{ id: string; count: number }> = [
  { id: "head-neck", count: 809 },
  { id: "thorax", count: 639 },
  { id: "abdomen", count: 370 },
  { id: "pelvis", count: 226 },
  { id: "locomotor", count: 1048 },
  { id: "neuro", count: 434 },
];

const MODULES = [
  { n: "01", href: "/atlas", shot: "/screens/atlas.webp", key: "f1" },
  { n: "02", href: "/ogrenme-yolu", shot: "/screens/learn.webp", key: "f2" },
  { n: "03", href: "/zilli-sinav", shot: "/screens/exam.webp", key: "f3" },
] as const;

function Arrow() {
  return (
    <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1" aria-hidden>
      arrow_forward
    </span>
  );
}

export default function HomePage() {
  const { t, language } = useLanguage();
  const tr = language === "tr";
  const [heroLayers, setHeroLayers] = useState<DissectionLayersState>({
    skeleton: true,
    muscle: true,
    vascular: false,
    nervous: false,
    organs: false,
  });
  const [heroMuscleOpacity, setHeroMuscleOpacity] = useState(1);
  const number = (n: number) => n.toLocaleString(tr ? "tr-TR" : "en-US");

  const stats = [
    { value: t.hero.statStudents, label: t.hero.statStudentsLabel },
    { value: t.hero.statFaculties, label: t.hero.statFacultiesLabel },
    { value: t.hero.statTa2, label: t.hero.statTa2Label },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-ground text-ink">
      <Navbar activePath="/" />

      <main className="w-full pt-20">
        {/* Hero: the claim on the left, the real model on the right. */}
        <section className="w-full border-b border-line">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col">
              <span className="kicker">{t.hero.badge}</span>
              <h1 className="mt-4 font-archivo font-semibold text-ink text-[44px] sm:text-[56px] lg:text-[64px] leading-[0.98] tracking-[-0.01em]">
                {t.hero.title}
              </h1>
              <p className="mt-5 text-[17px] leading-relaxed text-ink-soft max-w-[46ch]">{t.hero.subtitle}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/atlas"
                  className="group inline-flex items-center gap-2.5 h-12 px-6 rounded-[10px] bg-accent-700 hover:bg-accent-800 text-white font-archivo font-semibold uppercase tracking-wide text-[16px] transition-colors"
                >
                  <span>{t.hero.ctaTry}</span>
                  <Arrow />
                </Link>
                <Link
                  href="/topluluk-ve-indir"
                  className="inline-flex items-center h-12 px-5 rounded-[10px] border border-line-strong hover:border-ink text-ink font-archivo font-semibold uppercase tracking-wide text-[16px] transition-colors"
                >
                  {t.hero.ctaStores}
                </Link>
              </div>

              <dl className="mt-10 grid grid-cols-3 border-t border-line">
                {stats.map((s, i) => (
                  <div key={s.label} className={`pt-4 flex flex-col-reverse ${i > 0 ? "pl-4 border-l border-line" : ""}`}>
                    <dt className="mt-1 text-[12px] text-ink-soft leading-snug">{s.label}</dt>
                    <dd className="font-archivo font-semibold text-ink text-[34px] leading-none font-data">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-7">
              <AnatomyViewer3D
                activeLayers={heroLayers}
                onLayersChange={setHeroLayers}
                muscleOpacity={heroMuscleOpacity}
                onMuscleOpacityChange={setHeroMuscleOpacity}
                showCard={true}
                showHud={true}
                showLayersWidget={false}
                showLayerSwitcher={true}
                showCameraControls={true}
                showFooter={false}
                showGenderSwitcher={true}
                height="h-[440px] sm:h-[540px] lg:h-[620px]"
              />
              <p className="mt-3 text-[12px] text-ink-muted">
                {tr
                  ? "Sürükle: döndür · Tekerlek: yakınlaştır · Tıkla: yapının adını gör. Model uygulamadakiyle aynıdır."
                  : "Drag to rotate · scroll to zoom · click a structure for its name. Same model as in the app."}
              </p>
            </div>
          </div>
        </section>

        {/* Three modules: numbered columns divided by hairlines, not three look-alike cards. */}
        <section className="w-full border-b border-line">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-16 lg:py-20">
            <div className="max-w-2xl">
              <span className="kicker">{t.features.badge}</span>
              <h2 className="mt-3 font-archivo font-semibold text-ink text-[36px] sm:text-[44px] leading-[1.02]">{t.features.title}</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">{t.features.desc}</p>
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 border-t border-line">
              {MODULES.map((m, i) => {
                const title = t.features[`${m.key}Title`];
                const tags = [t.features[`${m.key}Tag1`], t.features[`${m.key}Tag2`], t.features[`${m.key}Tag3`]];
                return (
                  <Link
                    key={m.key}
                    href={m.href}
                    className={`group flex flex-col pt-6 pb-8 lg:pb-0 ${i > 0 ? "lg:pl-8 lg:border-l border-line" : ""} ${i < 2 ? "lg:pr-8 border-b lg:border-b-0 border-line" : ""}`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-archivo font-semibold text-accent-700 text-[15px] font-data">{m.n}</span>
                      <h3 className="font-archivo font-semibold text-ink text-[26px] leading-tight">{title}</h3>
                    </div>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{t.features[`${m.key}Desc`]}</p>
                    <p className="mt-3 text-[12px] text-ink-muted">{tags.join(" · ")}</p>
                    {/* Spacer: the three previews line up whatever the length of the text above them. */}
                    <div className="flex-1 min-h-6" />
                    <PhonePeek src={m.shot} alt={title} />
                    <span className="mt-4 inline-flex items-center gap-2 font-archivo font-semibold uppercase tracking-wide text-[14px] text-accent-700 group-hover:text-ink transition-colors">
                      {tr ? "Aç" : "Open"} <Arrow />
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Bone atlas: one plain row, the accent rule on the left does the emphasis. */}
            <Link
              href="/kemik-anatomisi"
              className="group mt-14 flex flex-col lg:flex-row lg:items-center justify-between gap-6 rounded-[14px] border border-line bg-card px-6 py-6 border-l-[3px] border-l-accent hover:border-line-strong hover:border-l-accent transition-colors"
            >
              <div className="max-w-3xl">
                <span className="kicker">{tr ? "Kemik atlası" : "Bone atlas"}</span>
                <h3 className="mt-2 font-archivo font-semibold text-ink text-[28px] leading-tight">
                  {tr ? "Her kemik tek tek: röperler ve kas tutunma yerleri" : "Every bone on its own: landmarks and muscle attachments"}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {tr
                    ? "43 kemik izole 3D ortamda. Numaralı çıkıntılar, origo ve insersiyo alanları, klinik notlar."
                    : "43 bones in isolated 3D. Numbered landmarks, origin and insertion footprints, clinical notes."}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 shrink-0 font-archivo font-semibold uppercase tracking-wide text-[15px] text-accent-700 group-hover:text-ink transition-colors">
                {tr ? "Kemik atlasını aç" : "Open the bone atlas"} <Arrow />
              </span>
            </Link>
          </div>
        </section>

        {/* Regions: an index, the way an atlas lists its plates. */}
        <section className="w-full border-b border-line" id="atlas-bolgeleri">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <span className="kicker">{t.regions.badge}</span>
              <h2 className="mt-3 font-archivo font-semibold text-ink text-[36px] sm:text-[44px] leading-[1.02]">{t.regions.title}</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">{t.regions.desc}</p>
            </div>

            <ul className="lg:col-span-8 border-t border-line">
              {REGIONS.map((reg) => {
                const data = t.regions.items[reg.id];
                if (!data) return null;
                return (
                  <li key={reg.id} className="border-b border-line">
                    <Link
                      href={`/atlas?region=${reg.id}`}
                      className="group grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] items-center gap-x-6 gap-y-1 py-5 hover:bg-fill transition-colors -mx-3 px-3"
                    >
                      <div>
                        <h3 className="font-archivo font-semibold text-ink text-[22px] leading-tight">{data.name}</h3>
                        <p className="text-[13px] italic text-ink-soft">{data.latin}</p>
                      </div>
                      <p className="hidden sm:block text-[13px] leading-relaxed text-ink-soft">{data.description}</p>
                      <div className="flex items-center gap-4 text-accent-700 group-hover:text-ink transition-colors">
                        <span className="font-archivo font-semibold text-[20px] font-data">{number(reg.count)}</span>
                        <Arrow />
                      </div>
                    </Link>
                  </li>
                );
              })}
              <li className="pt-3 text-[12px] text-ink-muted">
                {tr ? "Sayılar: bölgedeki tanımlı yapı sayısı (erkek model)." : "Numbers: named structures in the region (male model)."}
              </li>
            </ul>
          </div>
        </section>

        {/* Habit: text and the real profile screen. */}
        <section className="w-full border-b border-line">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <span className="kicker">{t.habit.badge}</span>
              <h2 className="mt-3 font-archivo font-semibold text-ink text-[36px] sm:text-[44px] leading-[1.02]">{t.habit.title}</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">{t.habit.desc}</p>

              <dl className="mt-8 border-t border-line">
                {[
                  { icon: "local_fire_department", title: t.habit.streakTitle, desc: t.habit.streakDesc },
                  { icon: "military_tech", title: t.habit.badgesTitle, desc: t.habit.badgesDesc },
                ].map((row) => (
                  <div key={row.title} className="flex gap-4 py-4 border-b border-line">
                    <span className="material-symbols-outlined text-[24px] text-accent-700 mt-0.5" aria-hidden>
                      {row.icon}
                    </span>
                    <div>
                      <dt className="font-archivo font-semibold text-ink text-[20px] leading-tight">{row.title}</dt>
                      <dd className="mt-1 text-[14px] text-ink-soft">{row.desc}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <Link
                href="/ogrenme-yolu"
                className="group mt-6 inline-flex items-center gap-2 font-archivo font-semibold uppercase tracking-wide text-[15px] text-accent-700 hover:text-ink transition-colors"
              >
                {t.habit.studyPathBtn} <Arrow />
              </Link>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <IPhoneFrame
                screenSrc="/screens/streak.webp"
                altText={tr ? "Uygulamada çalışma takvimi ve sistem hakimiyeti" : "Study calendar and mastery by system in the app"}
                caption={tr ? "Profil: son 28 gün ve sistem hakimiyeti" : "Profile: the last 28 days and mastery by system"}
              />
            </div>
          </div>
        </section>

        {/* Closing call: one dark panel, no glow. */}
        <section className="w-full" id="indir">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-16">
            <div className="rounded-[14px] bg-ink text-white px-7 py-10 lg:px-14 lg:py-14 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <span className="kicker !text-accent-300">{t.cta.badge}</span>
                <h2 className="mt-3 font-archivo font-semibold text-[38px] sm:text-[48px] leading-[1.0]">{t.cta.title}</h2>
                <p className="mt-4 text-[16px] leading-relaxed text-white/75">{t.cta.desc}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/topluluk-ve-indir"
                  className="inline-flex items-center h-12 px-6 rounded-[10px] bg-white text-ink hover:bg-accent-200 font-archivo font-semibold uppercase tracking-wide text-[16px] transition-colors"
                >
                  {t.cta.btnDownload}
                </Link>
                <Link
                  href="/atlas"
                  className="inline-flex items-center h-12 px-5 rounded-[10px] border border-white/30 hover:border-white text-white font-archivo font-semibold uppercase tracking-wide text-[16px] transition-colors"
                >
                  {t.cta.btnAtlas}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
