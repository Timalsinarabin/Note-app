const allnotes = document.querySelector('.allnotes');
const pinned = document.querySelector('.pinnednote');
const undone = document.querySelector('.undonenotes');
const done = document.querySelector('.donenotes');
const sidebar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');
const sideMenu = document.querySelector('.sidebar-menu');
const mainContent = document.querySelector('.main');
function closeSidebar() {
    sidebar.classList.remove('active');  
    overlay.classList.remove('show');     
    menu.style.display = 'block';
    sideMenu.style.display = 'none'
    mainContent.classList.remove('shift');
}

menu.addEventListener('click', () => {
    sidebar.classList.add('active');   
    overlay.classList.add('show');
    menu.style.display = 'none';
    sideMenu.style.display = 'block'
    mainContent.classList.add('shift');
});

overlay.addEventListener('click', closeSidebar);

allnotes.addEventListener('click', () => {
    display();
    closeSidebar();
});

pinned.addEventListener('click', () => {
    display('pinned');
    closeSidebar();
}); 

undone.addEventListener('click', () => {
    display('undone');
    closeSidebar();
});

done.addEventListener('click', () => {
    display('done');
    closeSidebar();
}); 

sideMenu.addEventListener('click', closeSidebar);
