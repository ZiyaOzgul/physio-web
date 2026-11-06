-- ============================================================================
-- Migration: 20261107_delete_own_account.sql
-- Purpose: lets a signed-in user (mobile app OR the website profile page) permanently
--          delete THEIR OWN account. Not applied automatically - review, then run once
--          on the shared Supabase project (SQL editor or `supabase db push`).
-- Safety:  SECURITY DEFINER but hard-scoped to auth.uid(); anon cannot execute it.
-- ============================================================================

create or replace function public.delete_own_account()
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  -- Child rows first (harmless if the FKs already cascade).
  delete from public.user_course_progress where user_id = uid;
  delete from public.user_badges          where user_id = uid;
  delete from public.user_roadmaps        where user_id = uid;
  delete from public.profiles             where id      = uid;

  -- Finally the auth identity itself (invalidates every session / refresh token).
  delete from auth.users where id = uid;
end;
$$;

revoke all on function public.delete_own_account() from public, anon;
grant execute on function public.delete_own_account() to authenticated;

-- NOTE: if other user-owned tables exist (friends / follows / leaderboards ...), either they
-- reference profiles(id) ON DELETE CASCADE or add an explicit `delete from ...` line above.
