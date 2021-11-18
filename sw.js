self.addEventListener("install", (e) => {
  console.log("service worker has been installed");
  e.waitUntil(
    caches
      .open("Calc-cache")
      .then((cache) =>
        cache.addAll([
          "/compound-interest",
          "/compound-interest/index.html",
          "/compound-interest/js/",
          "/compound-interest/js/app.js",
          "/compound-interest/js/main.js",
          "/compound-interest/fonts/font-awesome-4.7.0",
          "/compound-interest/fonts/poppins",
          "/compound-interest/css/main.css",
          "/compound-interest/css/util.css",
          "/compound-interest/images/icons/favicon.ico",
          "/compound-interest/images/icons/appIcon192.png",
          "/compound-interest/images/icons/appIcon512.png",
          "/compound-interest/vendor/",
          "/compound-interest/manifest.json",
          "/compound-interest/sw.js",
        ])
      )
  );
});
self.addEventListener("fetch", (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});

// Activate

self.addEventListener("activate", (evt) => {
  console.log("service worker has been activated");
});
