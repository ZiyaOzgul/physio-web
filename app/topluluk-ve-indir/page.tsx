"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IPhoneFrame from "@/components/IPhoneFrame";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

/**
 * The app page. Only what exists: the mobile app's study features and the account shared with this site. No store
 * buttons until there are store listings to link to (the old ones only showed a "redirecting" toast).
 */
export default function AppPage() {
  const { language } = useLanguage();
  const { session } = useAuth();
  const tr = language === "tr";

  const features = tr
    ? [
        { n: "01", title: "Çalışma serisi ve günlük hedef", body: "Son 28 günün takvimi, günlük XP hedefi ve seviye. Düzenli çalıştığınızı kendiniz görürsünüz." },
        { n: "02", title: "Sistem hakimiyeti", body: "İskelet, kas, damar, sinir ve organ sorularındaki doğruluk oranınız ayrı ayrı tutulur; zayıf kalan sistem belli olur." },
        { n: "03", title: "Rozetler", body: "Ders, seri, doğru cevap ve hakimiyet rozetleri. Profilinizde öne çıkaracaklarınızı siz seçersiniz." },
        { n: "04", title: "Arkadaşlar ve sıralama", body: "Takip ettiğiniz kişilerle XP sıralaması. Karşılaştırma yalnızca sizin seçtiğiniz kişilerle yapılır." },
      ]
    : [
        { n: "01", title: "Study streak and daily goal", body: "A calendar of the last 28 days, a daily XP goal and your level. You can see for yourself whether you study regularly." },
        { n: "02", title: "Mastery by system", body: "Your accuracy on skeletal, muscular, vascular, nervous and organ questions is kept separately, so the weak system shows." },
        { n: "03", title: "Badges", body: "Badges for lessons, streaks, correct answers and mastery. You choose which ones your profile shows." },
        { n: "04", title: "Friends and ranking", body: "An XP ranking with the people you follow. You are compared only with people you picked." },
      ];

  return (
    <div className="min-h-screen flex flex-col bg-ground text-ink">
      <Navbar activePath="/topluluk-ve-indir" />

      <main className="w-full pt-20">
        <section className="w-full border-b border-line">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="kicker">{tr ? "Mobil uygulama" : "Mobile app"}</span>
              <h1 className="mt-4 font-archivo font-semibold text-ink text-[44px] sm:text-[56px] leading-[0.98]">
                {tr ? "Atlas cebinizde, ilerlemeniz hesabınızda." : "The atlas in your pocket, your progress in your account."}
              </h1>
              <p className="mt-5 text-[17px] leading-relaxed text-ink-soft max-w-[52ch]">
                {tr
                  ? "Telefon ve tablet uygulaması aynı 3D modeli, öğrenme yolunu ve zilli sınavı içerir. Uygulamada açtığınız hesapla bu siteye de giriş yapabilir, ilerlemenizi burada görebilirsiniz."
                  : "The phone and tablet app has the same 3D model, the learning path and the spot exam. The account you create in the app also signs you in here, where you can see your progress."}
              </p>

              <div id="indir" className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/atlas"
                  className="group inline-flex items-center gap-2.5 h-12 px-6 rounded-[10px] bg-accent-700 hover:bg-accent-800 text-white font-archivo font-semibold uppercase tracking-wide text-[16px] transition-colors"
                >
                  {tr ? "Web atlasını aç" : "Open the web atlas"}
                  <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1" aria-hidden>
                    arrow_forward
                  </span>
                </Link>
                <Link
                  href="/profil"
                  className="inline-flex items-center h-12 px-5 rounded-[10px] border border-line-strong hover:border-ink text-ink font-archivo font-semibold uppercase tracking-wide text-[16px] transition-colors"
                >
                  {session ? (tr ? "Profilim" : "My profile") : tr ? "Giriş yap" : "Sign in"}
                </Link>
              </div>

              <p className="mt-6 pl-4 border-l-[3px] border-accent text-[14px] leading-relaxed text-ink-soft max-w-[58ch]">
                {tr
                  ? "Mağaza bağlantıları, uygulama App Store ve Google Play'de yayınlandığında bu sayfaya eklenecek."
                  : "Store links will be added to this page once the app is listed on the App Store and Google Play."}
              </p>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <IPhoneFrame
                screenSrc="/screens/home.webp"
                altText={tr ? "Uygulamanın ana ekranı" : "The app's home screen"}
                caption={tr ? "Ana ekran: seviye, günlük hedef ve sıradaki ders" : "Home: level, daily goal and the next lesson"}
              />
            </div>
          </div>
        </section>

        <section className="w-full border-b border-line">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <span className="kicker">{tr ? "Çalışma takibi" : "Study tracking"}</span>
              <h2 className="mt-3 font-archivo font-semibold text-ink text-[36px] sm:text-[44px] leading-[1.02]">
                {tr ? "Uygulama neyi takip eder?" : "What the app keeps track of"}
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
                {tr
                  ? "Hepsi kendi çalışmanızdan üretilir; hesabınıza kaydedilir ve cihaz değiştirdiğinizde sizinle gelir."
                  : "All of it comes from your own study; it is saved to your account and follows you to a new device."}
              </p>
            </div>

            <ol className="lg:col-span-8 border-t border-line">
              {features.map((f) => (
                <li key={f.n} className="grid grid-cols-[auto_1fr] gap-x-5 py-5 border-b border-line">
                  <span className="font-archivo font-semibold text-accent-700 text-[15px] font-data pt-1">{f.n}</span>
                  <div>
                    <h3 className="font-archivo font-semibold text-ink text-[24px] leading-tight">{f.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft max-w-[62ch]">{f.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="w-full">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <IPhoneFrame
                screenSrc="/screens/learn.webp"
                altText={tr ? "Uygulamada kişisel öğrenme yolu" : "The personal learning path in the app"}
                caption={tr ? "Öğrenme yolu: dört aşama, ilerleme yüzdeleri" : "Learning path: four stages with progress"}
              />
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <span className="kicker">{tr ? "Öğrenme yolu" : "Learning path"}</span>
              <h2 className="mt-3 font-archivo font-semibold text-ink text-[36px] sm:text-[44px] leading-[1.02]">
                {tr ? "Bölümünüze göre sıralanmış dersler" : "Lessons ordered for your programme"}
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-soft max-w-[56ch]">
                {tr
                  ? "Kayıt olurken bölümünüzü ve ne kadar derine inmek istediğinizi seçersiniz; uygulama öncelikli sistemleri ve günlük hedefi buna göre kurar. 45 ders, üç zorluk seviyesi, yedi soru tipi."
                  : "When you sign up you pick your programme and how deep you want to go; the app sets the priority systems and the daily goal from that. 45 lessons, three difficulties, seven question types."}
              </p>
              <Link
                href="/ogrenme-yolu"
                className="group mt-6 inline-flex items-center gap-2 font-archivo font-semibold uppercase tracking-wide text-[15px] text-accent-700 hover:text-ink transition-colors"
              >
                {tr ? "Öğrenme yolunu incele" : "See the learning path"}
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1" aria-hidden>
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
