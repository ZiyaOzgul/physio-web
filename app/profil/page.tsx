"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { isSupabaseConfigured } from "@/lib/supabase";

type L10n = { tr: string; en: string };

/** Same level table as the app (PROGRESS_RULES.levelThresholds). */
const LEVEL_THRESHOLDS = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700, 3250, 3850];

const TITLES: Record<string, L10n> = {
  "med-1": { tr: "Tıp Fakültesi · Dönem 1", en: "Medical school · Year 1" },
  "med-2": { tr: "Tıp Fakültesi · Dönem 2", en: "Medical school · Year 2" },
  "med-3": { tr: "Tıp Fakültesi · Dönem 3", en: "Medical school · Year 3" },
  physio: { tr: "Fizyoterapi ve Rehabilitasyon", en: "Physiotherapy and Rehabilitation" },
  dent: { tr: "Diş Hekimliği", en: "Dentistry" },
  nursing: { tr: "Hemşirelik", en: "Nursing" },
  resident: { tr: "Asistan hekim", en: "Resident" },
  enthusiast: { tr: "Anatomi meraklısı", en: "Anatomy enthusiast" },
};
const DEPARTMENTS: Record<string, L10n> = {
  medicine: { tr: "Tıp", en: "Medicine" },
  physiotherapy: { tr: "Fizyoterapi", en: "Physiotherapy" },
  dentistry: { tr: "Diş hekimliği", en: "Dentistry" },
  nursing: { tr: "Hemşirelik", en: "Nursing" },
  sports: { tr: "Spor bilimleri", en: "Sports science" },
  general: { tr: "Genel", en: "General" },
};
const DEPTHS: Record<string, L10n> = {
  foundational: { tr: "Temel", en: "Foundational" },
  clinical: { tr: "Klinik", en: "Clinical" },
  mastery: { tr: "Uzmanlık", en: "Mastery" },
};
const DIFFICULTIES: Record<string, L10n> = {
  easy: { tr: "Kolay", en: "Easy" },
  medium: { tr: "Orta", en: "Medium" },
  hard: { tr: "Zor", en: "Hard" },
};
const AVATAR_ICONS: Record<string, string> = {
  heart: "favorite",
  brain: "psychology",
  bone: "accessibility_new",
  eye: "visibility",
  activity: "monitor_heart",
  shield: "shield",
  award: "workspace_premium",
  flame: "local_fire_department",
};
const GROUPS: Record<string, L10n> = {
  skeleton: { tr: "İskelet", en: "Skeleton" },
  nerve: { tr: "Sinir", en: "Nerves" },
  vessel: { tr: "Damar", en: "Vessels" },
  muscle: { tr: "Kas", en: "Muscles" },
  organ: { tr: "Organ", en: "Organs" },
  skin: { tr: "Deri", en: "Skin" },
};
const COURSE_NAMES: Record<string, L10n> = { skeletal: { tr: "İskelet sistemi", en: "Skeletal system" } };
/** Badge artwork shipped in /public/badges (same ids as the app). */
const BADGE_ART = new Set([
  "combo-10", "combo-5", "correct-200", "correct-30", "correct-5", "correct-50", "lesson-1", "lesson-10", "lesson-14",
  "lesson-15", "lesson-30", "lesson-5", "master-atlas-5", "master-muscle", "master-nerve", "master-skeleton",
  "master-vessel", "streak-14", "streak-3", "streak-30", "streak-7", "xp-200", "xp-2000", "xp-50", "xp-500",
]);

function text(val: unknown, tr: boolean, fallback = "—"): string {
  if (val === null || val === undefined) return fallback;
  if (typeof val === "string") return val;
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  if (typeof val === "object") {
    const o = val as Record<string, unknown>;
    const picked = tr ? (o.tr ?? o.en) : (o.en ?? o.tr);
    if (typeof picked === "string" || typeof picked === "number") return String(picked);
    if (o.label) return text(o.label, tr, fallback);
    if (o.title) return text(o.title, tr, fallback);
  }
  return fallback;
}

