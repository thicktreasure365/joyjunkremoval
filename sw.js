const CACHE = "joyjunk-v25";

const PRECACHE = [
  "/",
  "/index.html",
  "/services.html",
  "/about.html",
  "/css/styles.css",
  "/js/main.js",
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);

  // Google Fonts and external CDNs: network-first
  if (url.hostname.includes("fonts.googleapis") || url.hostname.includes("fonts.gstatic")) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }

  // Everything else: cache-first → instant repeat visits
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      });
    })
  );
});
