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