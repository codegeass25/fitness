let installEvent,installed=false,openDialog;
const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
const ios=()=>/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
function update(){document.querySelectorAll('[data-install-app]').forEach(b=>{b.hidden=standalone()||installed||(!installEvent&&!ios());b.textContent=ios()&&!installEvent?'Add to Home Screen':'Install App';});}
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installEvent=event;installed=false;update();});
window.addEventListener('appinstalled',()=>{installed=true;installEvent=null;update();});
matchMedia('(display-mode: standalone)').addEventListener('change',update);
document.addEventListener('click',async event=>{const button=event.target.closest('[data-install-app]');if(!button)return;if(standalone())return;button.disabled=true;try{if(installEvent){const prompt=installEvent;installEvent=null;await prompt.prompt();await prompt.userChoice;update();}else if(ios()){openDialog?.('Add this app to your Home Screen','<article><p>Open this page in <b>Safari</b>, tap <b>Share</b>, then <b>Add to Home Screen</b>. Keep the Member, Trainer or Admin page open for the app you want to install.</p><p class="hint">Installation and notification permission are separate.</p></article>');}}finally{button.disabled=false;}});
export const installControl=()=>`<button type="button" class="btn secondary install-action" data-install-app ${standalone()||installed||(!installEvent&&!ios())?'hidden':''}>${ios()&&!installEvent?'Add to Home Screen':'Install App'}</button>`;
export function buildManifest(role,branding,base,resolveAsset){const page=role==='admin'?'admin.html':role==='trainer'?'trainer.html':'index.html',suffix=role==='admin'?'Management':role==='trainer'?'Trainer':'';return {id:new URL(page,base).href,name:branding.name+(suffix?' · '+suffix:''),short_name:branding.shortName,description:branding.tagline,start_url:new URL(page,base).href,scope:new URL('./',base).href,display:'standalone',background_color:branding.background,theme_color:branding.background,icons:[{src:resolveAsset(branding.pwaIcon),sizes:'512x512',type:'image/png',purpose:'any'},{src:branding.pwaIcon192?resolveAsset(branding.pwaIcon192):new URL('assets/icons/icon-192.png',base).href,sizes:'192x192',type:'image/png',purpose:'any'},{src:new URL('assets/icons/icon-512.png',base).href,sizes:'512x512',type:'image/png',purpose:'any'}]};}
export async function initInstall(role,config,resolveAsset,dialog){openDialog=dialog;const paths={member:'manifest.webmanifest',admin:'admin-manifest.webmanifest',trainer:'trainer-manifest.webmanifest'},base=new URL('./',location.href).href,link=document.querySelector('link[rel=manifest]');
 // First load and offline loads always have a same-origin static fallback.
 link.href=new URL(paths[role],base).href;
 if(!('serviceWorker' in navigator)){update();return;}
 try{await navigator.serviceWorker.register('./service-worker.js',{scope:'./'});const registration=await Promise.race([navigator.serviceWorker.ready,new Promise((_,reject)=>setTimeout(()=>reject(new Error('Service worker not ready')),6000))]);const manifests=Object.fromEntries(Object.entries(paths).map(([r,p])=>[p,buildManifest(r,config.branding,base,resolveAsset)]));
 await new Promise(resolve=>{const channel=new MessageChannel(),timer=setTimeout(resolve,2000);channel.port1.onmessage=()=>{clearTimeout(timer);resolve();};registration.active?.postMessage({type:'BRANDING_MANIFESTS',manifests},[channel.port2]);});
 link.href=new URL(paths[role]+'?v='+encodeURIComponent(config.version),base).href;
 }catch{/* Static manifest remains usable when the browser blocks a worker. */}update();
}
