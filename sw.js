// Офлайн-режим: при установке кладём все файлы приложения в кэш.
// При изменении любых файлов увеличь номер версии — телефон и ноутбук подтянут обновление.
const VERSION = "tw-calendar-v9";
const FILES = [
  "./",
  "index.html",
  "fonts.css",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/apple-touch-icon.png",
  "fonts/xtypewriter-400.woff2",
  "fonts/xtypewriter-700.woff2",
  "fonts/anonymous-pro-cyrillic-400-normal.woff2",
  "fonts/anonymous-pro-cyrillic-700-normal.woff2",
  "fonts/anonymous-pro-latin-400-normal.woff2",
  "fonts/anonymous-pro-latin-700-normal.woff2",
  "fonts/courier-prime-latin-400-normal.woff2",
  "fonts/courier-prime-latin-700-normal.woff2",
  "fonts/golos-text-cyrillic-400-normal.woff2",
  "fonts/golos-text-cyrillic-500-normal.woff2",
  "fonts/golos-text-cyrillic-600-normal.woff2",
  "fonts/golos-text-latin-400-normal.woff2",
  "fonts/golos-text-latin-500-normal.woff2",
  "fonts/golos-text-latin-600-normal.woff2",
  "fonts/pt-mono-cyrillic-400-normal.woff2",
  "fonts/pt-mono-latin-400-normal.woff2",
  "fonts/special-elite-latin-400-normal.woff2"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  // Страница: сначала сеть (чтобы видеть свежую версию), без сети — из кэша.
  if (req.mode === "navigate"){
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put("./", copy)); return r; })
      .catch(() => caches.match("./").then(r => r || caches.match("index.html"))));
    return;
  }
  // Шрифты, иконки и прочее: из кэша, иначе из сети.
  e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => {
    if (res.ok){ const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  })));
});
