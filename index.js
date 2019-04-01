let staticCacheName = 'restaurant-static-v1';
var CACHE_NAME = 'restaurant-cache-v1';


let cachedPages = [
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/responsive.css',
        '/css/styles.css',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/data/restaurants.json',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
                ];
/**
 * Install Service Worker.
 */

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            return cache.addAll(cachedPages);
        })
    );

});

/**
 * Fetch the events
 */


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        else {
            return fetch(event.request)
            .then(function(response) {
                const clonedResponse = response.clone();
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(event.request, clonedResponse);
                })
                return response;
            })
            .catch(function(err) {
                console.log(err);
            });
        }
    })
  );
});