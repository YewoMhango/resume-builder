var CACHE_NAME = "resume-builder";
var urlsToCache = [
  "/CV.svg",
  "/fonts/Times New Roman/times new roman.ttf",
  "/fonts/Times New Roman/times new roman italic.ttf",
  "/fonts/Times New Roman/times new roman bold.ttf",
  "/fonts/Times New Roman/times new roman bold italic.ttf",
  "/fonts/Lato/Lato-Bold.ttf",
  "/fonts/Lato/Lato-Light.ttf",
  "/fonts/Lato/Lato-Medium.ttf",
  "/fonts/Lato/Lato-Regular.ttf",
  "/fonts/Lato/Lato-Semibold.ttf",
  "/fonts/Bert-Sans/BertSans-Bold.ttf",
  "/fonts/Bert-Sans/BertSans-Black.ttf",
];

// Install a service worker
self.addEventListener("install", (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Cache and return requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Update a service worker
self.addEventListener("activate", (event) => {
  var cacheWhitelist = ["resume-builder"];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
