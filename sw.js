// 08/12/18
// Service worker

const staticCacheName = 'restaurant-cache-v1';
const urlsToCache = [
    '/',
    'index.html',
    'restaurant.html',

    'css/styles.css',
    'css/Responsive.css',

    'js/dbhelper.js',
    'js/main.js',
    'js/restaurant_info.js',
    'js/swregistration.js',

    'data/restaurants.json',


    './restaurant.html?id=1',
    './restaurant.html?id=2',
    './restaurant.html?id=3',
    './restaurant.html?id=4',
    './restaurant.html?id=5',
    './restaurant.html?id=6',
    './restaurant.html?id=7',
    './restaurant.html?id=8',
    './restaurant.html?id=9',
    './restaurant.html?id=10',

    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg'

];

/*
  Install, Activate and Fetch Events  
*/
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches
        .open(staticCacheName)
        .then((cache) => {
            console.log('Cache Opened: Service worker caching files');
            return cache.addAll(urlsToCache)
                .then(self.skipWaiting());
        })
    );

})

//Clean old caches (Remove data not longer needed)
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cacheName) => {
                    return cacheName.startsWith('restaurant-') &&
                        cacheName != staticCacheName;
                }).map((cacheName) => {
                    console.log('Service Worker Clearing old cache')
                    return caches.delete(cacheName);
                })
            );
        })
    );
});


self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
        .then((response) => {
            if (response) {
                return response;
            }

            /*Request resource from network and save it into the cache
              to retrieve when the site is offline*/

            var fetchRequest = e.request.clone();
            console.log('Service worker: fetching')
            return fetch(fetchRequest)
                .then((response) => {
                    //Check for a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    var responseToCache = response.clone();
                    caches.open(staticCacheName)
                        .then((cache) => {
                            cache.put(e.request, responseToCache) //Add the resources to the cache
                        })
                    return response;
                    // console.log(response);
                    //In the case, all fails                
                }).catch(() => {
                    //fallback gallery
                    return caches.match('imgFallback/table.jpg');
                })
        })
    );

})