-- Columna avatar en profiles
alter table public.profiles add column if not exists avatar_url text;

-- Bucket público para avatares
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Políticas de storage
create policy "Avatares públicos — lectura"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Socio sube su propio avatar"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Socio actualiza su propio avatar"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Socio elimina su propio avatar"
  on storage.objects for delete
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
