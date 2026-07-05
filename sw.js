// Service worker de la app Super Leaf.
// Cachea el "esqueleto" para que la app abra y funcione sin conexión,
// y guarda imágenes/páginas a medida que se visitan.
const CACHE = 'superleaf-v1';
const SHELL = [
  './',
  './index.html',
  './super-leaf-y-el-bosque-magico.html',
  './super-leaf-y-la-fairy-hero-academy.html',
  './Cumple-super-leaf-y-el-bosque-magico.html',
  './css/styles.css',
  './js/app.js',
  './img/icons/icon-192.png',
  './img/icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((resp) => {
        // Guardamos una copia para la próxima (imágenes, capítulos, etc.)
        const copy = resp.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return resp;
      }).catch(() => cached);
    })
  );
});
