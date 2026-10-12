// Cachea solo los archivos estáticos de la app. Los datos siguen en localStorage.
const CACHE='brujula-pwa-v1';
const APP_SHELL=['./','./index.html','./styles.css','./finance-core.js','./app.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./icon-512-maskable.png','./apple-touch-icon.png'];
const SHELL_PATHS=new Set(APP_SHELL.map(path=>new URL(path,self.location.href).pathname));

self.addEventListener('install',event=>event.waitUntil(
  caches.open(CACHE).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting())
));

self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>(key.startsWith('brujula-shell-')||key.startsWith('brujula-pwa-'))&&key!==CACHE).map(key=>caches.delete(key)));
  await self.clients.claim();
})()));

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);

  // App navigation: network first, then the cached document when offline.
  if(event.request.mode==='navigate'&&url.origin===self.location.origin){
    event.respondWith(fetch(event.request).catch(()=>caches.match(new URL('./index.html',self.registration.scope).href)));
    return;
  }

  // Only exact, same-origin shell assets are cached. Never cache API/data URLs,
  // query results, financial records, or third-party responses.
  if(url.origin!==self.location.origin||!SHELL_PATHS.has(url.pathname))return;
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
});
