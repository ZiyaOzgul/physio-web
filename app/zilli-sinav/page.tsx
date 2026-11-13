"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IPhoneFrame from "@/components/IPhoneFrame";
import { useLanguage } from "@/context/LanguageContext";
import { EXAM_STATIONS } from "@/components/CadaverExamSimulator3D";

const CadaverExamSimulator3D = dynamic(
  () => import("@/components/CadaverExamSimulator3D"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[520px] rounded-[14px] bg-[#0a1926] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#b8494b]/20 border-t-[#b8494b] animate-spin" />
          <span className="font-data text-xs text-[#e9c3c4] tracking-wider font-semibold">
            KADAVRA ZİLLİ SINAV MASASI YÜKLENİYOR...
          </span>
        </div>
      </div>
    ),
  }
);

export default function ZilliSinavPage() {
  const { t, language } = useLanguage();
  const [station, setStation] = useState<number>(1);
  const [activePin, setActivePin] = useState<number>(1);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const currentStationConfig = EXAM_STATIONS[station] || EXAM_STATIONS[1];
  const currentPin = currentStationConfig.pins.find((p) => p.number === activePin) || currentStationConfig.pins[0];

  // Countdown timer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 45 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStationChange = (newStation: number) => {
    setStation(newStation);
    setActivePin(1);
    setUserAnswer("");
    setIsAnswerCorrect(null);
    setTimeLeft(45);
  };

  const handleCheckAnswer = () => {
    const clean = userAnswer.trim().toLowerCase();
    const pinName = currentPin.latin.toLowerCase();
    const pinLabel = currentPin.label.toLowerCase();

    // Check against key keywords of the active pin
    const keywords = pinName.split(/[\s,()/-]+/).filter((w) => w.length > 3);
    const matched = keywords.some((kw) => clean.includes(kw)) || clean.includes(pinLabel);

    if (matched || (clean.length > 3 && (pinName.includes(clean) || pinLabel.includes(clean)))) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }
  };

  const stationNameLabel =
    station === 1
      ? t.examPage.station1Name
      : station === 2
      ? t.examPage.station2Name
      : t.examPage.station3Name;

  return (
    <div className="min-h-screen flex flex-col bg-[#f2f2f3] text-[#1d1f20]">
      <Navbar activePath="/zilli-sinav" />

      <main className="w-full pt-20 bg-[#f2f2f3]">
        {/* ================= SUB-HEADER TOOLBAR (Stitch 1:1) ================= */}
        <section className="w-full bg-[#ffffff] border-b border-[#dcdcdf]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d6ebff] text-[#1d1f20] text-[11px] font-bold uppercase tracking-wider font-archivo">
                <span className="w-2 h-2 rounded-full bg-[#5980a6]" />
                {t.examPage.subBadge}
              </span>
              <span className="text-[#b7b7ba] hidden sm:inline">/</span>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#416180]">
                  notifications_active
                </span>
                <span className="text-[14px] text-[#1d1f20] font-bold">
                  {t.examPage.subTitle}
                </span>
                <span className="text-[12px] text-[#5d5d60] hidden lg:inline">
                  • {t.examPage.subDesc}
                </span>
              </div>
            </div>

            {/* Quick Station Badges & Timer Simulation Indicator */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-[#ececee] px-2.5 py-1 rounded-lg text-[12px] text-[#416180]">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                <span className="font-bold font-data text-[#1d1f20]">{timeLeft}s</span>
                <span className="text-[#5d5d60]">{t.examPage.osceBellCountdown}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#ececee] px-2.5 py-1 rounded-lg text-[12px] text-[#1d1f20]">
                <span className="material-symbols-outlined text-[16px] text-[#416180]">school</span>
                <span className="font-semibold">{language === "tr" ? "Latince cevap" : "Latin answers"}</span>
              </div>
              <div className="hidden xl:flex items-center gap-1 text-[12px] bg-[#dcdcdf] px-2.5 py-1 rounded-lg text-[#1d1f20] font-semibold">
                <span>{t.examPage.station} {station}/3:</span>
                <span className="text-[#416180]">
                  {stationNameLabel}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SHOWCASE HERO & DUAL SPLIT (Stitch 1:1) ================= */}
        <section className="w-full py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
            {/* LEFT & CENTER: 3D Cadaver Table Interactive Showcase HUD */}
            <div className="w-full lg:w-7/12 flex flex-col gap-4">
              {/* Viewport Outer Frame */}
              <div className="relative w-full h-[420px] sm:h-[520px] lg:h-[620px] rounded-[14px] bg-stage border border-[#dcdcdf] overflow-hidden flex flex-col justify-between">
                {/* Real 3D Cadaver Simulator Canvas with Dissection Table and Pins */}
                <div className="absolute inset-0 w-full h-full">
                  <CadaverExamSimulator3D
                    station={station}
                    onStationChange={handleStationChange}
                    activePin={activePin}
                    onSelectPin={setActivePin}
                  />
                </div>

                {/* Top HUD Layer */}
                <div className="relative z-10 flex items-start justify-between gap-2 sm:gap-4 pointer-events-none p-3 sm:p-4">
                  <div className="flex flex-col gap-1.5 sm:gap-2 max-w-[calc(100%-110px)] sm:max-w-none">
                    <div className="pointer-events-auto bg-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-[10px] border border-[#dcdcdf] flex items-center gap-2">
                      <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#b8494b] shrink-0" />
                      <div className="flex flex-col text-left truncate">
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                          <span className="text-[10px] sm:text-[11px] text-[#1d1f20] font-bold uppercase tracking-wider font-archivo truncate">
                            {t.examPage.station.toUpperCase()} {station}/3 • {stationNameLabel}
                          </span>
                          <span className="hidden sm:inline-block text-[9px] font-data font-semibold bg-[#ececee] text-[#416180] px-1.5 py-0.5 rounded border border-[#e3e3e6]">
                            {t.examPage.stainlessTable}
                          </span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-[#5d5d60] truncate">
                          {currentStationConfig.latinName} • {currentStationConfig.pins.length} {t.examPage.pins}
                        </span>
                      </div>
                    </div>

                    {/* Station Selection Pills with Explicit cursor-pointer */}
                    <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 bg-[#ffffff]/80 p-1 rounded-[10px] border border-[#dcdcdf] overflow-x-auto max-w-full scrollbar-none">
                      <button
                        type="button"
                        onClick={() => handleStationChange(1)}
                        className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] font-bold font-archivo uppercase transition-all whitespace-nowrap cursor-pointer ${
                          station === 1
                            ? "bg-[#416180] text-white"
                            : "text-[#5d5d60] hover:text-[#1d1f20] hover:bg-[#ececee]"
                        }`}
                      >
                        <span className="sm:hidden">{t.examPage.station} 1</span>
                        <span className="hidden sm:inline">{t.examPage.station} 1: {t.examPage.station1Name}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStationChange(2)}
                        className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] font-bold font-archivo uppercase transition-all whitespace-nowrap cursor-pointer ${
                          station === 2
                            ? "bg-[#416180] text-white"
                            : "text-[#5d5d60] hover:text-[#1d1f20] hover:bg-[#ececee]"
                        }`}
                      >
                        <span className="sm:hidden">{t.examPage.station} 2</span>
                        <span className="hidden sm:inline">{t.examPage.station} 2: {t.examPage.station2Name}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStationChange(3)}
                        className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] font-bold font-archivo uppercase transition-all whitespace-nowrap cursor-pointer ${
                          station === 3
                            ? "bg-[#416180] text-white"
                            : "text-[#5d5d60] hover:text-[#1d1f20] hover:bg-[#ececee]"
                        }`}
                      >
                        <span className="sm:hidden">{t.examPage.station} 3</span>
                        <span className="hidden sm:inline">{t.examPage.station} 3: {t.examPage.station3Name}</span>
                      </button>
                    </div>
                  </div>

                  {/* Dynamic 45-Second Bell Countdown Prototype HUD */}
                  <div className="pointer-events-auto bg-white px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-[10px] border border-[#dcdcdf] flex items-center gap-2 sm:gap-3 shrink-0">
                    <div className="relative flex items-center justify-center">
                      <svg className="w-8 sm:w-10 h-8 sm:h-10 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-[#d4d4d7]"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          className="text-[#b8494b]"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeDasharray={`${(timeLeft / 45) * 100}, 100`}
                          strokeLinecap="round"
                          strokeWidth="3"
                        />
                      </svg>
                      <span className="absolute text-[11px] font-data font-bold text-[#1d1f20]">
                        {timeLeft}s
                      </span>
                    </div>
                    <div className="hidden sm:flex flex-col text-left">
                      <span className="text-[11px] text-[#b8494b] font-bold flex items-center gap-1 font-archivo uppercase">
                        <span className="material-symbols-outlined text-[14px]">notifications</span>
                        {t.examPage.osceBellCountdown}
                      </span>
                      <span className="text-[10px] text-[#5d5d60]">{t.examPage.secondsLeft}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3D Vitrin Alt Açıklama & Kadavra Pin Kataloğu */}
              <div className="bg-[#ffffff] rounded-[14px] p-5 border border-[#dcdcdf] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[16px] text-[#1d1f20] font-bold font-archivo">
                    {stationNameLabel} • {t.examPage.activePinBadge}
                  </span>
                  <span className="text-[11px] text-[#416180] bg-[#dcdcdf] px-2.5 py-1 rounded font-semibold font-data">
                    {currentStationConfig.pins.length} {t.examPage.pins} / 45s
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-1">
                  {currentStationConfig.pins.map((pin) => {
                    const isSelected = activePin === pin.number;
                    return (
                      <div
                        key={pin.number}
                        onClick={() => {
                          setActivePin(pin.number);
                          setIsAnswerCorrect(null);
                        }}
                        className={`p-3 rounded-[10px] border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "bg-[#ececee] border-[#5980a6] scale-[1.02]"
                            : "bg-[#f2f2f3] hover:bg-[#ececee] border-[#dcdcdf]"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-bold flex items-center gap-1.5" style={{ color: pin.color }}>
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pin.color }} />
                            Pin #{pin.number}
                          </span>
                        </div>
                        <span className="text-[13px] text-[#1d1f20] font-bold leading-tight">
                          {pin.label.replace(/Pin #\d:\s*/, "")}
                        </span>
                        <span className="text-[11px] text-[#5d5d60] mt-1 font-data text-[10px] truncate">
                          {pin.latin}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Interactive Instant Answer Test Box */}
                <div className="mt-2 pt-3 border-t border-[#dcdcdf] flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => {
                      setUserAnswer(e.target.value);
                      setIsAnswerCorrect(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCheckAnswer();
                      }
                    }}
                    placeholder={
                      language === "tr"
                        ? `Pin #${activePin} için Latince terim yazın (örn: ${currentPin.latin.split(/[\s(]/)[0]})...`
                        : `Type Latin name for Pin #${activePin} (e.g. ${currentPin.latin.split(/[\s(]/)[0]})...`
                    }
                    className="flex-1 w-full bg-[#f2f2f3] text-[#1d1f20] px-3.5 py-2 rounded-[10px] text-[13px] border border-[#e3e3e6] focus:outline-none focus:ring-2 focus:ring-[#5980a6]"
                  />
                  <button
                    type="button"
                    onClick={handleCheckAnswer}
                    className="w-full sm:w-auto px-5 py-2 rounded-[10px] bg-[#416180] text-white text-[13px] font-semibold hover:bg-[#2c455d] transition-all whitespace-nowrap cursor-pointer"
                  >
                    {t.examPage.checkAnswer}
                  </button>
                </div>
                {isAnswerCorrect === true && (
                  <p className="text-[12px] text-[#2e6a48] font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    {t.examPage.correctAlert} {currentPin.latin}.
                  </p>
                )}
                {isAnswerCorrect === false && (
                  <p className="text-[12px] text-[#b8494b] font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">cancel</span>
                    {t.examPage.wrongAlert} {t.examPage.correctAnswerWas} {currentPin.latin}.
                  </p>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Mobile App Bell Exam Prototype & Product Presentation */}
            <div className="w-full lg:w-5/12 flex flex-col gap-6">
              <div className="bg-[#ffffff] rounded-[14px] p-6 border border-[#dcdcdf] flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#416180] text-[24px]">
                      smartphone
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-[#416180] font-bold font-archivo">
                      {language === "tr" ? "Mobil Deneyim Vitrini" : "Mobile Experience Showcase"}
                    </span>
                  </div>
                  <h2 className="text-[28px] text-[#1d1f20] font-bold font-archivo leading-tight">
                    {language === "tr" ? "Zilli Sınav Masası Cebinizde" : "Cadaver Bell Exam in Your Pocket"}
                  </h2>
                  <p className="text-[14px] text-[#5d5d60] leading-relaxed">
                    {language === "tr"
                      ? "Uygulamada her istasyon çelik masada duran bir bölge ya da organ preparatıdır. Numaralı iğnelerin gösterdiği yapıların Latince adını süre bitmeden yazarsınız."
                      : "In the app every station is a region or organ specimen on a steel table. You type the Latin names of the structures the numbered needles point at before time runs out."}
                  </p>
                </div>

                {/* iPhone Device Frame with real app screenshot */}
                <div className="flex justify-center py-2">
                  <IPhoneFrame
                    screenSrc="/screens/exam.webp"
                    altText={language === "tr" ? "Anatomi 3D Zilli Sınav Masası Mobil Ekranı" : "Anatomy 3D Bell Exam Mobile Screen"}
                    caption={language === "tr" ? "Uygulamada bir istasyon: göğüs, 5 iğne" : "A station in the app: the thorax, 5 needles"}
                  />
                </div>

                {/* Step-by-Step Exam Mechanics Workflow */}
                <div className="flex flex-col gap-3.5 pt-2 border-t border-[#dcdcdf]">
                  <h3 className="text-[12px] text-[#1d1f20] font-bold uppercase tracking-wider font-archivo">
                    {language === "tr" ? "Mekanik Nasıl İşliyor?" : "How Does the Simulator Work?"}
                  </h3>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#d6ebff] text-[#1d1f20] flex items-center justify-center text-[11px] font-bold font-data shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-[#1d1f20] font-bold">
                        {language === "tr" ? "Süre başlar (20–60 sn)" : "The clock starts (20–60 s)"}
                      </span>
                      <span className="text-[12px] text-[#5d5d60]">
                        {language === "tr"
                          ? "Kadavra masası açılır, geri sayım başlar. İki parmakla dokunarak 3D modeli serbestçe çevirirsiniz."
                          : "The cadaver station opens, countdown begins. Orbit and zoom the 3D model freely above the table."}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#d6ebff] text-[#1d1f20] flex items-center justify-center text-[11px] font-bold font-data shrink-0 mt-0.5">
                      2
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-[#1d1f20] font-bold">
                        {language === "tr" ? "İğneli Yapıları Teşhis Et" : "Spot the Pinned Structures"}
                      </span>
                      <span className="text-[12px] text-[#5d5d60]">
                        {language === "tr"
                          ? "Dokudaki renkli iğnelere (Pin 1-5) dokunarak arter, sinir veya foramen sınırlarını incelersiniz."
                          : "Inspect colored pins in the specimen to evaluate arteries, nerves, or foraminal boundaries."}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#d6ebff] text-[#1d1f20] flex items-center justify-center text-[11px] font-bold font-data shrink-0 mt-0.5">
                      3
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-[#1d1f20] font-bold">
                        {language === "tr" ? "Latince adı yaz" : "Type the Latin name"}
                      </span>
                      <span className="text-[12px] text-[#5d5d60]">
                        {language === "tr"
                          ? "Yapının Latince adını yazarsınız."
                          : "You type the Latin name of the structure."}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#d6ebff] text-[#1d1f20] flex items-center justify-center text-[11px] font-bold font-data shrink-0 mt-0.5">
                      4
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-[#1d1f20] font-bold">
                        {language === "tr" ? "Zil Çalınca Sonraki Masaya Geç" : "Bell Rings, Rotate to Next Station"}
                      </span>
                      <span className="text-[12px] text-[#5d5d60]">
                        {language === "tr"
                          ? "Süre dolduğunda otomatik rotasyon başlar. Tüm komite boyunca gerçek anatomi salonu deneyimi yaşarsınız."
                          : "When time expires, rotation shifts automatically to simulate the actual anatomy lab practical."}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/topluluk-ve-indir"
                    className="group inline-flex items-center gap-2 font-archivo font-semibold uppercase tracking-wide text-[15px] text-accent-700 hover:text-ink transition-colors"
                  >
                    {language === "tr" ? "Uygulama hakkında" : "About the app"}
                    <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1" aria-hidden>
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The exam in the app: its real settings and rules (SPOT_EXAM_RULES in the app). */}
        <section className="w-full border-t border-line">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <span className="kicker">{language === "tr" ? "Uygulamadaki sınav" : "The exam in the app"}</span>
              <h2 className="mt-3 font-archivo font-semibold text-ink text-[36px] sm:text-[44px] leading-[1.02]">
                {language === "tr" ? "Sınavı siz kurarsınız" : "You set the exam up"}
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
                {language === "tr"
                  ? "Yukarıdaki sahne bir tanıtımdır. Uygulamadaki zilli sınavda her istasyon, çelik masada duran bir bölge ya da organ preparatıdır; üzerindeki iğneler numaralıdır."
                  : "The scene above is a demonstration. In the app's spot exam every station is a region or organ specimen on a steel table, with numbered needles in it."}
              </p>
            </div>

            <dl className="lg:col-span-8 border-t border-line">
              {(language === "tr"
                ? [
                    ["İstasyon sayısı", "1 – 10"],
                    ["İstasyon başına süre", "20 – 60 saniye"],
                    ["İstasyon başına iğne", "5 – 10"],
                    ["Zorluk", "Kolay · Normal · Zor"],
                    ["Masalar", "Karışık ya da sizin seçtiğiniz bölge ve organlar"],
                    ["Cevap", "Latince; kelime kelime değerlendirilir"],
                  ]
                : [
                    ["Stations", "1 – 10"],
                    ["Time per station", "20 – 60 seconds"],
                    ["Needles per station", "5 – 10"],
                    ["Difficulty", "Easy · Normal · Hard"],
                    ["Tables", "Mixed, or the regions and organs you pick"],
                    ["Answer", "In Latin; graded word by word"],
                  ]
              ).map(([k, v]) => (
                <div key={k} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-x-6 py-4 border-b border-line items-baseline">
                  <dt className="text-[15px] text-ink-soft">{k}</dt>
                  <dd className="font-archivo font-semibold text-ink text-[22px] leading-tight">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="w-full border-t border-line">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-16 lg:py-20">
            <div className="max-w-2xl">
              <span className="kicker">{language === "tr" ? "Kurallar" : "Rules"}</span>
              <h2 className="mt-3 font-archivo font-semibold text-ink text-[36px] sm:text-[44px] leading-[1.02]">
                {language === "tr" ? "Zil çalınca ne olur?" : "What happens when the bell rings"}
              </h2>
            </div>
            <ol className="mt-10 grid grid-cols-1 md:grid-cols-3 border-t border-line">
              {(language === "tr"
                ? [
                    ["Süre biter, istasyon kapanır", "Zil çaldığında yazdıklarınız kilitlenir ve sıradaki masa kendiliğinden açılır. Erken geçiş yoktur."],
                    ["Derindeki yapılar da sorulur", "İğnenin gösterdiği yapıyı örten parçalar kaldırılmış olarak gelir; zorluk arttıkça iğneler daha derine iner."],
                    ["Sonuçta her iğne tek tek", "Yazdığınız Latince ad doğru, eksik ve fazla kelimeleriyle gösterilir; yanında tam ad ve Türkçesi yer alır."],
                  ]
                : [
                    ["Time is up, the station closes", "When the bell rings your answers lock and the next table opens by itself. There is no skipping ahead."],
                    ["Deep structures are asked too", "Whatever covers the marked structure comes already removed; the harder the level, the deeper the needles go."],
                    ["Every needle in the results", "Your Latin answer is shown with its correct, missing and extra words, next to the full name and its translation."],
                  ]
              ).map(([title, body], i) => (
                <li
                  key={title}
                  className={`pt-6 pb-8 md:pb-0 ${i > 0 ? "md:pl-8 md:border-l border-line" : ""} ${i < 2 ? "md:pr-8 border-b md:border-b-0 border-line" : ""}`}
                >
                  <span className="font-archivo font-semibold text-accent-700 text-[15px] font-data">0{i + 1}</span>
                  <h3 className="mt-2 font-archivo font-semibold text-ink text-[24px] leading-tight">{title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{body}</p>
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
