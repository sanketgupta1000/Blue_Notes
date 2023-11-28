// will contain the utility functions related to notes/archive/bin page

// function to show a link of navbar as active
function showActive(linkId)
{
    let link = document.getElementById(linkId);
    link.classList.add("text-primary");
    link.setAttribute("aria-current", "page");
}

// function to return a function that loads notes dynamically from a given path
function loadNotesOnScrollHelper(path)
{
    return function loadNotesOnScroll(scroll)
    {
        if((window.scrollY+window.innerHeight)>=(document.body.scrollHeight-25))
        {
            loadNotes(path);
        }
    }
}

//load notes function
function loadNotes(path)
{
    //making ajax request
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