"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
// Generated from the app's own privacy and terms screens: `npx tsx tools/web/export-legal.ts` in the app repository.
import legal from "@/content/legal.json";

type L10n = { tr: string; en: string };

/**
 * Privacy, terms and licences. The texts are the app's own (one source for both); the model licences are the ones the
 * source data sets require. No company details, contact addresses or compliance badges are stated here that the
 * project has not provided.
 */
export default function LegalPage() {
  const { language } = useLanguage();
  const tr = language === "tr";
  const l = (text: L10n) => (tr ? text.tr : text.en);

  const nav = [
    { id: "gizlilik", label: l(legal.privacy.title) },
    { id: "kosullar", label: l(legal.terms.title) },
    { id: "verileriniz", label: tr ? "Verileriniz" : "Your data" },
    { id: "lisanslar", label: tr ? "3D model lisansları" : "3D model licences" },
  ];

  const licences = [
    { name: "BodyParts3D", holder: "© The Database Center for Life Science (DBCLS)", licence: "CC BY-SA 2.1 JP" },
    { name: "Z-Anatomy", holder: "Z-Anatomy", licence: "CC BY-SA 4.0" },
    { name: "HRA 3D Reference Object Library", holder: "NIH / NLM Human Reference Atlas", licence: "CC BY 4.0" },
    { name: "MakeHuman", holder: "MakeHuman", licence: "CC0" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-ground text-ink">
      <Navbar activePath="/kvkk" />

      <main className="w-full pt-20">
        <section className="w-full border-b border-line">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-12 lg:py-16">
            <span className="kicker">{tr ? "Gizlilik · koşullar · lisanslar" : "Privacy · terms · licences"}</span>
            <h1 className="mt-4 font-archivo font-semibold text-ink text-[44px] sm:text-[56px] leading-[0.98] max-w-[18ch]">
              {tr ? "Verileriniz ve kullanım koşulları" : "Your data and the terms of use"}
            </h1>
            <p className="mt-4 text-[14px] text-ink-muted">{l(legal.updated)}</p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <nav className="lg:col-span-3" aria-label={tr ? "Bölümler" : "Sections"}>
            <ul className="lg:sticky lg:top-28 border-t border-line">
              {nav.map((n) => (
                <li key={n.id} className="border-b border-line">
                  <a href={`#${n.id}`} className="block py-3 text-[15px] text-ink-soft hover:text-ink transition-colors">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-9 max-w-[72ch]">
            <section id="gizlilik" className="scroll-mt-28">
              <h2 className="font-archivo font-semibold text-ink text-[36px] leading-[1.02]">{l(legal.privacy.title)}</h2>
              {legal.privacy.sections.map((s) => (
                <div key={s.title.en} className="mt-8">
                  <h3 className="font-archivo font-semibold text-ink text-[22px] leading-tight">{l(s.title)}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">{l(s.body)}</p>
                </div>
              ))}
            </section>

            <section id="kosullar" className="scroll-mt-28 mt-16 pt-12 border-t border-line">
              <h2 className="font-archivo font-semibold text-ink text-[36px] leading-[1.02]">{l(legal.terms.title)}</h2>
              <div className="mt-8 pl-5 border-l-[3px] border-danger">
                <h3 className="font-archivo font-semibold text-ink text-[22px] leading-tight">{l(legal.terms.disclaimerTitle)}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">{l(legal.terms.disclaimerBody)}</p>
              </div>
              {legal.terms.sections.map((s) => (
                <div key={s.title.en} className="mt-8">
                  <h3 className="font-archivo font-semibold text-ink text-[22px] leading-tight">{l(s.title)}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">{l(s.body)}</p>
                </div>
              ))}
            </section>

            <section id="verileriniz" className="scroll-mt-28 mt-16 pt-12 border-t border-line">
              <h2 className="font-archivo font-semibold text-ink text-[36px] leading-[1.02]">{tr ? "Verileriniz" : "Your data"}</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
                {tr
                  ? "Hesabınızda tutulan bilgileri Profil sayfasında görebilir, hesabınızı ve hesabınıza bağlı verileri oradan kalıcı olarak silebilirsiniz."
                  : "You can see what your account holds on the Profile page, and permanently delete the account and the data tied to it from there."}
              </p>
              <Link
                href="/profil"
                className="group mt-5 inline-flex items-center gap-2 font-archivo font-semibold uppercase tracking-wide text-[15px] text-accent-700 hover:text-ink transition-colors"
              >
                {tr ? "Profil sayfasına git" : "Go to the Profile page"}
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1" aria-hidden>
                  arrow_forward
                </span>
              </Link>
            </section>

            <section id="lisanslar" className="scroll-mt-28 mt-16 pt-12 border-t border-line">
              <h2 className="font-archivo font-semibold text-ink text-[36px] leading-[1.02]">
                {tr ? "3D model lisansları" : "3D model licences"}
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
                {tr
                  ? "3D modeller aşağıdaki açık veri setlerinden türetilmiştir. BodyParts3D ve Z-Anatomy'den türetilen model dosyaları aynı lisansla paylaşılır."
                  : "The 3D models are derived from the open data sets below. Model files derived from BodyParts3D and Z-Anatomy are shared under the same licence."}
              </p>
              <dl className="mt-6 border-t border-line">
                {licences.map((x) => (
                  <div key={x.name} className="grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-x-6 py-4 border-b border-line items-baseline">
                    <dt>
                      <span className="block font-archivo font-semibold text-ink text-[20px] leading-tight">{x.name}</span>
                      <span className="block text-[13px] text-ink-soft">{x.holder}</span>
                    </dt>
                    <dd className="text-[15px] text-ink font-data">{x.licence}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
