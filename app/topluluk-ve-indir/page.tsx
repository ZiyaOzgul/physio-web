"use client";

import React, { useState } from "react";
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
          3D COMMUNITY HUB LOADING...
        </span>
      </div>
    </div>
  ),
});

export default function ToplulukVeIndirPage() {
  const { t, language } = useLanguage();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };
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
              <div id="indir" className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    showToast(
                      language === "tr"
                        ? "iOS App Store (TestFlight v4.2 Medikal Paket) sayfasına yönlendiriliyor..."
                        : "Redirecting to iOS App Store (TestFlight v4.2 Medical Build)..."
                    )
                  }
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-[#003752] text-white hover:bg-[#1f4e6b] transition-all shadow-md group cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[28px]">phone_iphone</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] opacity-80 uppercase leading-none">
                      {language === "tr" ? "İndirin" : "Download on"}
                    </span>
                    <span className="text-[14px] font-bold font-archivo leading-tight">App Store</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    showToast(
                      language === "tr"
                        ? "Google Play Store (Android Vulkan v4.2) sayfasına yönlendiriliyor..."
                        : "Redirecting to Google Play Store (Android Vulkan v4.2)..."
                    )
                  }
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-[#ffffff] text-[#003752] border border-[#dce9ff] hover:bg-[#eff4ff] transition-all shadow-sm group cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[28px] text-[#006591]">play_arrow</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-[#41474d] uppercase leading-none">
                      {language === "tr" ? "Edinin" : "Get it on"}
                    </span>
                    <span className="text-[14px] font-bold font-archivo leading-tight">Google Play</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    showToast(
                      language === "tr"
                        ? "Anatomi 3D v4.2 Çevrimdışı Kurulum Paketi (APK/IPA - 480 MB) indiriliyor..."
                        : "Downloading Anatomy 3D v4.2 Offline Installer Package (APK/IPA - 480 MB)..."
                    )
                  }
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#eff4ff] text-[#006591] text-[13px] font-bold font-archivo hover:bg-[#dce9ff] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">system_update</span>
                  <span>{t.communityPage.btnDirectDownload}</span>
                </button>
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
                  {language === "tr" ? "480 MB Çevrimdışı Kütüphane" : "480 MB Offline Library"}
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
                      {language === "tr" ? "Aktif Model" : "Active Model"}
                    </span>
                    <span className="font-mono text-[11px] text-[#006591] font-bold">
                      CRANIUM & NEURO
                    </span>
                  </div>
                  <p className="text-[11px] text-[#41474d]">
                    {language === "tr"
                      ? "Fossa cranii media foramenleri ve nervus trigeminus dalları diseksiyonu."
                      : "Middle cranial fossa foramina and trigeminal nerve branches dissection."}
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
                      <span className="text-[10px] text-[#006591]">
                        {language === "tr" ? "Bulut İlerlemesi Senkronize" : "Cloud Progress Synced"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded bg-[#eff4ff] font-mono text-[11px] text-[#003752] font-bold">
                      {language === "tr" ? "DÖNEM 2" : "YEAR 2"}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#003752] text-white text-[10px] font-bold font-archivo uppercase">
                      {language === "tr" ? "DÖNDÜR & İNCELE" : "ROTATE & INSPECT"}
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
                  {language === "tr" ? "Arayüz & İlerleme Takibi" : "Interface & Progress Tracking"}
                </span>
                <h2 className="text-[32px] text-[#003752] font-bold tracking-tight font-archivo">
                  {language === "tr"
                    ? "Kişisel Öğrenci Profili ve 28 Günlük Seri Takvimi"
                    : "Personal Student Profile & 28-Day Streak Calendar"}
                </h2>
                <p className="text-[14px] text-[#41474d] max-w-2xl leading-relaxed">
                  {language === "tr"
                    ? "Tıp fakültesi komite temposu düzenlilik ister. Mobil arayüzümüz günlük XP hedeflerinizi, organ sistemi hakimiyetinizi ve fakülte arkadaşlarınız arasındaki sıralamanızı anlık olarak raporlar."
                    : "Medical school committee pace requires consistency. Our mobile interface reports your daily XP targets, organ system mastery, and peer rankings in real time."}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#dce9ff] text-[#003752] font-mono text-[11px] font-bold shrink-0">
                {language === "tr" ? "AKTİF SENKRONİZASYON: AÇIK" : "ACTIVE SYNC: ON"}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Feature Showcase: Profile & Leaderboard */}
              <div className="lg:col-span-6 flex flex-col sm:flex-row gap-6 items-center bg-[#f8f9ff] p-6 rounded-2xl border border-[#e5eeff]">
                <div className="w-full sm:w-56 shrink-0 flex justify-center">
                  <IPhoneFrame
                    screenSrc="/screens/profile.png"
                    altText={language === "tr" ? "Mobil Öğrenci Profili Ekranı" : "Mobile Student Profile Screen"}
                    caption={language === "tr" ? "Ziya Özgül • Seviye 01" : "Ziya Özgül • Level 01"}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded bg-[#c9e6ff] text-[#003752] text-[10px] font-bold uppercase font-archivo">
                    <span className="material-symbols-outlined text-[15px]">military_tech</span>
                    <span>{language === "tr" ? "Rozetler & Gamifikasyon" : "Badges & Gamification"}</span>
                  </div>
                  <h3 className="text-[20px] text-[#003752] font-bold font-archivo">
                    {language === "tr"
                      ? "Komiteye Birlikte Hazırlanma & Sıralama"
                      : "Collaborative Committee Prep & Rankings"}
                  </h3>
                  <p className="text-[13px] text-[#41474d] leading-relaxed">
                    {language === "tr"
                      ? "Fakültenizdeki arkadaşlarınızı takip edin, kimin hangi gün kaç XP topladığını canlı görün. Kütüphane mesaisini motive edici bir lig yarışına dönüştürün."
                      : "Follow classmates in your faculty and see daily XP activity live. Turn late-night library study sessions into a motivating league challenge."}
                  </p>
                </div>
              </div>

              {/* Right Feature Showcase: Study Streak & Mastery Heatmap */}
              <div className="lg:col-span-6 flex flex-col sm:flex-row gap-6 items-center bg-[#f8f9ff] p-6 rounded-2xl border border-[#e5eeff]">
                <div className="w-full sm:w-56 shrink-0 flex justify-center">
                  <IPhoneFrame
                    screenSrc="/screens/streak2.png"
                    altText={language === "tr" ? "Çalışma Serisi ve Sistem Hakimiyeti" : "Study Streak & System Mastery"}
                    caption={language === "tr" ? "28 Günlük Isı Haritası" : "28-Day Study Heatmap"}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded bg-[#dce9ff] text-[#003752] text-[10px] font-bold uppercase font-archivo">
                    <span className="material-symbols-outlined text-[15px]">calendar_month</span>
                    <span>{language === "tr" ? "Sistem Hakimiyeti Matrisi" : "System Mastery Matrix"}</span>
                  </div>
                  <h3 className="text-[20px] text-[#003752] font-bold font-archivo">
                    {language === "tr" ? "28 Günlük Çalışma Isı Haritası" : "28-Day Study Heatmap"}
                  </h3>
                  <p className="text-[13px] text-[#41474d] leading-relaxed">
                    {language === "tr"
                      ? "İskelet, kas, damar ve periferik sinir sistemlerindeki kavrama seviyenizi ayrı ayrı ölçün. Sınav öncesi zayıf kaldığınız sistemleri tespit edin."
                      : "Measure your mastery across skeletal, muscular, vascular, and peripheral nervous systems separately to spot weak areas before exams."}
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
                    {language === "tr" ? "Tıp Fakülteleri Ağı" : "Medical Faculties Network"}
                  </span>
                </div>
                <h2 className="text-[32px] text-[#003752] font-bold tracking-tight font-archivo">
                  {language === "tr"
                    ? "Türkiye'deki 40+ Tıp Fakültesi Anatomi Kürsüsüyle Uyumlu"
                    : "Aligned with 40+ Medical School Anatomy Departments"}
                </h2>
                <p className="text-[14px] text-[#41474d] max-w-2xl leading-relaxed">
                  {language === "tr"
                    ? "Her fakültenin komite takvimi, kurul sınavı ağırlıkları ve kadavra maketleri farklıdır. Kendi fakültenizin dönem grubuna katılarak üst dönemlerin paylaştığı diseksiyon etiketlerini inceleyin."
                    : "Every medical faculty has a unique committee schedule, board weighting, and cadaver collection. Join your faculty study pod to explore peer-shared dissection pins."}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  showToast(
                    language === "tr"
                      ? "Yeni fakülte çalışma odası oluşturma talebiniz alındı (.edu.tr doğrulaması)."
                      : "Faculty study pod creation request initiated (.edu verification)."
                  )
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#003752] text-white hover:bg-[#1f4e6b] text-[12px] font-bold uppercase font-archivo transition-all shadow-xs shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">group_add</span>
                <span>
                  {language === "tr" ? "Kendi Fakülte Odanı Başlat" : "Start Your Faculty Pod"}
                </span>
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
                      onClick={() =>
                        showToast(
                          language === "tr"
                            ? `${f.name} çalışma odasına katılma isteği gönderildi!`
                            : `Joined ${f.name} study pod!`
                        )
                      }
                      className="w-full mt-1 py-1.5 px-3 rounded-lg bg-[#ffffff] hover:bg-[#003752] hover:text-white text-[#003752] border border-[#dce9ff] transition-colors text-[11px] font-bold uppercase tracking-wider text-center font-archivo cursor-pointer"
                    >
                      {language === "tr" ? "Odaya Katıl" : "Join Pod"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#003752] text-white px-5 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 border border-[#39b8fd]/40">
          <span className="material-symbols-outlined text-[18px] text-[#39b8fd]">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}

      <Footer />
    </div>
  );
}
