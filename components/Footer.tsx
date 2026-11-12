"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Site footer. Links only to pages that exist; no company name, version number or accreditation that the project has
 * not provided. The model credit is required by the source licences.
 */
export default function Footer() {
  const { language, t } = useLanguage();
  const tr = language === "tr";

  const columns: ReadonlyArray<{ title: string; links: ReadonlyArray<{ href: string; label: string }> }> = [
    {
      title: tr ? "Çalışma" : "Study",
      links: [
        { href: "/atlas", label: t.nav.atlas },
        { href: "/kemik-anatomisi", label: t.nav.osteology },
        { href: "/ogrenme-yolu", label: t.nav.learn },
        { href: "/zilli-sinav", label: t.nav.exam },
      ],
    },
    {
      title: tr ? "Uygulama" : "App",
      links: [
        { href: "/topluluk-ve-indir", label: tr ? "Mobil uygulama" : "Mobile app" },
        { href: "/cihaz-deneyimi", label: t.nav.device },
        { href: "/profil", label: tr ? "Profil" : "Profile" },
      ],
    },
    {
      title: tr ? "Yasal" : "Legal",
      links: [
        { href: "/kvkk#gizlilik", label: tr ? "Gizlilik" : "Privacy" },
        { href: "/kvkk#kosullar", label: tr ? "Kullanım koşulları" : "Terms of use" },
        { href: "/kvkk#lisanslar", label: tr ? "Model lisansları" : "Model licences" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-ground border-t border-line text-ink mt-auto">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pt-14 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-2 lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="" width={36} height={36} className="w-9 h-9 object-contain" />
              <span className="text-[19px] text-ink font-semibold tracking-wide uppercase font-archivo">Anatomi 3D</span>
            </Link>
            <p className="mt-4 text-[14px] leading-relaxed text-ink-soft max-w-sm">
              {tr
                ? "Sağlık bilimleri öğrencileri için 3D anatomi atlası, öğrenme yolu ve zilli sınav."
                : "A 3D anatomy atlas, learning path and spot exam for health-science students."}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="kicker">{col.title}</h4>
              <ul className="mt-4 space-y-2.5 text-[14px]">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link className="text-ink-soft hover:text-ink transition-colors" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 pl-4 border-l-[3px] border-line-strong text-[13px] leading-relaxed text-ink-soft max-w-[80ch]">
          {tr
            ? "Yalnızca eğitim amaçlıdır. İçerik tanı veya tedavi tavsiyesi değildir; klinik kararlar için güncel kılavuzlara ve hekim görüşüne başvurun. Yapı açıklamaları yapay zekâyla yazılmıştır ve uzman incelemesini beklemektedir."
            : "For education only. The content is not diagnostic or treatment advice; for clinical decisions consult current guidelines and a physician. The structure descriptions were written with AI and await expert review."}
        </p>

        <div className="mt-8 pt-6 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px] text-ink-muted">
          <p>© 2026 Anatomi 3D</p>
          <p>
            3D model: BodyParts3D © DBCLS (CC BY-SA 2.1 JP) · Z-Anatomy (CC BY-SA 4.0) · HRA (CC BY 4.0) · MakeHuman (CC0)
          </p>
        </div>
      </div>
    </footer>
  );
}
