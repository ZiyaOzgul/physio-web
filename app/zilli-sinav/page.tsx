"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IPhoneFrame from "@/components/IPhoneFrame";

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

    if (matched || clean.length > 3 && (pinName.includes(clean) || pinLabel.includes(clean))) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }
  };

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
                Mobil Uygulama Özelliği • Canlı 3D Vitrin
              </span>
              <span className="text-[#c1c7ce] hidden sm:inline">/</span>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#006591]">
                  notifications_active
                </span>
                <span className="text-[14px] text-[#003752] font-bold">
                  Kadavra Pratik Simülatörü
                </span>
                <span className="text-[12px] text-[#41474d] hidden lg:inline">
                  • Zilli Sınav Masası Tanıtım Vitrini
                </span>
              </div>
            </div>

            {/* Quick Station Badges & Timer Simulation Indicator */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-[#eff4ff] px-2.5 py-1 rounded-lg text-[12px] text-[#006591]">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                <span className="font-bold font-mono text-[#003752]">{timeLeft}s</span>
                <span className="text-[#41474d]">Rotasyon Sayacı</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#eff4ff] px-2.5 py-1 rounded-lg text-[12px] text-[#003752]">
                <span className="material-symbols-outlined text-[16px] text-[#006591]">school</span>
                <span className="font-semibold">TA2 Uyumlu</span>
              </div>
              <div className="hidden xl:flex items-center gap-1 text-[12px] bg-[#e5eeff] px-2.5 py-1 rounded-lg text-[#003752] font-semibold">
                <span>Masa {station}/3:</span>
                <span className="text-[#006591]">
                  {station === 1 ? "Toraks & Visseral" : station === 2 ? "Lokomotor & Kas" : "Nöro & Kranial"}
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
                            MASA {station}/3 • {currentStationConfig.name.replace(/Masa \d:\s*/, "")}
                          </span>
                          <span className="hidden sm:inline-block text-[9px] font-mono font-semibold bg-[#eff4ff] text-[#006591] px-1.5 py-0.5 rounded border border-[#dce9ff]">
                            Paslanmaz Kadavra Masası
                          </span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-[#41474d] truncate">
                          {currentStationConfig.latinName} • {currentStationConfig.pins.length} İğne
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
                        <span className="sm:hidden">Masa 1</span>
                        <span className="hidden sm:inline">Masa 1: Toraks & Visseral</span>
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
                        <span className="sm:hidden">Masa 2</span>
                        <span className="hidden sm:inline">Masa 2: Lokomotor & Kas</span>
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
                        <span className="sm:hidden">Masa 3</span>
                        <span className="hidden sm:inline">Masa 3: Nöro & Kranial</span>
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
                        ZİL SAYACI
                      </span>
                      <span className="text-[10px] text-[#41474d]">Süre bitiminde rotasyon</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3D Vitrin Alt Açıklama & Kadavra Pin Kataloğu */}
              <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e5eeff] shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[16px] text-[#003752] font-bold font-archivo">
                    {currentStationConfig.name} • Aktif İğne Listesi
                  </span>
                  <span className="text-[11px] text-[#006591] bg-[#e5eeff] px-2.5 py-1 rounded font-semibold font-mono">
                    {currentStationConfig.pins.length} İğne / 45 Sn Rotasyon
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
                    placeholder={`Pin #${activePin} için Latince terim yazın (örn: ${currentPin.latin.split(/[\s(]/)[0]})...`}
                    className="flex-1 w-full bg-[#f8f9ff] text-[#0b1c30] px-3.5 py-2 rounded-xl text-[13px] border border-[#dce9ff] focus:outline-none focus:ring-2 focus:ring-[#006591]"
                  />
                  <button
                    type="button"
                    onClick={handleCheckAnswer}
                    className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#003752] text-white text-[13px] font-semibold hover:bg-[#1f4e6b] transition-all whitespace-nowrap shadow-sm cursor-pointer"
                  >
                    Cevabı Kontrol Et
                  </button>
                </div>
                {isAnswerCorrect === true && (
                  <p className="text-[12px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Tebrikler! Doğru Terminologia Anatomica terimi: {currentPin.latin} ({currentPin.ta2}). +10 XP kazandınız!
                  </p>
                )}
                {isAnswerCorrect === false && (
                  <p className="text-[12px] text-[#ba1a1a] font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">cancel</span>
                    Yanıt eşleşmedi. Bu iğnenin resmi Latince terimi: {currentPin.latin}.
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
                      Mobil Deneyim Vitrini
                    </span>
                  </div>
                  <h2 className="text-[28px] text-[#003752] font-bold font-archivo leading-tight">
                    Zilli Sınav Masası Cebinizde
                  </h2>
                  <p className="text-[14px] text-[#41474d] leading-relaxed">
                    Tıp fakültesi kadavra salonundaki o meşhur zil sesini, süre stresini ve pin teşhisini Anatomi 3D mobil uygulamasıyla dilediğiniz her an gerçeğe birebir simüle edin.
                  </p>
                </div>

                {/* iPhone Device Frame with real app screenshot */}
                <div className="flex justify-center py-2">
                  <IPhoneFrame
                    screenSrc="/screens/exam-phone.png"
                    altText="Anatomi 3D Zilli Sınav Masası Mobil Ekranı"
                    caption="Masa #01: Abdomen Regio • 45s Zil"
                  />
                </div>

                {/* Step-by-Step Exam Mechanics Workflow */}
                <div className="flex flex-col gap-3.5 pt-2 border-t border-[#e5eeff]">
                  <h3 className="text-[12px] text-[#003752] font-bold uppercase tracking-wider font-archivo">
                    Mekanik Nasıl İşliyor?
                  </h3>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#c9e6ff] text-[#003752] flex items-center justify-center text-[11px] font-bold font-mono shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-[#003752] font-bold">45 Saniyelik Zil Çalar</span>
                      <span className="text-[12px] text-[#41474d]">
                        Kadavra masası açılır, geri sayım başlar. İki parmakla dokunarak 3D modeli serbestçe çevirirsiniz.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#c9e6ff] text-[#003752] flex items-center justify-center text-[11px] font-bold font-mono shrink-0 mt-0.5">
                      2
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-[#003752] font-bold">İğneli Yapıları Teşhis Et</span>
                      <span className="text-[12px] text-[#41474d]">
                        Dokudaki renkli iğnelere (Pin 1-5) dokunarak arter, sinir veya foramen sınırlarını incelersiniz.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#c9e6ff] text-[#003752] flex items-center justify-center text-[11px] font-bold font-mono shrink-0 mt-0.5">
                      3
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-[#003752] font-bold">Latince TA2 İsmini Gir</span>
                      <span className="text-[12px] text-[#41474d]">
                        Klavyeden yazarak veya sesli dikte ile Terminologia Anatomica terimini yazıp anında doğrulama alırsınız.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#c9e6ff] text-[#003752] flex items-center justify-center text-[11px] font-bold font-mono shrink-0 mt-0.5">
                      4
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-[#003752] font-bold">Zil Çalınca Sonraki Masaya Geç</span>
                      <span className="text-[12px] text-[#41474d]">
                        Süre dolduğunda otomatik rotasyon başlar. Tüm komite boyunca gerçek anatomi salonu deneyimi yaşarsınız.
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
                    <span>iOS için İndir</span>
                  </Link>
                  <Link
                    href="/topluluk-ve-indir"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#006591] text-white hover:bg-[#004c6e] text-[13px] font-semibold transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[20px]">android</span>
                    <span>Android için İndir</span>
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
                  Pedagojik ve Klinik Yaklaşım
                </span>
                <h2 className="text-[32px] text-[#003752] font-bold font-archivo">
                  Zilli Sınav Neden Tıp Öğrencileri İçin Hayatidir?
                </h2>
                <p className="text-[14px] text-[#41474d] leading-relaxed">
                  Tıp fakültesi pratik komite sınavlarında öğrencilerin %68&apos;i teorik bilgiden değil; süre kısıtı, kadavradaki oryantasyon kaybı ve Latince imla hataları sebebiyle puan kaybeder.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-[#ffffff] px-4 py-2.5 rounded-xl shadow-sm border border-[#e5eeff] shrink-0">
                <span className="material-symbols-outlined text-[#006591] text-[22px]">
                  verified_user
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-[12px] text-[#003752] font-bold">
                    Hacettepe, Cerrahpaşa & Ege Tıp
                  </span>
                  <span className="text-[11px] text-[#41474d]">Müfredat Uyarlamalı Protokol</span>
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
                  Süre Baskısını Sıfırlama
                </h3>
                <p className="text-[13px] text-[#41474d] leading-relaxed">
                  Her masada çalan 45 saniyelik zili yüzlerce kez simüle ederek panik refleksini ortadan kaldırır, serinkanlı klinik odak geliştirir.
                </p>
              </div>

              <div className="bg-[#ffffff] p-6 rounded-2xl border border-[#e5eeff] shadow-sm flex flex-col gap-3 cursor-pointer hover:scale-[1.03] hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#c9e6ff] text-[#006591] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">screen_rotation</span>
                </div>
                <h3 className="text-[18px] text-[#003752] font-bold font-archivo">
                  Kadavrada 3 Boyutlu Yön Duygusu
                </h3>
                <p className="text-[13px] text-[#41474d] leading-relaxed">
                  Kitap sayfalarındaki iki boyutlu illüstrasyonlar yerine, gerçek bir kadavra masasında eğilip sağdan, soldan ve derinden bakma yetisi kazandırır.
                </p>
              </div>

              <div className="bg-[#ffffff] p-6 rounded-2xl border border-[#e5eeff] shadow-sm flex flex-col gap-3 cursor-pointer hover:scale-[1.03] hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#c9e6ff] text-[#003752] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">spellcheck</span>
                </div>
                <h3 className="text-[18px] text-[#003752] font-bold font-archivo">
                  Terminologia Anatomica (TA2) İmlası
                </h3>
                <p className="text-[13px] text-[#41474d] leading-relaxed">
                  Hocaların puan kırdığı Latince tek harf imla kusurlarını akıllı klinik otomatik tamamlama motoruyla hafızanıza kazır.
                </p>
              </div>

              <div className="bg-[#ffffff] p-6 rounded-2xl border border-[#e5eeff] shadow-sm flex flex-col gap-3 cursor-pointer hover:scale-[1.03] hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#dce9ff] text-[#003752] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">troubleshoot</span>
                </div>
                <h3 className="text-[18px] text-[#003752] font-bold font-archivo">
                  İğne Komşuluğu Teşhisi
                </h3>
                <p className="text-[13px] text-[#41474d] leading-relaxed">
                  İğnenin batırıldığı dokunun sadece adını değil, altından geçen siniri veya besleyen arter dalını saniyeler içinde analiz etmenizi sağlar.
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
                Tıp Fakültesi Komite Müfredatı
              </span>
              <h2 className="text-[32px] text-[#003752] font-bold font-archivo">
                Mobil Uygulamada Yer Alan Zilli Sınav Masaları
              </h2>
              <p className="text-[14px] text-[#41474d] max-w-3xl leading-relaxed">
                Tıp fakültesi 1, 2 ve 3. sınıfların tüm dönem komiteleri için ayrılmış, üniversite laboratuvarlarındaki gerçek kadavraların yüksek çözünürlüklü 3D modelleri.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Table 1: Bone & Locomotor */}
              <div className="bg-[#ffffff] p-5 rounded-2xl border border-[#e5eeff] shadow-sm flex flex-col justify-between gap-4 cursor-pointer hover:scale-[1.03] hover:shadow-md transition-all duration-300">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#eff4ff] text-[#003752] text-[10px] font-bold font-archivo">
                      KOMİTE I
                    </span>
                    <span className="font-mono text-[11px] text-[#006591] font-semibold">30 Masa</span>
                  </div>
                  <h3 className="text-[17px] text-[#003752] font-bold font-archivo">
                    Lokomotor & Kemik Masası
                  </h3>
                  <p className="text-[12px] text-[#41474d] leading-relaxed">
                    Tuberculum majus, sulcus intertubercularis, foramen obturatum ve eklem yüzeyi pinleri.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#f0f4f9] flex items-center justify-between text-[11px] text-[#006591] font-semibold">
                  <span>Dönem 1 • 120 İğne Noktası</span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </div>
              </div>

              {/* Table 2: Thorax & Heart */}
              <div className="bg-[#ffffff] p-5 rounded-2xl border border-[#e5eeff] shadow-sm flex flex-col justify-between gap-4 cursor-pointer hover:scale-[1.03] hover:shadow-md transition-all duration-300">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#c9e6ff] text-[#006591] text-[10px] font-bold font-archivo">
                      KOMİTE II
                    </span>
                    <span className="font-mono text-[11px] text-[#006591] font-semibold">40 Masa</span>
                  </div>
                  <h3 className="text-[17px] text-[#003752] font-bold font-archivo">
                    Toraks & Kalp Masası
                  </h3>
                  <p className="text-[12px] text-[#41474d] leading-relaxed">
                    Truncus pulmonalis, valvula tricuspidalis, sulcus coronarius ve mediastinum diseksiyonu.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#f0f4f9] flex items-center justify-between text-[11px] text-[#006591] font-semibold">
                  <span>Dönem 2 • 180 İğne Noktası</span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </div>
              </div>

              {/* Table 3: Neuro & Skull */}
              <div className="bg-[#ffffff] p-5 rounded-2xl border border-[#e5eeff] shadow-sm flex flex-col justify-between gap-4 cursor-pointer hover:scale-[1.03] hover:shadow-md transition-all duration-300">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#c9e6ff] text-[#003752] text-[10px] font-bold font-archivo">
                      KOMİTE III
                    </span>
                    <span className="font-mono text-[11px] text-[#006591] font-semibold">55 Masa</span>
                  </div>
                  <h3 className="text-[17px] text-[#003752] font-bold font-archivo">
                    Nöroanatomi & Foramenler
                  </h3>
                  <p className="text-[12px] text-[#41474d] leading-relaxed">
                    Fissura orbitalis superior, Willis poligonu, ventriculus quartus ve kranial sinir kökleri.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#f0f4f9] flex items-center justify-between text-[11px] text-[#006591] font-semibold">
                  <span>Dönem 2 • 220 İğne Noktası</span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </div>
              </div>

              {/* Table 4: Visceral & Abdomen */}
              <div className="bg-[#ffffff] p-5 rounded-2xl border border-[#e5eeff] shadow-sm flex flex-col justify-between gap-4 cursor-pointer hover:scale-[1.03] hover:shadow-md transition-all duration-300">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#ffdada] text-[#6d001c] text-[10px] font-bold font-archivo">
                      KOMİTE IV
                    </span>
                    <span className="font-mono text-[11px] text-[#006591] font-semibold">45 Masa</span>
                  </div>
                  <h3 className="text-[17px] text-[#003752] font-bold font-archivo">
                    Abdomen & Retroperiton
                  </h3>
                  <p className="text-[12px] text-[#41474d] leading-relaxed">
                    Truncus coeliacus dalları, ductus choledochus, lig. hepatoduodenale ve omentum minus.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#f0f4f9] flex items-center justify-between text-[11px] text-[#006591] font-semibold">
                  <span>Dönem 3 • 160 İğne Noktası</span>
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
