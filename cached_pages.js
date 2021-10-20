const cacheName = "v1";

const cacheAssets = ["index.html", "about.html", "js/main.js"];

// Call install event
self.addEventListener("install", (event) => {
  console.log("Service worker installed ", event);

  // waitUntil(Promise) will ensure that the install event is not considered complete
  // until all core caches it depends on are populated

  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("Service worker: Caching files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

//Calling activate event
self.addEventListener("activate", (event) => {
  console.log("Service worker activated", event);

  //Removing unwanted caches
  //Deleting caches which doesnt have the name above
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache != cacheName) {
            console.log(`Service Worker: clearing ${cache} cache`);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

//Call fetch event: to show files in the offline mode
self.addEventListener("fetch", (event) => {
  console.log("Service worker: Fetching");
  //event.request will fail in offile mode thats why .catch()
  //event.request will be index.html, about.html..........
  event.respondWith(fetch(event.request).catch(() => caches.match(e.request)));
});
