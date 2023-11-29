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


//functionality to allow editing of note
//adding event listener on modal title element to update title as soon as user inputs
edit_note_modal.modal_title_element.addEventListener("input", (input)=>
{
    //will make ajax request only when editing an existing note, or a newly created note
    if((!isCreatingNewNote)||isCreated)
    {
        fetch("/blue_notes/user_notes/helpers/update_title.php", 
        {
            method: "POST",
            headers: 
            {
                "Content-type": "application/x-www-form-urlencoded"
            },
            body: "note_id="+edit_note_modal.note.note_id+"&title="+edit_note_modal.modal_title_element.innerText
        })
        .then((response)=>
        {
            if(!(response.ok))
            {
                console.log(response.status);
                throw new Error("Error updating title: "+response.status);
            }
            return response.json();
        })
        .then((jsonObj)=>
        {
            console.log(jsonObj);
        })
        .catch((error)=>
        {
            console.log(error);
        });
    }
});

//adding event listener on modal body element to update content as soon as user inputs
edit_note_modal.modal_body_element.addEventListener("input", (input)=>
{
    //will make ajax request only when editing an existing note, or a newly created note
    if((!isCreatingNewNote)||isCreated)
    {
        fetch("/blue_notes/user_notes/helpers/update_content.php",
        {
            method: "POST",
            headers: 
            {
                "Content-type": "application/x-www-form-urlencoded"
            },
            body: "note_id="+edit_note_modal.note.note_id+"&content="+edit_note_modal.modal_body_element.innerText
        })
        .then((response)=>
        {
            if(!(response.ok))
            {
                console.log(response.status);
                throw new Error("Error updating content: "+response.status);
            }
            return response.json();
        })
        .then((jsonObj)=>
        {
            console.log(jsonObj);
        })
        .catch((error)=>
        {
            console.log(error);
        });
    }
});

//adding event listener to close button of modal, to updat actual note on frontend when user clicks it
edit_note_modal.modal_close_btn.addEventListener("click", (click)=>
{
    //updating the note on screen
    edit_note_modal.note_title_element.innerText = edit_note_modal.modal_title_element.innerText;
    edit_note_modal.note_text_element.innerText = edit_note_modal.modal_body_element.innerText;

    //showing the note in case of newly created note
    if(isCreatingNewNote)
    {
        edit_note_modal.note.show("start");
        isCreatingNewNote = false;
    }
    else
    {
        //layout masonry again, as height may be increased
        edit_note_modal.note.masonry.layout();
    }
});