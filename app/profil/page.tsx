"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { isSupabaseConfigured } from "@/lib/supabase";

type L10n = { tr: string; en: string };

const LEVEL_THRESHOLDS = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700, 3250, 3850];

const TITLES: Record<string, L10n> = {
  "med-1": { tr: "Tıp Fakültesi • Dönem 1", en: "Medical School • Year 1" },
  "med-2": { tr: "Tıp Fakültesi • Dönem 2", en: "Medical School • Year 2" },
  "med-3": { tr: "Tıp Fakültesi • Dönem 3", en: "Medical School • Year 3" },
  physio: { tr: "Fizyoterapi ve Rehabilitasyon", en: "Physiotherapy & Rehabilitation" },
  dent: { tr: "Diş Hekimliği Fakültesi", en: "School of Dentistry" },
  nursing: { tr: "Hemşirelik Bölümü", en: "School of Nursing" },
  resident: { tr: "Asistan Hekim", en: "Medical Resident" },
  enthusiast: { tr: "Anatomi Araştırmacısı", en: "Anatomy Researcher" },
};

const DEPARTMENTS: Record<string, L10n> = {
  medicine: { tr: "Tıp", en: "Medicine" },
  physiotherapy: { tr: "Fizyoterapi", en: "Physiotherapy" },
  dentistry: { tr: "Diş Hekimliği", en: "Dentistry" },
  nursing: { tr: "Hemşirelik", en: "Nursing" },
  sports: { tr: "Spor Bilimleri", en: "Sports Science" },
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

const GROUPS: Record<string, { label: L10n; color: string }> = {
  skeleton: { label: { tr: "İskelet", en: "Skeleton" }, color: "#b8a77c" },
  nerve: { label: { tr: "Sinir", en: "Nerve" }, color: "#e2b33a" },
  vessel: { label: { tr: "Damar", en: "Vessel" }, color: "#c33d33" },
  muscle: { label: { tr: "Kas", en: "Muscle" }, color: "#c4693a" },
  organ: { label: { tr: "Organ", en: "Organ" }, color: "#a8505a" },
  skin: { label: { tr: "Deri", en: "Skin" }, color: "#dcb48e" },
};

const COURSE_NAMES: Record<string, L10n> = {
  skeletal: { tr: "İskelet Sistemi (Osteoloji)", en: "Skeletal System (Osteology)" },
};

export function resolveL10n(val: unknown, tr: boolean, fallback = "—"): string {
  if (val === null || val === undefined) return fallback;
  if (typeof val === "string") return val;
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  if (typeof val === "object") {
    const obj = val as Record<string, unknown>;
    const picked = tr ? (obj.tr ?? obj.en) : (obj.en ?? obj.tr);
    if (typeof picked === "string") return picked;
    if (typeof picked === "number") return String(picked);
    if (obj.label) return resolveL10n(obj.label, tr, fallback);
    if (obj.title) return resolveL10n(obj.title, tr, fallback);
  }
  return fallback;
}

function badgeLabel(rawId: unknown, tr: boolean): string {
  if (!rawId) return "";
  if (typeof rawId === "object") return resolveL10n(rawId, tr, "");
  const id = String(rawId);
  const m = id.match(/^(lesson|streak|combo|correct|xp)-(\d+|all)$/);
  if (m) {
    const kind = m[1];
    const n = m[2];
    if (kind === "lesson") {
      if (n === "all") return tr ? "Müfredat Tamamlandı" : "Curriculum Completed";
      return tr ? `${n} Ders Tamamlandı` : `${n} Lessons Completed`;
    }
    if (kind === "streak") return tr ? `${n} Günlük Seri` : `${n}-Day Streak`;
    if (kind === "combo") return tr ? `${n}x Kombo` : `${n}x Combo`;
    if (kind === "correct") return tr ? `${n} Doğru Cevap` : `${n} Correct Answers`;
    if (kind === "xp") return `${n} XP`;
  }
  const mastery: Record<string, L10n> = {
    "master-atlas-5": { tr: "Atlas Ustası", en: "Atlas Master" },
    "master-skeleton": { tr: "İskelet Ustası", en: "Skeleton Master" },
    "master-muscle": { tr: "Kas Ustası", en: "Muscle Master" },
    "master-vessel": { tr: "Damar Ustası", en: "Vessel Master" },
    "master-nerve": { tr: "Sinir Ustası", en: "Nerve Master" },
    "master-organ": { tr: "Organ Ustası", en: "Organ Master" },
  };
  return mastery[id] ? (tr ? mastery[id].tr : mastery[id].en) : id;
}

function levelInfo(xp: number) {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
  const cur = LEVEL_THRESHOLDS[level - 1];
  const next = LEVEL_THRESHOLDS[level];
  const pct = next === undefined ? 100 : Math.round(((xp - cur) / (next - cur)) * 100);
  return { level, next, pct };
}

function dayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function fmtDate(iso: string | undefined, tr: boolean): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(tr ? "tr-TR" : "en-GB", { day: "2-digit", month: "long", year: "numeric" });
}

