allnotes = document.querySelector('.allnotes');
pinned = document.querySelector('.pinnednote');
undone = document.querySelector('.undonenotes');
done = document.querySelector('.donenotes');
sidebar = document.querySelector('.sidebar');
menu = document.querySelector('.menu');

allnotes.addEventListener('click', () => {
    display()
    sidebar.style.display = 'none';
    menu.style.display = 'block';
});

pinned.addEventListener('click', () => {
    display('pinned')
    sidebar.style.display = 'none';
    menu.style.display = 'block';
}); 

undone.addEventListener('click', () => {
    display('undone')
    sidebar.style.display = 'none';
    menu.style.display = 'block';
});

done.addEventListener('click', () => {
    display('done')
    sidebar.style.display = 'none';
    menu.style.display = 'block';
}); 