
const APP={
    SW: null,
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
        }
        else{
            console.log("service workers are not supported");
        }
    }
};
document.addEventListener('DOMContentLoaded',APP.init);
