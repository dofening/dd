// 离线缓存：页面优先联网取最新版，失败时用缓存；带哈希名的程序文件取过一次就长期缓存。
// 只缓存本站文件，Spotify 和歌词库的请求从不经过缓存。
const CACHE = 'folia-lyrics-20261105-hdr-v3';
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(['./', './index.html', './manifest.webmanifest', './icon-192.png']))); self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('folia-lyrics-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
  const request = event.request; const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    // 授权回跳 URL 不能进入离线缓存，避免把短期 code / state 写入缓存。
    if (url.searchParams.has('code') || url.searchParams.has('state') || url.searchParams.has('error')) return;
    event.respondWith(fetch(request).then(response => { if (response.ok) { const copy = response.clone(); event.waitUntil(caches.open(CACHE).then(cache => cache.put('./index.html', copy))); } return response; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(request).then(hit => hit || fetch(request).then(response => {
    if (response.ok) { const copy = response.clone(); void caches.open(CACHE).then(cache => cache.put(request, copy)); }
    return response;
  })));
});
