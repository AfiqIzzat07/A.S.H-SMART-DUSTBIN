const CACHE_NAME = "dustbin-cache-v1";
const urlsToCache = ["/","/index.html","/manifest.json"];

self.addEventListener("install", e=>{ e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(urlsToCache))) });
self.addEventListener("activate", e=>console.log("SW activated"));
self.addEventListener("fetch", e=>{ e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))) });
