const allnotes = document.querySelector('.allnotes');
const pinned = document.querySelector('.pinnednote');
const undone = document.querySelector('.undonenotes');
const done = document.querySelector('.donenotes');

allnotes.addEventListener('click', () => {
    display();
});

pinned.addEventListener('click', () => {
    display('pinned');
}); 

undone.addEventListener('click', () => {
    display('undone');
});

done.addEventListener('click', () => {
    display('done');
}); 

