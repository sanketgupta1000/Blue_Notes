//will implement js related things of primary notes page here

//getting acces of edit note modal
let edit_note_modal = new EditNoteModal(document.getElementById("editNoteModal"));

let notecontainerrow = document.getElementById("noteContainerRow");

//for masonry
let masonry = new Masonry(notecontainerrow);

//first implementing create new note functionality
let makeNoteDiv = document.getElementById("makeNoteDiv");
let isCreatingNewNote = false;
let isCreated;
function initiateNewNote()
{

    isCreatingNewNote = true;
    isCreated = false;
    //making ajax request
    fetch("create.php")
    .then((response)=>
    {
        if(!response.ok)
        {
            //http error(network error)
            throw new Error("AJAX request failed: "+response.status);
        }
        //returning promise of response json
        return response.json();

    })
    .then((jsonObj)=>
    {
        //backend will be configured to send the note id of newly created note
        isCreated = true;
        //setting note id for the note object
        newnote.note_id = jsonObj.note_id;
        
    })
    .catch((error)=>
    {
        console.log(error);
    });

    //creating new note object
    let newnote = new Note("", "", "", 0, 0, 0, edit_note_modal, masonry);

    //updating modal for it
    edit_note_modal.updateContent(newnote);

    //showing the modal
    edit_note_modal.show();

}

//setting event handler
makeNoteDiv.addEventListener("click", initiateNewNote);

//now implementing the functionality that notes are loaded from database dynamically on user scrolling the page
let limit = 10;
let offset = 0;

//adding event listener to scroll event of window
window.addEventListener("scroll", loadNotesOnScrollHelper("view.php"));

//initially calling load notes
loadNotes("view.php");

//layout for the first time, maybe some bug in masonry. It does not nicely layout dynamically added items first time
masonry.once('layoutComplete', ()=>{masonry.layout(); console.log("Layout for first time, maybe some bug in masonry??");});