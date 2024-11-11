self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('activity-cache').then(cache => {
        return cache.addAll([
          '/~hs9166/iste252/PWA/',
          '/~hs9166/iste252/PWA/index.html',
          '/~hs9166/iste252/PWA/styles.css',
          '/~hs9166/iste252/PWA/script.js',
          '/~hs9166/iste252/PWA/activityData.json'
        ]);
      })
    );
    console.log('Service Worker Installed');
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
  