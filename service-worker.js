const CACHE='gymfit-shell-v1.0.1';
const SHELL=['./','./index.html','./admin.html','./trainer.html','./css/app.css','./js/runtime.js','./js/core.js','./js/icons.js','./js/member.js','./js/admin.js','./js/trainer.js','./js/vendor/socket.io.esm.min.js','./assets/logo.svg','./assets/icons/icon-192.png','./assets/icons/icon-512.png','./assets/fonts/manrope-latin.woff2','./assets/fonts/sora-latin.woff2',...['strength','classes','training','nutrition','facility'].map(n=>`./assets/default-heroes/${n}.webp`)];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('gymfit-shell-')&&key!==CACHE)await caches.delete(key);await self.clients.claim();})());});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin||request.headers.has('Authorization')||/\/(api|media|socket\.io)(\/|$)/.test(url.pathname))return;
 const allowed=new Set(SHELL.map(p=>new URL(p,self.registration.scope).href));const normalized=new URL(url.href);normalized.search='';normalized.hash='';if(!allowed.has(normalized.href))return;
 event.respondWith((async()=>{try{const response=await fetch(request,{cache:'no-cache'});if(response.ok){const cache=await caches.open(CACHE);await cache.put(normalized.href,response.clone());}return response;}catch{return (await caches.match(normalized.href))||Response.error();}})());
});
self.addEventListener('push',event=>{let data;try{data=event.data.json();}catch{return;}event.waitUntil(self.registration.showNotification(data.title,{body:data.body,icon:data.icon,tag:data.tag,renotify:false,data:{url:data.url}}));});
self.addEventListener('notificationclick',event=>{event.notification.close();const target=new URL(event.notification.data?.url||'./index.html',self.registration.scope);if(target.origin!==new URL(self.registration.scope).origin)return;event.waitUntil((async()=>{const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});for(const window of windows){if(new URL(window.url).origin===target.origin){await window.navigate(target.href);return window.focus();}}return self.clients.openWindow(target.href);})());});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting();});
