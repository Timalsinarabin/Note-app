
let currentPage = 1;
const itemsPerPage = 4;

async function createNote(id,text,color,mark,dec){
    const div = document.createElement('div');
    div.className='items';

    const note = document.createElement('div');
    note.className='note';

    const btns = document.createElement('div');
    btns.className='btns';

    div.style.backgroundColor = color;
    note.style.textDecoration = dec;

    const btn = document.createElement('button');
    btn.className='delbtn';
    btn.innerText = 'X';
    
    btn.addEventListener('click',async()=>{
        await delNote(id);
        div.remove();
    });

    const btnDone = document.createElement('button');
    btnDone.className='btnDone';

    const btnDrop = document.createElement('button');
    btnDrop.className='btnDrop';

    if(mark=='done'){
        btnDone.innerText = 'Done';
        btnDrop.style.display = 'none'
    }
    else if(mark == 'droped'){
        btnDone.style.display = 'none'
        btnDrop.innerText = 'Dropped';
    }
    else{
        btnDone.innerText = 'Mark as Done'; 
        btnDrop.innerText = 'Mark as Drop';
        btnDone.addEventListener('click',async()=>{
            doneNote(text,id);
            div.style.backgroundColor = 'green';
            btnDone.innerText = 'Done';
            btnDrop.style.display = 'none';
            btn.style.display = 'none'
        })
        btnDrop.addEventListener('click',async()=>{
            dropNote(text,id);
            div.style.backgroundColor = 'red';
            btnDrop.innerText = 'Droped';
            btnDone.style.display = 'none';
            btn.style.display = 'none'
        })
    }
    

    note.appendChild(document.createTextNode(text));
    
    btns.appendChild(btnDone);
    btns.appendChild(btnDrop);
    btns.appendChild(btn);

    div.appendChild(note);
    div.appendChild(btns);
    assignNote.appendChild(div);
}


function render(allNotes){
    assignNote.innerHTML = '';
    document.querySelector('.currPage').innerText = `${currentPage}`;
    const start = (currentPage -1)*itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems= allNotes.slice(start,end);
    pageItems.forEach(item => {
        createNote(item.id,item.text,item.color,item.mark,item.dec);
    });
}
document.querySelector('.prevPage').addEventListener('click',()=>{
    if(currentPage>1){
        currentPage--;
        render(allNotes);
    }
})

document.querySelector('.nextPage').addEventListener('click',()=>{
    if(currentPage<Math.ceil(allNotes.length/itemsPerPage)){
         currentPage++;
        render(allNotes);
    }
})

