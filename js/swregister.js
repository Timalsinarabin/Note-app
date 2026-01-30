
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
            window.addEventListener('appinstalled', (ev) => {
                console.log("app installed", ev);
            });
            window.addEventListener('beforeinstallprompt',(ev)=>{
                ev.preventDefault();
                APP.deferredInstall = ev;
                console.log("beforeinstallprompt");
            });
            let btn = document.querySelector('.installBtn');
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
                    }
                    else{
                        console.log("user dismissed the install prompt");
                    }
            });
        }
    }
};
document.addEventListener('DOMContentLoaded',APP.init);
