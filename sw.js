// Simple Service Worker for Bíblia RSVP PWA
const CACHE_NAME = 'biblia-rsvp-v3';
const urlsToCache = [
  './',
  './index.html',
  './css/styles.css',
  './js/i18n.js',
  './js/script.js',
  './manifest.json',
  './assets/RSVP.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
      .catch(() => {
        // Offline fallback if needed
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      })
  );
});
