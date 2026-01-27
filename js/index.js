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
    await db.Drop.delete(id);
    return await db.Done.add({text})
}
async function dropNote(text,id) {
    await db.notes.delete(id);
    return await db.Drop.add({text})
}

async function display(mark = false){
    let undonenotes = await db.notes.toArray();
    let donenotes = await db.Done.toArray();
    let dropnotes = await db.Drop.toArray();
    allNotes = [
        ...dropnotes.map(n=> ({...n,color: ["#FFF9C4",
  "#d17a00",
  "#c56dd4", 
  "#a7d3f6",  
  "#a8e4aa", 
  "#F8BBD0" ],mark:'droped',dec:''})),
        ...undonenotes.map(n=> ({...n,color:'',mark:'',dec:''})),
        ...donenotes.map(n=> ({...n,color: [' rgba(0, 194, 71, 0.75)'],mark:'done',dec: 'line-through' }))
        
    ];
    if(mark=='pinned'){
        allNotes = [...dropnotes.map(n=> ({...n,color: ["#FFF9C4",
            "#d17a00",
            "#c56dd4",
            "#a7d3f6",  
            "#a8e4aa", 
            "#F8BBD0" ],mark:'droped',dec:''}))]
        render(allNotes);
    }
    else if(mark=='undone'){
        allNotes = [...undonenotes.map(n=> ({...n,color:'',mark:'',dec:''}))]
        render(allNotes);
    }
    else if(mark=='done'){
        allNotes = [...donenotes.map(n=> ({...n,color: [' rgba(0, 194, 71, 0.75)'],mark:'done',dec: 'line-through' }))]
        render(allNotes);
    }
    else{
        render(allNotes);
    }
}
const main = document.querySelector('.main');
const noteData = document.querySelector('.note');

const assignNote = document.querySelector('.container');

document.querySelector('.addNote').addEventListener('click',async ()=>{
    if(noteData.value.trim()==''){
        const errDiv = document.createElement('div');
        errDiv.className = 'errDiv';
        errDiv.innerText = 'Please enter a valid note';
        errDiv.style.color = 'red';
        main.appendChild(errDiv);
        setTimeout(()=>{
            errDiv.classList.add('animateErr');
        },2000);
        return;
    }
    const text = noteData.value;
    const id = await addNote(text);
    await createNote(id,text);
    noteData.value = '';
    display();
})
const sidebar = document.querySelector('.sidebar');
document.querySelector('.menu').addEventListener('click',()=>{
    sidebar.classList.toggle('active');
    sidebar.style.display = 'block';
    document.querySelector('.menu').style.display = 'none';
    
})
document.querySelector('.sidebar-menu').addEventListener('click',()=>{
    sidebar.classList.toggle('active');
    document.querySelector('.menu').style.display = 'block';
    sidebar.style.display = 'none';
}           
);
display();