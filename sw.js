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
    self.skipWaiting();
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

async function fetchAssets(ev) {
    try{
        const response = await fetch(ev.request)
        return response
    }catch(err){
        const cache =await caches.open(cacheName)
        return cache.match(ev.request)
    }
    
}
self.addEventListener('fetch',(ev)=>{
    console.log(`fetch for ${ev.request.url}`);
    ev.respondWith(fetchAssets(ev))
})