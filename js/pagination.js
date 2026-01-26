
let currentPage = 1;
const itemsPerPage = 4;

async function createNote(id,text,color='white',mark = false,dec = false){
    const div = document.createElement('div');
    div.className='items';

    const note = document.createElement('div');
    note.className='note';

    const btns = document.createElement('div');
    btns.className='btns';

    div.style.backgroundColor = color[Math.floor(Math.random() * color.length)];
    note.style.textDecoration = dec;

    const btn = document.createElement('button');
    btn.className='delbtn';
    btn.innerText = '⌫';
    
    btn.addEventListener('click',async()=>{
        await delNote(id);
        div.remove();
    });

    const btnDone = document.createElement('button');
    btnDone.className='btnDone';

    const btnPin = document.createElement('div');
    btnPin.className='btnPin';

    if(mark=='done'){
        btnDone.innerText = 'Done';
        btnPin.style.display = 'none'
    }
    else if(mark == 'droped'){
        btnDone.innerHTML = 'Mark as Done';
        btnDone.addEventListener('click',async()=>{
            doneNote(text,id);
            div.style.backgroundColor = 'green';
            btnDone.innerText = 'Done';
            btnPin.style.display = 'none';
            btn.style.display = 'none'
        })
        btnPin.innerText = '📌';
    }
    else{
        btnDone.innerText = 'Mark as Done'; 
        btnPin.innerText = 'Pin';
        btnDone.addEventListener('click',async()=>{
            doneNote(text,id);
            div.style.backgroundColor = ' rgba(16, 185, 129, 0.2)';
            btnDone.innerText = 'Done';
            btnPin.style.display = 'none';
            btn.style.display = 'none'
        })
        btnPin.addEventListener('click',async()=>{
            dropNote(text,id);
            div.style.backgroundColor = "rgba(251, 146, 60, 0.2)";
            btnPin.innerText = '📌';
            btnDone.style.display = 'none';
            btn.style.display = 'none'
        })
    }
    

    note.appendChild(document.createTextNode(text));
    
    btns.appendChild(btnDone);
    btns.appendChild(btnPin);
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

