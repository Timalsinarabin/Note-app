
const db = new Dexie('MyDatabase');

db.version(1).stores({
    notes: '++id,text',
    Done: '++id,text',
    Drop: '++id,text'
});

async function addNote(text) {
    return await db.notes.add({text})
}

async function delNote(id) {
    await db.notes.delete(id);
    await db.Done.delete(id);
    await db.Drop.delete(id);
}

async function doneNote(text,id) {
    await db.notes.delete(id);
    return await db.Done.add({text})
}
async function dropNote(text,id) {
    await db.notes.delete(id);
    return await db.Drop.add({text})
}
async function display(){
    let notes = await db.notes.toArray();
    let donenotes = await db.Done.toArray();
    let dropnotes = await db.Drop.toArray();
    donenotes.forEach(donenote =>{
        let color = 'green';
        let mark = 'done';
        createNote(donenote.id,donenote.text,color,mark);
    })
    notes.forEach(note => {
        createNote(note.id,note.text);
    });
    dropnotes.forEach(dropnote =>{
        let color = 'red';
        let mark = 'droped';
        createNote(dropnote.id,dropnote.text,color,mark);
    })
}

function createNote(id,text,color,mark){
    const div = document.createElement('div');
    div.className='items';
    div.style.backgroundColor = color;

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
    btnDone.className='btnDrop';

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
        btnDrop.innerText = 'Mark asDrop';
        btnDone.addEventListener('click',async()=>{
            doneNote(text,id);
            div.style.backgroundColor = 'green';
            btnDone.innerText = 'Done';
            btnDrop.style.display = 'none';
        })
        btnDrop.addEventListener('click',async()=>{
            dropNote(text,id);
            div.style.backgroundColor = 'red';
            btnDrop.innerText = 'Droped';
            btnDone.style.display = 'none';
        })
    }
    

    div.appendChild(document.createTextNode(text));
    div.appendChild(btn);
    div.appendChild(btnDone);
    div.appendChild(btnDrop)
    assignNote.appendChild(div);
}
const noteData = document.querySelector('.note');

const assignNote = document.querySelector('.container');
document.querySelector('.addNote').addEventListener('click',async ()=>{
    const text = noteData.value;
    const id = await addNote(text);
    let color = 'white';
    createNote(id,text,color);

    noteData.value = '';
})
display();