const allnotes = document.querySelector('.allnotes');
const pinned = document.querySelector('.pinnednote');
const undone = document.querySelector('.undonenotes');
const done = document.querySelector('.donenotes');
const sideMenu = document.querySelector('.side-menu');
const sidebar =document.querySelector('.sidebar');
const search = document.querySelector('.search');
const title =document.querySelector('.menu-title');
const sections = [allnotes, pinned, undone, done,search,title];

if(!sidebar.classList.contains('sidebar-active')){
        sections.forEach(div => {
            div.style.display = 'none';
        });
    }
sideMenu.addEventListener('click',()=>{
    sidebar.classList.toggle('sidebar-active');
    if(!sidebar.classList.contains('sidebar-active')){
        sections.forEach(div => {
            div.style.display = 'none';
        });
    }else{
        sections.forEach(div => {
            div.style.display = 'block';
        });
    }
})

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

