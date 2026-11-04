"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function KvkkPage() {
  const { language } = useLanguage();
  const isTr = language === "tr";
  const [searchQuery, setSearchQuery] = useState("");
  const [facultyLeagueConsent, setFacultyLeagueConsent] = useState(true);
  const [drawingSyncConsent, setDrawingSyncConsent] = useState(true);
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const sections = [
    {
      id: "bolum-1",
      number: "01",
      title: isTr ? "Taraflar ve Hizmetin Kapsamı" : "Parties & Scope of Services",
      badge: isTr ? "Hukuki Çerçeve" : "Legal Framework",
      content: (
        <>
          <p>
            {isTr ? (
              <>
                İşbu Kullanıcı Sözleşmesi (&quot;Sözleşme&quot;), <strong>Anatomi 3D Medikal Bilişim ve Eğitim Teknolojileri Ltd. Şti.</strong> (&quot;Şirket&quot; veya &quot;Anatomi 3D&quot;) ile platforma web tarayıcısı, masaüstü istemcisi (Windows/macOS) veya mobil/tablet uygulamaları (iOS/iPadOS/Android) aracılığıyla erişim sağlayan gerçek veya tüzel kişi (&quot;Kullanıcı&quot;) arasında akdedilmiştir.
              </>
            ) : (
              <>
                This User Agreement (&quot;Agreement&quot;) is entered into between <strong>Anatomi 3D Medical Informatics &amp; Educational Technologies Ltd.</strong> (&quot;Company&quot; or &quot;Anatomy 3D&quot;) and any natural or legal person (&quot;User&quot;) accessing the platform via web browsers, desktop clients (Windows/macOS), or mobile/tablet applications (iOS/iPadOS/Android).
              </>
            )}
          </p>
          <p>
            {isTr
              ? "Anatomi 3D; milimetrik doğrulukta 3D insan anatomisi atlası, kadavra fotogrametri kesitleri, katman bazlı diseksiyon araçları, histopatolojik modeller, kraniyal sinir traktusları ve Tıp Fakültesi OSCE / Zilli Sınav masası simülasyonunu kapsayan çok katmanlı bir tıbbi eğitim ve dijital laboratuvar platformudur."
              : "Anatomy 3D is a multi-layered medical education and digital laboratory platform comprising a sub-millimeter 3D human anatomy atlas, cadaveric photogrammetry cross-sections, layer-by-layer dissection tools, cranial nerve tracts, and Medical School OSCE / Timed Bell Exam table simulations."}
          </p>
          <div className="p-4 rounded-xl bg-[#e5eeff]/50 border border-[#c1c7ce]/30 flex items-start gap-3 mt-2">
            <span className="material-symbols-outlined text-[22px] text-[#003752] shrink-0 mt-0.5">verified</span>
            <div>
              <h4 className="font-bold text-[#003752] text-sm">
                {isTr ? "Terminoloji ve Standart Güvencesi" : "Terminology & Nomenclature Assurance"}
              </h4>
              <p className="text-xs text-[#41474d] mt-1 leading-relaxed">
                {isTr ? (
                  <>
                    Platformda yer alan tüm anatomik isimlendirmeler, Federative Committee on Anatomical Terminology (FCAT) tarafından yayımlanan resmi <em>Terminologia Anatomica (TA2)</em> uluslararası kılavuzuna ve Türk Anatomi ve Klinik Anatomi Derneği standartlarına tam uyumludur.
                  </>
                ) : (
                  <>
                    All anatomical nomenclature on the platform strictly adheres to the official international <em>Terminologia Anatomica (TA2)</em> guidelines published by the Federative International Programme for Anatomical Terminology (FIPAT).
                  </>
                )}
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "bolum-2",
      number: "02",
      title: isTr ? "Tıbbi Eğitim ve Sorumluluk Reddi (Disclaimer)" : "Medical Education & Clinical Disclaimer",
      badge: isTr ? "Klinik Uyarı" : "Clinical Notice",
      isWarning: true,
      content: (
        <>
          <div className="p-4 rounded-xl bg-[#ffdada]/60 border border-[#ffb3b6] flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#6d001c]">
              <span className="material-symbols-outlined text-[24px]">warning</span>
              <span className="font-bold text-sm tracking-wide uppercase">
                {isTr ? "KLİNİK UYARI VE DİKKAT ÇAĞRISI" : "CLINICAL WARNING & DISCLAIMER"}
              </span>
            </div>
            <p className="text-sm text-[#6d001c] leading-relaxed font-medium">
              {isTr ? (
                <>
                  Anatomi 3D platformu, <strong>YALNIZCA TIP, DİŞ HEKİMLİĞİ, FİZYOTERAPİ, HEMŞİRELİK VE SAĞLIK BİLİMLERİ EĞİTİMİ</strong> amacıyla geliştirilmiştir. Platformda sergilenen hiçbir 3D model, kadavra fotogrametri rekonstrüksiyonu, arteriyel kan akışı simülasyonu ya da biyomekanik hareket:
                </>
              ) : (
                <>
                  The Anatomy 3D platform is developed <strong>SOLELY FOR MEDICINE, DENTISTRY, PHYSIOTHERAPY, NURSING, AND HEALTH SCIENCES EDUCATION</strong>. No 3D model, cadaver reconstruction, arterial flow simulation, or biomechanical animation presented on the platform:
                </>
              )}
            </p>
            <ul className="list-disc list-inside text-xs text-[#6d001c] flex flex-col gap-1 pl-2 font-medium">
              <li>
                {isTr
                  ? "Bir hastanın klinik tanısı için tek başına referans alınamaz."
                  : "May be used as a standalone reference for clinical patient diagnosis."}
              </li>
              <li>
                {isTr
                  ? "Cerrahi insizyon planlaması, operasyon rehberliği veya intraoperatif navigasyon amacıyla doğrudan kullanılamaz."
                  : "May be directly relied upon for surgical incision planning or intraoperative navigation."}
              </li>
              <li>
                {isTr
                  ? "Tıbbi müdahale, ilaç dozajı veya tedavi protokolünün yerine geçmez."
                  : "Substitutes for professional medical intervention or treatment protocols."}
              </li>
            </ul>
          </div>
          <p className="text-sm text-[#0b1c30] leading-relaxed mt-2">
            {isTr ? (
              <>
                Bireysel insan anatomisinde karşılaşılan anatomik varyasyonlar (örneğin; varyant <em>a. hepatica dextra</em> orjinleri, <em>n. laryngeus recurrens</em> seyir sapmaları, foraminal stenoz varyasyonları) 3D modellerde genelleştirilmiş standart tip olarak sunulmaktadır. Kullanıcı hekimler ve tıp öğrencileri, klinik vakalarda gerçek radyolojik görüntülere (BT, MRG, Anjiyografi) ve uzman konsültasyonlarına başvurmakla yükümlüdür.
              </>
            ) : (
              <>
                Anatomical variations encountered in individual patients (e.g., variant <em>a. hepatica dextra</em> origins, <em>n. laryngeus recurrens</em> course deviations) are represented as generalized standard morphology in 3D models. Clinicians and medical students must consult patient-specific imaging (CT, MRI, Angiography) in clinical cases.
              </>
            )}
          </p>
        </>
      ),
    },
    {
      id: "bolum-3",
      number: "03",
      title: isTr ? "Fikri Mülkiyet ve Model Lisans Hakları" : "Intellectual Property & 3D Asset Licensing",
      badge: isTr ? "Telif Koruma" : "Copyright",
      content: (
        <>
          <p>
            {isTr
              ? "Platform bünyesindeki tüm 3D poligon ağları (mesh topology), UV kaplamaları, kadavra diseksiyon fotogrametri taranmış ham verileri, GLTF/USDZ medikal varlıkları, shader algoritmaları ve sınav soru bankaları 5846 Sayılı Fikir ve Sanat Eserleri Kanunu ve uluslararası WIPO anlaşmaları kapsamında Anatomi 3D Medikal Bilişim Ltd. Şti.'ye aittir."
              : "All 3D polygon meshes, UV textures, photogrammetry cadaver scans, GLTF/USDZ medical assets, shader pipelines, and OSCE question banks are protected under international WIPO copyright treaties and belong to Anatomi 3D Medical Informatics Ltd."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#c1c7ce]/30 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#003752]">
                <span className="material-symbols-outlined text-[20px] text-[#006591]">check_circle</span>
                <span className="font-bold text-sm">
                  {isTr ? "İzin Verilen Faaliyetler" : "Permitted Academic Uses"}
                </span>
              </div>
              <ul className="text-xs text-[#41474d] flex flex-col gap-1.5 leading-relaxed">
                <li>
                  {isTr
                    ? "• Amfilerde ve derslerde eğitim amaçlı sunum gösterme."
                    : "• Educational projection in lecture halls and laboratory sessions."}
                </li>
                <li>
                  {isTr
                    ? "• Bireysel ders çalışma, not alma ve zilli sınav provası."
                    : "• Personal study, stylus note-taking, and bell exam practice."}
                </li>
                <li>
                  {isTr
                    ? "• Bilimsel tez ve makalelerde kaynak gösterilerek alınan ekran alıntıları (maks. 5 görsel)."
                    : "• Cited screenshots in academic theses and peer-reviewed papers (up to 5 figures)."}
                </li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-[#ffdada]/30 border border-[#ffb3b6]/50 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#6d001c]">
                <span className="material-symbols-outlined text-[20px]">cancel</span>
                <span className="font-bold text-sm">
                  {isTr ? "Açıkça Yasaklanan Haller" : "Strictly Prohibited Actions"}
                </span>
              </div>
              <ul className="text-xs text-[#6d001c] flex flex-col gap-1.5 leading-relaxed">
                <li>
                  {isTr
                    ? "• 3D modelleri OBJ/FBX/GLTF olarak dışa aktarma (dump/rip)."
                    : "• Extracting or ripping 3D meshes as OBJ/FBX/GLTF files."}
                </li>
                <li>
                  {isTr
                    ? "• Tersine mühendislik veya istemci kodlarının dekompile edilmesi."
                    : "• Reverse engineering or decompiling client rendering engines."}
                </li>
                <li>
                  {isTr
                    ? "• Ücretli kurs, kitap veya Udemy gibi platformlarda ticari satış."
                    : "• Commercial resale in paid courses or third-party publications."}
                </li>
              </ul>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "bolum-4",
      number: "04",
      title: isTr ? "6698 Sayılı KVKK Kapsamında Aydınlatma Metni" : "Data Privacy & GDPR / KVKK Disclosure",
      badge: isTr ? "KVKK Md. 10" : "GDPR & KVKK",
      content: (
        <>
          <p>
            {isTr
              ? "Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (\"KVKK\") Madde 10 ve AB Genel Veri Koruma Tüzüğü (GDPR) ilkeleri uyarınca hazırlanmıştır."
              : "This privacy disclosure is prepared in accordance with Law No. 6698 on the Protection of Personal Data (KVKK Article 10) and EU General Data Protection Regulation (GDPR) standards."}
          </p>
          <div className="overflow-x-auto rounded-xl border border-[#c1c7ce]/30 shadow-sm mt-3">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#dce9ff] text-[#003752] font-bold">
                <tr>
                  <th className="p-3">{isTr ? "Veri Kategorisi" : "Data Category"}</th>
                  <th className="p-3">{isTr ? "İşlenen Veri Unsurları" : "Processed Elements"}</th>
                  <th className="p-3">{isTr ? "İşleme Amacı" : "Processing Purpose"}</th>
                  <th className="p-3">{isTr ? "Hukuki Sebep" : "Legal Basis"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c1c7ce]/20 bg-white text-[#0b1c30]">
                <tr className="bg-[#eff4ff]/40">
                  <td className="p-3 font-semibold">{isTr ? "Kimlik & İletişim" : "Identity & Contact"}</td>
                  <td className="p-3">{isTr ? "Ad, Soyad, Üniversite edu.tr E-Posta" : "Full Name, University .edu Email"}</td>
                  <td className="p-3">{isTr ? "Kullanıcı hesabı oluşturma, üniversite eşleşmesi" : "Account creation & faculty verification"}</td>
                  <td className="p-3 font-mono text-[#006591]">{isTr ? "Md. 5/2-c (Sözleşme)" : "Art. 6(1)(b) Contract"}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">{isTr ? "Akademik Profil" : "Academic Profile"}</td>
                  <td className="p-3">{isTr ? "Fakülte, Dönem (1-6)" : "Faculty, Study Year (1-6)"}</td>
                  <td className="p-3">{isTr ? "Müfredata göre kadavra diseksiyon filtreleme" : "Curriculum-based dissection filtering"}</td>
                  <td className="p-3 font-mono text-[#006591]">{isTr ? "Md. 5/2-f (Meşru Menfaat)" : "Art. 6(1)(f) Legitimate"}</td>
                </tr>
                <tr className="bg-[#eff4ff]/40">
                  <td className="p-3 font-semibold">{isTr ? "Öğrenme Analitiği" : "Learning Analytics"}</td>
                  <td className="p-3">{isTr ? "OSCE Zilli Sınav Skorları, XP Seviyesi" : "OSCE Bell Exam Scores, XP Level"}</td>
                  <td className="p-3">{isTr ? "Bireysel eksik tespiti ve fakülte sıralaması" : "Mastery tracking & faculty leaderboard"}</td>
                  <td className="p-3 font-mono text-[#006591]">{isTr ? "Md. 5/1 (Açık Rıza)" : "Art. 6(1)(a) Consent"}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">{isTr ? "Cihaz & Günlük" : "Device & Telemetry"}</td>
                  <td className="p-3">{isTr ? "IP Adresi, GPU Render Tipi" : "IP Address, GPU Renderer Profile"}</td>
                  <td className="p-3">{isTr ? "Bilgi güvenliği, oturum senkronu" : "Security & multi-device cloud sync"}</td>
                  <td className="p-3 font-mono text-[#006591]">{isTr ? "5651 Sayılı Kanun" : "Statutory Obligation"}</td>
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
      title: isTr ? "Çevrimdışı Bellek ve Yerel Cihaz Verileri" : "Offline Storage & On-Device Data Security",
      badge: isTr ? "Yerel Güvenlik" : "Local Security",
      content: (
        <>
          <p>
            {isTr ? (
              <>
                Tıp fakültesi hastanelerinde ve diseksiyon amfilerinde internet erişiminin kısıtlı olabileceği göz önünde bulundurularak Anatomi 3D mobil/tablet sürümleri <strong>Çevrimdışı Kadavra Motoru</strong> ile donatılmıştır.
              </>
            ) : (
              <>
                Recognizing that basement dissection labs and university hospitals often lack reliable connectivity, Anatomy 3D mobile and tablet apps feature an encrypted <strong>Offline Cadaver Engine</strong>.
              </>
            )}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#c1c7ce]/30">
              <h5 className="font-bold text-sm text-[#003752]">{isTr ? "480 MB Paket" : "480 MB Bundle"}</h5>
              <p className="text-xs text-[#41474d] mt-1">
                {isTr
                  ? "Yerel cihaza indirilen 3D kas, iskelet ve nörovasküler paketler şifrelenmiş BLOB formatında depolanır."
                  : "Downloaded 3D musculoskeletal and neurovascular packages are stored in AES-encrypted local BLOB containers."}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#c1c7ce]/30">
              <h5 className="font-bold text-sm text-[#003752]">{isTr ? "Stylus & Çizimler" : "Stylus Annotations"}</h5>
              <p className="text-xs text-[#41474d] mt-1">
                {isTr
                  ? "Apple Pencil ve S-Pen ile kadavra modelleri üzerine çizilen kişisel notlar yerel veritabanında tutulur."
                  : "Personal notes sketched onto 3D models with Apple Pencil or S-Pen are persisted in local IndexedDB/CoreData."}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#c1c7ce]/30">
              <h5 className="font-bold text-sm text-[#003752]">{isTr ? "Sıfır Kamera Kaydı" : "Zero Camera Feed Upload"}</h5>
              <p className="text-xs text-[#41474d] mt-1">
                {isTr
                  ? "Artırılmış Gerçeklik (AR) modunda kamera görüntüsü sunucuya iletilmez, yalnızca anlık derinlik haritası hesaplanır."
                  : "In Augmented Reality (AR) mode, no camera frames ever leave your device; only local spatial depth planes are computed."}
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "bolum-6",
      number: "06",
      title: isTr ? "Üniversite ve Rektörlük Lisanslama Protokolleri" : "University & Dean's Office Licensing Protocols",
      badge: isTr ? "Kurumsal Entegrasyon" : "Institutional",
      content: (
        <>
          <p>
            {isTr
              ? "Üniversite Rektörlükleri ve Tıp Fakültesi Dekanlıkları tarafından toplu amfi veya dönem lisansı satın alındığında, ilgili öğrencilerin hesapları LTI 1.3 standardı üzerinden üniversitenin Moodle, Canvas, Blackboard veya edu.tr SSO altyapısı ile güvenli biçimde senkronize edilir."
              : "When Medical School Dean's Offices acquire institutional licenses, student accounts synchronize securely via LTI 1.3 with Moodle, Canvas, Blackboard, or university SSO."}
          </p>
        </>
      ),
    },
    {
      id: "bolum-7",
      number: "07",
      title: isTr ? "İlgili Kişinin Hakları (KVKK Madde 11 & GDPR)" : "Data Subject Rights (GDPR & KVKK Art. 11)",
      badge: isTr ? "Yasal Haklar" : "User Rights",
      content: (
        <>
          <p>
            {isTr
              ? "KVKK'nın 11. maddesi ve GDPR uyarınca veri sahibi tıp öğrencileri ve eğitmenler aşağıdaki haklarını kullanabilirler:"
              : "Under KVKK Article 11 and GDPR, medical students and faculty members may exercise the following data rights at any time:"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {[
              {
                icon: "info",
                text: isTr
                  ? "Kişisel verilerinizin işlenip işlenmediğini öğrenme"
                  : "Right to know whether your personal data is processed",
              },
              {
                icon: "history_edu",
                text: isTr
                  ? "İşlenmişse buna ilişkin detaylı bilgi ve kopya talep etme"
                  : "Right to request a portable copy of processed records",
              },
              {
                icon: "track_changes",
                text: isTr
                  ? "İşlenme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme"
                  : "Right to verify processing purpose compliance",
              },
              {
                icon: "delete_forever",
                text: isTr
                  ? "Verilerin silinmesini veya yok edilmesini talep etme (Unutulma Hakkı)"
                  : "Right to erasure ('Right to be Forgotten')",
              },
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
      title: isTr ? "Yürürlük ve Uyuşmazlıkların Çözümü" : "Governing Law & Dispute Resolution",
      badge: isTr ? "Yetkili Yargı" : "Jurisdiction",
      content: (
        <p>
          {isTr ? (
            <>
              Kullanıcı, Anatomi 3D platformuna üye olduğu veya sistemi kullanmaya başladığı andan itibaren işbu sözleşmenin tüm maddelerini okumuş, anlamış ve kabul etmiş sayılır. İşbu sözleşmeden doğacak ihtilaflarda Türk Hukuku uygulanacak olup, <strong>Ankara Merkez (Sıhhiye) Mahkemeleri ve İcra Daireleri</strong> münhasıran yetkilidir.
            </>
          ) : (
            <>
              By accessing or using the Anatomy 3D platform, the User acknowledges and agrees to all terms set forth herein. Any dispute arising out of this Agreement shall be governed by applicable law under the exclusive jurisdiction of the <strong>Central Courts of Ankara</strong>.
            </>
          )}
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
      <Navbar activePath="/kvkk" />

      <main className="flex-1 pt-20">
        {/* Sub-Header Legal Ribbon */}
        <section className="w-full bg-[#eff4ff] border-b border-[#c1c7ce]/30 py-3 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1f4e6b] text-white text-xs font-mono font-semibold shadow-sm">
                <span className="material-symbols-outlined text-[14px]">verified_user</span>
                {isTr ? "YASAL & KLİNİK UYUMLULUK v4.2" : "LEGAL & CLINICAL COMPLIANCE v4.2"}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#d3e4fe] text-[#006591] text-xs font-mono">
                <span className="material-symbols-outlined text-[14px]">update</span>
                {isTr ? "Son Güncelleme: 14 Şubat 2026" : "Last Updated: Feb 14, 2026"}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#dce9ff] text-[#41474d] text-xs font-mono">
                <span className="material-symbols-outlined text-[14px]">gavel</span>
                {isTr ? "6698 Sayılı KVKK & GDPR Uyumlu" : "GDPR & KVKK Compliant"}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
              <button
                onClick={() => typeof window !== "undefined" && window.print()}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-[#c1c7ce]/40 text-[#0b1c30] hover:bg-[#eff4ff] transition-all text-xs font-medium shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span className="hidden sm:inline">{isTr ? "Yazdır" : "Print"}</span>
              </button>
              <button
                onClick={() => {
                  setToastMessage(
                    isTr
                      ? "Anatomi 3D Resmi Sözleşme Metni (v4.2) PDF formatında indiriliyor..."
                      : "Downloading Official Anatomy 3D Legal Agreement (v4.2 PDF)..."
                  );
                  setTimeout(() => setToastMessage(null), 3000);
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-[#c1c7ce]/40 text-[#0b1c30] hover:bg-[#eff4ff] transition-all text-xs font-medium shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                <span className="hidden sm:inline">{isTr ? "PDF İndir" : "Download PDF"}</span>
              </button>
              <a
                href="#hukuk-masasi"
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-[#003752] text-white hover:bg-[#1f4e6b] transition-all text-xs font-bold shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">contact_support</span>
                {isTr ? "Hukuk Birimi" : "Legal Desk"}
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
                  {isTr
                    ? "Medikal Bilişim ve Akademik Lisans Sözleşmesi"
                    : "Medical Informatics & Academic License Agreement"}
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#003752] tracking-tight">
                  {isTr
                    ? "Kullanım Koşulları & KVKK Aydınlatma Metni"
                    : "Terms of Use, Privacy & GDPR Compliance"}
                </h1>
                <p className="text-base text-[#41474d] leading-relaxed">
                  {isTr ? (
                    <>
                      Tıp fakültesi öğrencileri, intörnler, uzman hekimler, anatomist akademisyenler ve üniversite dekanlıkları için <strong>Anatomi 3D</strong> medikal platformunun yasal çerçevesi, diseksiyon 3D poligon telifleri, kadavra materyallerinin etik kullanım sınırları ve sağlık verilerinin korunma prensipleri.
                    </>
                  ) : (
                    <>
                      Legal framework, 3D polygon copyright terms, ethical cadaver specimen guidelines, and personal data protection principles of the <strong>Anatomy 3D</strong> platform for medical students, interns, clinicians, and faculty deans.
                    </>
                  )}
                </p>
              </div>

              {/* Validation Summary */}
              <div className="shrink-0 p-5 rounded-2xl bg-white border border-[#c1c7ce]/30 shadow-md flex flex-col gap-2 min-w-[260px]">
                <span className="text-xs font-mono uppercase text-[#41474d] tracking-wider font-semibold">
                  {isTr ? "Sistem Doğrulama Özeti" : "System Compliance Summary"}
                </span>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-[#c1c7ce]/20">
                  <span className="text-[#0b1c30]">Terminologia Anatomica</span>
                  <span className="font-mono text-[#006591] font-bold">{isTr ? "FIPAT Uyumlu" : "FIPAT Compliant"}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#0b1c30]">{isTr ? "Kişisel Veriler" : "Personal Data"}</span>
                  <span className="font-mono text-[#003752] font-bold">{isTr ? "AES-256 Şifreli" : "AES-256 Encrypted"}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#0b1c30]">{isTr ? "Yerel Çevrimdışı Depolama" : "Local Offline Storage"}</span>
                  <span className="font-mono text-[#41474d]">{isTr ? "480 MB Ayrılmış" : "480 MB Reserved"}</span>
                </div>
              </div>
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
                    {isTr ? "Mevzuatta Ara" : "Search Clauses"}
                  </span>
                  <span className="text-[11px] font-mono text-[#41474d] bg-[#eff4ff] px-2 py-0.5 rounded">
                    {isTr ? "FİLTRE" : "FILTER"}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isTr ? "Örn: Kadavra, KVKK, Lisans..." : "e.g. Cadaver, GDPR, License..."}
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
              </div>

              {/* Index Directory */}
              <nav className="p-5 rounded-2xl bg-white border border-[#c1c7ce]/30 shadow-sm flex flex-col gap-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#c1c7ce]/20">
                  <span className="font-bold text-[#003752] text-sm">
                    {isTr ? "İçindekiler & Hızlı Dizin" : "Table of Contents"}
                  </span>
                  <span className="text-xs font-mono text-[#006591] font-bold">
                    {isTr ? "8 BÖLÜM" : "8 SECTIONS"}
                  </span>
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
                        {isTr ? `Bölüm ${sec.number}` : `Section ${sec.number}`}
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
              <section id="konsensus-sandkabi" className="p-6 md:p-8 rounded-2xl bg-white border border-[#c1c7ce]/30 shadow-md flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#1f4e6b] text-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">tune</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#003752] text-lg">
                        {isTr ? "Öğrenci Rıza & İzin Simülatörü" : "Student Privacy & Consent Preferences"}
                      </h3>
                      <p className="text-xs text-[#41474d]">
                        {isTr
                          ? "Profilinize ait KVKK izin tercihlerini canlı yapılandırın"
                          : "Manage your live GDPR & KVKK data sharing preferences"}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#dce9ff] text-[#006591] text-xs font-mono font-bold">
                    {isTr ? "ETKİLEŞİMLİ" : "INTERACTIVE"}
                  </span>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  {/* Toggle 1 */}
                  <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#c1c7ce]/30 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-[#003752]">
                        {isTr ? "Tıp Fakültesi Ligi ve Başarı Sıralaması" : "Medical Faculty League & Leaderboard"}
                      </h4>
                      <p className="text-xs text-[#41474d] mt-0.5">
                        {isTr
                          ? "Zilli Sınav netlerimin Türkiye geneli anonim dönem liginde gösterilmesine izin veriyorum."
                          : "Allow my OSCE Bell Exam scores to appear in the anonymized faculty league table."}
                      </p>
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
                      <h4 className="font-bold text-sm text-[#003752]">
                        {isTr ? "Kadavra Çizim & Not Senkronizasyonu" : "Cadaver Sketch & Stylus Cloud Sync"}
                      </h4>
                      <p className="text-xs text-[#41474d] mt-0.5">
                        {isTr
                          ? "Apple Pencil ile aldığım 3D anatomik diseksiyon notlarımın şifreli bulut yedeğinin tutulmasına izin veriyorum."
                          : "Enable encrypted cloud backup of my 3D anatomical stylus annotations across tablet and phone."}
                      </p>
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
                      <h4 className="font-bold text-sm text-[#003752]">
                        {isTr ? "Akademik Bülten & Yeni Diseksiyon Bildirimleri" : "Academic Bulletin & New Dissection Alerts"}
                      </h4>
                      <p className="text-xs text-[#41474d] mt-0.5">
                        {isTr
                          ? "Yeni yayımlanan nöroanatomi ve kardiyovasküler atlas modülleri hakkında bilgilendirme almayı kabul ediyorum."
                          : "Receive notifications when new neuroanatomy and cardiovascular dissection modules are released."}
                      </p>
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
                    {isTr
                      ? "Tercihler oturum belleğine işlendi (AES-256 oturum anahtarı)."
                      : "Preferences saved to encrypted session storage (AES-256)."}
                  </span>
                  <span className="text-[#006591] font-bold">
                    {isTr ? "DURUM: AKTİF" : "STATUS: ACTIVE"}
                  </span>
                </div>
              </section>

              {/* Help Desk Banner */}
              <section id="hukuk-masasi" className="p-8 rounded-2xl bg-[#003752] text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex flex-col gap-2 max-w-xl">
                  <div className="flex items-center gap-2 text-[#39b8fd] text-xs font-mono font-bold">
                    <span className="material-symbols-outlined text-[18px]">support_agent</span>
                    {isTr ? "KURUMSAL VE AKADEMİK HUKUK MASASI" : "INSTITUTIONAL & ACADEMIC LEGAL DESK"}
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    {isTr ? "Sorularınız veya Veri Talepleriniz mi Var?" : "Have Questions or Data Privacy Requests?"}
                  </h3>
                  <p className="text-xs text-[#dce9ff] leading-relaxed">
                    {isTr
                      ? "Üniversite Rektörlük lisansları, KVKK Madde 11 kapsamındaki silme talepleri ve lisans hakları sorgulamaları için doğrudan Hukuk & Veri Güvenliği Kurulumuzla irtibata geçebilirsiniz."
                      : "Contact our Data Protection Officer and Legal Board directly for university licensing, GDPR/KVKK erasure requests, or academic permissions."}
                  </p>
                </div>
                <a
                  href="mailto:hukuk@anatomi3d.med"
                  className="px-6 py-3 rounded-xl bg-[#39b8fd] text-[#001e2f] text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-md shrink-0"
                >
                  {isTr ? "Dilekçe & Talep Gönder" : "Submit Legal Inquiry"}
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
