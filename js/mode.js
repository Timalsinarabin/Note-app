let modeButton = document.querySelector('.mode');
let note = document.querySelector('.note');
modeButton.addEventListener('click',()=>{
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')){
        modeButton.innerText = '🌙'
        note.style.color = 'white';
        note.style.border = '1px solid white';
        btns.style.color = 'grey';
        modeButton.style.backgroundColor = 'black';
        
    }
    else{
        modeButton.innerText = '☀️'
        modeButton.style.backgroundColor = 'white';
        modeButton.style.color = 'black';
        note.style.color = 'black';
        note.style.border = '1px solid black';
    }
} 
);  