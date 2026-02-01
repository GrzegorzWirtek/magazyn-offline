const CACHE_NAME = 'offline-cache-v1';

const STATIC_FILES = [
	'index.html',
	'results.html',
	'css/main.css',
	'js/main.js',
	'manifest.json',
];

/**
 * INSTALL
 * Cache statycznych plików
 */
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(STATIC_CACHE).then((cache) => {
			return cache.addAll(STATIC_FILES);
		}),
	);

	// nowy SW od razu gotowy
	self.skipWaiting();
});

/**
 * ACTIVATE
 * Usuwanie starych cache
 */
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((keys) =>
			Promise.all(
				keys.map((key) => {
					if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
						return caches.delete(key);
					}
				}),
			),
		),
	);

	self.clients.claim();
});

/**
 * FETCH
 * cache-first + dynamic cache
 */
self.addEventListener('fetch', (event) => {
	// tylko GET
	if (event.request.method !== 'GET') return;

	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			if (cachedResponse) {
				return cachedResponse;
			}

			return fetch(event.request)
				.then((networkResponse) => {
					// nie cache’ujemy np. chrome-extension, blob itp.
					if (
						!networkResponse ||
						networkResponse.status !== 200 ||
						networkResponse.type !== 'basic'
					) {
						return networkResponse;
					}

					return caches.open(DYNAMIC_CACHE).then((cache) => {
						cache.put(event.request, networkResponse.clone());
						return networkResponse;
					});
				})
				.catch(() => {
					// tu możesz dodać fallback offline (opcjonalnie)
				});
		}),
	);
});
