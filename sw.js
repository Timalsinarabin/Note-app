const version=2;
const cacheName = `note-cache-${version}`;
let assets = [
   './',
    './index.html',
    './js/index.js',
    './js/mode.js',
    './js/swregister.js',
    './js/pagination.js',
    './assets/style/style.css',
    './assets/notes.png',
    './manifest.json',
    'https://unpkg.com/dexie@latest/dist/dexie.js'
];
self.addEventListener('install',(ev)=>{
    console.log(`version ${version} installed`);
    self.skipWaiting();

    ev.waitUntil(
        caches.open(cacheName)
            .then(cache=> cache.addAll(assets))
            .then(()=>console.log(`${cacheName} has been updated`))
            .catch((err)=>console.log(`failed to update ${cacheName + err}`))
    );
});

self.addEventListener('activate',(ev)=>{
    ev.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== cacheName)
                    .map(key => caches.delete(key))
            )
        )
    );
    self.clients.claim();
    console.log("activated");

})

async function fetchAssets(ev) {
    try{
        return await fetch(ev.request)
    }catch{
        const cache =await caches.open(cacheName)
        return cache.match(ev.request)
    }
    
}
self.addEventListener('fetch',(ev)=>{
    console.log(`fetch for ${ev.request.url}`);
    ev.respondWith(fetchAssets(ev))
})