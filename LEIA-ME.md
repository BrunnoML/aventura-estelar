# 🚀 Aventura Estelar — Guia de Publicação

Esta pasta tem TUDO que o jogo precisa para rodar como aplicativo (PWA)
com sincronização entre os aparelhos da família.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | O jogo completo |
| `manifest.webmanifest` | Faz o navegador tratar o jogo como aplicativo instalável |
| `icon-192.png` / `icon-512.png` | Ícone do app na tela do celular |
| `sw.js` | Service worker: faz o jogo funcionar OFFLINE e atualizar sozinho |
| `supabase-setup.sql` | Cria o banco de dados no Supabase (rodar uma vez) |

## Passo 1 — Publicar no GitHub Pages

1. No seu repositório do GitHub, envie os 5 arquivos acima para a RAIZ
   (`index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`).
   Pode arrastar pelo site do GitHub: **Add file → Upload files**.
2. Em **Settings → Pages**, confirme: Source = `Deploy from a branch`,
   Branch = `main`, pasta `/ (root)`.
3. O site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.
4. Toda vez que você trocar o `index.html` no GitHub, os celulares recebem
   a versão nova ao abrir o app (o service worker busca a rede primeiro).
   Se mudar o `sw.js`, aumente o `v1` do nome do cache para `v2`.

## Passo 2 — Criar o banco no Supabase (uma vez só)

1. Em [supabase.com](https://supabase.com), crie um **New project**
   (nome livre, ex.: `aventura-estelar`; guarde a senha do banco).
2. No menu lateral, abra **SQL Editor**, cole TODO o conteúdo de
   `supabase-setup.sql` e clique **RUN**. Deve aparecer "Success".
3. Em **Authentication → URL Configuration**:
   - **Site URL**: cole a URL do seu GitHub Pages (passo 1.3).
   - Em **Redirect URLs**, adicione a mesma URL.
4. Em **Settings → API** (ou "Project Settings → API"), copie:
   - **Project URL** (algo como `https://abcdefgh.supabase.co`)
   - **anon public** key (um texto longo)

## Passo 3 — Ligar o jogo à nuvem

1. Abra o `index.html` e procure, logo no começo do `<script>`:
   ```js
   const SUPABASE_URL = '';
   const SUPABASE_ANON_KEY = '';
   ```
2. Cole os dois valores do passo 2.4 entre as aspas e salve.
3. Envie o `index.html` atualizado para o GitHub.

> A chave "anon public" PODE ficar visível no site — ela é feita para isso.
> A segurança vem das regras RLS criadas pelo SQL: cada família só
> acessa o próprio progresso.

## Passo 4 — Conectar cada aparelho da família

1. Abra o jogo no celular → **📊 Para os Pais** → caixinha
   **"☁️ Sincronizar entre aparelhos"**.
2. Digite o e-mail do adulto responsável → **Enviar link mágico**.
3. Abra o e-mail NAQUELE MESMO aparelho e toque no link. Pronto!
4. Repita nos outros aparelhos (celular da mãe, da avó, tablet) usando
   o **mesmo e-mail**. O progresso se junta sozinho — estrelas e adesivos
   nunca se perdem (o jogo sempre guarda o melhor resultado de cada um).

> O e-mail gratuito do Supabase envia poucos links por hora — mais que
> suficiente para configurar a família. É coisa de uma vez só por aparelho.

## Instalar como aplicativo

- **iPhone/iPad (Safari)**: botão Compartilhar → **Adicionar à Tela de Início**.
- **Android (Chrome)**: menu ⋮ → **Instalar aplicativo**.

## Privacidade (LGPD)

O jogo guarda na nuvem apenas: estrelas, cristais, adesivos e o histórico
de acertos por habilidade — vinculados ao e-mail do adulto. Nenhum nome,
foto, idade ou dado pessoal da criança é coletado.
