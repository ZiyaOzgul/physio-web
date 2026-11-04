"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function KvkkPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [facultyLeagueConsent, setFacultyLeagueConsent] = useState(true);
  const [drawingSyncConsent, setDrawingSyncConsent] = useState(true);
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const sections = [
    {
      id: "bolum-1",
      number: "01",
      title: "Taraflar ve Hizmetin Kapsamı",
      badge: "Hukuki Çerçeve",
      content: (
        <>
          <p>
            İşbu Kullanıcı Sözleşmesi (&quot;Sözleşme&quot;), <strong>Anatomi 3D Medikal Bilişim ve Eğitim Teknolojileri Ltd. Şti.</strong> (&quot;Şirket&quot; veya &quot;Anatomi 3D&quot;) ile platforma web tarayıcısı, masaüstü istemcisi (Windows/macOS) veya mobil/tablet uygulamaları (iOS/iPadOS/Android) aracılığıyla erişim sağlayan gerçek veya tüzel kişi (&quot;Kullanıcı&quot;) arasında akdedilmiştir.
          </p>
          <p>
            Anatomi 3D; milimetrik doğrulukta 3D insan anatomisi atlası, kadavra fotogrametri kesitleri, katman bazlı diseksiyon araçları, histopatolojik modeller, kraniyal sinir traktusları ve Tıp Fakültesi OSCE / Zilli Sınav masası simülasyonunu kapsayan çok katmanlı bir tıbbi eğitim ve dijital laboratuvar platformudur.
          </p>
          <div className="p-4 rounded-xl bg-[#e5eeff]/50 border border-[#c1c7ce]/30 flex items-start gap-3 mt-2">
            <span className="material-symbols-outlined text-[22px] text-[#003752] shrink-0 mt-0.5">verified</span>
            <div>
              <h4 className="font-bold text-[#003752] text-sm">Terminoloji ve Standart Güvencesi</h4>
              <p className="text-xs text-[#41474d] mt-1 leading-relaxed">
                Platformda yer alan tüm anatomik isimlendirmeler, Federative Committee on Anatomical Terminology (FCAT) tarafından yayımlanan resmi <em>Terminologia Anatomica (TA2)</em> uluslararası kılavuzuna ve Türk Anatomi ve Klinik Anatomi Derneği standartlarına tam uyumludur.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "bolum-2",
      number: "02",
      title: "Tıbbi Eğitim ve Sorumluluk Reddi (Disclaimer)",
      badge: "Klinik Uyarı",
      isWarning: true,
      content: (
        <>
          <div className="p-4 rounded-xl bg-[#ffdada]/60 border border-[#ffb3b6] flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#6d001c]">
              <span className="material-symbols-outlined text-[24px]">warning</span>
              <span className="font-bold text-sm tracking-wide uppercase">KLİNİK UYARI VE DİKKAT ÇAĞRISI</span>
            </div>
            <p className="text-sm text-[#6d001c] leading-relaxed font-medium">
              Anatomi 3D platformu, <strong>YALNIZCA TIP, DİŞ HEKİMLİĞİ, FİZYOTERAPİ, HEMŞİRELİK VE SAĞLIK BİLİMLERİ EĞİTİMİ</strong> amacıyla geliştirilmiştir. Platformda sergilenen hiçbir 3D model, kadavra fotogrametri rekonstrüksiyonu, arteriyel kan akışı simülasyonu ya da biyomekanik hareket:
            </p>
            <ul className="list-disc list-inside text-xs text-[#6d001c] flex flex-col gap-1 pl-2 font-medium">
              <li>Bir hastanın klinik tanısı için tek başına referans alınamaz.</li>
              <li>Cerrahi insizyon planlaması, operasyon rehberliği veya intraoperatif navigasyon amacıyla doğrudan kullanılamaz.</li>
              <li>Tıbbi müdahale, ilaç dozajı veya tedavi protokolünün yerine geçmez.</li>
            </ul>
          </div>
          <p className="text-sm text-[#0b1c30] leading-relaxed mt-2">
            Bireysel insan anatomisinde karşılaşılan anatomik varyasyonlar (örneğin; varyant <em>a. hepatica dextra</em> orjinleri, <em>n. laryngeus recurrens</em> seyir sapmaları, foraminal stenoz varyasyonları) 3D modellerde genelleştirilmiş standart tip olarak sunulmaktadır. Kullanıcı hekimler ve tıp öğrencileri, klinik vakalarda gerçek radyolojik görüntülere (BT, MRG, Anjiyografi) ve uzman konsültasyonlarına başvurmakla yükümlüdür.
          </p>
          <p className="text-sm text-[#0b1c30] leading-relaxed">
            Şirket, sunulan eğitim simülasyonlarının gerçek hastalar üzerindeki pratik uygulamalarından doğabilecek doğrudan veya dolaylı hiçbir tıbbi malpraktis, bedensel zarar ya da hukuki sorumluluktan mesul tutulamaz.
          </p>
        </>
      ),
    },
    {
      id: "bolum-3",
      number: "03",
      title: "Fikri Mülkiyet ve Model Lisans Hakları",
      badge: "Telif Koruma",
      content: (
        <>
          <p>
            Platform bünyesindeki tüm 3D poligon ağları (mesh topology), UV kaplamaları, kadavra diseksiyon fotogrametri taranmış ham verileri, GLTF/USDZ medikal varlıkları, shader algoritmaları ve sınav soru bankaları 5846 Sayılı Fikir ve Sanat Eserleri Kanunu ve uluslararası WIPO anlaşmaları kapsamında Anatomi 3D Medikal Bilişim Ltd. Şti.&apos;ye aittir.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#c1c7ce]/30 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#003752]">
                <span className="material-symbols-outlined text-[20px] text-[#006591]">check_circle</span>
                <span className="font-bold text-sm">İzin Verilen Faaliyetler</span>
              </div>
              <ul className="text-xs text-[#41474d] flex flex-col gap-1.5 leading-relaxed">
                <li>• Amfilerde ve derslerde eğitim amaçlı sunum gösterme.</li>
                <li>• Bireysel ders çalışma, not alma ve zilli sınav provası.</li>
                <li>• Bilimsel tez ve makalelerde kaynak gösterilerek alınan ekran alıntıları (maks. 5 görsel).</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-[#ffdada]/30 border border-[#ffb3b6]/50 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#6d001c]">
                <span className="material-symbols-outlined text-[20px]">cancel</span>
                <span className="font-bold text-sm">Açıkça Yasaklanan Haller</span>
              </div>
              <ul className="text-xs text-[#6d001c] flex flex-col gap-1.5 leading-relaxed">
                <li>• 3D modelleri OBJ/FBX/GLTF olarak dışa aktarma (dump/rip).</li>
                <li>• Tersine mühendislik veya istemci kodlarının dekompile edilmesi.</li>
                <li>• Ücretli kurs, kitap veya Udemy gibi platformlarda ticari satış.</li>
              </ul>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "bolum-4",
      number: "04",
      title: "6698 Sayılı KVKK Kapsamında Aydınlatma Metni",
      badge: "KVKK Md. 10",
      content: (
        <>
          <p>
            Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) Madde 10 ve Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ uyarınca hazırlanmıştır.
          </p>
          <div className="overflow-x-auto rounded-xl border border-[#c1c7ce]/30 shadow-sm mt-3">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#dce9ff] text-[#003752] font-bold">
                <tr>
                  <th className="p-3">Veri Kategorisi</th>
                  <th className="p-3">İşlenen Veri Unsurları</th>
                  <th className="p-3">İşleme Amacı</th>
                  <th className="p-3">Hukuki Sebep (KVKK)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c1c7ce]/20 bg-white text-[#0b1c30]">
                <tr className="bg-[#eff4ff]/40">
                  <td className="p-3 font-semibold">Kimlik &amp; İletişim</td>
                  <td className="p-3">Ad, Soyad, Üniversite edu.tr E-Posta</td>
                  <td className="p-3">Kullanıcı hesabı oluşturma, üniversite eşleşmesi</td>
                  <td className="p-3 font-mono text-[#006591]">Md. 5/2-c (Sözleşme)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Akademik Profil</td>
                  <td className="p-3">Fakülte, Dönem (1-6), Öğrenci No (İsteğe bağlı)</td>
                  <td className="p-3">Müfredata göre kadavra diseksiyon filtreleme</td>
                  <td className="p-3 font-mono text-[#006591]">Md. 5/2-f (Meşru Menfaat)</td>
                </tr>
                <tr className="bg-[#eff4ff]/40">
                  <td className="p-3 font-semibold">Öğrenme Analitiği</td>
                  <td className="p-3">OSCE Zilli Sınav Skorları, Yanıt Süresi, XP Seviyesi</td>
                  <td className="p-3">Bireysel eksik tespiti ve Türkiye geneli sıralama</td>
                  <td className="p-3 font-mono text-[#006591]">Md. 5/1 (Açık Rıza)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Cihaz &amp; Günlük (Log)</td>
                  <td className="p-3">IP Adresi, GPU Render Tipi, Cihaz Kimliği</td>
                  <td className="p-3">Bilgi güvenliği, eşzamanlı oturum engelleme</td>
                  <td className="p-3 font-mono text-[#006591]">5651 Sayılı Kanun</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ),
    },
    {
      id: "bolum-5",
      number: "05",
      title: "Çevrimdışı Bellek ve Yerel Cihaz Verileri",
      badge: "Yerel Güvenlik",
      content: (
        <>
          <p>
            Tıp fakültesi hastanelerinde ve diseksiyon amfilerinde internet erişiminin kısıtlı olabileceği göz önünde bulundurularak Anatomi 3D mobil/tablet sürümleri <strong>Çevrimdışı Kadavra Motoru</strong> ile donatılmıştır.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#c1c7ce]/30">
              <h5 className="font-bold text-sm text-[#003752]">480 MB Paket</h5>
              <p className="text-xs text-[#41474d] mt-1">Yerel cihaza indirilen 3D kas, iskelet ve nörovasküler paketler şifrelenmiş BLOB formatında depolanır.</p>
            </div>
            <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#c1c7ce]/30">
              <h5 className="font-bold text-sm text-[#003752]">Stylus &amp; Çizimler</h5>
              <p className="text-xs text-[#41474d] mt-1">Apple Pencil ve S-Pen ile kadavra modelleri üzerine çizilen kişisel notlar yerel veritabanında (IndexedDB/CoreData) tutulur.</p>
            </div>
            <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#c1c7ce]/30">
              <h5 className="font-bold text-sm text-[#003752]">Sıfır Kamera Kaydı</h5>
              <p className="text-xs text-[#41474d] mt-1">Artırılmış Gerçeklik (AR) modunda kamera görüntüsü sunucuya iletilmez, yalnızca anlık derinlik haritası hesaplanır.</p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "bolum-6",
      number: "06",
      title: "Üniversite ve Rektörlük Lisanslama Protokolleri",
      badge: "Kurumsal Entegrasyon",
      content: (
        <>
          <p>
            Üniversite Rektörlükleri ve Tıp Fakültesi Dekanlıkları tarafından toplu amfi veya dönem lisansı satın alındığında, ilgili öğrencilerin hesapları LTI 1.3 standardı üzerinden üniversitenin Moodle, Canvas, Blackboard veya edu.tr SSO altyapısı ile güvenli biçimde senkronize edilir.
          </p>
          <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#c1c7ce]/30 mt-3">
            <h5 className="font-bold text-sm text-[#003752]">Eğitici Paneli ve Sınav Masası Denetimi</h5>
            <p className="text-xs text-[#41474d] mt-1 leading-relaxed">
              Fakülte öğretim üyeleri, kendi oluşturdukları kadavra istasyonlarını ve zilli sınav sorularını müfredata ekleyebilir. Eğitici paneli üzerinden toplanan sınav istatistikleri, öğrenci kimlikleri anonimleştirilerek başarı eğrisi olarak raporlanır.
            </p>
          </div>
        </>
      ),
    },
    {
      id: "bolum-7",
      number: "07",
      title: "İlgili Kişinin Hakları (KVKK Madde 11)",
      badge: "Yasal Haklar",
      content: (
        <>
          <p>
            KVKK&apos;nın 11. maddesi uyarınca veri sahibi tıp öğrencileri ve eğitmenler, Şirketimize başvurarak aşağıdaki haklarını kullanabilirler:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {[
              { icon: "info", text: "Kişisel verilerinizin işlenip işlenmediğini öğrenme" },
              { icon: "history_edu", text: "İşlenmişse buna ilişkin detaylı bilgi talep etme" },
              { icon: "track_changes", text: "İşlenme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme" },
              { icon: "delete_forever", text: "Verilerin silinmesini veya yok edilmesini talep etme" },
              { icon: "sync_alt", text: "Düzeltme ve silme işlemlerinin aktarılan 3. kişilere bildirilmesi" },
              { icon: "shield", text: "Münhasıran otomatik analizlere itiraz etme hakkı" },
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#eff4ff] border border-[#c1c7ce]/30 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-[#006591] shrink-0 mt-0.5">{item.icon}</span>
                <span className="text-xs text-[#0b1c30]">{item.text}</span>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      id: "bolum-8",
      number: "08",
      title: "Yürürlük ve Uyuşmazlıkların Çözümü",
      badge: "Yetkili Yargı",
      content: (
        <p>
          Kullanıcı, Anatomi 3D platformuna üye olduğu veya sistemi kullanmaya başladığı andan itibaren işbu sözleşmenin tüm maddelerini okumuş, anlamış ve kabul etmiş sayılır. İşbu sözleşmeden doğacak ihtilaflarda Türk Hukuku uygulanacak olup, <strong>Ankara Merkez (Sıhhiye) Mahkemeleri ve İcra Daireleri</strong> münhasıran yetkilidir.
        </p>
      ),
    },
  ];

  const filteredSections = searchQuery.trim()
    ? sections.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sections;

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Sub-Header Legal Ribbon */}
        <section className="w-full bg-[#eff4ff] border-b border-[#c1c7ce]/30 py-3 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1f4e6b] text-white text-xs font-mono font-semibold shadow-sm">
                <span className="material-symbols-outlined text-[14px]">verified_user</span>
                YASAL &amp; KLİNİK UYUMLULUK v4.2
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#d3e4fe] text-[#006591] text-xs font-mono">
                <span className="material-symbols-outlined text-[14px]">update</span>
                Son Güncelleme: 14 Şubat 2026
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#dce9ff] text-[#41474d] text-xs font-mono">
                <span className="material-symbols-outlined text-[14px]">gavel</span>
                6698 Sayılı KVKK &amp; GDPR Uyumlu
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
              <button
                onClick={() => typeof window !== "undefined" && window.print()}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-[#c1c7ce]/40 text-[#0b1c30] hover:bg-[#eff4ff] transition-all text-xs font-medium shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span className="hidden sm:inline">Yazdır</span>
              </button>
              <button
                onClick={() => {
                  setToastMessage("Anatomi 3D Resmi Sözleşme Metni (v4.2) PDF formatında indiriliyor...");
                  setTimeout(() => setToastMessage(null), 3000);
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-[#c1c7ce]/40 text-[#0b1c30] hover:bg-[#eff4ff] transition-all text-xs font-medium shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                <span className="hidden sm:inline">PDF İndir</span>
              </button>
              <a
                href="#hukuk-masasi"
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-[#003752] text-white hover:bg-[#1f4e6b] transition-all text-xs font-bold shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">contact_support</span>
                Hukuk Birimi
              </a>
            </div>
          </div>
        </section>

        {/* Hero Legal Header */}
        <section className="w-full px-6 md:px-12 py-10 bg-gradient-to-b from-[#f8f9ff] via-[#eff4ff]/40 to-[#f8f9ff]">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="flex flex-col gap-2 max-w-4xl">
                <div className="flex items-center gap-2 text-[#006591] text-xs font-mono font-bold uppercase tracking-widest">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#39b8fd]"></span>
                  Medikal Bilişim ve Akademik Lisans Sözleşmesi
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#003752] tracking-tight">
                  Kullanım Koşulları &amp; KVKK Aydınlatma Metni
                </h1>
                <p className="text-base text-[#41474d] leading-relaxed">
                  Tıp fakültesi öğrencileri, intörnler, uzman hekimler, anatomist akademisyenler ve üniversite dekanlıkları için <strong>Anatomi 3D</strong> medikal platformunun yasal çerçevesi, diseksiyon 3D poligon telifleri, kadavra materyallerinin etik kullanım sınırları ve sağlık verilerinin korunma prensipleri.
                </p>
              </div>

              {/* Validation Summary */}
              <div className="shrink-0 p-5 rounded-2xl bg-white border border-[#c1c7ce]/30 shadow-md flex flex-col gap-2 min-w-[260px]">
                <span className="text-xs font-mono uppercase text-[#41474d] tracking-wider font-semibold">Sistem Doğrulama Özeti</span>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-[#c1c7ce]/20">
                  <span className="text-[#0b1c30]">Terminologia Anatomica</span>
                  <span className="font-mono text-[#006591] font-bold">FICAT Uyumlu</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#0b1c30]">Kişisel Sağlık Verileri</span>
                  <span className="font-mono text-[#003752] font-bold">AES-256 Şifreli</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#0b1c30]">Yerel Çevrimdışı Depolama</span>
                  <span className="font-mono text-[#41474d]">480 MB Ayrılmış</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Badge Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {[
                { icon: "school", title: "Eğitim Amaçlı Lisans", desc: "Klinik simülasyon ve tıp müfredatı için özel" },
                { icon: "lock", title: "Uçtan Uca Şifreli", desc: "Öğrenci sınav ve diseksiyon notu koruması" },
                { icon: "corporate_fare", title: "Veri Sorumlusu", desc: "Anatomi 3D Medikal Bilişim Ltd. Şti." },
                { icon: "domain_verification", title: "Edu.tr / LMS Entegre", desc: "Üniversite Rektörlükleri SSO doğrulaması" },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-[#c1c7ce]/30 shadow-sm flex items-start gap-3 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-lg bg-[#dce9ff] text-[#003752] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#003752]">{item.title}</h3>
                    <p className="text-xs text-[#41474d] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content Layout */}
        <section className="w-full px-6 md:px-12 pb-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar Sticky Navigation (4 cols) */}
            <aside className="lg:col-span-4 sticky top-24 flex flex-col gap-4">
              {/* Quick Search */}
              <div className="p-5 rounded-2xl bg-white border border-[#c1c7ce]/30 shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#003752] text-sm flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">search</span>
                    Mevzuatta Ara
                  </span>
                  <span className="text-[11px] font-mono text-[#41474d] bg-[#eff4ff] px-2 py-0.5 rounded">FİLTRE</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Örn: Kadavra, KVKK 11, Zilli Sınav..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#eff4ff] border border-[#c1c7ce]/40 text-xs focus:outline-none focus:ring-2 focus:ring-[#006591] transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-2 text-[#41474d] hover:text-[#0b1c30]"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  )}
                </div>
                {searchQuery && (
                  <span className="text-xs text-[#006591] font-medium">
                    {filteredSections.length} ilgili madde listeleniyor
                  </span>
                )}
              </div>

              {/* Index Directory */}
              <nav className="p-5 rounded-2xl bg-white border border-[#c1c7ce]/30 shadow-sm flex flex-col gap-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#c1c7ce]/20">
                  <span className="font-bold text-[#003752] text-sm">İçindekiler &amp; Hızlı Dizin</span>
                  <span className="text-xs font-mono text-[#006591] font-bold">8 BÖLÜM</span>
                </div>
                <div className="flex flex-col gap-1 max-h-[380px] overflow-y-auto pr-1">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all ${
                        s.isWarning
                          ? "bg-[#ffdada]/30 text-[#6d001c] font-bold hover:bg-[#ffdada]/60"
                          : "text-[#41474d] hover:bg-[#eff4ff] hover:text-[#003752]"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`font-mono font-bold ${s.isWarning ? "text-[#6d001c]" : "text-[#006591]"}`}>
                          {s.number}
                        </span>
                        <span className="truncate max-w-[200px]">{s.title}</span>
                      </span>
                      <span className="material-symbols-outlined text-[14px] text-[#c1c7ce]">chevron_right</span>
                    </a>
                  ))}
                </div>
              </nav>

              {/* DPO Help Desk Card */}
              <div className="p-5 rounded-2xl bg-[#eff4ff] border border-[#c1c7ce]/30 flex flex-col gap-2 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#003752]">policy</span>
                  <h4 className="font-bold text-sm text-[#003752]">Veri Koruma Görevlisi (DPO)</h4>
                </div>
                <p className="text-xs text-[#41474d] leading-relaxed">
                  KVKK 11. Madde kapsamındaki başvurularınızı ve kurumsal lisans sorgularınızı doğrudan Hukuk Ofisimize iletebilirsiniz.
                </p>
                <div className="flex flex-col gap-1.5 pt-2 border-t border-[#c1c7ce]/30 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#41474d]">E-Posta:</span>
                    <a href="mailto:hukuk@anatomi3d.med" className="text-[#006591] font-bold hover:underline">
                      hukuk@anatomi3d.med
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#41474d]">KEP Adresi:</span>
                    <span className="text-[#0b1c30] font-mono">anatomi3d@hs01.kep.tr</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#41474d]">Cevap Süresi:</span>
                    <span className="text-[#003752] font-bold">Azami 30 Gün (Yasal)</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Articles List (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {filteredSections.map((sec) => (
                <article
                  key={sec.id}
                  id={sec.id}
                  className="p-6 md:p-8 rounded-2xl bg-white border border-[#c1c7ce]/30 shadow-sm flex flex-col gap-4 scroll-mt-28"
                >
                  <div className="flex items-start justify-between gap-4 pb-2 border-b border-[#c1c7ce]/20">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#006591]">
                        Bölüm {sec.number}
                      </span>
                      <h2 className={`text-xl md:text-2xl font-bold tracking-tight ${sec.isWarning ? "text-[#6d001c]" : "text-[#003752]"}`}>
                        {sec.title}
                      </h2>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-mono font-semibold shrink-0 ${
                        sec.isWarning
                          ? "bg-[#ffdada] text-[#6d001c]"
                          : "bg-[#dce9ff] text-[#003752]"
                      }`}
                    >
                      {sec.badge}
                    </span>
                  </div>

                  <div className="text-sm text-[#0b1c30] leading-relaxed flex flex-col gap-3">
                    {sec.content}
                  </div>
                </article>
              ))}

              {/* Student Consent Simulator */}
              <section id="konsensüs-sandkabi" className="p-6 md:p-8 rounded-2xl bg-white border border-[#c1c7ce]/30 shadow-md flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#1f4e6b] text-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">tune</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#003752] text-lg">Öğrenci Rıza &amp; İzin Simülatörü</h3>
                      <p className="text-xs text-[#41474d]">Profilinize ait KVKK izin tercihlerini canlı simüle edin</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#dce9ff] text-[#006591] text-xs font-mono font-bold">
                    ETKİLEŞİMLİ
                  </span>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  {/* Toggle 1 */}
                  <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#c1c7ce]/30 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-[#003752]">Tıp Fakültesi Ligi ve Başarı Sıralaması</h4>
                      <p className="text-xs text-[#41474d] mt-0.5">Zilli Sınav netlerimin Türkiye geneli anonim dönem liginde gösterilmesine izin veriyorum.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={facultyLeagueConsent}
                        onChange={(e) => setFacultyLeagueConsent(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006591]"></div>
                    </label>
                  </div>

                  {/* Toggle 2 */}
                  <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#c1c7ce]/30 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-[#003752]">Kadavra Çizim &amp; Not Senkronizasyonu</h4>
                      <p className="text-xs text-[#41474d] mt-0.5">Apple Pencil ile aldığım 3D anatomik diseksiyon notlarımın şifreli bulut yedeğinin tutulmasına izin veriyorum.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={drawingSyncConsent}
                        onChange={(e) => setDrawingSyncConsent(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006591]"></div>
                    </label>
                  </div>

                  {/* Toggle 3 */}
                  <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#c1c7ce]/30 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-[#003752]">Akademik Bülten &amp; Yeni Diseksiyon Bildirimleri</h4>
                      <p className="text-xs text-[#41474d] mt-0.5">Yeni yayımlanan nöroanatomi ve kardiyovasküler atlas modülleri hakkında bilgilendirme almayı kabul ediyorum.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={newsletterConsent}
                        onChange={(e) => setNewsletterConsent(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006591]"></div>
                    </label>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#dce9ff] text-[#003752] text-xs font-mono flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#006591]">check</span>
                    Tercihler oturum belleğine işlendi (AES-256 oturum anahtarı).
                  </span>
                  <span className="text-[#006591] font-bold">DURUM: AKTİF</span>
                </div>
              </section>

              {/* Help Desk Banner */}
              <section id="hukuk-masasi" className="p-8 rounded-2xl bg-[#003752] text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex flex-col gap-2 max-w-xl">
                  <div className="flex items-center gap-2 text-[#39b8fd] text-xs font-mono font-bold">
                    <span className="material-symbols-outlined text-[18px]">support_agent</span>
                    KURUMSAL VE AKADEMİK HUKUK MASASI
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    Sorularınız veya Veri Talepleriniz mi Var?
                  </h3>
                  <p className="text-xs text-[#dce9ff] leading-relaxed">
                    Üniversite Rektörlük lisansları, KVKK Madde 11 kapsamındaki silme talepleri ve lisans hakları sorgulamaları için doğrudan Hukuk &amp; Veri Güvenliği Kurulumuzla irtibata geçebilirsiniz.
                  </p>
                </div>
                <a
                  href="mailto:hukuk@anatomi3d.med"
                  className="px-6 py-3 rounded-xl bg-[#39b8fd] text-[#001e2f] text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-md shrink-0"
                >
                  Dilekçe &amp; Talep Gönder
                </a>
              </section>
            </div>
          </div>
        </section>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#003752] text-white px-5 py-3 rounded-xl shadow-2xl text-xs font-medium flex items-center gap-2 border border-[#39b8fd]/30 animate-bounce">
          <span className="material-symbols-outlined text-[18px] text-[#39b8fd]">info</span>
          {toastMessage}
        </div>
      )}

      <Footer />
    </div>
  );
}
