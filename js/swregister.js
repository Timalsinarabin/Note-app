
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
            if(btn) btn.style.display = 'none';

            window.addEventListener('beforeinstallprompt',(ev)=>{
                ev.preventDefault();
                APP.deferredInstall = ev;
                console.log("beforeinstallprompt");
                if(btn) btn.style.display = 'block';
            });

            window.addEventListener('appinstalled', (ev) => {
                console.log("app installed", ev);
                APP.deferredInstall = null;
                if(btn){ btn.style.display = 'none'; }
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
                    console.log("User choice:",choice.outcome);
                    APP.deferredInstall = null;
            }
        );
        }
    }
};

document.addEventListener('DOMContentLoaded',APP.init);