function badgeLabel(id: string, tr: boolean): string {
  const m = id.match(/^(lesson|streak|combo|correct|xp)-(\d+|all)$/);
  if (m) {
    const [, kind, n] = m;
    if (kind === "lesson") return n === "all" ? (tr ? "Müfredat bitti" : "Curriculum done") : tr ? `${n} ders` : `${n} lessons`;
    if (kind === "streak") return tr ? `${n} günlük seri` : `${n}-day streak`;
    if (kind === "combo") return tr ? `${n}x kombo` : `${n}x combo`;
    if (kind === "correct") return tr ? `${n} doğru` : `${n} correct`;
    if (kind === "xp") return `${n} XP`;
  }
  const mastery: Record<string, L10n> = {
    "master-atlas-5": { tr: "Atlas ustası", en: "Atlas master" },
    "master-skeleton": { tr: "İskelet ustası", en: "Skeleton master" },
    "master-muscle": { tr: "Kas ustası", en: "Muscle master" },
    "master-vessel": { tr: "Damar ustası", en: "Vessel master" },
    "master-nerve": { tr: "Sinir ustası", en: "Nerve master" },
    "master-organ": { tr: "Organ ustası", en: "Organ master" },
  };
  return mastery[id] ? (tr ? mastery[id].tr : mastery[id].en) : id;
}

function levelInfo(xp: number) {
  let level = 1;
  LEVEL_THRESHOLDS.forEach((t, i) => {
    if (xp >= t) level = i + 1;
  });
  const cur = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const next = LEVEL_THRESHOLDS[level];
  return { level, next, pct: next === undefined ? 100 : Math.round(((xp - cur) / (next - cur)) * 100) };
}

const dayKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function fmtDate(iso: string | undefined, tr: boolean): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString(tr ? "tr-TR" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function Section({ kicker, title, children, aside }: { kicker: string; title: string; children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <section className="pt-8 border-t border-line">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="kicker">{kicker}</span>
          <h2 className="mt-1.5 font-archivo font-semibold text-ink text-[28px] leading-none">{title}</h2>
        </div>
        {aside}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

const inputClass =
  "w-full h-11 px-3 rounded-[10px] border border-line-strong bg-card text-[15px] text-ink outline-none focus:border-accent transition-colors";

export default function ProfilePage() {
  const { language } = useLanguage();
  const tr = language === "tr";
  const tx = (v: unknown, fallback = "—") => text(v, tr, fallback);
  const { session, profile, badges, roadmap, courseProgress, initializing, loadingData, signIn, signOut, refreshData, deleteAccount } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleted, setDeleted] = useState(false);

  // Last 28 days, oldest first; computed only once the profile is there (no `new Date()` during prerender).
  const calendar = useMemo(() => {
    const days: { key: string; xp: number; day: number }[] = [];
    if (!profile) return days;
    const log = profile.day_log ?? {};
    const today = new Date();
    for (let i = 27; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = dayKey(d);
      days.push({ key, xp: log[key] ?? 0, day: d.getDate() });
    }
    return days;
  }, [profile]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setSubmitting(true);
    const err = await signIn(email, password);
    setSubmitting(false);
    if (!err) return;
    const lower = err.toLowerCase();
    setAuthError(
      lower.includes("invalid")
        ? tr ? "E-posta ya da şifre hatalı." : "Wrong e-mail or password."
        : lower.includes("confirm")
        ? tr ? "E-posta adresiniz henüz doğrulanmamış." : "Your e-mail address is not confirmed yet."
        : lower === "config"
        ? tr ? "Sunucu bağlantısı yapılandırılmamış." : "The server connection is not configured."
        : tr ? "Giriş yapılamadı. Bağlantınızı kontrol edip tekrar deneyin." : "Could not sign in. Check your connection and try again.",
    );
  };

  const expectedPhrase = tr ? "HESABIMI SİL" : "DELETE MY ACCOUNT";
  const canDelete = confirmText.trim().toLocaleUpperCase(tr ? "tr-TR" : "en-US") === expectedPhrase;

  const handleDelete = async () => {
    if (!canDelete) return;
    setDeleting(true);
    setDeleteError(null);
    const res = await deleteAccount();
    setDeleting(false);
    if (res.ok) {
      setDeleted(true);
      setDeleteOpen(false);
    } else {
      setDeleteError(
        res.error === "missing-function"
          ? tr ? "Hesap silme sunucuda henüz etkin değil." : "Account deletion is not enabled on the server yet."
          : tr ? "Hesap silinemedi. Lütfen tekrar deneyin." : "Could not delete the account. Please try again.",
      );
    }
  };

  const shell = (content: React.ReactNode) => (
    <div className="min-h-screen flex flex-col bg-ground text-ink">
      <Navbar activePath="/profil" />
      <main className="w-full pt-20 flex-1">{content}</main>
      <Footer />
    </div>
  );

  if (deleted) {
    return shell(
      <div className="max-w-xl mx-auto px-5 py-20">
        <span className="kicker">{tr ? "Hesap" : "Account"}</span>
        <h1 className="mt-3 font-archivo font-semibold text-ink text-[40px] leading-none">{tr ? "Hesabınız silindi" : "Your account was deleted"}</h1>
        <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
          {tr
            ? "Profiliniz, ilerlemeniz ve rozetleriniz kalıcı olarak kaldırıldı. Mobil uygulamadaki oturumunuz da sona erdi."
            : "Your profile, progress and badges were permanently removed. Your session in the mobile app has ended too."}
        </p>
        <Link href="/" className="mt-6 inline-flex items-center h-11 px-5 rounded-[10px] bg-accent-700 hover:bg-accent-800 text-white font-archivo font-semibold uppercase tracking-wide text-[15px]">
          {tr ? "Ana sayfaya dön" : "Back to home"}
        </Link>
      </div>,
    );
  }

  if (initializing) {
    return shell(
      <div className="flex items-center justify-center py-32">
        <div className="w-9 h-9 rounded-full border-2 border-line-strong border-t-accent animate-spin" />
      </div>,
    );
  }

  if (!session) {
    return shell(
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6">
          <span className="kicker">{tr ? "Profil" : "Profile"}</span>
          <h1 className="mt-4 font-archivo font-semibold text-ink text-[44px] sm:text-[56px] leading-[0.98]">
            {tr ? "Uygulamadaki hesabınızla giriş yapın." : "Sign in with your app account."}
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft max-w-[48ch]">
            {tr
              ? "Serinizi, XP'nizi, sistem hakimiyetinizi, rozetlerinizi ve hesap ayarlarınızı burada görürsünüz. Hesaplar mobil uygulamada açılır."
              : "See your streak, XP, mastery by system, badges and account settings here. Accounts are created in the mobile app."}
          </p>
          <Link
            href="/topluluk-ve-indir"
            className="group mt-6 inline-flex items-center gap-2 font-archivo font-semibold uppercase tracking-wide text-[15px] text-accent-700 hover:text-ink transition-colors"
          >
            {tr ? "Mobil uygulama hakkında" : "About the mobile app"}
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1" aria-hidden>
              arrow_forward
            </span>
          </Link>
        </div>

        <form onSubmit={handleLogin} className="lg:col-span-5 lg:col-start-8 rounded-[14px] border border-line bg-card p-6 sm:p-8 flex flex-col gap-4">
          <h2 className="font-archivo font-semibold text-ink text-[26px] leading-none">{tr ? "Giriş yap" : "Sign in"}</h2>
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] text-ink-soft">{tr ? "E-posta" : "E-mail"}</span>
            <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] text-ink-soft">{tr ? "Şifre" : "Password"}</span>
            <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
          </label>
          {authError && (
            <p role="alert" className="text-[14px] text-danger pl-3 border-l-[3px] border-danger">
              {authError}
            </p>
          )}
          {!isSupabaseConfigured && (
            <p className="text-[13px] text-danger pl-3 border-l-[3px] border-danger">
              {tr ? "Sunucu bağlantısı yapılandırılmamış." : "The server connection is not configured."}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="mt-1 h-12 rounded-[10px] bg-accent-700 hover:bg-accent-800 disabled:opacity-60 text-white font-archivo font-semibold uppercase tracking-wide text-[16px] transition-colors cursor-pointer"
          >
            {submitting ? (tr ? "Giriş yapılıyor…" : "Signing in…") : tr ? "Giriş yap" : "Sign in"}
          </button>
        </form>
      </div>,
    );
  }

  // ───────────── signed in ─────────────
  const xp = profile?.total_xp ?? 0;
  const lvl = levelInfo(xp);
  const lessons = profile?.completed_lessons?.length ?? 0;
  const activeDays = calendar.filter((d) => d.xp > 0).length;
  const maxXp = Math.max(1, ...calendar.map((d) => d.xp));
  const mastery = Object.entries(profile?.group_stats ?? {});
  const courses = new Map<string, { done: number; total: number }>();
  for (const row of courseProgress) {
    const c = courses.get(row.course_id) ?? { done: 0, total: 0 };
    c.total += 1;
    if (row.completed) c.done += 1;
    courses.set(row.course_id, c);
  }
  const featured = new Set(profile?.featured_badge_ids ?? []);

  const stats = [
    { v: `${profile?.streak ?? 0}`, k: tr ? "günlük seri" : "day streak" },
    { v: `${xp}`, k: tr ? "toplam XP" : "total XP" },
    { v: `${profile?.total_correct ?? 0}`, k: tr ? "doğru cevap" : "correct answers" },
    { v: `${lessons}`, k: tr ? "biten ders" : "lessons done" },
  ];

  const account: ReadonlyArray<[string, string]> = [
    [tr ? "E-posta" : "E-mail", session.user.email ?? "—"],
    [tr ? "Bölüm" : "Programme", tx(DEPARTMENTS[profile?.department ?? ""], tx(profile?.department))],
    [tr ? "Çalışma derinliği" : "Study depth", tx(DEPTHS[profile?.study_depth ?? ""], tx(profile?.study_depth))],
    [tr ? "Günlük hedef" : "Daily goal", profile ? `${profile.daily_goal} XP` : "—"],
    [tr ? "Soru zorluğu" : "Question difficulty", tx(DIFFICULTIES[profile?.preferred_difficulty ?? ""], tx(profile?.preferred_difficulty))],
    [tr ? "Model" : "Body model", profile?.body_sex === "female" ? (tr ? "Kadın" : "Female") : profile?.body_sex === "male" ? (tr ? "Erkek" : "Male") : "—"],
    [tr ? "Kayıt" : "Member since", fmtDate(session.user.created_at ?? profile?.created_at, tr)],
    [tr ? "Son giriş" : "Last sign-in", fmtDate(session.user.last_sign_in_at, tr)],
  ];

  return shell(
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-10 lg:py-14">
      {/* Who, and how far. */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="flex items-center gap-5 min-w-0">
          <div className="w-20 h-20 rounded-full border border-line-strong bg-card flex items-center justify-center shrink-0 text-accent-700">
            <span className="material-symbols-outlined text-[40px]">{AVATAR_ICONS[profile?.avatar_id ?? ""] ?? "person"}</span>
          </div>
          <div className="min-w-0">
            <span className="kicker">{tx(TITLES[profile?.title_id ?? ""], tx(profile?.title_id, ""))}</span>
            <h1 className="mt-1 font-archivo font-semibold text-ink text-[40px] sm:text-[48px] leading-none truncate">
              {text(profile?.display_name, tr, session.user.email ?? "—")}
            </h1>
            <p className="mt-1 text-[15px] text-ink-soft">@{tx(profile?.handle)}</p>
          </div>
        </div>
        <div className="w-full lg:w-80">
          <div className="flex items-baseline justify-between">
            <span className="font-archivo font-semibold text-ink text-[22px]">
              {tr ? "Seviye" : "Level"} {lvl.level}
            </span>
            <span className="text-[13px] text-ink-soft font-data">
              {xp}
              {lvl.next !== undefined ? ` / ${lvl.next}` : ""} XP
            </span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-line overflow-hidden">
            <div className="h-full rounded-full bg-accent" style={{ width: `${lvl.pct}%` }} />
          </div>
        </div>
      </header>

      {!profile && !loadingData && (
        <p className="mt-8 pl-4 border-l-[3px] border-danger text-[14px] text-ink-soft">
          {tr
            ? "Hesabınız var ama profil kaydı bulunamadı. Mobil uygulamada bir kez giriş yapıp sayfayı yenileyin."
            : "Your account exists but no profile record was found. Sign in once in the mobile app and refresh this page."}
        </p>
      )}

      <dl className="mt-10 grid grid-cols-2 lg:grid-cols-4 border-y border-line">
        {stats.map((s, i) => (
          <div key={s.k} className={`py-5 flex flex-col-reverse ${i % 2 === 1 ? "pl-5 border-l border-line" : ""} ${i === 2 ? "lg:pl-5 lg:border-l border-t lg:border-t-0 border-line" : ""} ${i === 3 ? "border-t lg:border-t-0" : ""}`}>
            <dt className="mt-1 text-[13px] text-ink-soft">{s.k}</dt>
            <dd className="font-archivo font-semibold text-ink text-[40px] leading-none font-data">{s.v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
        <div className="lg:col-span-7 flex flex-col gap-10">
          <Section
            kicker={tr ? "Çalışma takvimi" : "Study calendar"}
            title={tr ? "Son 28 gün" : "Last 28 days"}
            aside={<span className="text-[13px] text-ink-soft">{tr ? `${activeDays} gün çalışıldı` : `${activeDays} days studied`}</span>}
          >
            <div className="grid grid-cols-7 gap-1.5 max-w-md">
              {calendar.map((d) => {
                const share = d.xp === 0 ? 0 : 0.25 + 0.75 * (d.xp / maxXp);
                return (
                  <div
                    key={d.key}
                    title={`${d.key} · ${d.xp} XP`}
                    className="aspect-square rounded-[6px] flex items-center justify-center text-[11px] font-data"
                    style={{
                      backgroundColor: d.xp === 0 ? "var(--fill)" : `rgba(89, 128, 166, ${share})`,
                      color: d.xp === 0 ? "var(--ink-muted)" : share > 0.55 ? "#fff" : "var(--ink)",
                    }}
                  >
                    {d.day}
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-[13px] text-ink-muted">
              {tr ? `En iyi kombo: ${profile?.best_combo ?? 0}` : `Best combo: ${profile?.best_combo ?? 0}`}
            </p>
          </Section>

          <Section kicker={tr ? "Doğruluk" : "Accuracy"} title={tr ? "Sistem hakimiyeti" : "Mastery by system"}>
            {mastery.length === 0 ? (
              <p className="text-[15px] text-ink-soft">{tr ? "Henüz soru çözülmedi." : "No questions answered yet."}</p>
            ) : (
              <ul className="border-t border-line">
                {mastery.map(([id, m]) => {
                  const pct = m.total > 0 ? Math.round((m.correct / m.total) * 100) : 0;
                  return (
                    <li key={id} className="grid grid-cols-[7rem_1fr_auto] items-center gap-4 py-3 border-b border-line">
                      <span className="font-archivo font-semibold text-ink text-[18px]">{GROUPS[id] ? tx(GROUPS[id]) : id}</span>
                      <span className="h-1.5 rounded-full bg-line overflow-hidden">
                        <span className="block h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
                      </span>
                      <span className="text-[13px] text-ink-soft font-data w-24 text-right">
                        %{pct} · {m.correct}/{m.total}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </Section>

          <Section kicker={tr ? "Kişisel plan" : "Personal plan"} title={tr ? "Öğrenme yolu" : "Learning path"}>
            {roadmap?.milestones && roadmap.milestones.length > 0 ? (
              <ol className="border-t border-line">
                {roadmap.milestones.map((m) => (
                  <li key={m.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-3 border-b border-line">
                    <span className="font-archivo font-semibold text-accent-700 text-[15px] font-data">0{m.stepNumber}</span>
                    <span className="min-w-0">
                      <span className="block font-archivo font-semibold text-ink text-[18px] leading-tight truncate">{text(m.title, tr, `${m.stepNumber}`)}</span>
                      {m.subtitle ? <span className="block text-[13px] text-ink-soft truncate">{text(m.subtitle, tr, "")}</span> : null}
                    </span>
                    <span className="text-[13px] text-ink-soft font-data">%{Math.round(m.pct)}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-[15px] text-ink-soft">{tr ? "Kişisel yol haritası henüz oluşturulmamış." : "No personal roadmap yet."}</p>
            )}
            {courses.size > 0 && (
              <ul className="mt-4">
                {[...courses.entries()].map(([id, c]) => (
                  <li key={id} className="flex items-center justify-between py-2 text-[14px]">
                    <span className="text-ink">{tx(COURSE_NAMES[id], id)}</span>
                    <span className="text-ink-soft font-data">
                      {c.done}/{c.total} {tr ? "modül" : "modules"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-10">
          <Section kicker={tr ? `${badges.length} rozet` : `${badges.length} badges`} title={tr ? "Rozetler" : "Badges"}>
            {badges.length === 0 ? (
              <p className="text-[15px] text-ink-soft">{tr ? "Henüz rozet kazanılmadı." : "No badges yet."}</p>
            ) : (
              <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-x-3 gap-y-5">
                {badges.map((b) => (
                  <li key={b.badge_id} className="flex flex-col items-center text-center">
                    {BADGE_ART.has(b.badge_id) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`/badges/${b.badge_id}.png`} alt="" width={64} height={64} className="w-16 h-16 object-contain" />
                    ) : (
                      <span className="w-16 h-16 rounded-full border border-line-strong flex items-center justify-center text-accent-700">
                        <span className="material-symbols-outlined text-[28px]">military_tech</span>
                      </span>
                    )}
                    <span className="mt-1.5 text-[12px] leading-tight text-ink">{badgeLabel(b.badge_id, tr)}</span>
                    {featured.has(b.badge_id) && <span className="text-[11px] text-accent-700">{tr ? "vitrinde" : "featured"}</span>}
                  </li>
                ))}
              </ul>
            )}
          </Section>

          <Section kicker={tr ? "Ayarlar" : "Settings"} title={tr ? "Hesap" : "Account"}>
            <dl className="border-t border-line">
              {account.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-2.5 border-b border-line">
                  <dt className="text-[14px] text-ink-soft">{k}</dt>
                  <dd className="text-[14px] text-ink text-right break-all">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-[13px] text-ink-muted">
              {tr ? "Ad, avatar ve hedef mobil uygulamadan değiştirilir." : "Name, avatar and goal are changed in the mobile app."}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void refreshData()}
                disabled={loadingData}
                className="h-10 px-4 rounded-[10px] border border-line-strong hover:border-ink text-ink text-[14px] transition-colors cursor-pointer disabled:opacity-60"
              >
                {loadingData ? (tr ? "Yenileniyor…" : "Refreshing…") : tr ? "Verileri yenile" : "Refresh data"}
              </button>
              <button
                type="button"
                onClick={() => void signOut()}
                className="h-10 px-4 rounded-[10px] bg-accent-700 hover:bg-accent-800 text-white text-[14px] transition-colors cursor-pointer"
              >
                {tr ? "Çıkış yap" : "Sign out"}
              </button>
            </div>
          </Section>

          <section className="pt-8 border-t border-line">
            <span className="kicker !text-danger">{tr ? "Kalıcı işlem" : "Permanent"}</span>
            <h2 className="mt-1.5 font-archivo font-semibold text-ink text-[28px] leading-none">{tr ? "Hesabı sil" : "Delete the account"}</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
              {tr
                ? "Profiliniz, XP'niz, seriniz, rozetleriniz ve ders ilerlemeniz kalıcı olarak silinir. Geri alınamaz; mobil uygulamadaki hesabınız da silinir."
                : "Your profile, XP, streak, badges and course progress are deleted for good. This cannot be undone and removes your mobile app account too."}
            </p>
            {!deleteOpen ? (
              <button
                type="button"
                onClick={() => setDeleteOpen(true)}
                className="mt-4 h-10 px-4 rounded-[10px] border border-danger text-danger hover:bg-danger hover:text-white text-[14px] transition-colors cursor-pointer"
              >
                {tr ? "Hesabımı sil" : "Delete my account"}
              </button>
            ) : (
              <div className="mt-4 pl-4 border-l-[3px] border-danger flex flex-col gap-3">
                <label className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-ink-soft">
                    {tr ? "Onaylamak için yazın: " : "To confirm, type: "}
                    <strong className="text-danger font-semibold">{expectedPhrase}</strong>
                  </span>
                  <input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} className={inputClass} autoFocus />
                </label>
                {deleteError && (
                  <p role="alert" className="text-[13px] text-danger">
                    {deleteError}
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={!canDelete || deleting}
                    onClick={() => void handleDelete()}
                    className="h-10 px-4 rounded-[10px] bg-danger text-white text-[14px] disabled:opacity-40 cursor-pointer"
                  >
                    {deleting ? (tr ? "Siliniyor…" : "Deleting…") : tr ? "Kalıcı olarak sil" : "Delete permanently"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDeleteOpen(false);
                      setConfirmText("");
                      setDeleteError(null);
                    }}
                    className="h-10 px-4 rounded-[10px] border border-line-strong text-ink text-[14px] cursor-pointer"
                  >
                    {tr ? "Vazgeç" : "Cancel"}
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>,
  );
}
