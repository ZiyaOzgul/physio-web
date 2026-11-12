"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
// Generated from the app's own curriculum: `npx tsx tools/web/export-curriculum.ts` in the app repository.
import curriculum from "@/content/curriculum.json";

type Difficulty = "easy" | "medium" | "hard";
type L10n = { tr: string; en: string };

const DIFFICULTIES: ReadonlyArray<{ id: Difficulty; tr: string; en: string }> = [
  { id: "easy", tr: "Kolay", en: "Easy" },
  { id: "medium", tr: "Orta", en: "Medium" },
  { id: "hard", tr: "Zor", en: "Hard" },
];

const QUESTION_TYPES: Record<string, L10n> = {
  choice: { tr: "Çoktan seçmeli", en: "Multiple choice" },
  trueFalse: { tr: "Doğru / yanlış", en: "True / false" },
  identifyPart: { tr: "İşaretli yapının adını seç", en: "Name the highlighted structure" },
  locatePart: { tr: "Adı verilen yapının görüntüsünü seç", en: "Pick the view of the named structure" },
  pickPart: { tr: "Yapıyı 3D modelde bul ve dokun", en: "Find and tap the structure on the 3D model" },
  matchParts: { tr: "Görüntüleri adlarıyla eşleştir", en: "Match views with names" },
  labelParts: { tr: "Etiketleri modele sürükle", en: "Drag the labels onto the model" },
};

/**
 * Learning path: the app's real curriculum (3 units x 5 lessons x 3 difficulties) and its scoring rules. Signed-in
 * visitors see which lessons they have completed in the app; nobody sees invented progress.
 */
