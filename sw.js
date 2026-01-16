const version=1;
const cacheName = `note-cache-${version}`;
let assets = [
    './',
    './index.html',
    './index.js',
    './style.css',
    './notes.png',
    './manifest.json',
    'https://unpkg.com/dexie@latest/dist/dexie.js'
];
self.addEventListener('install',(ev)=>{
    console.log(`version ${version} installed`)
    ev.waitUntil(
        caches.open(cacheName).then(cache=>{
            cache.addAll(assets).then(()=>{
                console.log(`${cacheName} has been updated`);
            })
        .catch((err)=>{
            console.log(`failed to update ${cacheName + err}`)
        })
})
    )
});

self.addEventListener('activate',(ev)=>{
    console.log('activated');

})

self.addEventListener('fetch',(ev)=>{
    console.log(`fetch for ${ev.request.url}`);
    ev.respondWith(
        caches.match(ev.request)
            .then(cacheRes=>cacheRes || fetch(ev.request))   
    );
})