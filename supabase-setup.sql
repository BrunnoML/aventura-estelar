-- ============================================================
-- Aventura Estelar — banco de dados no Supabase
-- Cole este arquivo inteiro no SQL Editor do Supabase e clique RUN.
--
-- Modelo mínimo (LGPD art. 14 — mínima coleta):
--   guardamos APENAS o progresso do jogo (estrelas, cristais,
--   adesivos, tentativas por habilidade), vinculado ao e-mail
--   do ADULTO responsável. Nenhum dado pessoal da criança.
-- ============================================================

create table if not exists public.progresso (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  dados      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Segurança: cada família só enxerga e altera o próprio progresso
alter table public.progresso enable row level security;

create policy "familia_le_seu_progresso"
  on public.progresso for select
  using (auth.uid() = user_id);

create policy "familia_cria_seu_progresso"
  on public.progresso for insert
  with check (auth.uid() = user_id);

create policy "familia_atualiza_seu_progresso"
  on public.progresso for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
