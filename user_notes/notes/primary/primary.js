//will implement js related things of primary notes page here

//getting acces of edit note modal
let edit_note_modal = new EditNoteModal(document.getElementById("editNoteModal"));

let notecontainerrow = document.getElementById("noteContainerRow");

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
    let newnote = new Note("", "", "", 0, 0, 0, edit_note_modal, notecontainerrow);

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
function loadNotesOnScroll(scroll)
{
    //checking if user has scrolled to bottom
    if((window.scrollY+window.innerHeight)>=(document.body.scrollHeight-25))
    {
        loadNotes();
    }
}

//adding event listener to scroll event of window
window.addEventListener("scroll", loadNotesOnScroll);

function loadNotes()
{
    //making ajax request
    fetch("view.php",
    {
        method: "POST",
        headers: 
        {
            "Content-type": "application/x-www-form-urlencoded"
        },
        body: "limit="+limit+"&offset="+offset
    })
    .then((response)=>
    {
        if(!response.ok)
        {
            throw new Error("Error loading notes: "+response.status);
        }
        return response.json();
    })
    .then((notesArr)=>
    {
        console.log(notesArr);
        //now appending the notes in dom
        for(let i = 0; i<notesArr.length; i++)
        {
            //creating note object
            let newnote = new Note(notesArr[i].note_id, notesArr[i].note_title, notesArr[i].note_content, 0, 0, 0, edit_note_modal, notecontainerrow);
            newnote.show();
        }
        //incrementing offset, so that next time, other notes are loaded
        offset+=limit;
    })
    .catch((error)=>
    {
        console.log(error);
    });
}

//initially calling load notes
loadNotes();