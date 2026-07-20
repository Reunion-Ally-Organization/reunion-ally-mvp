-- ============================================================
-- Reunion Ally — Supabase Database Schema (Phase 1)
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- ── Profiles ────────────────────────────────────────────────
-- One profile per user, linked to auth.users
create table public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  full_name   text,
  avatar_url  text,
  phone       text,
  created_at  timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Reunions ─────────────────────────────────────────────────
create table public.reunions (
  id              uuid default gen_random_uuid() primary key,
  name            text not null,
  description     text,
  date            date,
  location        text,
  cover_image_url text,
  organizer_id    uuid references public.profiles(id) on delete cascade not null,
  is_public       boolean default false,
  created_at      timestamptz default now() not null
);

alter table public.reunions enable row level security;

create policy "Organizers have full access to their reunions"
  on public.reunions for all
  using (auth.uid() = organizer_id);

create policy "Members can view reunions they belong to"
  on public.reunions for select
  using (
    exists (
      select 1 from public.reunion_members
      where reunion_id = id and user_id = auth.uid()
    )
  );

-- ── Reunion Members ──────────────────────────────────────────
create table public.reunion_members (
  id           uuid default gen_random_uuid() primary key,
  reunion_id   uuid references public.reunions(id) on delete cascade not null,
  user_id      uuid references public.profiles(id) on delete cascade not null,
  role         text check (role in ('organizer', 'attendee', 'invited')) default 'attendee',
  rsvp_status  text check (rsvp_status in ('yes', 'no', 'maybe', 'pending')) default 'pending',
  joined_at    timestamptz default now() not null,
  unique (reunion_id, user_id)
);

alter table public.reunion_members enable row level security;

create policy "Users can view their own memberships"
  on public.reunion_members for select
  using (auth.uid() = user_id);

create policy "Organizers can manage reunion members"
  on public.reunion_members for all
  using (
    exists (
      select 1 from public.reunions
      where id = reunion_id and organizer_id = auth.uid()
    )
  );
