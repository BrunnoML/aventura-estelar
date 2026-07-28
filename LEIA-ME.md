# 🚀 Aventura Estelar 2.0 — Guia de Publicação

Esta pasta (`publicacao/`) é **gerada automaticamente**. Ela tem tudo que o
jogo precisa para rodar como aplicativo (PWA) com sincronização entre os
aparelhos da família.

> ⚠️ **Não edite arquivos aqui dentro.** O código-fonte do jogo fica em
> `jogo/`. Cada build apaga e recria esta pasta.

## Como gerar esta pasta

```bash
cd jogo && npm install && npm run build
```

O jogo inteiro (HTML, CSS, JavaScript e os áudios de voz) é montado em
`publicacao/`, pronto para enviar ao GitHub.

## Arquivos gerados

| Arquivo | Para que serve |
|---|---|
| `index.html` | A casca do jogo |
| `assets/` | Código e estilos do jogo (nomes com código, para o celular sempre pegar a versão nova) |
| `audio/` | As vozes do jogo em MP3 + `catalogo.json` com os tempos de cada fala |
| `manifest.webmanifest` | Faz o navegador tratar o jogo como aplicativo instalável |
| `icon-192.png` / `icon-512.png` | Ícone do app na tela do celular |
| `sw.js` | Service worker: funciona OFFLINE e atualiza sozinho |
| `supabase-setup.sql` | Cria o banco de dados no Supabase (rodar uma vez) |

## Sobre as vozes (o que mudou na versão 2.0)

As falas **não são mais lidas pelo robô do celular**. Elas são gravadas
antes, com voz neural (a mesma da Microsoft Edge), em ritmo bem devagar
para uma criança de 6 anos. Resultado: a voz é **idêntica e natural em
qualquer aparelho** — celular do pai, da mãe, da avó ou tablet.

Para regerar os áudios (depois de mudar textos do jogo):

```bash
cd jogo && pip3 install edge-tts mutagen && npm run audios
```

O script `scripts/gerar-audios.py` só gera o que falta (tem cache em
`scripts/.clips/`), junta tudo em poucos arquivos MP3 e escreve os tempos
de cada fala. Para deixar a voz **mais lenta ou mais rápida**, mude
`rate` em `scripts/gerar-manifesto.mjs` e apague a pasta `scripts/.clips`.

## Passo 1 — Publicar no GitHub Pages

1. Envie **todo o conteúdo da pasta `publicacao/`** para a raiz do seu
   repositório no GitHub (inclusive as pastas `assets/` e `audio/`).
   Pelo site: **Add file → Upload files** e arraste tudo.
2. Em **Settings → Pages**, confirme: Source = `Deploy from a branch`,
   Branch = `main`, pasta `/ (root)`.
3. O site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.
4. Toda vez que você publicar uma versão nova, os celulares recebem a
   atualização ao abrir o app. Se mudar o `sw.js`, aumente o `v2` do nome
   do cache para `v3`.

## Passo 2 — Criar o banco no Supabase (uma vez só)

1. Em [supabase.com](https://supabase.com), crie um **New project**
   (nome livre, ex.: `aventura-estelar`; guarde a senha do banco).
2. No menu lateral, abra **SQL Editor**, cole TODO o conteúdo de
   `supabase-setup.sql` e clique **RUN**. Deve aparecer "Success".
3. Em **Authentication → URL Configuration**:
   - **Site URL**: cole a URL do seu GitHub Pages (passo 1.3).
   - Em **Redirect URLs**, adicione a mesma URL.
4. Em **Settings → API**, copie **Project URL** e a chave **anon public**.

## Passo 3 — Ligar o jogo à nuvem

1. Abra `jogo/src/nucleo/nuvem.js` e preencha as duas primeiras linhas:
   ```js
   export const SUPABASE_URL = '';      // ex.: 'https://abcdefgh.supabase.co'
   export const SUPABASE_ANON_KEY = ''; // chave "anon public"
   ```
2. Rode `npm run build` de novo e publique a pasta `publicacao/`.

> A chave "anon public" PODE ficar visível no site — ela é feita para isso.
> A segurança vem das regras RLS criadas pelo SQL: cada família só
> acessa o próprio progresso.

## Passo 4 — Conectar cada aparelho da família

1. Abra o jogo no celular → **📊 Para os Pais** → caixinha
   **"☁️ Sincronizar entre aparelhos"**.
2. Digite o e-mail do adulto responsável → **Enviar link mágico**.
3. Abra o e-mail NAQUELE MESMO aparelho e toque no link. Pronto!
4. Repita nos outros aparelhos usando o **mesmo e-mail**. O progresso se
   junta sozinho — estrelas e adesivos nunca se perdem.

## Instalar como aplicativo

- **iPhone/iPad (Safari)**: botão Compartilhar → **Adicionar à Tela de Início**.
- **Android (Chrome)**: menu ⋮ → **Instalar aplicativo**.

## Privacidade (LGPD)

O jogo guarda na nuvem apenas: estrelas, cristais, adesivos e o histórico
de acertos por habilidade — vinculados ao e-mail do adulto. Nenhum nome,
foto, idade ou dado pessoal da criança é coletado.
