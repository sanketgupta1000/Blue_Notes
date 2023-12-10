let edit_note_modal = new EditNoteModal(document.getElementById("editNoteModal"));

//for masonry
let binnedMasonry = new Masonry(document.getElementById("binnedNotesContainerRow"), 
    {
        itemSelector: '.brick',
        percentPosition: true
    });

//now implementing the functionality that notes are loaded from database dynamically on user scrolling the page
let limit = 20;
let offset = 0;
window.addEventListener("scroll", loadNotesOnScrollHelper("view_binned.php", binnedMasonry));
loadNotesOnScrollHelper("view_binned.php", binnedMasonry)();
binnedMasonry.once("layoutComplete", ()=>{binnedMasonry.layout();});

//remove contenteditable from modal
document.querySelector(".modal-title").setAttribute("contenteditable", "false");
document.querySelector(".modal-body").setAttribute("contenteditable", "false");