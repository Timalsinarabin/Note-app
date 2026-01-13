

const db = new Dexie('MyDatabase');
db.version(1).stores({
    notes: '++id,text'
});

async function addNote(text) {
    return await db.notes.add({text})
}

async function delNote(id) {
    await db.notes.delete(id);
}

async function display(){
    let notes = await db.notes.toArray();
    notes.forEach(note => {
        createNote(note.id,note.text)
    });
}

function createNote(id,text){
    const div = document.createElement('div');
    div.className='items';

    const btn = document.createElement('button');
    btn.innerText = 'X';

    btn.addEventListener('click',async()=>{
        await delNote(id);
        div.remove();
    });
    
    div.appendChild(document.createTextNode(text));
    div.appendChild(btn);
    assignNote.appendChild(div);
}
const noteData = document.querySelector('.note');

const assignNote = document.querySelector('.container');
document.querySelector('.addNote').addEventListener('click',async ()=>{
    const text = noteData.value;
    const id = await addNote(text);
    createNote(id,text);

    noteData.value = '';
})
display();