export default function LearningPathPage() {
  const { language } = useLanguage();
  const { session, profile } = useAuth();
  const tr = language === "tr";
  const l = (text: L10n) => (tr ? text.tr : text.en);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  const done = useMemo(() => new Set(profile?.completed_lessons ?? []), [profile]);
  const lessons = curriculum.lessons.filter((x) => x.difficulty === difficulty);
  const xp = curriculum.xpPerCorrect[difficulty];
  const doneCount = curriculum.lessons.filter((x) => done.has(x.id)).length;

  return (
    <div className="min-h-screen flex flex-col bg-ground text-ink">
      <Navbar activePath="/ogrenme-yolu" />

      <main className="w-full pt-20">
        <section className="w-full border-b border-line">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <span className="kicker">{tr ? "Öğrenme yolu" : "Learning path"}</span>
              <h1 className="mt-4 font-archivo font-semibold text-ink text-[44px] sm:text-[56px] leading-[0.98]">
                {tr ? "Üç ünite, kırk beş ders, üç zorluk." : "Three units, forty-five lessons, three difficulties."}
              </h1>
              <p className="mt-5 text-[17px] leading-relaxed text-ink-soft max-w-[54ch]">
                {tr
                  ? "Her ders kısa bir soru setidir; soruların çoğu 3D modelin üzerinde sorulur. Bir dersi bitirmek sıradakini açar. Dersler uygulamada çözülür; aşağıdaki liste uygulamadaki müfredatın kendisidir."
                  : "Each lesson is a short set of questions, most of them asked on the 3D model. Finishing a lesson unlocks the next. Lessons are played in the app; the list below is the app's own curriculum."}
              </p>
            </div>

            <dl className="lg:col-span-5 grid grid-cols-3 border-t border-line">
              {[
                { v: String(curriculum.units.length), k: tr ? "ünite" : "units" },
                { v: String(curriculum.lessons.length), k: tr ? "ders" : "lessons" },
                { v: String(curriculum.questionTypes.length), k: tr ? "soru tipi" : "question types" },
              ].map((s, i) => (
                <div key={s.k} className={`pt-4 flex flex-col-reverse ${i > 0 ? "pl-4 border-l border-line" : ""}`}>
                  <dt className="mt-1 text-[12px] text-ink-soft">{s.k}</dt>
                  <dd className="font-archivo font-semibold text-ink text-[34px] leading-none font-data">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="w-full border-b border-line">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-12 lg:py-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
              <div>
                <span className="kicker">{tr ? "Müfredat" : "Curriculum"}</span>
                <h2 className="mt-3 font-archivo font-semibold text-ink text-[36px] sm:text-[44px] leading-[1.02]">
                  {tr ? "Dersler" : "Lessons"}
                </h2>
                <p className="mt-2 text-[14px] text-ink-soft">
                  {tr
                    ? `Bu zorlukta doğru cevap başına ${xp} XP. Art arda ${curriculum.comboThreshold} doğrudan sonra her doğru cevap +${curriculum.comboBonusXp} XP.`
                    : `${xp} XP per correct answer at this difficulty. After ${curriculum.comboThreshold} correct in a row, every correct answer earns +${curriculum.comboBonusXp} XP.`}
                </p>
              </div>

              <div className="flex rounded-[10px] border border-line-strong overflow-hidden self-start md:self-auto" role="tablist">
                {DIFFICULTIES.map((d, i) => (
                  <button
                    key={d.id}
                    type="button"
                    role="tab"
                    aria-selected={difficulty === d.id}
                    onClick={() => setDifficulty(d.id)}
                    className={`h-10 px-5 font-archivo font-semibold uppercase tracking-wide text-[14px] transition-colors cursor-pointer ${
                      i > 0 ? "border-l border-line-strong" : ""
                    } ${difficulty === d.id ? "bg-accent-700 text-white" : "text-ink-soft hover:text-ink"}`}
                  >
                    {tr ? d.tr : d.en}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 border-t border-line">
              {curriculum.units.map((unit, ui) => {
                const unitLessons = lessons.filter((x) => x.unitId === unit.id);
                return (
                  <div
                    key={unit.id}
                    className={`pt-6 pb-8 lg:pb-0 ${ui > 0 ? "lg:pl-8 lg:border-l border-line" : ""} ${ui < 2 ? "lg:pr-8 border-b lg:border-b-0 border-line" : ""}`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-archivo font-semibold text-accent-700 text-[15px] font-data">0{ui + 1}</span>
                      <h3 className="font-archivo font-semibold text-ink text-[26px] leading-tight">{l(unit.title)}</h3>
                    </div>
                    <p className="mt-1 text-[13px] text-ink-soft">{l(unit.description)}</p>

                    <ol className="mt-5 border-t border-line">
                      {unitLessons.map((lesson, li) => {
                        const completed = done.has(lesson.id);
                        return (
                          <li key={lesson.id} className="flex items-center gap-3 py-3 border-b border-line">
                            <span className="w-6 text-[12px] text-ink-muted font-data">{li + 1}</span>
                            <span className="flex-1 text-[15px] text-ink">{l(lesson.title)}</span>
                            {completed ? (
                              <span className="inline-flex items-center gap-1 text-[12px] text-success">
                                <span className="material-symbols-outlined text-[16px]" aria-hidden>
                                  check
                                </span>
                                {tr ? "tamamlandı" : "done"}
                              </span>
                            ) : (
                              <span className="text-[12px] text-ink-muted font-data">
                                {lesson.questions} {tr ? "soru" : "questions"}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                );
              })}
            </div>

            <p className="mt-8 text-[14px] text-ink-soft">
              {session
                ? tr
                  ? `Hesabınızda tamamlanan ders: ${doneCount} / ${curriculum.lessons.length}.`
                  : `Lessons completed on your account: ${doneCount} / ${curriculum.lessons.length}.`
                : tr
                ? "Uygulamadaki hesabınızla giriş yaparsanız tamamladığınız dersler burada işaretlenir."
                : "Sign in with your app account and the lessons you have completed are marked here."}{" "}
              {!session && (
                <Link href="/profil" className="text-accent-700 hover:text-ink underline underline-offset-2">
                  {tr ? "Giriş yap" : "Sign in"}
                </Link>
              )}
            </p>
          </div>
        </section>

        <section className="w-full">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <span className="kicker">{tr ? "Soru tipleri" : "Question types"}</span>
              <h2 className="mt-3 font-archivo font-semibold text-ink text-[36px] sm:text-[44px] leading-[1.02]">
                {tr ? "Sorular nasıl sorulur?" : "How the questions are asked"}
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
                {tr
                  ? "Günlük hedefinizi siz seçersiniz: "
                  : "You choose your daily goal: "}
                {curriculum.goalOptions.join(", ")} XP.
              </p>
            </div>
            <ol className="lg:col-span-8 border-t border-line">
              {curriculum.questionTypes.map((type, i) => (
                <li key={type} className="grid grid-cols-[auto_1fr] gap-x-5 py-4 border-b border-line items-baseline">
                  <span className="font-archivo font-semibold text-accent-700 text-[15px] font-data">0{i + 1}</span>
                  <span className="font-archivo font-semibold text-ink text-[22px] leading-tight">
                    {QUESTION_TYPES[type] ? l(QUESTION_TYPES[type]) : type}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
