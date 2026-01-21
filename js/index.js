let allNotes =[];

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
    let undonenotes = await db.notes.toArray();
    let donenotes = await db.Done.toArray();
    let dropnotes = await db.Drop.toArray();
    allNotes = [
        ...undonenotes.map(n=> ({...n,color:'',mark:'',dec:''})),
        ...donenotes.map(n=> ({...n,color:'green',mark:'done',dec: 'line-through' })),
        ...dropnotes.map(n=> ({...n,color:'red',mark:'droped',dec:''}))
    ];
    
    render(allNotes);
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