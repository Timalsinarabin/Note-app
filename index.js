const noteData = document.querySelector('.note');
assignNote = document.querySelector('.container');
document.querySelector('.addNote').addEventListener('click',()=>{
    const div = document.createElement('div');
    div.className='items';
    const btn = document.createElement('button');
    btn.innerText = 'X';
    btn.addEventListener('click',()=>{
        div.remove();
    })
    div.appendChild(document.createTextNode(noteData.value))
    div.appendChild(btn);
    assignNote.appendChild(div);
})
