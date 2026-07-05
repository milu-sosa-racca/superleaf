// Service worker de la app Super Leaf.
// Estrategia "network-first": si hay internet, siempre trae la última versión
// (así los cambios se ven al toque) y guarda una copia; sin conexión, usa el cache.
const CACHE = 'superleaf-v2';
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
    fetch(req).then((resp) => {
      // Guardamos una copia fresca para poder usarla sin conexión.
      const copy = resp.clone();
      caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
      return resp;
    }).catch(() => caches.match(req)) // sin internet → lo último que quedó guardado
  );
});
