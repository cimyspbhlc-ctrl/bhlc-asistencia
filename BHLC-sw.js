const CACHE_NAME = 'bhlc-v4';
const ARCHIVOS = [
  './index.html','./BHLC-asistencia.html','./BHLC-mi-qr.html',
  './BHLC-shared.css','./BHLC-manifest.json','./BHLC-icon-192.png','./BHLC-icon-512.png'
];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ARCHIVOS)));
  self.skipWaiting();
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request)));
});
