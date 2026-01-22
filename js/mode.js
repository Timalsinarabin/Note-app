let modeButton = document.querySelector('.mode');
let note = document.querySelector('.note');
modeButton.addEventListener('click',()=>{
    document.body.classList.toggle('dark-mode');
    modeButton.innerText = '🌙'
    note.style.backgroundColor = 'grey';
    btns.style.color = 'grey';
    modeButton.style.backgroundColor = 'black';
    if(!document.body.classList.contains('dark-mode')){
        modeButton.innerText = '☀️'
        modeButton.style.backgroundColor = 'white';
        modeButton.style.color = 'black';
    }
} 
);  