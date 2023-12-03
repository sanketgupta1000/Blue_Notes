//will implement js related things of primary notes page here

//getting acces of edit note modal
let edit_note_modal = new EditNoteModal(document.getElementById("editNoteModal"));

//for masonry
let pinnedMasonry = new Masonry(document.getElementById("pinnedNotesContainerRow"), 
    {
        itemSelector: '.brick',
        percentPosition: true
    });
let unpinnedMasonry = new Masonry(document.getElementById("unpinnedNotesContainerRow"), 
    {
        itemSelector: '.brick',
        percentPosition: true
    });

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
    let newnote = new Note("", "", "", 0, 0, 0, edit_note_modal, unpinnedMasonry);

    //updating modal for it
    edit_note_modal.updateContent(newnote);

    //showing the modal
    edit_note_modal.show();

}

//setting event handler
makeNoteDiv.addEventListener("click", initiateNewNote);

//now implementing the functionality that notes are loaded from database dynamically on user scrolling the page
let limit = 20;
let offset = 0;
let isLoading = false;
//function to load pinned notes from database
function loadPinnedNotes(scroll)
{
    if(isNearBottom()&&(!isLoading))
    {
        //user is near bottom, as well as no notes are already loading
        //so fetch notes
        isLoading = true;
        //making ajax request
        fetch("view_pinned.php",
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
            if(!(response.ok))
            {
                throw new Error("Error fetching pinned notes: "+response.status);
            }
            return response.json();
        })
        .then((notesArr)=>
        {
            if(notesArr.length<limit)
            {
                //after this, there are no more pinned notes
                //so remove this event listener and add unpinned notes event listener
                //also reset offset
                offset = 0;
                window.removeEventListener("scroll", loadPinnedNotes);
                window.addEventListener("scroll", loadNotesOnScrollHelper("view_unpinned.php", unpinnedMasonry));
                loadNotesOnScrollHelper("view_unpinned.php", unpinnedMasonry)();
                unpinnedMasonry.once("layoutComplete", ()=>{unpinnedMasonry.layout();});
            }
            else
            {
                //there may be more pinned notes after this
                offset+=limit;
            }

            //show the fetched notes
            for(n of notesArr)
            {
                let pinnednote = new Note(n.note_id, n.note_title, n.note_content, n.is_pinned, n.is_archived, n.is_binned, edit_note_modal, pinnedMasonry);
                pinnednote.show();
            }

            isLoading = false;
        })
        .catch((error)=>
        {
            console.log(error);
        });
    }
}

//adding event listener to scroll event of window
window.addEventListener("scroll", loadPinnedNotes);

//initially calling load notes
loadPinnedNotes();

//layout for the first time, maybe some bug in masonry. It does not nicely layout dynamically added items first time
pinnedMasonry.once('layoutComplete', ()=>{pinnedMasonry.layout(); console.log("Layout for first time, maybe some bug in masonry??");});