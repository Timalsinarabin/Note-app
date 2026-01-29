let deferredPrompt;

window.addEventListener('DOMContentLoaded',()=>{
    const installAppBtn = document.querySelector('.installapp');
    window.addEventListener('beforeinstallprompt',(e)=>{
        console.log('intall available')
        e.preventDefault();
        deferredPrompt = e;
        installAppBtn.style.display = 'block';
        window.deferredPrompt = e;
        }
    );

    installAppBtn.addEventListener('click',async()=>{
        installAppBtn.style.display = 'none';

        if(deferredPrompt){
            deferredPrompt.prompt();
            const {outcome} = await deferredPrompt.userChoice; 
            if(outcome === 'accepted'){
                console.log('user accepted the install prompt');
            }
            else{
                console.log('user dismissed the install prompt');
            }
            deferredPrompt = null;
        }
    }
    );
});