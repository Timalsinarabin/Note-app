
const APP={
    deferredInstall: null,
    init(){
        if('serviceWorker' in navigator){
            navigator.serviceWorker.register('./sw.js',{
                scope: '/Note-app/'
            }).then(registration=>{
                APP.SW = registration.installing || 
                        registration.waiting ||
                        registration.active;
                console.log('service worker registered',registration.scope);
            })
            navigator.serviceWorker.addEventListener('message',({data})=>{
                console.log("message from service worker",data);
            });
            const btn = document.querySelector('.installBtn');
            window.addEventListener('appinstalled', (ev) => {
                console.log("app installed", ev);
                APP.deferredInstall = null;
                if(btn){ btn.style.display = 'none'; }
            });
            window.addEventListener('beforeinstallprompt',(ev)=>{
                ev.preventDefault();
                APP.deferredInstall = ev;
                console.log("beforeinstallprompt");
                if(btn) localStorage.setItem('installed','no');
            });
            btn?.addEventListener('click',APP.startChromeInstall); 
        }
        else{
            console.log("service workers are not supported");
        }
        
    },
    startChromeInstall(){
            if(APP.deferredInstall){
                console.log(APP.deferredInstall);
                APP.deferredInstall.prompt();
                APP.deferredInstall.userChoice.then((choice)=>{
                    if(choice.outcome === 'accepted'){
                        console.log("user accepted the install prompt");
                        const btn = document.querySelector('.installBtn');
                        if(btn){ btn.style.display = 'none'; }
                        localStorage.setItem('installed','yes');
                    }
                    else{
                        console.log("user dismissed the install prompt");
                    }
            }
        );
        }
    }
};
const btn = document.querySelector('.installBtn');
if(btn){ 
    localStorage.getItem('installed')==='yes'? btn.style.display = 'none' : btn.style.display = 'block';
    }
document.addEventListener('DOMContentLoaded',APP.init);
