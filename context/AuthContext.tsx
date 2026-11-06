"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  deleteOwnAccount,
  fetchBadges,
  fetchCourseProgress,
  fetchProfile,
  fetchRoadmap,
  persistSession,
  readStoredSession,
  refreshSession,
  signInWithPassword,
  signOutRemote,
  type RemoteBadge,
  type RemoteCourseProgress,
  type RemoteProfile,
  type RemoteRoadmap,
  type SupabaseSession,
} from "@/lib/supabase";

interface AuthContextType {
  session: SupabaseSession | null;
  profile: RemoteProfile | null;
  badges: RemoteBadge[];
  roadmap: RemoteRoadmap | null;
  courseProgress: RemoteCourseProgress[];
  /** true until the stored session has been checked on first load */
  initializing: boolean;
  /** true while profile data is being (re)fetched */
  loadingData: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  refreshData: () => Promise<void>;
  deleteAccount: () => Promise<{ ok: boolean; error?: "missing-function" | "failed" }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SupabaseSession | null>(null);
  const [profile, setProfile] = useState<RemoteProfile | null>(null);
  const [badges, setBadges] = useState<RemoteBadge[]>([]);
  const [roadmap, setRoadmap] = useState<RemoteRoadmap | null>(null);
  const [courseProgress, setCourseProgress] = useState<RemoteCourseProgress[]>([]);
  const [initializing, setInitializing] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const sessionRef = useRef<SupabaseSession | null>(null);

  const applySession = useCallback((next: SupabaseSession | null) => {
    sessionRef.current = next;
    setSession(next);
    persistSession(next);
  }, []);

  const clearData = useCallback(() => {
    setProfile(null);
    setBadges([]);
    setRoadmap(null);
    setCourseProgress([]);
  }, []);

  const loadData = useCallback(async (s: SupabaseSession) => {
    setLoadingData(true);
    const [p, b, r, c] = await Promise.all([
      fetchProfile(s),
      fetchBadges(s),
      fetchRoadmap(s),
      fetchCourseProgress(s),
    ]);
    setProfile(p);
    setBadges(b);
    setRoadmap(r);
    setCourseProgress(c);
    setLoadingData(false);
  }, []);

  // Restore a stored session (refreshing the token when it is close to expiry).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      let stored = readStoredSession();
      if (stored) {
        const nowSec = Math.floor(Date.now() / 1000);
        if (stored.expires_at && stored.expires_at - nowSec < 120) {
          stored = await refreshSession(stored.refresh_token);
        }
      }
      if (cancelled) return;
      if (stored) {
        applySession(stored);
        await loadData(stored);
      } else {
        applySession(null);
      }
      if (!cancelled) setInitializing(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [applySession, loadData]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const result = await signInWithPassword(email, password);
      if (!result.session) return result.error ?? "error";
      applySession(result.session);
      await loadData(result.session);
      return null;
    },
    [applySession, loadData],
  );

  const signOut = useCallback(async () => {
    const current = sessionRef.current;
    applySession(null);
    clearData();
    if (current) await signOutRemote(current.access_token);
  }, [applySession, clearData]);

  const refreshData = useCallback(async () => {
    if (sessionRef.current) await loadData(sessionRef.current);
  }, [loadData]);

  const deleteAccount = useCallback(async () => {
    const current = sessionRef.current;
    if (!current) return { ok: false, error: "failed" as const };
    const result = await deleteOwnAccount(current);
    if (result.ok) {
      applySession(null);
      clearData();
    }
    return result;
  }, [applySession, clearData]);

  const value = useMemo(
    () => ({
      session,
      profile,
      badges,
      roadmap,
      courseProgress,
      initializing,
      loadingData,
      signIn,
      signOut,
      refreshData,
      deleteAccount,
    }),
    [session, profile, badges, roadmap, courseProgress, initializing, loadingData, signIn, signOut, refreshData, deleteAccount],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
