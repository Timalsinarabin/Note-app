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
        ...dropnotes.map(n=> ({...n,color: ["#FFF9C4",
  "#f8af4a",
  "#c56dd4", 
  "#a7d3f6",  
  "#a8e4aa", 
  "#F8BBD0" ],mark:'droped',dec:''})),
        ...undonenotes.map(n=> ({...n,color:'',mark:'',dec:''})),
        ...donenotes.map(n=> ({...n,color: ['#529352'],mark:'done',dec: 'line-through' }))
        
    ];
    
    render(allNotes);
}

const noteData = document.querySelector('.note');

const assignNote = document.querySelector('.container');

document.querySelector('.addNote').addEventListener('click',async ()=>{
    if(noteData.value.trim()==''){
        return;
    }
    const text = noteData.value;
    const id = await addNote(text);
    await createNote(id,text);
    noteData.value = '';
})
display();