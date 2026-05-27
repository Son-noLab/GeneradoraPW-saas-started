-- Tabla de perfiles de socios
create table if not exists public.profiles (
  id            uuid        primary key references auth.users(id) on delete cascade,
  email         text        not null,
  display_name  text,
  role          text        not null default 'socio',
  active        boolean     not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- RLS
alter table public.profiles enable row level security;

create policy "Socio puede leer su perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Socio puede actualizar su perfil"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Socio puede crear su perfil"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Trigger: crear perfil automáticamente cuando se registra un usuario nuevo
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
