/* GenAI Prep — service worker. App-shell caching for offline, mobile-first PWA. */
const CACHE = 'genai-prep-v2';
const ASSETS = [
  '/', '/index.html',
  '/plan', '/plan.html',
  '/roadmap', '/roadmap.html',
  '/prep', '/prep.html',
  '/manifest.webmanifest',
  '/favicon.svg', '/icon-192.png', '/icon-512.png', '/icon-180.png'
];

// Precache the shell (tolerate individual misses so install never fails).
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.allSettled(ASSETS.map((url) => cache.add(url)))
    ).then(() => self.skipWaiting())
  );
});

// Drop old caches on activate.
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // don't touch cross-origin (API calls etc.)

  // Navigations: network-first so content stays fresh, fall back to cache offline.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('/')))
    );
    return;
  }

  // Static assets: cache-first, then network (and cache the result).
  e.respondWith(
    caches.match(req).then((cached) =>
      cached ||
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }).catch(() => cached)
    )
  );
});
