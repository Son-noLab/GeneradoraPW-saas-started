-- Corrige la política UPDATE (faltaba WITH CHECK)
drop policy if exists "Socio puede actualizar su perfil" on public.profiles;
create policy "Socio puede actualizar su perfil"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Campos adicionales del perfil
alter table public.profiles
  add column if not exists phone      text,
  add column if not exists city       text,
  add column if not exists level      text not null default 'junior',
  add column if not exists join_date  timestamptz not null default now();

-- El trigger ahora también registra join_date
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, join_date)
  values (new.id, new.email, now())
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Niveles válidos: junior | senior | director
-- El admin cambia el level directamente en la tabla profiles.
-- Los socios no pueden cambiar su propio level (no está en with check fields que ellos editan).
