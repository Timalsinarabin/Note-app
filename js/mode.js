let modeButton = document.querySelector('.mode');
let note = document.querySelector('.note');

modeButton.addEventListener('click',()=>{
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')){
        
        localStorage.setItem('mode','dark');
        modeButton.innerText = '🌙'
    }
    else{
        localStorage.setItem('mode','light');
        modeButton.innerText = '☀️' 
    }
} 
);  
if(localStorage.getItem('mode')==='dark'){
    document.body.classList.add('dark-mode');
    modeButton.innerText = '🌙'
    note.style.color = 'white';
    note.style.border = '1px solid white';
}
else if(localStorage.getItem('mode')==='light'){
    document.body.classList.remove('dark-mode');
    modeButton.innerText = '☀️'
    note.style.color = 'black';
    note.style.border = '1px solid black';
}