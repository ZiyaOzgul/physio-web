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
      <div className="w-full h-full min-h-[520px] rounded-2xl bg-[#0a1926] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-rose-500/20 border-t-rose-500 animate-spin" />
          <span className="font-mono text-xs text-rose-300 tracking-wider font-semibold">
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
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      <Navbar activePath="/zilli-sinav" />

      <main className="w-full pt-20 bg-[#f8f9ff]">
        {/* ================= SUB-HEADER TOOLBAR (Stitch 1:1) ================= */}
        <section className="w-full bg-[#ffffff] border-b border-[#e5eeff] shadow-sm">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9e6ff] text-[#003752] text-[11px] font-bold uppercase tracking-wider font-archivo">
                <span className="w-2 h-2 rounded-full bg-[#006591] animate-pulse" />
                {t.examPage.subBadge}
              </span>
              <span className="text-[#c1c7ce] hidden sm:inline">/</span>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#006591]">
                  notifications_active
                </span>
                <span className="text-[14px] text-[#003752] font-bold">
                  {t.examPage.subTitle}
                </span>
                <span className="text-[12px] text-[#41474d] hidden lg:inline">
                  • {t.examPage.subDesc}
                </span>
              </div>
            </div>

            {/* Quick Station Badges & Timer Simulation Indicator */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-[#eff4ff] px-2.5 py-1 rounded-lg text-[12px] text-[#006591]">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                <span className="font-bold font-mono text-[#003752]">{timeLeft}s</span>
                <span className="text-[#41474d]">{t.examPage.osceBellCountdown}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#eff4ff] px-2.5 py-1 rounded-lg text-[12px] text-[#003752]">
                <span className="material-symbols-outlined text-[16px] text-[#006591]">school</span>
                <span className="font-semibold">{language === "tr" ? "TA2 Uyumlu" : "TA2 Compliant"}</span>
              </div>
              <div className="hidden xl:flex items-center gap-1 text-[12px] bg-[#e5eeff] px-2.5 py-1 rounded-lg text-[#003752] font-semibold">
                <span>{t.examPage.station} {station}/3:</span>
                <span className="text-[#006591]">
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
              <div className="relative w-full h-[420px] sm:h-[520px] lg:h-[620px] rounded-2xl bg-[#0a1926] border border-[#e5eeff] overflow-hidden shadow-md flex flex-col justify-between">
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
                    <div className="pointer-events-auto bg-[#ffffff]/95 backdrop-blur-md px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl shadow-sm border border-[#e5eeff] flex items-center gap-2">
                      <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#ba1a1a] animate-ping shrink-0" />
                      <div className="flex flex-col text-left truncate">
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                          <span className="text-[10px] sm:text-[11px] text-[#003752] font-bold uppercase tracking-wider font-archivo truncate">
                            {t.examPage.station.toUpperCase()} {station}/3 • {stationNameLabel}
                          </span>
                          <span className="hidden sm:inline-block text-[9px] font-mono font-semibold bg-[#eff4ff] text-[#006591] px-1.5 py-0.5 rounded border border-[#dce9ff]">
                            {t.examPage.stainlessTable}
                          </span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-[#41474d] truncate">
                          {currentStationConfig.latinName} • {currentStationConfig.pins.length} {t.examPage.pins}
                        </span>
                      </div>
                    </div>

                    {/* Station Selection Pills with Explicit cursor-pointer */}
                    <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 bg-[#ffffff]/80 backdrop-blur-sm p-1 rounded-xl shadow-sm border border-[#e5eeff] overflow-x-auto max-w-full scrollbar-none">
                      <button
                        type="button"
                        onClick={() => handleStationChange(1)}
                        className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] font-bold font-archivo uppercase transition-all whitespace-nowrap cursor-pointer ${
                          station === 1
                            ? "bg-[#003752] text-white shadow-xs"
                            : "text-[#41474d] hover:text-[#003752] hover:bg-[#eff4ff]"
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
                            ? "bg-[#003752] text-white shadow-xs"
                            : "text-[#41474d] hover:text-[#003752] hover:bg-[#eff4ff]"
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
                            ? "bg-[#003752] text-white shadow-xs"
                            : "text-[#41474d] hover:text-[#003752] hover:bg-[#eff4ff]"
                        }`}
                      >
                        <span className="sm:hidden">{t.examPage.station} 3</span>
                        <span className="hidden sm:inline">{t.examPage.station} 3: {t.examPage.station3Name}</span>
                      </button>
                    </div>
                  </div>

                  {/* Dynamic 45-Second Bell Countdown Prototype HUD */}
                  <div className="pointer-events-auto bg-[#ffffff]/90 backdrop-blur-md px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-sm border border-[#e5eeff] flex items-center gap-2 sm:gap-3 shrink-0">
                    <div className="relative flex items-center justify-center">
                      <svg className="w-8 sm:w-10 h-8 sm:h-10 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-[#d3e4fe]"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          className="text-[#ba1a1a]"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeDasharray={`${(timeLeft / 45) * 100}, 100`}
                          strokeLinecap="round"
                          strokeWidth="3"
                        />
                      </svg>
                      <span className="absolute text-[11px] font-mono font-bold text-[#0b1c30]">
                        {timeLeft}s
                      </span>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[11px] text-[#ba1a1a] font-bold flex items-center gap-1 font-archivo uppercase">
                        <span className="material-symbols-outlined text-[14px]">notifications</span>
                        {t.examPage.osceBellCountdown}
                      </span>
                      <span className="text-[10px] text-[#41474d]">{t.examPage.secondsLeft}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3D Vitrin Alt Açıklama & Kadavra Pin Kataloğu */}
              <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e5eeff] shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[16px] text-[#003752] font-bold font-archivo">
                    {stationNameLabel} • {t.examPage.activePinBadge}
                  </span>
                  <span className="text-[11px] text-[#006591] bg-[#e5eeff] px-2.5 py-1 rounded font-semibold font-mono">
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
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "bg-[#eff4ff] border-[#006591] shadow-sm scale-[1.02]"
                            : "bg-[#f8f9ff] hover:bg-[#eff4ff] border-[#e5eeff]"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-bold flex items-center gap-1.5" style={{ color: pin.color }}>
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pin.color }} />
                            Pin #{pin.number}
                          </span>
                          <span className="font-mono text-[9px] text-[#72787e] bg-white px-1.5 py-0.5 rounded border border-[#e5eeff]">
                            {pin.ta2}
                          </span>
                        </div>
                        <span className="text-[13px] text-[#003752] font-bold leading-tight">
                          {pin.label.replace(/Pin #\d:\s*/, "")}
                        </span>
                        <span className="text-[11px] text-[#41474d] mt-1 font-mono text-[10px] truncate">
                          {pin.latin}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Interactive Instant Answer Test Box */}
                <div className="mt-2 pt-3 border-t border-[#e5eeff] flex flex-col sm:flex-row items-center gap-3">
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
                    className="flex-1 w-full bg-[#f8f9ff] text-[#0b1c30] px-3.5 py-2 rounded-xl text-[13px] border border-[#dce9ff] focus:outline-none focus:ring-2 focus:ring-[#006591]"
                  />
                  <button
                    type="button"
                    onClick={handleCheckAnswer}
                    className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#003752] text-white text-[13px] font-semibold hover:bg-[#1f4e6b] transition-all whitespace-nowrap shadow-sm cursor-pointer"
                  >
                    {t.examPage.checkAnswer}
                  </button>
                </div>
                {isAnswerCorrect === true && (
                  <p className="text-[12px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    {t.examPage.correctAlert} {currentPin.latin} ({currentPin.ta2}). +10 XP!
                  </p>
                )}
                {isAnswerCorrect === false && (
                  <p className="text-[12px] text-[#ba1a1a] font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">cancel</span>
                    {t.examPage.wrongAlert} {t.examPage.correctAnswerWas} {currentPin.latin}.
                  </p>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Mobile App Bell Exam Prototype & Product Presentation */}
            <div className="w-full lg:w-5/12 flex flex-col gap-6">
              <div className="bg-[#ffffff] rounded-2xl p-6 border border-[#e5eeff] shadow-sm flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006591] text-[24px]">
                      smartphone
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-[#006591] font-bold font-archivo">
                      {language === "tr" ? "Mobil Deneyim Vitrini" : "Mobile Experience Showcase"}
                    </span>
                  </div>
                  <h2 className="text-[28px] text-[#003752] font-bold font-archivo leading-tight">
                    {language === "tr" ? "Zilli Sınav Masası Cebinizde" : "Cadaver Bell Exam in Your Pocket"}
                  </h2>
                  <p className="text-[14px] text-[#41474d] leading-relaxed">
                    {language === "tr"
                      ? "Tıp fakültesi kadavra salonundaki o meşhur zil sesini, süre stresini ve pin teşhisini Anatomi 3D mobil uygulamasıyla dilediğiniz her an gerçeğe birebir simüle edin."
                      : "Simulate medical school cadaver lab practical exams with authentic 45-second bells, timed pressure, and milimetric pins on your phone anytime."}
                  </p>
                </div>

                {/* iPhone Device Frame with real app screenshot */}
                <div className="flex justify-center py-2">
                  <IPhoneFrame
                    screenSrc="/screens/exam-phone.png"
                    altText={language === "tr" ? "Anatomi 3D Zilli Sınav Masası Mobil Ekranı" : "Anatomy 3D Bell Exam Mobile Screen"}
                    caption={language === "tr" ? "Masa #01: Abdomen Regio • 45s Zil" : "Station #01: Abdomen Regio • 45s Bell"}
                  />
                </div>

                {/* Step-by-Step Exam Mechanics Workflow */}
                <div className="flex flex-col gap-3.5 pt-2 border-t border-[#e5eeff]">
                  <h3 className="text-[12px] text-[#003752] font-bold uppercase tracking-wider font-archivo">
                    {language === "tr" ? "Mekanik Nasıl İşliyor?" : "How Does the Simulator Work?"}
                  </h3>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#c9e6ff] text-[#003752] flex items-center justify-center text-[11px] font-bold font-mono shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-[#003752] font-bold">
                        {language === "tr" ? "45 Saniyelik Zil Çalar" : "45-Second Bell Rings"}
                      </span>
                      <span className="text-[12px] text-[#41474d]">
                        {language === "tr"
                          ? "Kadavra masası açılır, geri sayım başlar. İki parmakla dokunarak 3D modeli serbestçe çevirirsiniz."
                          : "The cadaver station opens, countdown begins. Orbit and zoom the 3D model freely above the table."}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#c9e6ff] text-[#003752] flex items-center justify-center text-[11px] font-bold font-mono shrink-0 mt-0.5">
                      2
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-[#003752] font-bold">
                        {language === "tr" ? "İğneli Yapıları Teşhis Et" : "Spot the Pinned Structures"}
                      </span>
                      <span className="text-[12px] text-[#41474d]">
                        {language === "tr"
                          ? "Dokudaki renkli iğnelere (Pin 1-5) dokunarak arter, sinir veya foramen sınırlarını incelersiniz."
                          : "Inspect colored pins in the specimen to evaluate arteries, nerves, or foraminal boundaries."}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#c9e6ff] text-[#003752] flex items-center justify-center text-[11px] font-bold font-mono shrink-0 mt-0.5">
                      3
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-[#003752] font-bold">
                        {language === "tr" ? "Latince TA2 İsmini Gir" : "Enter Latin TA2 Term"}
                      </span>
                      <span className="text-[12px] text-[#41474d]">
                        {language === "tr"
                          ? "Klavyeden yazarak veya sesli dikte ile Terminologia Anatomica terimini yazıp anında doğrulama alırsınız."
                          : "Type or dictate the official Terminologia Anatomica term to get immediate OSCE feedback."}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#c9e6ff] text-[#003752] flex items-center justify-center text-[11px] font-bold font-mono shrink-0 mt-0.5">
                      4
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-[#003752] font-bold">
                        {language === "tr" ? "Zil Çalınca Sonraki Masaya Geç" : "Bell Rings, Rotate to Next Station"}
                      </span>
                      <span className="text-[12px] text-[#41474d]">
                        {language === "tr"
                          ? "Süre dolduğunda otomatik rotasyon başlar. Tüm komite boyunca gerçek anatomi salonu deneyimi yaşarsınız."
                          : "When time expires, rotation shifts automatically to simulate the actual anatomy lab practical."}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct App Store CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/topluluk-ve-indir"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#003752] text-white hover:bg-[#1f4e6b] text-[13px] font-semibold transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[20px]">phone_iphone</span>
                    <span>{language === "tr" ? "iOS için İndir" : "Download for iOS"}</span>
                  </Link>
                  <Link
                    href="/topluluk-ve-indir"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#006591] text-white hover:bg-[#004c6e] text-[13px] font-semibold transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[20px]">android</span>
                    <span>{language === "tr" ? "Android için İndir" : "Download for Android"}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PEDAGOJİK VE KLİNİK DERİNLİK (Stitch 1:1) ================= */}
        <section className="w-full bg-[#eff4ff] py-16 px-6 lg:px-12 border-t border-[#dce9ff]">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-2 max-w-2xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#006591] font-archivo">
                  {language === "tr" ? "Pedagojik ve Klinik Yaklaşım" : "Pedagogical & Clinical Approach"}
                </span>
                <h2 className="text-[32px] text-[#003752] font-bold font-archivo">
                  {language === "tr"
                    ? "Zilli Sınav Neden Tıp Öğrencileri İçin Hayatidir?"
                    : "Why is the Timed Bell Exam Vital for Medical Students?"}
                </h2>
                <p className="text-[14px] text-[#41474d] leading-relaxed">
                  {language === "tr"
                    ? "Tıp fakültesi pratik komite sınavlarında öğrencilerin %68'i teorik bilgiden değil; süre kısıtı, kadavradaki oryantasyon kaybı ve Latince imla hataları sebebiyle puan kaybeder."
                    : "In medical board practicals, 68% of lost points are due to time panic, spatial disorientation on real cadavers, and minor Latin spelling mistakes—not lack of knowledge."}
                </p>
              </div>
              <div className="flex items-center gap-2 bg-[#ffffff] px-4 py-2.5 rounded-xl shadow-sm border border-[#e5eeff] shrink-0">
                <span className="material-symbols-outlined text-[#006591] text-[22px]">
                  verified_user
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-[12px] text-[#003752] font-bold">
                    Hacettepe, Cerrahpaşa & Ege
                  </span>
                  <span className="text-[11px] text-[#41474d]">
                    {language === "tr" ? "Müfredat Uyarlamalı Protokol" : "Curriculum-Aligned Protocol"}
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Pedagogical Benefit Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#ffffff] p-6 rounded-2xl border border-[#e5eeff] shadow-sm flex flex-col gap-3 cursor-pointer hover:scale-[1.03] hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#ffdada] text-[#6d001c] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">hourglass_bottom</span>
                </div>
                <h3 className="text-[18px] text-[#003752] font-bold font-archivo">
                  {language === "tr" ? "Süre Baskısını Sıfırlama" : "Eliminating Time Pressure"}
                </h3>
                <p className="text-[13px] text-[#41474d] leading-relaxed">
                  {language === "tr"
                    ? "Her masada çalan 45 saniyelik zili yüzlerce kez simüle ederek panik refleksini ortadan kaldırır, serinkanlı klinik odak geliştirir."
                    : "Simulating 45-second bells hundreds of times conditions you against panic reflexes, instilling calm clinical precision."}
                </p>
              </div>

              <div className="bg-[#ffffff] p-6 rounded-2xl border border-[#e5eeff] shadow-sm flex flex-col gap-3 cursor-pointer hover:scale-[1.03] hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#c9e6ff] text-[#006591] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">screen_rotation</span>
                </div>
                <h3 className="text-[18px] text-[#003752] font-bold font-archivo">
                  {language === "tr" ? "Kadavrada 3 Boyutlu Yön Duygusu" : "3D Cadaver Spatial Sense"}
                </h3>
                <p className="text-[13px] text-[#41474d] leading-relaxed">
                  {language === "tr"
                    ? "Kitap sayfalarındaki iki boyutlu illüstrasyonlar yerine, gerçek bir kadavra masasında eğilip sağdan, soldan ve derinden bakma yetisi kazandırır."
                    : "Replaces 2D textbook drawings with real table viewpoints—look from above, below, anterior, posterior and cross-sectionally."}
                </p>
              </div>

              <div className="bg-[#ffffff] p-6 rounded-2xl border border-[#e5eeff] shadow-sm flex flex-col gap-3 cursor-pointer hover:scale-[1.03] hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#c9e6ff] text-[#003752] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">spellcheck</span>
                </div>
                <h3 className="text-[18px] text-[#003752] font-bold font-archivo">
                  Terminologia Anatomica (TA2)
                </h3>
                <p className="text-[13px] text-[#41474d] leading-relaxed">
                  {language === "tr"
                    ? "Hocaların puan kırdığı Latince tek harf imla kusurlarını akıllı klinik otomatik tamamlama motoruyla hafızanıza kazır."
                    : "Locks strict Latin nomenclature into memory, avoiding the single-letter typos professors penalize in practical grading."}
                </p>
              </div>

              <div className="bg-[#ffffff] p-6 rounded-2xl border border-[#e5eeff] shadow-sm flex flex-col gap-3 cursor-pointer hover:scale-[1.03] hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#dce9ff] text-[#003752] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">troubleshoot</span>
                </div>
                <h3 className="text-[18px] text-[#003752] font-bold font-archivo">
                  {language === "tr" ? "İğne Komşuluğu Teşhisi" : "Pin Proximity Spotting"}
                </h3>
                <p className="text-[13px] text-[#41474d] leading-relaxed">
                  {language === "tr"
                    ? "İğnenin batırıldığı dokunun sadece adını değil, altından geçen siniri veya besleyen arter dalını saniyeler içinde analiz etmenizi sağlar."
                    : "Teaches you to spot not only the pinned fascia, but the underlying nerve branch or supplying vessel in seconds."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= COMMITTEE MODULES GRID (Stitch 1:1) ================= */}
        <section className="w-full py-16 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#006591] font-archivo">
                {language === "tr" ? "Tıp Fakültesi Komite Müfredatı" : "Medical School Block Curriculum"}
              </span>
              <h2 className="text-[32px] text-[#003752] font-bold font-archivo">
                {language === "tr" ? "Mobil Uygulamada Yer Alan Zilli Sınav Masaları" : "Bell Exam Stations in the Mobile App"}
              </h2>
              <p className="text-[14px] text-[#41474d] max-w-3xl leading-relaxed">
                {language === "tr"
                  ? "Tıp fakültesi 1, 2 ve 3. sınıfların tüm dönem komiteleri için ayrılmış, üniversite laboratuvarlarındaki gerçek kadavraların yüksek çözünürlüklü 3D modelleri."
                  : "Dedicated stations covering Year 1, 2 and 3 curriculum blocks with high-resolution 3D models matching actual cadaver lab specimens."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Table 1: Bone & Locomotor */}
              <div
                onClick={() => {
                  handleStationChange(2);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-[#ffffff] p-5 rounded-2xl border border-[#e5eeff] shadow-sm flex flex-col justify-between gap-4 cursor-pointer hover:scale-[1.03] hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#eff4ff] text-[#003752] text-[10px] font-bold font-archivo">
                      {language === "tr" ? "KOMİTE I" : "BLOCK I"}
                    </span>
                    <span className="font-mono text-[11px] text-[#006591] font-semibold">{language === "tr" ? "30 Masa" : "30 Stations"}</span>
                  </div>
                  <h3 className="text-[17px] text-[#003752] font-bold font-archivo">
                    {language === "tr" ? "Lokomotor & Kemik Masası" : "Locomotor & Bone Table"}
                  </h3>
                  <p className="text-[12px] text-[#41474d] leading-relaxed">
                    Tuberculum majus, sulcus intertubercularis, foramen obturatum et articulares.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#f0f4f9] flex items-center justify-between text-[11px] text-[#006591] font-semibold">
                  <span>{language === "tr" ? "Dönem 1 • 120 İğne Noktası" : "Year 1 • 120 Pins"}</span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </div>
              </div>

              {/* Table 2: Thorax & Heart */}
              <div
                onClick={() => {
                  handleStationChange(1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-[#ffffff] p-5 rounded-2xl border border-[#e5eeff] shadow-sm flex flex-col justify-between gap-4 cursor-pointer hover:scale-[1.03] hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#c9e6ff] text-[#006591] text-[10px] font-bold font-archivo">
                      {language === "tr" ? "KOMİTE II" : "BLOCK II"}
                    </span>
                    <span className="font-mono text-[11px] text-[#006591] font-semibold">{language === "tr" ? "40 Masa" : "40 Stations"}</span>
                  </div>
                  <h3 className="text-[17px] text-[#003752] font-bold font-archivo">
                    {language === "tr" ? "Toraks & Kalp Masası" : "Thorax & Cardia Table"}
                  </h3>
                  <p className="text-[12px] text-[#41474d] leading-relaxed">
                    Truncus pulmonalis, valvula tricuspidalis, sulcus coronarius et mediastinum.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#f0f4f9] flex items-center justify-between text-[11px] text-[#006591] font-semibold">
                  <span>{language === "tr" ? "Dönem 2 • 180 İğne Noktası" : "Year 2 • 180 Pins"}</span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </div>
              </div>

              {/* Table 3: Neuro & Skull */}
              <div
                onClick={() => {
                  handleStationChange(3);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-[#ffffff] p-5 rounded-2xl border border-[#e5eeff] shadow-sm flex flex-col justify-between gap-4 cursor-pointer hover:scale-[1.03] hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#c9e6ff] text-[#003752] text-[10px] font-bold font-archivo">
                      {language === "tr" ? "KOMİTE III" : "BLOCK III"}
                    </span>
                    <span className="font-mono text-[11px] text-[#006591] font-semibold">{language === "tr" ? "55 Masa" : "55 Stations"}</span>
                  </div>
                  <h3 className="text-[17px] text-[#003752] font-bold font-archivo">
                    {language === "tr" ? "Nöroanatomi & Foramenler" : "Neuroanatomy & Foramina"}
                  </h3>
                  <p className="text-[12px] text-[#41474d] leading-relaxed">
                    Fissura orbitalis superior, Circulus arteriosus cerebri, ventriculus quartus.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#f0f4f9] flex items-center justify-between text-[11px] text-[#006591] font-semibold">
                  <span>{language === "tr" ? "Dönem 2 • 220 İğne Noktası" : "Year 2 • 220 Pins"}</span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </div>
              </div>

              {/* Table 4: Visceral & Abdomen */}
              <div
                onClick={() => {
                  handleStationChange(1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-[#ffffff] p-5 rounded-2xl border border-[#e5eeff] shadow-sm flex flex-col justify-between gap-4 cursor-pointer hover:scale-[1.03] hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#ffdada] text-[#6d001c] text-[10px] font-bold font-archivo">
                      {language === "tr" ? "KOMİTE IV" : "BLOCK IV"}
                    </span>
                    <span className="font-mono text-[11px] text-[#006591] font-semibold">{language === "tr" ? "45 Masa" : "45 Stations"}</span>
                  </div>
                  <h3 className="text-[17px] text-[#003752] font-bold font-archivo">
                    {language === "tr" ? "Abdomen & Retroperiton" : "Abdomen & Retroperitoneum"}
                  </h3>
                  <p className="text-[12px] text-[#41474d] leading-relaxed">
                    Truncus coeliacus, ductus choledochus, lig. hepatoduodenale et omentum minus.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#f0f4f9] flex items-center justify-between text-[11px] text-[#006591] font-semibold">
                  <span>{language === "tr" ? "Dönem 3 • 160 İğne Noktası" : "Year 3 • 160 Pins"}</span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
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
