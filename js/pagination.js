
let currentPage = 1;
var itemsPerPage;
const width = window.innerWidth;
if(width >780){
    itemsPerPage = 6;
}
else{
    itemsPerPage = 4;
}
async function createNote(id,text,color='white',mark = false,dec = false){

    const div = document.createElement('div');
    div.className='items pt-7 px-7 border-1 rounded relative overflow-hidden h-20 transition-all duration-300';

    div.addEventListener('click',()=>{
        div.classList.toggle('h-32');
        div.classList.toggle('overflow-hidden');
        div.classList.toggle('overflow-auto');
    })
    const note = document.createElement('div');
    note.className='note text-2xl';

    const btns = document.createElement('div');
    btns.className='btns mt-5 flex gap-2';

    div.style.backgroundColor = color[Math.floor(Math.random() * color.length)];
    note.style.textDecoration = dec;

    const btn = document.createElement('button');
    btn.className='delbtn bg-danger absolute right-3 bottom-2 cursor-pointer';
    btn.innerText = '⌫';
    
    btn.addEventListener('click',async()=>{
        await delNote(id);
        div.remove();
        display();
    });

    const btnDone = document.createElement('button');
    btnDone.className='btnDone cursor-pointer bg-blue-500 box-border border-transparent rounded p-2 hover:bg-blue-600';

    const btnPin = document.createElement('div');
    btnPin.className='btnPin absolute right-2 top-2 cursor-pointer';

    if(mark=='done'){
        btnDone.style.display = 'none';
        btnPin.style.display = 'none';
    }
    else if(mark == 'droped'){
        btnDone.innerHTML = 'Mark as Done';
        btnDone.addEventListener('click',async()=>{
            doneNote(text,id);
            div.style.backgroundColor = 'green';
            btnDone.style.display = 'none';
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
            div.style.backgroundColor = 'rgba(0, 194, 71, 0.75)';
            btnDone.style.display = 'none';
            btnPin.style.display = 'none';
        })
        btnPin.addEventListener('click',async()=>{
            dropNote(text,id);
            div.style.backgroundColor = "rgba(251, 146, 60, 0.2)";
            btnPin.innerText = '📌';
            btnDone.style.display = 'none';
            display();
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

