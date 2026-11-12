/**
 * Minimal Supabase client (plain fetch, no extra dependency) that talks to the SAME project
 * as the mobile app. Only the public anon key is used; every request that touches user data
 * carries the signed-in user's JWT, so Row Level Security decides what can be read/changed.
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const SESSION_STORAGE_KEY = "physio.web.session.v1";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export interface SupabaseUser {
  id: string;
  email?: string;
  created_at?: string;
  last_sign_in_at?: string;
}

export interface SupabaseSession {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  user: SupabaseUser;
}

/**
 * Columns of `profiles` the site reads. The table is public (profiles of other users), so its `email` column is closed
 * in the database: `select=*` is refused. The owner's e-mail comes from the session.
 */
const PROFILE_COLUMNS = [
  "id", "handle", "display_name", "title_id", "avatar_id", "department", "study_depth", "daily_goal",
  "preferred_difficulty", "body_sex", "featured_badge_ids", "total_xp", "streak", "total_correct", "best_combo",
  "completed_lessons", "day_log", "group_stats", "created_at", "updated_at",
].join(",");

export interface RemoteProfile {
  id: string;
  handle: string;
  display_name: string;
  title_id: string;
  avatar_id: string;
  department: string;
  study_depth: string;
  daily_goal: number;
  preferred_difficulty: string;
  body_sex: string;
  featured_badge_ids: string[] | null;
  total_xp: number;
  streak: number;
  total_correct: number;
  best_combo: number;
  completed_lessons: string[] | null;
  day_log: Record<string, number> | null;
  group_stats: Record<string, { correct: number; total: number }> | null;
  created_at?: string;
  updated_at?: string;
}

export interface RemoteBadge {
  badge_id: string;
  unlocked_at?: string;
}

export interface RemoteRoadmapMilestone {
  id: string;
  stepNumber: number;
  title: string | { tr?: string; en?: string };
  subtitle?: string | { tr?: string; en?: string };
  focusGroup?: string;
  packId?: string;
  lessonIds?: string[];
  pct: number;
  status: string;
}

export interface RemoteRoadmap {
  department: string;
  study_depth: string;
  recommended_difficulty: string;
  daily_goal_xp: number;
  milestones: RemoteRoadmapMilestone[] | null;
}

export interface RemoteCourseProgress {
  course_id: string;
  module_id: string;
  completed: boolean;
  completed_slide_ids: string[] | null;
  last_slide_index: number;
  updated_at: string;
}

function headers(accessToken?: string): Record<string, string> {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${accessToken ?? SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
  };
}

interface AuthResponse {
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
  expires_in?: number;
  user?: SupabaseUser;
  msg?: string;
  error_description?: string;
  message?: string;
}

function toSession(json: AuthResponse): SupabaseSession | null {
  if (!json.access_token || !json.user) return null;
  return {
    access_token: json.access_token,
    refresh_token: json.refresh_token ?? "",
    expires_at:
      json.expires_at ??
      (json.expires_in ? Math.floor(Date.now() / 1000) + json.expires_in : undefined),
    user: json.user,
  };
}

export function readStoredSession(): SupabaseSession | null {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SupabaseSession;
    if (typeof parsed?.access_token === "string" && typeof parsed?.user?.id === "string") {
      return parsed;
    }
  } catch {
    // ignore corrupt storage
  }
  return null;
}

export function persistSession(session: SupabaseSession | null): void {
  try {
    if (session) localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // storage unavailable (private mode) - session lives in memory only
  }
}

export async function signInWithPassword(
  email: string,
  password: string,
): Promise<{ session?: SupabaseSession; error?: string }> {
  if (!isSupabaseConfigured) return { error: "config" };
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
    });
    const json = (await res.json()) as AuthResponse;
    const session = toSession(json);
    if (!res.ok || !session) {
      return { error: json.error_description ?? json.msg ?? json.message ?? `HTTP ${res.status}` };
    }
    return { session };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "network" };
  }
}

export async function refreshSession(refreshToken: string): Promise<SupabaseSession | null> {
  if (!isSupabaseConfigured || !refreshToken) return null;
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    if (!res.ok) return null;
    return toSession((await res.json()) as AuthResponse);
  } catch {
    return null;
  }
}

export async function signOutRemote(accessToken: string): Promise<void> {
  try {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, { method: "POST", headers: headers(accessToken) });
  } catch {
    // local sign-out still happens
  }
}

export async function sendPasswordReset(email: string): Promise<boolean> {
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/recover`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function getRows<T>(path: string, accessToken: string): Promise<T[] | null> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers: headers(accessToken) });
    if (!res.ok) return null;
    return (await res.json()) as T[];
  } catch {
    return null;
  }
}

export async function fetchProfile(session: SupabaseSession): Promise<RemoteProfile | null> {
  const rows = await getRows<RemoteProfile>(
    `profiles?id=eq.${encodeURIComponent(session.user.id)}&select=${PROFILE_COLUMNS}`,
    session.access_token,
  );
  return rows?.[0] ?? null;
}

export async function fetchBadges(session: SupabaseSession): Promise<RemoteBadge[]> {
  return (
    (await getRows<RemoteBadge>(
      `user_badges?user_id=eq.${encodeURIComponent(session.user.id)}&select=*`,
      session.access_token,
    )) ?? []
  );
}

export async function fetchRoadmap(session: SupabaseSession): Promise<RemoteRoadmap | null> {
  const rows = await getRows<RemoteRoadmap>(
    `user_roadmaps?user_id=eq.${encodeURIComponent(session.user.id)}&select=*`,
    session.access_token,
  );
  return rows?.[0] ?? null;
}

export async function fetchCourseProgress(session: SupabaseSession): Promise<RemoteCourseProgress[]> {
  return (
    (await getRows<RemoteCourseProgress>(
      `user_course_progress?user_id=eq.${encodeURIComponent(session.user.id)}&select=*`,
      session.access_token,
    )) ?? []
  );
}

/**
 * Permanently deletes the signed-in user's account through the `delete_own_account()` RPC
 * (see supabase/migrations/20261107_delete_own_account.sql - it must be applied once on the
 * shared project). Supabase has no client-side "delete me" endpoint, and the service-role key
 * must never ship to a browser, so a SECURITY DEFINER function scoped to auth.uid() is used.
 */
export async function deleteOwnAccount(
  session: SupabaseSession,
): Promise<{ ok: boolean; error?: "missing-function" | "failed" }> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/delete_own_account`, {
      method: "POST",
      headers: headers(session.access_token),
      body: "{}",
    });
    if (res.ok) return { ok: true };
    if (res.status === 404) return { ok: false, error: "missing-function" };
    return { ok: false, error: "failed" };
  } catch {
    return { ok: false, error: "failed" };
  }
}
