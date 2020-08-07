const cacheName = 'Version1.2';
const enCache = [
    "./index.html",
    "./splash512.png",
    "./app.bundle.js",
    "./favicon.png",
    "./0143b66e557cbde52566e9e8c6dc3e8b.gif",
    "./1b75f430ad972490bb01c6051672f36b.png",
    "./1fbe4606f65f268a298d1e1ba74e63af.gif",
    "./2294bf5c2ea8bd7fd995c655c029cd11.png",
    "./2326ae3f398855d3c06e71705289ec2a.png",
    "./350970eff74f8040e70914eb08f6cac4.gif",
    "./426aca62ab092edf4f49bec7536b0c14.gif",
    "./7bde426245e8d0cfa60282250ab88a84.gif",
    "./7e3a40d9fb3f9a1704205cada9f4fad2.jpg",
    "./867e79fb719cde3571ac5aa38f641209.gif",
    "./86b31362823cf132c848e2ee6e8b641f.jpg",
    "./8eae8f7f584da0ac83bb7640aade83b6.jpg",
    "./8f8bf56cf429a2b480edb8d35ac5f12a.png",
    "./a44d48a6e5f2b9c30b3b47d075c5f40d.png",
    "./ab501463fe4c7027249a6523e5e2f2b1.png",
    "./b219acf07528024839754e25fdc98df1.gif",
    "./b300511ff702dab747b74c4b98a4f004.png",
    "./b6474bdcb3baf3e0bddf9c49400ebd1b.jpg",
    "./c9852356cd3569b8290e518bdff3c2cb.png",
    "./ddd15ed92d86ff6888295561b7b8462c.png",
    "./fd623af4fb8949433a0e90db4fed70ae.gif",
    "./icon-ipad.png",
    "./icon-ipadretina.png",
    "./icon-iphone.png",
    "./icon-retina.png",
    "./launch-640x1136.png",
    "./launch-750x1294.png"

]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll(enCache))
    );
});

self.addEventListener('message', function (event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cName) {
                    return cName != cacheName
                }).map(function (cName) {
                    return caches.delete(cName);
                })
            );
        })
    );
});