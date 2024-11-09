self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('activity-cache').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/styles.css',
          '/script.js',
          '/activityData.json'
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
  