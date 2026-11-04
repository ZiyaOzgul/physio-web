"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="w-full bg-[#eaf1f8] border-t border-[#d3e0ed] text-[#0b1c30] shadow-[0_-1px_6px_rgba(0,0,0,0.03)] mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#003752] flex items-center justify-center text-white shadow-sm">
                <span className="material-symbols-outlined text-[20px]">view_in_ar</span>
              </div>
              <span className="text-[18px] text-[#003752] font-bold tracking-tight uppercase font-archivo">
                ANATOMI 3D
              </span>
            </Link>
            <p className="text-[14px] leading-relaxed text-[#41474d] max-w-sm">
              {t.footer.description}
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffffff] text-[#003752] text-[11px] font-medium border border-[#d3e0ed]">
                <span className="material-symbols-outlined text-[16px] text-[#006591]">verified</span>
                {t.footer.badgeMedical}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffffff] text-[#006591] text-[11px] font-medium border border-[#d3e0ed]">
                <span className="material-symbols-outlined text-[16px]">school</span>
                {t.footer.badgeTa2}
              </span>
            </div>
          </div>

          {/* Module Links */}
          <div className="space-y-3">
            <h4 className="text-[15px] text-[#003752] font-bold tracking-wide uppercase font-archivo">
              {t.footer.modulesTitle}
            </h4>
            <ul className="space-y-2 text-[14px] text-[#41474d]">
              <li>
                <Link className="hover:text-[#003752] transition-colors" href="/atlas">
                  {t.footer.moduleLocomotor}
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#003752] transition-colors" href="/atlas">
                  {t.footer.moduleCardio}
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#003752] transition-colors" href="/atlas">
                  {t.footer.moduleNeuro}
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#003752] transition-colors" href="/atlas">
                  {t.footer.moduleVisceral}
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#003752] transition-colors" href="/zilli-sinav">
                  {t.footer.moduleExam}
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic & Faculty */}
          <div className="space-y-3">
            <h4 className="text-[15px] text-[#003752] font-bold tracking-wide uppercase font-archivo">
              {t.footer.academicTitle}
            </h4>
            <ul className="space-y-2 text-[14px] text-[#41474d]">
              <li>
                <Link className="hover:text-[#003752] transition-colors" href="/ogrenme-yolu">
                  {t.footer.academicCurriculum}
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#003752] transition-colors" href="/cihaz-deneyimi">
                  {t.footer.academicLab}
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#003752] transition-colors" href="/topluluk-ve-indir">
                  {t.footer.academicLicense}
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#003752] transition-colors" href="/topluluk-ve-indir">
                  {t.footer.academicCadaver}
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#003752] transition-colors" href="/topluluk-ve-indir">
                  {t.footer.academicCommunity}
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile Platforms */}
          <div className="space-y-3">
            <h4 className="text-[15px] text-[#003752] font-bold tracking-wide uppercase font-archivo">
              {t.footer.appsTitle}
            </h4>
            <p className="text-[12px] text-[#41474d] leading-relaxed">
              {language === "tr"
                ? "Çevrimdışı 3D motoruyla sinyal almayan morfoloji bodrumlarında bile kesintisiz pratik yapın."
                : "Practice uninterrupted even in morphology basements with zero reception using our offline 3D engine."}
            </p>
            <div className="flex flex-col gap-2.5 pt-1">
              <Link
                href="/topluluk-ve-indir"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#ffffff] hover:bg-[#dce9ff] text-[#0b1c30] border border-[#d3e0ed] transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[22px] text-[#003752]">
                  phone_iphone
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-[#41474d]">
                    {language === "tr" ? "App Store üzerinden" : "Available on"}
                  </span>
                  <span className="text-[13px] text-[#003752] font-semibold leading-tight">
                    iOS {language === "tr" ? "İndir" : "Download"}
                  </span>
                </div>
              </Link>
              <Link
                href="/topluluk-ve-indir"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#ffffff] hover:bg-[#dce9ff] text-[#0b1c30] border border-[#d3e0ed] transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[22px] text-[#006591]">
                  android
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-[#41474d]">
                    {language === "tr" ? "Google Play ile" : "Get it on"}
                  </span>
                  <span className="text-[13px] text-[#003752] font-semibold leading-tight">
                    Android {language === "tr" ? "İndir" : "Download"}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer Banner */}
        <div className="pt-6 mt-6 bg-[#ffffff]/80 border border-[#d3e0ed] rounded-xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#006591] text-[20px] mt-0.5 shrink-0">
              clinical_notes
            </span>
            <p className="text-[12px] text-[#41474d] leading-relaxed">
              <strong className="font-semibold text-[#0b1c30]">
                {language === "tr" ? "Tıbbi Uyarı & Sorumluluk Reddi:" : "Medical Disclaimer:"}
              </strong>{" "}
              {language === "tr"
                ? "Anatomi3D platformu yalnızca tıbbi eğitim, araştırma ve akademik anatomi pratikleri amacıyla hazırlanmıştır. İçerikler doğrudan tanı, tedavi veya cerrahi müdahale kararları için bağımsız bir kılavuz niteliği taşımaz. Klinik uygulamalarda güncel tıp literatürü ve resmi teşhis protokolleri esas alınmalıdır."
                : "The Anatomi3D platform is designed solely for medical education, academic research, and anatomical dissection training. Content does not serve as an independent guide for clinical diagnosis, treatment, or surgical interventions. Official medical literature and diagnostic protocols must always be consulted in clinical practice."}
            </p>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#41474d]">
          <p>© 2026 Anatomi3D Health Tech Corp. {t.footer.copyright}</p>
          <div className="flex items-center gap-6">
            <Link className="hover:text-[#003752] transition-colors" href="/kvkk">
              {t.footer.legalTerms}
            </Link>
            <Link className="hover:text-[#003752] transition-colors" href="/kvkk">
              {t.footer.legalKvkk}
            </Link>
            <Link className="hover:text-[#003752] transition-colors" href="/kvkk">
              {t.footer.legalCookies}
            </Link>
            <span className="text-[#72787e] font-mono">v4.2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
