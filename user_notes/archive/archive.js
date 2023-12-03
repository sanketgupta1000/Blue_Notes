let edit_note_modal = new EditNoteModal(document.getElementById("editNoteModal"));

let isCreatingNewNote = false;

//for masonry
let archivedMasonry = new Masonry(document.getElementById("archivedNotesContainerRow"), 
    {
        itemSelector: '.brick',
        percentPosition: true
    });

//now implementing the functionality that notes are loaded from database dynamically on user scrolling the page
let limit = 20;
let offset = 0;
window.addEventListener("scroll", loadNotesOnScrollHelper("view_archived.php", archivedMasonry));
loadNotesOnScrollHelper("view_archived.php", archivedMasonry)();
archivedMasonry.once("layoutComplete", ()=>{archivedMasonry.layout();});