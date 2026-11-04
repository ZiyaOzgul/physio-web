"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IPhoneFrame from "@/components/IPhoneFrame";
import { useLanguage } from "@/context/LanguageContext";

const AnatomyViewer3D = dynamic(() => import("@/components/AnatomyViewer3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] rounded-2xl bg-[#eff4ff] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-[#006591]/20 border-t-[#006591] animate-spin" />
        <span className="font-mono text-xs text-[#006591] tracking-wider font-semibold">
          3D TOPLULUK MERKEZİ YÜKLENİYOR...
        </span>
      </div>
    </div>
  ),
});

export default function ToplulukVeIndirPage() {
  const { t, language } = useLanguage();
  const faculties = [
    {
      code: "HT",
      name: language === "tr" ? "Hacettepe Üniversitesi Tıp" : "Hacettepe Faculty of Medicine",
      term: language === "tr" ? "DÖNEM 2" : "YEAR 2",
      group: language === "tr" ? "Lokomotor & Dolaşım Çalışma Grubu" : "Locomotor & Circulation Pod",
      desc: language === "tr"
        ? "Üst ve alt ekstremite kas insersiyoları, pleksus brachialis varyasyonları ve maket fotoğrafları arşivi."
        : "Upper & lower limb muscle insertions, brachial plexus variants, and high-yield cadaver photos.",
      students: language === "tr" ? "482 Öğrenci" : "482 Students",
      leader: "Defne K.",
    },
    {
      code: "CT",
      name: language === "tr" ? "İstanbul Cerrahpaşa Tıp" : "Istanbul Cerrahpaşa Medicine",
      term: language === "tr" ? "DÖNEM 1 · 2" : "YEAR 1 · 2",
      group: language === "tr" ? "Kadavra Laboratuvarı & Diseksiyon" : "Cadaver Dissection Practical Pod",
      desc: language === "tr"
        ? "Salon 3 kadavraları üzerinden hazırlanmış 3D kesitler ve cuma günkü pratik zil provası simülasyonları."
        : "3D reconstructions from Lab 3 cadavers and Friday practical bell exam simulation rehearsals.",
      students: language === "tr" ? "415 Öğrenci" : "415 Students",
      leader: "Kerem S.",
    },
    {
      code: "ET",
      name: language === "tr" ? "Ege Üniversitesi Tıp" : "Ege University Faculty of Medicine",
      term: language === "tr" ? "DÖNEM 2" : "YEAR 2",
      group: language === "tr" ? "Topografik Anatomi & Zilli Ekip" : "Topographic Anatomy & Bell Team",
      desc: language === "tr"
        ? "Toraks, mediastinum organları ve trigonum colli diseksiyonlarına özel 45 saniyelik zilli sınav maratonu."
        : "Thorax, mediastinum viscera, and cervical triangles 45-second bell exam marathon sets.",
      students: language === "tr" ? "390 Öğrenci" : "390 Students",
      leader: "Elif Y.",
    },
    {
      code: "AG",
      name: language === "tr" ? "Ankara & Gazi Tıp" : "Ankara & Gazi Medical Faculties",
      term: language === "tr" ? "DÖNEM 3 · NÖRO" : "YEAR 3 · NEURO",
      group: language === "tr" ? "Nöroanatomi & Traktuslar Kolu" : "Neuroanatomy & Tracts Branch",
      desc: language === "tr"
        ? "Tractus corticospinalis, bazal ganglionlar ve medulla spinalis kesitlerini 3D boyama grubu."
        : "Corticospinal tract, basal ganglia, and spinal cord 3D section annotation study circle.",
      students: language === "tr" ? "340 Öğrenci" : "340 Students",
      leader: language === "tr" ? "Moderatör Ekibi" : "Moderator Team",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      <Navbar activePath="/topluluk-ve-indir" />

      <main className="w-full pt-20 bg-[#f8f9ff]">
        {/* ================= HERO: DOWNLOAD HUB (Stitch 1:1) ================= */}
        <section className="relative w-full px-6 lg:px-12 py-16 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Copy, Badges, QR Scanner */}
            <div className="lg:col-span-6 flex flex-col gap-6 z-10">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#dce9ff] text-[#003752] text-[11px] font-bold uppercase tracking-wider font-archivo">
                <span className="w-2 h-2 rounded-full bg-[#006591] animate-pulse" />
                <span>{t.communityPage.heroBadge}</span>
              </div>

              <h1 className="text-[38px] sm:text-[46px] text-[#003752] font-bold font-archivo leading-[1.08] tracking-tight">
                {t.communityPage.heroTitle}
              </h1>

              <p className="text-[16px] text-[#41474d] max-w-xl leading-relaxed">
                {t.communityPage.heroDesc}
              </p>

              {/* Download Buttons Strip */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#indir"
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-[#003752] text-white hover:bg-[#1f4e6b] transition-all shadow-md group"
                >
                  <span className="material-symbols-outlined text-[28px]">phone_iphone</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] opacity-80 uppercase leading-none">
                      {language === "tr" ? "İndirin" : "Download on"}
                    </span>
                    <span className="text-[14px] font-bold font-archivo leading-tight">App Store</span>
                  </div>
                </a>

                <a
                  href="#indir"
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-[#ffffff] text-[#003752] border border-[#dce9ff] hover:bg-[#eff4ff] transition-all shadow-sm group"
                >
                  <span className="material-symbols-outlined text-[28px] text-[#006591]">play_arrow</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-[#41474d] uppercase leading-none">
                      {language === "tr" ? "Edinin" : "Get it on"}
                    </span>
                    <span className="text-[14px] font-bold font-archivo leading-tight">Google Play</span>
                  </div>
                </a>

                <a
                  href="#indir"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#eff4ff] text-[#006591] text-[13px] font-bold font-archivo hover:bg-[#dce9ff] transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">system_update</span>
                  <span>{t.communityPage.btnDirectDownload}</span>
                </a>
              </div>

              {/* QR Code Scanner Box */}
              <div className="p-4 rounded-2xl bg-[#ffffff] border border-[#e5eeff] shadow-sm flex items-center gap-4 max-w-lg">
                <div className="w-20 h-20 bg-[#eff4ff] rounded-xl flex items-center justify-center shrink-0 p-2 shadow-inner">
                  <svg
                    className="w-full h-full text-[#003752]"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <rect height="7" width="7" x="3" y="3" />
                    <rect height="7" width="7" x="14" y="3" />
                    <rect height="7" width="7" x="3" y="14" />
                    <rect fill="currentColor" height="1" width="1" x="6" y="6" />
                    <rect fill="currentColor" height="1" width="1" x="17" y="6" />
                    <rect fill="currentColor" height="1" width="1" x="6" y="17" />
                    <line x1="14" x2="14" y1="14" y2="17" />
                    <line x1="14" x2="17" y1="17" y2="17" />
                    <line x1="17" x2="20" y1="14" y2="14" />
                    <line x1="20" x2="20" y1="17" y2="20" />
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] text-[#003752] font-bold font-archivo">
                    {t.communityPage.qrTitle}
                  </span>
                  <span className="text-[12px] text-[#41474d]">
                    {t.communityPage.qrSub}
                  </span>
                  <span className="font-mono text-[11px] text-[#006591] font-bold mt-1">
                    HTTPS://APP.ANATOMI3D.MED/GET
                  </span>
                </div>
              </div>

              {/* Technical Telemetry */}
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-[#41474d]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#006591]">memory</span>
                  iOS 15.0+ (Metal 3)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#006591]">android</span>
                  Android 10+ (Vulkan)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#003752]">cloud_download</span>
                  480 MB Çevrimdışı Kütüphane
                </span>
              </div>
            </div>

            {/* Right Column: Interactive 3D Phone + Cranium Viewport */}
            <div className="lg:col-span-6 relative flex flex-col items-center">
              <div className="w-full relative rounded-2xl overflow-hidden shadow-xl bg-[#eff4ff] border border-[#e5eeff]">
                <div className="w-full h-[520px] rounded-2xl overflow-hidden">
                  <AnatomyViewer3D
                    modelId="brain"
                    showCard={false}
                    showHud={false}
                    showLayersWidget={false}
                    showLayerSwitcher={false}
                    showCameraControls={false}
                    showFooter={false}
                    height="h-full"
                  />
                </div>

                {/* In-Scene Floating HUD Telemetry Card */}
                <div className="absolute top-4 left-4 p-3 rounded-xl bg-[#ffffff]/90 backdrop-blur-md shadow-md max-w-xs flex flex-col gap-1 border border-[#e5eeff]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#003752] uppercase font-bold font-archivo">
                      Aktif Model
                    </span>
                    <span className="font-mono text-[11px] text-[#006591] font-bold">
                      CRANIUM & NEURO
                    </span>
                  </div>
                  <p className="text-[11px] text-[#41474d]">
                    Fossa cranii media foramenleri ve nervus trigeminus dalları diseksiyonu.
                  </p>
                  <div className="w-full bg-[#d3e4fe] h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-[#006591] h-full w-[84%] rounded-full" />
                  </div>
                </div>

                {/* Bottom Scene Floating Control Bar */}
                <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-[#ffffff]/90 backdrop-blur-md shadow-md flex items-center justify-between border border-[#e5eeff]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#003752] text-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-[17px]">sync</span>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-mono text-[11px] font-bold text-[#0b1c30]">
                        ogrenci@tip.edu.tr
                      </span>
                      <span className="text-[10px] text-[#006591]">Bulut İlerlemesi Senkronize</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded bg-[#eff4ff] font-mono text-[11px] text-[#003752] font-bold">
                      DÖNEM 2
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#003752] text-white text-[10px] font-bold font-archivo uppercase">
                      DÖNDÜR & İNCELE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= DUAL MOBILE SCREENS SHOWCASE (Stitch 1:1) ================= */}
        <section className="w-full px-6 lg:px-12 py-16 bg-[#ffffff] border-y border-[#e5eeff]">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-[#006591] font-bold uppercase tracking-widest font-archivo">
                  Arayüz & İlerleme Takibi
                </span>
                <h2 className="text-[32px] text-[#003752] font-bold tracking-tight font-archivo">
                  Kişisel Öğrenci Profili ve 28 Günlük Seri Takvimi
                </h2>
                <p className="text-[14px] text-[#41474d] max-w-2xl leading-relaxed">
                  Tıp fakültesi komite temposu düzenlilik ister. Mobil arayüzümüz günlük XP hedeflerinizi, organ sistemi hakimiyetinizi ve fakülte arkadaşlarınız arasındaki sıralamanızı anlık olarak raporlar.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#dce9ff] text-[#003752] font-mono text-[11px] font-bold shrink-0">
                AKTİF SENKRONİZASYON: AÇIK
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Feature Showcase: Profile & Leaderboard */}
              <div className="lg:col-span-6 flex flex-col sm:flex-row gap-6 items-center bg-[#f8f9ff] p-6 rounded-2xl border border-[#e5eeff]">
                <div className="w-full sm:w-56 shrink-0 flex justify-center">
                  <IPhoneFrame
                    screenSrc="/screens/profile.png"
                    altText="Mobil Öğrenci Profili Ekranı"
                    caption="Ziya Özgül • Seviye 01"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded bg-[#c9e6ff] text-[#003752] text-[10px] font-bold uppercase font-archivo">
                    <span className="material-symbols-outlined text-[15px]">military_tech</span>
                    <span>Rozetler & Gamifikasyon</span>
                  </div>
                  <h3 className="text-[20px] text-[#003752] font-bold font-archivo">
                    Komiteye Birlikte Hazırlanma & Sıralama
                  </h3>
                  <p className="text-[13px] text-[#41474d] leading-relaxed">
                    Fakültenizdeki arkadaşlarınızı takip edin, kimin hangi gün kaç XP topladığını canlı görün. Kütüphane mesaisini motive edici bir lig yarışına dönüştürün.
                  </p>
                </div>
              </div>

              {/* Right Feature Showcase: Study Streak & Mastery Heatmap */}
              <div className="lg:col-span-6 flex flex-col sm:flex-row gap-6 items-center bg-[#f8f9ff] p-6 rounded-2xl border border-[#e5eeff]">
                <div className="w-full sm:w-56 shrink-0 flex justify-center">
                  <IPhoneFrame
                    screenSrc="/screens/streak2.png"
                    altText="Çalışma Serisi ve Sistem Hakimiyeti"
                    caption="28 Günlük Isı Haritası"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded bg-[#dce9ff] text-[#003752] text-[10px] font-bold uppercase font-archivo">
                    <span className="material-symbols-outlined text-[15px]">calendar_month</span>
                    <span>Sistem Hakimiyeti Matrisi</span>
                  </div>
                  <h3 className="text-[20px] text-[#003752] font-bold font-archivo">
                    28 Günlük Çalışma Isı Haritası
                  </h3>
                  <p className="text-[13px] text-[#41474d] leading-relaxed">
                    İskelet, kas, damar ve periferik sinir sistemlerindeki kavrama seviyenizi ayrı ayrı ölçün. Sınav öncesi zayıf kaldığınız sistemleri tespit edin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= UNIVERSITY STUDY PODS (Stitch 1:1) ================= */}
        <section className="w-full px-6 lg:px-12 py-16">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006591] text-[24px]">school</span>
                  <span className="text-[11px] text-[#006591] uppercase font-bold tracking-widest font-archivo">
                    Tıp Fakülteleri Ağı
                  </span>
                </div>
                <h2 className="text-[32px] text-[#003752] font-bold tracking-tight font-archivo">
                  Türkiye&apos;deki 40+ Tıp Fakültesi Anatomi Kürsüsüyle Uyumlu
                </h2>
                <p className="text-[14px] text-[#41474d] max-w-2xl leading-relaxed">
                  Her fakültenin komite takvimi, kurul sınavı ağırlıkları ve kadavra maketleri farklıdır. Kendi fakültenizin dönem grubuna katılarak üst dönemlerin paylaştığı diseksiyon etiketlerini inceleyin.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#003752] text-white hover:bg-[#1f4e6b] text-[12px] font-bold uppercase font-archivo transition-all shadow-xs shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">group_add</span>
                <span>Kendi Fakülte Odanı Başlat</span>
              </button>
            </div>

            {/* University Pods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {faculties.map((f) => (
                <div
                  key={f.code}
                  className="p-5 rounded-2xl bg-[#ffffff] border border-[#e5eeff] shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#003752] flex items-center justify-center text-[16px] font-bold font-archivo">
                        {f.code}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#c9e6ff] text-[#003752] font-mono text-[10px] font-bold">
                        {f.term}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-[16px] text-[#003752] font-bold group-hover:text-[#006591] transition-colors font-archivo">
                        {f.name}
                      </h3>
                      <span className="text-[11px] text-[#006591] font-semibold block mt-0.5">
                        {f.group}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#41474d] leading-relaxed">{f.desc}</p>
                  </div>

                  <div className="flex flex-col gap-2 pt-3 bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff]">
                    <div className="flex items-center justify-between font-mono text-[11px] text-[#0b1c30]">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-[#006591]">
                          group
                        </span>
                        {f.students}
                      </span>
                      <span className="text-[#003752] font-bold">{f.leader}</span>
                    </div>
                    <button
                      type="button"
                      className="w-full mt-1 py-1.5 px-3 rounded-lg bg-[#ffffff] hover:bg-[#003752] hover:text-white text-[#003752] border border-[#dce9ff] transition-colors text-[11px] font-bold uppercase tracking-wider text-center font-archivo"
                    >
                      Odaya Katıl
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
