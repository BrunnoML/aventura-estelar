/* ============================================================
   Service Worker — Aventura Estelar 2.0
   - Páginas e código: rede primeiro (pega atualizações na hora),
     cache como reserva (funciona offline).
   - Áudios e assets com hash: cache primeiro (nunca mudam).
   Ao publicar uma versão nova do sw.js, aumente o número em CACHE.
   ============================================================ */
const CACHE = 'aventura-estelar-v3';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', evento => {
  evento.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', evento => {
  evento.waitUntil(
    caches.keys()
      .then(nomes => Promise.all(nomes.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', evento => {
  if(evento.request.method !== 'GET') return;
  const url = new URL(evento.request.url);
  if(url.origin !== self.location.origin) return;

  /* imutáveis (áudio + arquivos com hash do Vite): cache primeiro */
  const imutavel = url.pathname.includes('/audio/') || url.pathname.includes('/assets/');
  if(imutavel){
    evento.respondWith(
      caches.match(evento.request).then(r => r || fetch(evento.request).then(resposta => {
        if(resposta.ok){
          const copia = resposta.clone();
          caches.open(CACHE).then(c => c.put(evento.request, copia));
        }
        return resposta;
      }))
    );
    return;
  }

  /* resto: rede primeiro, cache como reserva */
  evento.respondWith(
    fetch(evento.request)
      .then(resposta => {
        if(resposta.ok){
          const copia = resposta.clone();
          caches.open(CACHE).then(c => c.put(evento.request, copia));
        }
        return resposta;
      })
      .catch(() => caches.match(evento.request).then(r => r || caches.match('./index.html')))
  );
});
