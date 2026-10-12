// Worker puente para actualizar instalaciones que usaban la ruta antigua sw.js.
const CACHE='brujula-shell-v8';
const SHELL=['./','./index.html','./styles.css','./finance-core.js','./app.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./icon-512-maskable.png','./apple-touch-icon.png'];
const SHELL_PATHS=new Set(SHELL.map(path=>new URL(path,self.location.href).pathname));
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(key=>key.startsWith('brujula-shell-')&&key!==CACHE).map(key=>caches.delete(key)));await self.clients.claim()})()));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).catch(()=>caches.match(new URL('./index.html',self.registration.scope).href)));
    return;
  }
  if(url.origin!==self.location.origin||!SHELL_PATHS.has(url.pathname))return;
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
});
