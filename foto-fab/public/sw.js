// const cacheName = "fotofab";
// const cacheFiles = [
//   "/static/js/bundle.js",
//   "/static/js/main.chunk.js",
//   "/static/js/0.chunk.js",
//   "/index.html",
//   "/offline.html",
//   "/",
//   "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap",
//   "/static/media/logo.87ad28fb.svg",
// ];

// // self.addEventListener("install", async (event) => {
// //   //creating a cache container
// //   const cacheRequest = async () => {
// //     const fotoCache = await caches.open(cacheName).then((cache) => {
// //       cache.delete(cacheFiles);
// //     });
// //     //adding some of the response files fetched from the server to my cached container
// //     return fotoCache.addAll(cacheFiles);
// //   };
// //   event.waitUntil(cacheRequest());
// // });

// this.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(cacheName).then((cache) => {
//       cache.addAll(cacheFiles);
//     })
//   );
// });

// self.addEventListener("activate", (event) => {
//   console.log("Service worker has been successfully activated!");
// });

// // self.addEventListener("fetch", (event) => {
// //   const matchCaches = async () => {
// //     const response = await caches.match(event.request.url);
// //     if (response === undefined)
// //       return fetch(event.request.url).catch((err) => {
// //         return caches.match("/offline.html");
// //       });
// //     return response;
// //   };
// //   event.respondWith(matchCaches());
// // });

// // this.addEventListener("fetch", (event) => {
// //   event.respondWith(
// //     caches.match(event.request).then((result) => {
// //       if (result) {
// //         return result;
// //       }
// //     })
// //   );
// // });
addEventListener("install", (event) => {
  event.waitUntil(
    (async function () {
      const cache = await caches.open("foto-fab");
      await cache.addAll([
        "/offline.html",
        "https://fonts.googleapis.com/css2?family=Work+Sans:wght@600;700&display=swap",
      ]);
    })()
  );
});

addEventListener("activate", (event) => {
  event.waitUntil(
    (async function () {
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );
});

addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.headers.has("range")) return;
  event.respondWith(
    (async function () {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) return cachedResponse;
      try {
        const response = await event.preloadResponse;
        if (response) return response;
        return await fetch(request);
      } catch (err) {
        if (request.mode === "navigate") {
          return caches.match("/offline.html");
        }
        throw err;
      }
    })()
  );
});
