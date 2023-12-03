// will contain the utility functions/constants related to notes/archive/bin page

//constants related to note icons
const noteIconClasses = "note-card-icon material-symbols-outlined";
const filledIconClass = "filled-icon";
const outlinedIconClass = "outlined-icon";
const outlinedIconClasses = noteIconClasses + " " + outlinedIconClass;
const filledIconClasses = noteIconClasses + " " + filledIconClass;
const pinTooltip = "Pin";
const unpinTooltip = "Unpin";
const archiveTooltip = "Archive";
const unarchiveTooltip = "Unarchive";
const deleteTooltip = "Delete";
const restoreTooltip = "Restore";
const deleteforeverTooltip = "Delete forever";

//paths
const pinPath = "/blue_notes/user_notes/primary/pin.php";
const unpinPath = "/blue_notes/user_notes/primary/unpin.php";
const archivePath = "/blue_notes/user_notes/archive/to_archive.php";
const unarchivePath = "/blue_notes/user_notes/archive/unarchive.php";
const deletePath = "/blue_notes/user_notes/bin/delete.php";
const restorePath = "/blue_notes/user_notes/bin/restore.php";
const deleteforeverPath = "/blue_notes/user_notes/bin/delete_forever.php";

// function to show a link of navbar as active
function showActive(linkId)
{
    let link = document.getElementById(linkId);
    link.classList.add("text-primary");
    link.setAttribute("aria-current", "page");
}

// function to return a function that loads notes dynamically from a given path
function loadNotesOnScrollHelper(path, masonry)
{
    let isLoading = false;
    return function loadNotesOnScroll(scroll)
    {
        if(isNearBottom()&&(!isLoading))
        {
            isLoading = true;
            fetch(path,
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
                    let newnote = new Note(notesArr[i].note_id, notesArr[i].note_title, notesArr[i].note_content, notesArr[i].is_pinned, notesArr[i].is_archived, notesArr[i].is_binned, edit_note_modal, masonry);
                    newnote.show();
                }
                //incrementing offset, so that next time, other notes are loaded
                offset+=limit;
                isLoading = false;
            })
            .catch((error)=>
            {
                console.log(error);
            });
        }
    }
}

//function to check if user is near bottom or not
function isNearBottom()
{
    return ((window.scrollY+window.innerHeight)>=(document.body.scrollHeight-25));
}