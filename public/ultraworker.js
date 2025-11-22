importScripts("uv/uv.bundle.js");
importScripts("uv/uv.config.js");
importScripts("uv/uv.sw.js");

if (navigator.userAgent.includes("Firefox")) {
  Object.defineProperty(globalThis, "crossOriginIsolated", {
    value: true,
    writable: true,
  });
}

const sw = new UVServiceWorker();

self.addEventListener("install", () => {
  self.skipWaiting();
});

async function handleRequest(event) {
  if (sw.route(event)) {
    return sw.fetch(event);
  }

  return await fetch(event.request);
}

self.addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event));
});
