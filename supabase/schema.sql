-- Dashboard — schéma de base. À coller une seule fois dans Supabase > SQL Editor > Run.
-- Chaque table est protégée par Row Level Security : un compte ne voit que ses propres lignes.

-- Aliments et recettes de la bibliothèque. Valeurs nutritionnelles pour UNE portion.
create table if not exists public.items (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users on delete cascade,
  name        text not null check (length(trim(name)) > 0),
  kind        text not null default 'food' check (kind in ('food', 'recipe')),
  emoji       text,
  image_url   text,
  description text,
  ingredients jsonb not null default '[]'::jsonb,   -- [{ "name": "Avoine", "qty": "40 g" }]
  portion     text not null default '1 portion',    -- ce que représente une portion : "1 bol", "100 g"...
  kcal        numeric not null default 0 check (kcal >= 0),
  protein     numeric not null default 0 check (protein >= 0),
  carbs       numeric not null default 0 check (carbs >= 0),
  fat         numeric not null default 0 check (fat >= 0),
  meals       text[] not null default '{}',         -- repas où l'élément est proposé
  favorite    boolean not null default false,
  created_at  timestamptz not null default now()
);

-- Ce qui a été mangé. Les valeurs nutritionnelles sont COPIÉES au moment de l'ajout,
-- pour que l'historique reste exact même si l'aliment est modifié ou supprimé ensuite.
create table if not exists public.entries (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users on delete cascade,
  day        date not null,
  meal       text not null check (meal in ('breakfast', 'lunch', 'snack', 'dinner', 'other')),
  item_id    uuid references public.items on delete set null,
  name       text not null,
  portion    text not null,
  quantity   numeric not null default 1 check (quantity > 0),  -- en portions (0.5 = demi-portion)
  kcal       numeric not null default 0,   -- par portion
  protein    numeric not null default 0,
  carbs      numeric not null default 0,
  fat        numeric not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists entries_user_day on public.entries (user_id, day);
-- Un aliment n'est coché qu'une fois par repas et par jour : on change la quantité, on ne le double pas.
create unique index if not exists entries_one_per_meal on public.entries (user_id, day, meal, item_id);

-- Objectifs quotidiens (une ligne par compte).
create table if not exists public.goals (
  user_id uuid primary key default auth.uid() references auth.users on delete cascade,
  kcal    numeric not null default 2000 check (kcal > 0),
  protein numeric not null default 100 check (protein >= 0),
  carbs   numeric not null default 250 check (carbs >= 0),
  fat     numeric not null default 70 check (fat >= 0)
);

alter table public.items   enable row level security;
alter table public.entries enable row level security;
alter table public.goals   enable row level security;

drop policy if exists "own items" on public.items;
create policy "own items" on public.items
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "own entries" on public.entries;
create policy "own entries" on public.entries
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "own goals" on public.goals;
create policy "own goals" on public.goals
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
