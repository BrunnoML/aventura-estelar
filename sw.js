/* ============================================================
   Service Worker — Aventura Estelar
   Estratégia: rede primeiro (pega atualizações do GitHub Pages
   assim que você publica), cache como reserva (funciona offline
   no avião, no sítio da avó, em qualquer lugar).
   Ao publicar uma versão nova, aumente o número em CACHE.
   ============================================================ */
const CACHE = 'aventura-estelar-v1';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

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
  if (evento.request.method !== 'GET') return;
  evento.respondWith(
    fetch(evento.request)
      .then(resposta => {
        // guarda cópia no cache para quando estiver offline
        if (resposta.ok && evento.request.url.startsWith(self.location.origin)) {
          const copia = resposta.clone();
          caches.open(CACHE).then(c => c.put(evento.request, copia));
        }
        return resposta;
      })
      .catch(() =>
        caches.match(evento.request).then(r => r || caches.match('./index.html'))
      )
  );
});
