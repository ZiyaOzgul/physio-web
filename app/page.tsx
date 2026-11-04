"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IPhoneFrame from "@/components/IPhoneFrame";

// Dynamic Anatomy Viewer 3D
const AnatomyViewer3D = dynamic(() => import("@/components/AnatomyViewer3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] rounded-xl bg-[#eff4ff] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 rounded-full border-2 border-[#006591]/20 border-t-[#006591] animate-spin" />
        <span className="font-mono text-xs text-[#006591] tracking-wider font-semibold">
          3D DİSEKSİYON ATLASI HAZIRLANIYOR...
        </span>
      </div>
    </div>
  ),
});

const REGIONS = [
  {
    id: "head-neck",
    name: "Baş ve Boyun",
    latin: "Caput et Collum",
    structureCount: "664 YAPI",
    icon: "psychology",
    modelId: "brain",
    description:
      "Kranium tabanı, mimik ve çiğneme kasları, yüz damarları, plexus cervicalis ve kraniyal sinir çıkış foraminaları.",
  },
  {
    id: "thorax",
    name: "Göğüs ve Toraks",
    latin: "Cavitas Thoracis",
    structureCount: "636 YAPI",
    icon: "cardiology",
    modelId: "heart",
    description:
      "Kaburgalar, interkostal kaslar, mediastinum kompartmanları, kalp odacıkları, koroner dolaşım ve trakeobronşiyal ağaç.",
  },
  {
    id: "abdomen",
    name: "Karın ve Visseral Ağ",
    latin: "Abdomen et Viscera",
    structureCount: "358 YAPI",
    icon: "emergency",
    modelId: "abdomen",
    description:
      "Ön karın duvarı katmanları, periton kıvrımları, karaciğer segmentleri, çölyak trunkus ve mezenterik vasküler ağ.",
  },
  {
    id: "pelvis",
    name: "Pelvis ve Perine",
    latin: "Pelvis et Perineum",
    structureCount: "256 YAPI",
    icon: "accessibility_new",
    modelId: "skeletal",
    description:
      "Os coxae ve sakrum bağları, levator ani kas grubu, ürogenital diyafram, internal iliak arter dalları ve organ ilişkileri.",
  },
  {
    id: "locomotor",
    name: "Lokomotor & Ekstremiteler",
    latin: "Membrum Superius et Inferius",
    structureCount: "654 YAPI",
    icon: "directions_run",
    modelId: "muscular",
    description:
      "Omuz ve kalça eklemleri, brakiyal pleksus dallanmaları, karpal tünel, uyluk fasyası ve bacak kompartmanları.",
  },
  {
    id: "neuro",
    name: "Nöroanatomi & MSS",
    latin: "Systema Nervosum Centrale",
    structureCount: "387 YAPI",
    icon: "neurology",
    modelId: "brain",
    description:
      "Serebral korteks lobları, bazal gangliyonlar, beyin sapı çekirdekleri, ventriküler sistem ve Willis poligonu.",
  },
];

