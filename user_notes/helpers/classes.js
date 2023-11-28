//will contain class abstractions for note, icons, modal to be displayed on screen

class Note
{
    constructor(noteid, notetitle, notecontent, ispinned, isarchived, isbinned, notemodal, notecontainerrow)
    {
        //data members
        this.note_id = noteid;
        this.note_title = notetitle;
        this.note_content = notecontent;
        this.is_pinned = ispinned;
        this.is_archived = isarchived;
        this.is_binned = isbinned;
        this.note_modal = notemodal;
        this.note_container_row = notecontainerrow;

        //card element for displaying note
        this.note_col = document.createElement("div");
        this.note_col.classList.add("col-12", "col-md-6", "col-lg-4", "col-xl-3", "col-xxl-2");
        this.note_card = document.createElement("div");
        this.note_card.classList.add("card");
        this.note_card_body = document.createElement("div");
        this.note_card_body.classList.add("card-body", "p-3");
        this.note_title_container = document.createElement("div");
        this.note_title_container.classList.add("d-flex", "justify-content-between", "align-items-end");
        this.note_card_title = document.createElement("h5");
        this.note_card_title.classList.add("card-title");
        this.note_card_text = document.createElement("p");
        this.note_card_text.classList.add("card-text");
        this.note_card_footer = document.createElement("div");
        this.note_card_footer.classList.add("d-flex", 'justify-content-between');
        this.note_title_container.append(this.note_card_title);
        if((!this.is_binned)&&(!this.is_archived))
        {
            //show the pin icon
            if(this.is_pinned)
            {
                (new NoteIcon(this, "note-card-icon fas fa-thumbtack fa-lg", "Unpin", this.note_title_container)).show();
            }
            else
            {
                (new NoteIcon(this, "note-card-icon fas fa-thumbtack fa-lg", "Pin", this.note_title_container)).show();
            }
        }
        //showing the archive icon
        if(this.is_archived)
        {
            (new NoteIcon(this, "note-card-icon fas fa-box-archive fa-lg", "Unarchive", this.note_card_footer)).show();
        }
        else
        {
            (new NoteIcon(this, "note-card-icon fas fa-box-archive fa-lg", "Archive", this.note_card_footer)).show();
        }
        //showing the bin icon
        if(this.is_binned)
        {
            (new NoteIcon(this, "note-card-icon fas fa-trash-arrow-up fa-lg", "Restore", this.note_card_footer)).show();
        }
        else
        {
            (new NoteIcon(this, "note-card-icon fas fa-trash fa-lg", "Delete", this.note_card_footer)).show();
        }
        this.note_card_body.append(this.note_title_container, this.note_card_text, this.note_card_footer);
        this.note_card.appendChild(this.note_card_body);
        this.note_col.appendChild(this.note_card);

        //filling data in card
        this.note_card_title.innerText = this.note_title;
        this.note_card_text.innerText = this.note_content;

        //styling
        this.note_card.classList.add("border", "hover-shadow", "ripple");

        //setting event listener for click on note
        this.note_card.addEventListener("click", (click)=>
        {
            this.note_modal.updateContent(this);
            this.note_modal.show();
        })

    }

    //method to display the card
    show()
    {
        this.note_container_row.appendChild(this.note_col);
    }
}

//class for icons related to notes such as pin, unpin, archive, etc.
class NoteIcon
{
    constructor(note, iconclasses, tooltip, iconcontainer)
    {
        //data members
        this.note = note;
        this.icon_classes = iconclasses;
        this.icon_container = iconcontainer;
        this.tool_tip = tooltip;

        //element for button
        this.button_element = document.createElement("button");
        this.button_element.classList.add("btn", "btn-light", "btn-floating", "ripple");
        this.button_element.setAttribute("title", this.tool_tip);
        this.button_element.setAttribute("data-mdb-ripple-color", "dark");

        //element for icon
        this.icon_element = document.createElement("i");
        this.icon_element.classList = this.icon_classes;

        //placing icon inside button
        this.button_element.appendChild(this.icon_element);
    }

    //method to show button
    show()
    {
        this.icon_container.appendChild(this.button_element);
    }
}


//class for edit note modal
class EditNoteModal
{
    constructor(modal)
    {
        // data members
        this.mdb_modal = new mdb.Modal(modal);
        this.modal_title_element = modal.querySelector(".modal-title");
        this.modal_body_element = modal.querySelector(".modal-body");
        this.modal_close_btn = modal.querySelector(".close-btn");

        //adding event listener on modal title element to update title as soon as user inputs
        this.modal_title_element.addEventListener("input", (input)=>
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
                    body: "note_id="+this.note.note_id+"&title="+this.modal_title_element.innerText
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
        this.modal_body_element.addEventListener("input", (input)=>
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
                    body: "note_id="+this.note.note_id+"&content="+this.modal_body_element.innerText
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
        this.modal_close_btn.addEventListener("click", (click)=>
        {
            //updating the note on screen
            this.note_title_element.innerText = this.modal_title_element.innerText;
            this.note_text_element.innerText = this.modal_body_element.innerText;

            //showing the note in case of newly created note
            if(isCreatingNewNote)
            {
                this.note.show();
                isCreatingNewNote = false;
            }
        });

    }

    //this method must be called by the click event listener of note card, before showing the modal
    updateContent(note)
    {
        //setting which note this modal will show and allow updating
        this.note = note;
        this.note_title_element = note.note_card_title;
        this.note_text_element = note.note_card_text;
    }

    //method to show the modal
    show()
    {
        //first updating the modal content
        this.modal_title_element.innerText = this.note_title_element.innerText;
        this.modal_body_element.innerText = this.note_text_element.innerText;

        //now showing the modal
        this.mdb_modal.show();

        //focusing on modal body
        // this.modal_body_element.focus();
    }

    
}    
