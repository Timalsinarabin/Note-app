allnotes = document.querySelector('.allnotes');
pinned = document.querySelector('.pinnednote');
undone = document.querySelector('.undonenotes');
done = document.querySelector('.donenotes');
sidebar = document.querySelector('.sidebar');
menu = document.querySelector('.menu');
overlay = document.querySelector('.overlay');
sideMenu = document.querySelector('.sidebar-menu');

function closeSidebar() {
    document.body.classList.remove('menu-active');
    sidebar.style.display = 'none';
    menu.style.display = 'block';
}
menu.addEventListener('click', () => {
    document.body.classList.add('menu-active');
    sidebar.style.display = 'block';
    menu.style.display = 'none';
}
);
overlay.addEventListener('click', () => {
    closeSidebar();
});
allnotes.addEventListener('click', () => {
    display()
    sidebar.style.display = 'none';
    menu.style.display = 'block';
    closeSidebar();
});

pinned.addEventListener('click', () => {
    display('pinned')
    sidebar.style.display = 'none';
    menu.style.display = 'block';
    closeSidebar();
}); 

undone.addEventListener('click', () => {
    display('undone')
    sidebar.style.display = 'none';
    menu.style.display = 'block';
    closeSidebar();
});

done.addEventListener('click', () => {
    display('done')
    sidebar.style.display = 'none';
    menu.style.display = 'block';
    closeSidebar();
}); 
sideMenu.addEventListener('click', () => {
    closeSidebar();
});