export default function HomePage() {
  const [heroModelId, setHeroModelId] = useState("muscular");

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      <Navbar activePath="/" />

      <main className="w-full pt-20 bg-[#f8f9ff]">
        {/* ================= HERO SECTION (Stitch 1:1) ================= */}
        <section className="relative w-full overflow-hidden bg-[#f8f9ff] py-8 sm:py-12 lg:py-20">
          {/* Subtle technical grid backdrop decoration */}
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#006591_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#39b8fd]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
              {/* Left Editorial Presentation */}
              <div className="lg:col-span-6 flex flex-col space-y-6">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#dce9ff] w-fit shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#006591] animate-pulse" />
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[#003752] font-archivo">
                    TIP FAKÜLTESİ VE KLİNİK EĞİTİM STANDARDI
                  </span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-[40px] sm:text-[48px] lg:text-[52px] leading-[1.08] text-[#003752] tracking-tight font-bold font-archivo">
                    Kadavra Masasını ve 3D Atlası Cebinizden Keşfedin.
                  </h1>
                  <p className="text-[16px] sm:text-[17px] leading-relaxed text-[#41474d] max-w-xl">
                    2.900+ mikroskobik ve topografik anatomik yapı, 6 hassas diseksiyon katmanı, kişiselleştirilmiş komite müfredatı ve gerçekçi zilli pratik sınav simülasyonu.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/atlas"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#003752] hover:bg-[#1f4e6b] text-white font-semibold text-[15px] shadow-md transition-all hover:shadow-lg active:scale-98"
                  >
                    <span className="material-symbols-outlined text-[20px]">view_in_ar</span>
                    <span>3D Atlası Canlı Dene</span>
                  </Link>
                  <Link
                    href="/topluluk-ve-indir"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#006591] font-semibold text-[15px] transition-all"
                  >
                    <span className="material-symbols-outlined text-[20px]">download_for_offline</span>
                    <span>App Store & Google Play</span>
                  </Link>
                </div>

                {/* Live Metrics & Proof Pills */}
                <div className="pt-6 grid grid-cols-3 gap-3 sm:gap-4">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#ffffff] shadow-sm border border-[#e5eeff] flex flex-col">
                    <span className="text-[26px] sm:text-[30px] leading-none text-[#003752] font-bold font-archivo">
                      15.000+
                    </span>
                    <span className="text-[11px] sm:text-[12px] text-[#41474d] mt-1 font-medium">
                      Aktif Tıp Öğrencisi
                    </span>
                  </div>
                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#ffffff] shadow-sm border border-[#e5eeff] flex flex-col">
                    <span className="text-[26px] sm:text-[30px] leading-none text-[#006591] font-bold font-archivo">
                      12 Fakülte
                    </span>
                    <span className="text-[11px] sm:text-[12px] text-[#41474d] mt-1 font-medium">
                      Komite Müfredat Uyumu
                    </span>
                  </div>
                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#ffffff] shadow-sm border border-[#e5eeff] flex flex-col">
                    <span className="text-[26px] sm:text-[30px] leading-none text-[#6d001c] font-bold font-archivo">
                      %98.4
                    </span>
                    <span className="text-[11px] sm:text-[12px] text-[#41474d] mt-1 font-medium">
                      Terminologia Anatomica
                    </span>
                  </div>
                </div>
              </div>

              {/* Right 3D Viewport Column */}
              <div className="lg:col-span-6 relative">
                <AnatomyViewer3D
                  modelId={heroModelId}
                  onModelChange={setHeroModelId}
                  showCard={true}
                  showHud={true}
                  showLayersWidget={true}
                  showLayerSwitcher={true}
                  showCameraControls={true}
                  showFooter={true}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3 ANA ÇALIŞMA GÜCÜ (Stitch 1:1) ================= */}
        <section className="w-full bg-[#ffffff] py-20 border-y border-[#e5eeff]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#dce9ff] text-[#006591] text-[11px] font-bold uppercase tracking-wider font-archivo">
                <span>KLİNİK VE AKADEMİK MODÜLLER</span>
              </div>
              <h2 className="text-[32px] sm:text-[36px] text-[#003752] font-bold tracking-tight font-archivo">
                Tıp Müfredatına Göre Tasarlanan 3 Ana Çalışma Gücü
              </h2>
              <p className="text-[15px] text-[#41474d] max-w-2xl leading-relaxed">
                Sadece statik bir atlas değil; komite sınav puanınızı artırmak için yapılandırılmış diseksiyon, öğrenme haritası ve laboratuvar simülatörü.
              </p>
            </div>

            {/* 3 Feature Cards Grid with Actual Screenshots */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Feature 1: 6 Katmanlı Diseksiyon Atlası */}
              <Link
                href="/atlas"
                className="flex flex-col bg-[#f8f9ff] rounded-2xl overflow-hidden border border-[#e5eeff] shadow-sm hover:shadow-md transition-all group"
              >
                <div className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#dce9ff] flex items-center justify-center text-[#003752] group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">layers</span>
                  </div>
                  <h3 className="text-[22px] text-[#003752] font-bold font-archivo">
                    6 Katmanlı Diseksiyon Atlası
                  </h3>
                  <p className="text-[14px] text-[#41474d] leading-relaxed">
                    Deri altı fasyadan derin periosta kadar organları şeffaflaştırın, izole edin veya gizleyin. 2.953 tanımlı yapıyı Latin terminolojisiyle keşfedin.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <span className="px-2.5 py-1 rounded bg-[#eff4ff] text-[#003752] text-[11px] font-semibold">
                      Tüm Vücut
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#eff4ff] text-[#003752] text-[11px] font-semibold">
                      Topografik Bölgeler
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#eff4ff] text-[#003752] text-[11px] font-semibold">
                      Organ Sistemleri
                    </span>
                  </div>
                </div>
                <div className="p-4 pt-0 mt-auto">
                  <div className="w-full h-72 rounded-xl bg-[#ffffff] border border-[#e5eeff] overflow-hidden flex items-center justify-center p-2">
                    <Image
                      src="/screens/atlas.png"
                      alt="Anatomi 3D Atlas Bölge ve Katman Görünümü"
                      width={600}
                      height={400}
                      className="h-full w-auto object-contain drop-shadow-sm group-hover:scale-102 transition-transform"
                    />
                  </div>
                </div>
              </Link>

              {/* Feature 2: Komite Odaklı Öğrenme Yolu */}
              <Link
                href="/ogrenme-yolu"
                className="flex flex-col bg-[#f8f9ff] rounded-2xl overflow-hidden border border-[#e5eeff] shadow-sm hover:shadow-md transition-all group"
              >
                <div className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#dce9ff] flex items-center justify-center text-[#006591] group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">route</span>
                  </div>
                  <h3 className="text-[22px] text-[#003752] font-bold font-archivo">
                    Komite Odaklı Öğrenme Yolu
                  </h3>
                  <p className="text-[14px] text-[#41474d] leading-relaxed">
                    Kolay, Orta ve Zor seviyelerde tıp komitelerine özel hedefler. Lokomotor, Miyoloji, Kardiyovasküler ve Nöroanatomi sıralı çalışma modülleri.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <span className="px-2.5 py-1 rounded bg-[#eff4ff] text-[#006591] text-[11px] font-semibold">
                      Komite Hedefleri
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#eff4ff] text-[#006591] text-[11px] font-semibold">
                      %90 Hakimiyet Eşiği
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#eff4ff] text-[#006591] text-[11px] font-semibold">
                      3D Bölge Açma
                    </span>
                  </div>
                </div>
                <div className="p-4 pt-0 mt-auto">
                  <div className="w-full h-72 rounded-xl bg-[#ffffff] border border-[#e5eeff] overflow-hidden flex items-center justify-center p-2">
                    <Image
                      src="/screens/learn.png"
                      alt="Öğrenme Yolu ve Komite Müfredatı Ekranı"
                      width={600}
                      height={400}
                      className="h-full w-auto object-contain drop-shadow-sm group-hover:scale-102 transition-transform"
                    />
                  </div>
                </div>
              </Link>

              {/* Feature 3: Zilli Sınav Simülatörü */}
              <Link
                href="/zilli-sinav"
                className="flex flex-col bg-[#f8f9ff] rounded-2xl overflow-hidden border border-[#e5eeff] shadow-sm hover:shadow-md transition-all group"
              >
                <div className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ffdada] flex items-center justify-center text-[#6d001c] group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">notification_important</span>
                  </div>
                  <h3 className="text-[22px] text-[#003752] font-bold font-archivo">
                    Zilli Sınav Simülatörü
                  </h3>
                  <p className="text-[14px] text-[#41474d] leading-relaxed">
                    Gerçek diseksiyon laboratuvarı stresi: Masada duran 5 numaralı pin için 45 saniyelik zil çalar. Hızlıca doğru Latince anatomik ismi yazın.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <span className="px-2.5 py-1 rounded bg-[#ffdada]/60 text-[#6d001c] text-[11px] font-semibold">
                      45 Sn Geri Sayım
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#eff4ff] text-[#003752] text-[11px] font-semibold">
                      5 Kadavra Masası
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#eff4ff] text-[#003752] text-[11px] font-semibold">
                      Latince Spot Test
                    </span>
                  </div>
                </div>
                <div className="p-4 pt-0 mt-auto">
                  <div className="w-full h-72 rounded-xl bg-[#ffffff] border border-[#e5eeff] overflow-hidden flex items-center justify-center p-2">
                    <Image
                      src="/screens/exam-phone.png"
                      alt="Zilli Sınav Kadavra Masası Simülasyonu"
                      width={600}
                      height={400}
                      className="h-full w-auto object-contain drop-shadow-sm group-hover:scale-102 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= BÖLGELERE GÖRE 3D DİSEKSİYON KATALOĞU (Stitch 1:1) ================= */}
        <section className="w-full bg-[#f8f9ff] py-20" id="atlas-bolgeleri">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#006591] px-3 py-1 rounded bg-[#eff4ff] font-archivo">
                ANATOMİK TOPOGRAFİ DİZİNİ
              </span>
              <h2 className="text-[32px] sm:text-[36px] text-[#003752] font-bold font-archivo">
                Bölgelere Göre 3D Diseksiyon Kataloğu
              </h2>
              <p className="text-[15px] text-[#41474d]">
                Tıp öğrencilerinin en çok zorlandığı 6 ana anatomik kompartmanı doğrudan izole edilmiş 3 boyutlu derinlikle inceleyin.
              </p>
            </div>

            {/* 6 Region Cards with subtle scale animation and pointer cursor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {REGIONS.map((reg) => (
                <Link
                  key={reg.id}
                  href={`/atlas?region=${reg.id}`}
                  className="p-6 rounded-2xl bg-[#ffffff] border border-[#e5eeff] shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.03] cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-[#dce9ff] text-[#003752] text-[11px] font-bold font-archivo">
                        {reg.structureCount}
                      </span>
                      <span className="material-symbols-outlined text-[22px] text-[#006591] group-hover:rotate-6 transition-transform">
                        {reg.icon}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-[20px] text-[#003752] font-bold font-archivo">
                        {reg.name}
                      </h4>
                      <p className="text-[12px] text-[#006591] font-mono mt-0.5 font-medium">
                        {reg.latin}
                      </p>
                    </div>
                    <p className="text-[13px] text-[#41474d] leading-relaxed">
                      {reg.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#f0f4f9] flex items-center justify-between text-[#006591] font-semibold text-[13px] group-hover:text-[#003752] transition-colors">
                    <span>3D Bölgeyi İncele</span>
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ÖĞRENME ALIŞKANLIĞI & OYUNLAŞTIRMA (Stitch 1:1) ================= */}
        <section className="w-full bg-[#ffffff] py-20 border-y border-[#e5eeff]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Gamification Details */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#006591]/10 text-[#006591] text-[11px] font-bold uppercase tracking-wider font-archivo">
                  <span>ÖĞRENME ALIŞKANLIĞI & OYUNLAŞTIRMA</span>
                </div>
                <h2 className="text-[32px] sm:text-[36px] text-[#003752] font-bold font-archivo leading-tight">
                  Komiteye Son Hafta Değil, Her Gün Hazırlanın
                </h2>
                <p className="text-[15px] text-[#41474d] leading-relaxed">
                  Tıp fakültesi yoğunluğunda anatomiyi hafızada tutmanın en iyi yolu aralıklı tekrardır. Anatomi 3D; günlük çalışma serisi (streak), kademe rozetleri ve fakülte arkadaş listenizle sizi motive eder.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#f8f9ff] border border-[#e5eeff] shadow-sm space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-md">
                    <div className="flex items-center gap-2 text-[#003752]">
                      <span className="material-symbols-outlined text-[22px] text-[#006591]">
                        local_fire_department
                      </span>
                      <span className="text-[16px] font-bold font-archivo">
                        Seri (Streak) Takibi
                      </span>
                    </div>
                    <p className="text-[12px] text-[#41474d] leading-relaxed">
                      28 günlük ısı haritası ve seriyi koruma korumaları ile anatomi tekrarını rutin haline getirin.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#f8f9ff] border border-[#e5eeff] shadow-sm space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-md">
                    <div className="flex items-center gap-2 text-[#003752]">
                      <span className="material-symbols-outlined text-[22px] text-[#6d001c]">
                        military_tech
                      </span>
                      <span className="text-[16px] font-bold font-archivo">
                        Klinik Rozetler
                      </span>
                    </div>
                    <p className="text-[12px] text-[#41474d] leading-relaxed">
                      &apos;İlk Kesi&apos;, &apos;Vizit Hazırlığı&apos; ve &apos;Klinik Temel&apos; gibi 18 uzmanlık rozetini tamamlayarak kilidini açın.
                    </p>
                  </div>
                </div>

                {/* Live Leaderboard Snippet Mock */}
                <div className="p-5 rounded-2xl bg-[#eff4ff] border border-[#dce9ff] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] uppercase text-[#003752] font-bold font-archivo tracking-wider">
                      Fakülte Sıralaması (Haftalık Komite XP)
                    </span>
                    <span className="text-[11px] text-[#006591] font-semibold">
                      Dönem 2 / Komite 1
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#ffffff] text-[13px] border border-[#e5eeff]">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-[#003752] w-5">01</span>
                        <span className="font-medium text-[#0b1c30]">Defne K. (Hacettepe Tıp)</span>
                      </div>
                      <span className="font-mono text-[11px] text-[#006591] font-bold">1.450 XP</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#ffffff] text-[13px] border border-[#e5eeff]">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-[#003752] w-5">02</span>
                        <span className="font-medium text-[#0b1c30]">Kerem S. (Cerrahpaşa Tıp)</span>
                      </div>
                      <span className="font-mono text-[11px] text-[#006591] font-bold">1.320 XP</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#003752] text-white text-[13px] shadow-sm">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-[#39b8fd] w-5">04</span>
                        <span className="font-semibold text-white">Ziya Özgül (Siz)</span>
                      </div>
                      <span className="font-mono text-[11px] text-[#39b8fd] font-bold">980 XP</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Mockup with Profile & Streak Screenshot in iPhone frame */}
              <div className="lg:col-span-6 flex justify-center">
                <IPhoneFrame
                  screenSrc="/screens/streak2.png"
                  altText="Öğrenci Profil ve Başarı Takibi Ekranı"
                  caption="Canlı Öğrenci Profili • Streak Takibi"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= TIP FAKÜLTELERİNDEN GERİ BİLDİRİMLER (Stitch 1:1) ================= */}
        <section className="w-full bg-[#f8f9ff] py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#006591] px-3 py-1 rounded bg-[#eff4ff] font-archivo">
                KLİNİK DENEYİMLER
              </span>
              <h2 className="text-[32px] sm:text-[36px] text-[#003752] font-bold font-archivo">
                Tıp Fakültelerinden Geri Bildirimler
              </h2>
              <p className="text-[15px] text-[#41474d]">
                Kadavra laboratuvarına girmeden önce ve komite sınavı gecelerinde Anatomi 3D kullananlar anlatıyor.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Review 1 */}
              <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#e5eeff] shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex text-amber-500 gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>
                  <p className="text-[14px] text-[#41474d] italic leading-relaxed">
                    &quot;Zilli sınav masası simülatörü olmasaydı karın komitesini geçmem imkansızdı. 45 saniyelik sayaçla iğneli organı çevirip Latince yazma alıştırması tam olarak bizim laboratuvar ortamı.&quot;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-[#f0f4f9]">
                  <div className="w-10 h-10 rounded-full bg-[#dce9ff] flex items-center justify-center font-bold text-[#003752] text-sm">
                    EK
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#003752]">Elif Karaca</span>
                    <span className="text-[11px] text-[#41474d]">Hacettepe Tıp Fakültesi • Dönem 2</span>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#e5eeff] shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex text-amber-500 gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>
                  <p className="text-[14px] text-[#41474d] italic leading-relaxed">
                    &quot;Kitaplardaki 2D çizimlerde plexus brachialis dallarını 3 boyutlu kafamda canlandıramıyordum. Katman katman kasları kaldırıp arkadaki sinir köklerini görmek her şeyi yerine oturttu.&quot;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-[#f0f4f9]">
                  <div className="w-10 h-10 rounded-full bg-[#dce9ff] flex items-center justify-center font-bold text-[#003752] text-sm">
                    BA
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#003752]">Berk Altınok</span>
                    <span className="text-[11px] text-[#41474d]">İstanbul (Çapa) Tıp Fakültesi • Dönem 1</span>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#e5eeff] shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex text-amber-500 gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>
                  <p className="text-[14px] text-[#41474d] italic leading-relaxed">
                    &quot;Öğrencilerime kadavra seansları öncesinde hazırlık için bu atlası zorunlu kılıyorum. Özellikle foramen ve kanal ilişkilerini 3D izole edebilmek klinik anatomi anlayışını katbekat artırıyor.&quot;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-[#f0f4f9]">
                  <div className="w-10 h-10 rounded-full bg-[#dce9ff] flex items-center justify-center font-bold text-[#006591] text-sm">
                    MÖ
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#003752]">Doç. Dr. Murat Öztürk</span>
                    <span className="text-[11px] text-[#41474d]">Anatomi Anabilim Dalı Öğretim Üyesi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FINAL CALL TO ACTION (Stitch 1:1) ================= */}
        <section className="w-full bg-[#ffffff] py-16 border-t border-[#e5eeff]" id="indir">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="relative rounded-3xl bg-[#003752] text-white overflow-hidden p-8 lg:p-14 shadow-xl">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#39b8fd]/20 blur-3xl pointer-events-none" />
              <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full bg-[#006591]/30 blur-2xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-[#c9e6ff] text-[11px] font-bold uppercase tracking-wider font-archivo">
                    Hemen Başlayın • Ücretsiz Tıp Fakültesi Denemesi
                  </span>
                  <h2 className="text-[32px] sm:text-[38px] font-bold text-white font-archivo leading-tight">
                    Anatomi Komitelerine Hazırlanmanın En Hızlı ve Görsel Yolu
                  </h2>
                  <p className="text-[15px] text-white/80 max-w-xl leading-relaxed">
                    iOS ve Android uygulamamızı indirin ya da tarayıcınızdan Web Atlası başlatın. Tüm kadavra yapılarını, katmanlarını ve zilli sınav sorularını anında deneyimleyin.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <Link
                      href="/topluluk-ve-indir"
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white text-[#003752] hover:bg-[#eff4ff] text-[14px] font-bold shadow-md transition-all"
                    >
                      <span className="material-symbols-outlined text-[20px]">phone_iphone</span>
                      <span>App Store&apos;dan İndir</span>
                    </Link>
                    <Link
                      href="/topluluk-ve-indir"
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white text-[#003752] hover:bg-[#eff4ff] text-[14px] font-bold shadow-md transition-all"
                    >
                      <span className="material-symbols-outlined text-[20px]">android</span>
                      <span>Google Play ile İndir</span>
                    </Link>
                    <Link
                      href="/atlas"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1f4e6b] text-white hover:bg-[#006591] text-[14px] font-semibold transition-all border border-white/10"
                    >
                      <span className="material-symbols-outlined text-[18px]">open_in_browser</span>
                      <span>Web Atlası Başlat</span>
                    </Link>
                  </div>
                </div>

                {/* QR Code & Device Verification Card */}
                <div className="lg:col-span-4 flex justify-center lg:justify-end">
                  <div className="p-5 rounded-2xl bg-[#ffffff] text-[#0b1c30] shadow-2xl flex flex-col items-center text-center space-y-3 max-w-[240px]">
                    <div className="w-36 h-36 bg-[#eff4ff] rounded-xl p-2 flex items-center justify-center">
                      <svg className="w-full h-full text-[#003752]" fill="currentColor" viewBox="0 0 100 100">
                        <path d="M10 10h30v30h-30zM15 15v20h20v-20zM20 20h10v10h-10zM60 10h30v30h-30zM65 15v20h20v-20zM70 20h10v10h-10zM10 60h30v30h-30zM15 65v20h20v-20zM20 70h10v10h-10zM60 60h10v10h-10zM80 60h10v10h-10zM70 70h10v10h-10zM60 80h10v10h-10zM80 80h10v10h-10z" />
                      </svg>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[12px] uppercase font-bold text-[#003752] font-archivo">
                        Kamerayla Okutun
                      </span>
                      <p className="text-[11px] text-[#41474d]">
                        Tüm cihazlarda kesintisiz 3D
                      </p>
                    </div>
                  </div>
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
