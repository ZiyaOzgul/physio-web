import React from "react";
import Link from "next/link";

export default function Footer() {
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
              Tıp fakülteleri, diş hekimliği ve sağlık bilimleri öğrencileri için tasarlanmış yüksek hassasiyetli 3 boyutlu diseksiyon ve simülasyon altyapısı.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffffff] text-[#003752] text-[11px] font-medium border border-[#d3e0ed]">
                <span className="material-symbols-outlined text-[16px] text-[#006591]">verified</span>
                Medikal Akreditasyonlu Model Veritabanı
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffffff] text-[#006591] text-[11px] font-medium border border-[#d3e0ed]">
                <span className="material-symbols-outlined text-[16px]">school</span>
                Terminologia Anatomica (TA2) Uyumlu
              </span>
            </div>
          </div>

          {/* Module Links */}
          <div className="space-y-3">
            <h4 className="text-[15px] text-[#003752] font-bold tracking-wide uppercase font-archivo">
              Anatomi Modülleri
            </h4>
            <ul className="space-y-2 text-[14px] text-[#41474d]">
              <li>
                <Link className="hover:text-[#003752] transition-colors" href="/atlas">
                  Lokomotor Sistem (Kemik & Kas)
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#003752] transition-colors" href="/atlas">
                  Kardiyovasküler Dolaşım
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#003752] transition-colors" href="/atlas">
                  Nöroanatomi & MSS
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#003752] transition-colors" href="/atlas">
                  Visseral Organlar & Toraks
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#003752] transition-colors" href="/zilli-sinav">
                  Zilli Sınav Simülatörü
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic & Faculty */}
          <div className="space-y-3">
            <h4 className="text-[15px] text-[#003752] font-bold tracking-wide uppercase font-archivo">
              Kurumsal & Akademi
            </h4>
            <ul className="space-y-2 text-[14px] text-[#41474d]">
              <li>
                <Link className="hover:text-[#003752] transition-colors" href="/ogrenme-yolu">
                  Tıp Fakültesi Komite Müfredatı
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#003752] transition-colors" href="/cihaz-deneyimi">
                  Tablet & iPad Laboratuvar Modu
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#003752] transition-colors" href="/topluluk-ve-indir">
                  Fakülte Toplu Lisanslama
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#003752] transition-colors" href="/topluluk-ve-indir">
                  Kadavra Salonu Entegrasyonu
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#003752] transition-colors" href="/topluluk-ve-indir">
                  Tıp Öğrenci Topluluğu
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile Platforms */}
          <div className="space-y-3">
            <h4 className="text-[15px] text-[#003752] font-bold tracking-wide uppercase font-archivo">
              Mobil Platformlar
            </h4>
            <p className="text-[12px] text-[#41474d] leading-relaxed">
              Çevrimdışı 3D motoruyla sinyal almayan morfoloji bodrumlarında bile kesintisiz pratik yapın.
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
                  <span className="text-[10px] text-[#41474d]">App Store üzerinden</span>
                  <span className="text-[13px] text-[#003752] font-semibold leading-tight">
                    iOS İndir
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
                  <span className="text-[10px] text-[#41474d]">Google Play ile</span>
                  <span className="text-[13px] text-[#003752] font-semibold leading-tight">
                    Android İndir
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
              <strong className="font-semibold text-[#0b1c30]">Tıbbi Uyarı & Sorumluluk Reddi:</strong>{" "}
              Anatomi3D platformu yalnızca tıbbi eğitim, araştırma ve akademik anatomi pratikleri amacıyla hazırlanmıştır. İçerikler doğrudan tanı, tedavi veya cerrahi müdahale kararları için bağımsız bir kılavuz niteliği taşımaz. Klinik uygulamalarda güncel tıp literatürü ve resmi teşhis protokolleri esas alınmalıdır.
            </p>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#41474d]">
          <p>© 2026 Anatomi3D Sağlık Bilişim Teknolojileri A.Ş. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-6">
            <Link className="hover:text-[#003752] transition-colors" href="/kvkk">
              Kullanım Şartları
            </Link>
            <Link className="hover:text-[#003752] transition-colors" href="/kvkk">
              Aydınlatma Metni (KVKK)
            </Link>
            <Link className="hover:text-[#003752] transition-colors" href="/kvkk">
              Çerez Politikası
            </Link>
            <span className="text-[#72787e] font-mono">v4.2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
