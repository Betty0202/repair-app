// 快取版本：之後改了網頁，把 v1 改成 v2，手機才會抓到新版
const CACHE_NAME = 'repair-app-v1';
const FILES = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// 安裝時把檔案存起來（離線也能開）
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)));
  self.skipWaiting();
});

// 清掉舊版本快取
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 先用快取，沒有再上網抓
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