function StatCard({ icon, label, value, accent }: { icon: string; label: string; value: string; accent: string }) {
  return (
    <div className="p-4 rounded-2xl bg-white border border-[#e5eeff] shadow-sm flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-[#eff4ff] flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-[22px]" style={{ color: accent }}>
          {icon}
        </span>
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[11px] text-[#41474d] truncate">{label}</span>
        <span className="font-mono text-[18px] font-bold text-[#003752]">{value}</span>
      </div>
    </div>
  );
}

function Card({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl border border-[#e5eeff] shadow-sm p-5 flex flex-col gap-4">
      <h2 className="flex items-center gap-2 text-[15px] font-bold text-[#003752] uppercase tracking-tight font-archivo">
        <span className="material-symbols-outlined text-[20px] text-[#006591]">{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-[#eff4ff] last:border-0">
      <span className="text-[12px] text-[#41474d]">{label}</span>
      <span className="text-[13px] font-semibold text-[#0b1c30] text-right break-all">{value}</span>
    </div>
  );
}

export default function ProfilePage() {
  const { language } = useLanguage();
  const tr = language === "tr";
  const tx = (v: unknown, fallback = "—") => resolveL10n(v, tr, fallback);
  const { session, profile, badges, roadmap, courseProgress, initializing, loadingData, signIn, signOut, refreshData, deleteAccount } =
    useAuth();

  // login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // delete flow
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleted, setDeleted] = useState(false);

  const calendar = useMemo(() => {
    const days: { key: string; xp: number; label: string }[] = [];
    // Only computed client-side once the profile has loaded (keeps prerender free of `new Date()`).
    if (!profile) return days;
    const log = profile.day_log ?? {};
    const today = new Date();
    for (let i = 27; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = dayKey(d);
      days.push({ key, xp: log[key] ?? 0, label: String(d.getDate()) });
    }
    return days;
  }, [profile]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setSubmitting(true);
    const err = await signIn(email, password);
    setSubmitting(false);
    if (err) {
      const lower = err.toLowerCase();
      setAuthError(
        lower.includes("invalid")
          ? tr
            ? "E-posta veya şifre hatalı."
            : "Wrong email or password."
          : lower.includes("confirm")
          ? tr
            ? "E-posta adresiniz henüz doğrulanmamış."
            : "Your email address is not confirmed yet."
          : lower === "config"
          ? tr
            ? "Sunucu bağlantısı yapılandırılmamış (.env.local)."
            : "Server connection is not configured (.env.local)."
          : tr
          ? "Giriş yapılamadı. Bağlantınızı kontrol edip tekrar deneyin."
          : "Could not sign in. Check your connection and try again.",
      );
    }
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
    } else if (res.error === "missing-function") {
      setDeleteError(
        tr
          ? "Hesap silme işlevi sunucuda henüz etkinleştirilmemiş. Lütfen yönetici ile iletişime geçin."
          : "The account deletion function is not enabled on the server yet. Please contact the administrator.",
      );
    } else {
      setDeleteError(tr ? "Hesap silinemedi. Lütfen tekrar deneyin." : "Could not delete the account. Please try again.");
    }
  };

  const shell = (content: React.ReactNode) => (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      <Navbar activePath="/profil" />
      <main className="w-full pt-20 flex-1">{content}</main>
      <Footer />
    </div>
  );

  if (deleted) {
    return shell(
      <div className="max-w-md mx-auto px-4 py-20 text-center flex flex-col items-center gap-4">
        <span className="material-symbols-outlined text-[48px] text-emerald-600">check_circle</span>
        <h1 className="text-[22px] font-bold text-[#003752] font-archivo">
          {tr ? "Hesabınız silindi" : "Your account was deleted"}
        </h1>
        <p className="text-[13px] text-[#41474d]">
          {tr
            ? "Profiliniz, ilerlemeniz ve rozetleriniz kalıcı olarak kaldırıldı. Mobil uygulamadaki oturumunuz da sona erdi."
            : "Your profile, progress and badges were permanently removed. Your mobile app session has ended too."}
        </p>
        <Link href="/" className="px-5 py-2.5 rounded-xl bg-[#003752] text-white text-[13px] font-semibold">
          {tr ? "Ana sayfaya dön" : "Back to home"}
        </Link>
      </div>,
    );
  }

  if (initializing) {
    return shell(
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 rounded-full border-2 border-sky-400/30 border-t-sky-400 animate-spin" />
      </div>,
    );
  }

  // ───────────────────────── Signed-out: login ─────────────────────────
  if (!session) {
    return shell(
      <div className="max-w-md mx-auto px-4 py-14 flex flex-col gap-6">
        <div className="text-center flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-2xl bg-[#003752] flex items-center justify-center text-white shadow-md">
            <span className="material-symbols-outlined text-[30px]">person</span>
          </div>
          <h1 className="text-[24px] font-bold text-[#003752] font-archivo uppercase tracking-tight">
            {tr ? "Öğrenci Profili" : "Student Profile"}
          </h1>
          <p className="text-[13px] text-[#41474d]">
            {tr
              ? "Mobil uygulamadaki hesabınızla giriş yapın; ilerlemenizi, rozetlerinizi ve hesap ayarlarınızı burada görün."
              : "Sign in with your mobile app account to see your progress, badges and account settings here."}
          </p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl border border-[#e5eeff] shadow-sm p-5 flex flex-col gap-3">
          <label className="flex flex-col gap-1">
            <span className="text-[12px] font-semibold text-[#003752]">{tr ? "E-posta" : "Email"}</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-[#dce9ff] bg-[#f8f9ff] text-[14px] outline-none focus:border-[#006591]"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[12px] font-semibold text-[#003752]">{tr ? "Şifre" : "Password"}</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-[#dce9ff] bg-[#f8f9ff] text-[14px] outline-none focus:border-[#006591]"
            />
          </label>
          {authError && (
            <p className="text-[12px] text-[#ba1a1a] bg-[#ffdad6] rounded-lg px-3 py-2">{authError}</p>
          )}
          {!isSupabaseConfigured && (
            <p className="text-[12px] text-[#6d001c] bg-[#ffdad6] rounded-lg px-3 py-2">
              {tr ? "NEXT_PUBLIC_SUPABASE_URL / ANON_KEY tanımlı değil." : "NEXT_PUBLIC_SUPABASE_URL / ANON_KEY are not set."}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="mt-1 py-2.5 rounded-xl bg-[#003752] hover:bg-[#1f4e6b] disabled:opacity-60 text-white text-[14px] font-semibold transition-all cursor-pointer"
          >
            {submitting ? (tr ? "Giriş yapılıyor…" : "Signing in…") : tr ? "Giriş Yap" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-[12px] text-[#41474d]">
          {tr ? "Hesabınız yok mu? Hesaplar mobil uygulamadan oluşturulur." : "No account yet? Accounts are created in the mobile app."}{" "}
          <Link href="/topluluk-ve-indir" className="text-[#006591] font-semibold hover:underline">
            {tr ? "Uygulamayı indir" : "Download the app"}
          </Link>
        </p>
      </div>,
    );
  }

  // ───────────────────────── Signed-in ─────────────────────────
  const xp = profile?.total_xp ?? 0;
  const lvl = levelInfo(xp);
  const lessons = profile?.completed_lessons?.length ?? 0;
  const activeDays = calendar.filter((d) => d.xp > 0).length;
  const maxXp = Math.max(1, ...calendar.map((d) => d.xp));
  const groupEntries = Object.entries(profile?.group_stats ?? {});
  const courseMap = new Map<string, { done: number; total: number }>();
  for (const row of courseProgress) {
    const c = courseMap.get(row.course_id) ?? { done: 0, total: 0 };
    c.total += 1;
    if (row.completed) c.done += 1;
    courseMap.set(row.course_id, c);
  }

  return shell(
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-5">
      {/* Header */}
      <section className="rounded-3xl bg-gradient-to-br from-[#003752] to-[#006591] text-white p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[44px]">
            {AVATAR_ICONS[profile?.avatar_id ?? ""] ?? "person"}
          </span>
        </div>
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <h1 className="text-[24px] sm:text-[28px] font-bold font-archivo truncate">
            {resolveL10n(profile?.display_name, tr, session.user.email ?? "—")}
          </h1>
          <span className="font-mono text-[13px] text-sky-200">@{resolveL10n(profile?.handle, tr, "—")}</span>
          <span className="text-[13px] text-sky-100">
            {tx(TITLES[profile?.title_id ?? ""], resolveL10n(profile?.title_id, tr, ""))}
          </span>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-56">
          <div className="flex items-center justify-between w-full text-[12px] font-mono">
            <span className="font-bold">
              {tr ? "Seviye" : "Level"} {lvl.level}
            </span>
            <span className="text-sky-200">
              {xp}
              {lvl.next !== undefined ? ` / ${lvl.next}` : ""} XP
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full bg-[#39b8fd] rounded-full" style={{ width: `${lvl.pct}%` }} />
          </div>
        </div>
      </section>

      {!profile && !loadingData && (
        <div className="rounded-2xl bg-[#fff3cd] border border-[#ffe69c] text-[#664d03] text-[13px] px-4 py-3">
          {tr
            ? "Hesabınız bulundu ancak profil kaydınız henüz oluşmamış. Mobil uygulamadan bir kez giriş yapıp tekrar deneyin."
            : "Your account exists but no profile record was found yet. Sign in once from the mobile app and try again."}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon="local_fire_department" accent="#6d001c" label={tr ? "Aktif Seri" : "Active Streak"} value={`${profile?.streak ?? 0} ${tr ? "gün" : "d"}`} />
        <StatCard icon="bolt" accent="#006591" label={tr ? "Toplam XP" : "Total XP"} value={String(xp)} />
        <StatCard icon="check_circle" accent="#15803d" label={tr ? "Doğru Cevap" : "Correct Answers"} value={String(profile?.total_correct ?? 0)} />
        <StatCard icon="school" accent="#b45309" label={tr ? "Biten Ders" : "Lessons Done"} value={String(lessons)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Calendar */}
          <Card title={tr ? "Son 28 Gün" : "Last 28 Days"} icon="calendar_month">
            <div className="grid grid-cols-7 gap-1.5">
              {calendar.map((d) => {
                const intensity = d.xp === 0 ? 0 : 0.25 + 0.75 * (d.xp / maxXp);
                return (
                  <div
                    key={d.key}
                    title={`${d.key} • ${d.xp} XP`}
                    className="aspect-square rounded-lg flex items-center justify-center text-[10px] font-mono"
                    style={{
                      backgroundColor: d.xp === 0 ? "#eff4ff" : `rgba(0,101,145,${intensity})`,
                      color: d.xp === 0 ? "#72787e" : "#fff",
                    }}
                  >
                    {d.label}
                  </div>
                );
              })}
            </div>
            <p className="text-[12px] text-[#41474d]">
              {tr ? `${activeDays} / 28 gün çalışıldı • En iyi kombo: ${profile?.best_combo ?? 0}` : `${activeDays} / 28 days studied • Best combo: ${profile?.best_combo ?? 0}`}
            </p>
          </Card>

          {/* Mastery */}
          <Card title={tr ? "Sistem Hakimiyeti" : "System Mastery"} icon="insights">
            {groupEntries.length === 0 ? (
              <p className="text-[13px] text-[#41474d]">{tr ? "Henüz sınav verisi yok." : "No quiz data yet."}</p>
            ) : (
              <div className="flex flex-col gap-3">
                {groupEntries.map(([id, m]) => {
                  const pct = m.total > 0 ? Math.round((m.correct / m.total) * 100) : 0;
                  const g = GROUPS[id];
                  return (
                    <div key={id} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="font-semibold text-[#003752]">{g ? tx(g.label) : id}</span>
                        <span className="font-mono text-[#41474d]">
                          %{pct} • {m.correct}/{m.total}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-[#eff4ff] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: g?.color ?? "#006591" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>

          {/* Roadmap & courses */}
          <Card title={tr ? "Öğrenme Yolu & Dersler" : "Learning Path & Courses"} icon="route">
            {roadmap?.milestones && roadmap.milestones.length > 0 ? (
              <ol className="flex flex-col gap-2">
                {roadmap.milestones.map((m) => (
                  <li key={m.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#f8f9ff] border border-[#eff4ff]">
                    <span className="w-7 h-7 rounded-full bg-[#003752] text-white font-mono text-[12px] font-bold flex items-center justify-center shrink-0">
                      {m.stepNumber}
                    </span>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-[13px] font-semibold text-[#0b1c30] truncate">
                        {resolveL10n(m.title, tr, `Aşama ${m.stepNumber}`)}
                      </span>
                      {m.subtitle ? (
                        <span className="text-[11px] text-[#41474d] truncate">
                          {resolveL10n(m.subtitle, tr, "")}
                        </span>
                      ) : null}
                    </div>
                    <span className="font-mono text-[12px] text-[#006591] font-bold">%{Math.round(m.pct)}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-[13px] text-[#41474d]">{tr ? "Henüz kişisel yol haritası oluşturulmamış." : "No personal roadmap generated yet."}</p>
            )}
            {courseMap.size > 0 && (
              <div className="flex flex-col gap-2 pt-1">
                {[...courseMap.entries()].map(([id, c]) => (
                  <div key={id} className="flex items-center justify-between text-[12px] p-3 rounded-xl bg-[#eff4ff]">
                    <span className="font-semibold text-[#003752]">{tx(COURSE_NAMES[id], id)}</span>
                    <span className="font-mono text-[#006591] font-bold">
                      {c.done}/{c.total} {tr ? "modül" : "modules"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          {/* Badges */}
          <Card title={tr ? "Rozetler" : "Badges"} icon="military_tech">
            {badges.length === 0 ? (
              <p className="text-[13px] text-[#41474d]">{tr ? "Henüz rozet kazanılmadı." : "No badges unlocked yet."}</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {badges.map((b) => (
                  <span
                    key={b.badge_id}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                      profile?.featured_badge_ids?.includes(b.badge_id)
                        ? "bg-[#003752] text-white border-[#003752]"
                        : "bg-[#eff4ff] text-[#003752] border-[#dce9ff]"
                    }`}
                  >
                    {badgeLabel(b.badge_id, tr)}
                  </span>
                ))}
              </div>
            )}
          </Card>

          {/* Account details */}
          <Card title={tr ? "Hesap Bilgileri" : "Account Details"} icon="badge">
            <div className="flex flex-col">
              <InfoRow label={tr ? "E-posta" : "Email"} value={session.user.email ?? profile?.email ?? "—"} />
              <InfoRow
                label={tr ? "Bölüm" : "Department"}
                value={tx(DEPARTMENTS[profile?.department ?? ""], resolveL10n(profile?.department, tr, "—"))}
              />
              <InfoRow
                label={tr ? "Çalışma Derinliği" : "Study Depth"}
                value={tx(DEPTHS[profile?.study_depth ?? ""], resolveL10n(profile?.study_depth, tr, "—"))}
              />
              <InfoRow label={tr ? "Günlük Hedef" : "Daily Goal"} value={profile ? `${profile.daily_goal} XP` : "—"} />
              <InfoRow
                label={tr ? "Soru Zorluğu" : "Question Difficulty"}
                value={tx(DIFFICULTIES[profile?.preferred_difficulty ?? ""], resolveL10n(profile?.preferred_difficulty, tr, "—"))}
              />
              <InfoRow
                label={tr ? "Model Tercihi" : "Body Model"}
                value={profile?.body_sex === "female" ? (tr ? "Kadın" : "Female") : profile?.body_sex === "male" ? (tr ? "Erkek" : "Male") : "—"}
              />
              <InfoRow label={tr ? "Kayıt Tarihi" : "Member Since"} value={fmtDate(session.user.created_at ?? profile?.created_at, tr)} />
              <InfoRow label={tr ? "Son Giriş" : "Last Sign-in"} value={fmtDate(session.user.last_sign_in_at, tr)} />
            </div>
            <p className="text-[11px] text-[#72787e]">
              {tr
                ? "Profil bilgilerini (ad, avatar, hedef) mobil uygulamadan düzenleyebilirsiniz."
                : "You can edit profile details (name, avatar, goal) from the mobile app."}
            </p>
          </Card>

          {/* Session actions */}
          <Card title={tr ? "Oturum" : "Session"} icon="manage_accounts">
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => void refreshData()}
                disabled={loadingData}
                className="py-2 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003752] text-[13px] font-semibold cursor-pointer disabled:opacity-60"
              >
                {loadingData ? (tr ? "Yenileniyor…" : "Refreshing…") : tr ? "Verileri Yenile" : "Refresh Data"}
              </button>
              <button
                type="button"
                onClick={() => void signOut()}
                className="py-2 rounded-xl bg-[#003752] hover:bg-[#1f4e6b] text-white text-[13px] font-semibold cursor-pointer"
              >
                {tr ? "Çıkış Yap" : "Sign Out"}
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Danger zone */}
      <section className="rounded-2xl border border-[#ffdad6] bg-white p-5 flex flex-col gap-3">
        <h2 className="flex items-center gap-2 text-[15px] font-bold text-[#ba1a1a] uppercase tracking-tight font-archivo">
          <span className="material-symbols-outlined text-[20px]">warning</span>
          {tr ? "Tehlikeli Bölge" : "Danger Zone"}
        </h2>
        <p className="text-[13px] text-[#41474d]">
          {tr
            ? "Hesabınızı sildiğinizde profiliniz, XP'niz, serileriniz, rozetleriniz ve ders ilerlemeniz kalıcı olarak silinir. Bu işlem geri alınamaz ve mobil uygulamadaki hesabınızı da kapsar."
            : "Deleting your account permanently removes your profile, XP, streaks, badges and course progress. This cannot be undone and also covers your mobile app account."}
        </p>
        {!deleteOpen ? (
          <button
            type="button"
            onClick={() => setDeleteOpen(true)}
            className="self-start px-4 py-2 rounded-xl border border-[#ba1a1a] text-[#ba1a1a] hover:bg-[#ffdad6] text-[13px] font-semibold cursor-pointer"
          >
            {tr ? "Hesabımı Sil" : "Delete My Account"}
          </button>
        ) : (
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-[#fff8f7] border border-[#ffdad6]">
            <span className="text-[12px] text-[#41474d]">
              {tr ? "Onaylamak için şunu yazın: " : "To confirm, type: "}
              <strong className="font-mono text-[#ba1a1a]">{expectedPhrase}</strong>
            </span>
            <input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="px-3 py-2 rounded-lg border border-[#ffdad6] bg-white text-[14px] outline-none focus:border-[#ba1a1a]"
              autoFocus
            />
            {deleteError && <p className="text-[12px] text-[#ba1a1a]">{deleteError}</p>}
            <div className="flex gap-2">
              <button
                type="button"
                disabled={!canDelete || deleting}
                onClick={() => void handleDelete()}
                className="px-4 py-2 rounded-xl bg-[#ba1a1a] text-white text-[13px] font-semibold disabled:opacity-40 cursor-pointer"
              >
                {deleting ? (tr ? "Siliniyor…" : "Deleting…") : tr ? "Kalıcı Olarak Sil" : "Delete Permanently"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setDeleteOpen(false);
                  setConfirmText("");
                  setDeleteError(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#eff4ff] text-[#003752] text-[13px] font-semibold cursor-pointer"
              >
                {tr ? "Vazgeç" : "Cancel"}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>,
  );
}
