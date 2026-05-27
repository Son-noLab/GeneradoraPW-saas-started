-- Tabla de solicitudes de ingreso (formulario /unete)
create table if not exists public.solicitudes (
  id         uuid        primary key default gen_random_uuid(),
  nombre     text        not null,
  telefono   text        not null,
  correo     text        not null,
  ciudad     text,
  como_supo  text,
  notas      text,
  created_at timestamptz not null default now()
);

alter table public.solicitudes enable row level security;

-- Cualquier visitante puede enviar una solicitud (formulario público)
create policy "Público puede enviar solicitud"
  on public.solicitudes
  for insert
  with check (true);

-- Solo el administrador puede leer solicitudes
create policy "Admin puede leer solicitudes"
  on public.solicitudes
  for select
  using (auth.jwt() ->> 'email' = 'sx.morejon@gmail.com');
