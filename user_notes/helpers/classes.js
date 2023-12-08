//will contain class abstractions for note, icons, modal to be displayed on screen

class Note
{
    constructor(noteid, notetitle, notecontent, ispinned, isarchived, isbinned, notemodal, masonry)
    {
        //data members
        this.note_id = noteid;
        this.note_title = notetitle;
        this.note_content = notecontent;
        this.is_pinned = ispinned;
        this.is_archived = isarchived;
        this.is_binned = isbinned;
        this.note_modal = notemodal;
        this.masonry = masonry;
        this.note_container_row = masonry.element;

        //card element for displaying note
        this.note_col = document.createElement("div");
        this.note_col.classList.add("col-12", "col-md-6", "col-lg-4", "col-xl-3", "col-xxl-2", "brick");
        this.note_card = document.createElement("div");
        this.note_card.classList.add("card");
        this.note_card_body = document.createElement("div");
        this.note_card_body.classList.add("card-body", "p-3");
        this.note_title_container = document.createElement("div");
        this.note_title_container.classList.add("d-flex");
        this.note_card_title = document.createElement("h5");
        this.note_card_title.classList.add("card-title", "me-auto");
        this.note_card_text = document.createElement("p");
        this.note_card_text.classList.add("card-text");
        this.note_card_text.setAttribute("placeholder", "Empty Note");
        this.note_card_footer = document.createElement("div");
        this.note_card_footer.classList.add("d-flex");
        this.note_title_container.append(this.note_card_title);
        if((!this.is_binned)&&(!this.is_archived))
        {
            //show the pin icon
            if(this.is_pinned)
            {
                (new NoteIcon(this, filledIconClasses, "", unpinTooltip, "push_pin", this.note_title_container, unpinPath, unpinMsg)).show();
            }
            else
            {
                (new NoteIcon(this, outlinedIconClasses, "", pinTooltip, "push_pin", this.note_title_container, pinPath, pinMsg)).show();
            }
        }
        //showing the archive icon
        if(this.is_archived)
        {
            (new NoteIcon(this, outlinedIconClasses, "me-auto", unarchiveTooltip, "unarchive", this.note_card_footer, unarchivePath, unarchiveMsg)).show();
        }
        else if(!this.is_binned)
        {
            (new NoteIcon(this, outlinedIconClasses, "me-auto", archiveTooltip, "archive", this.note_card_footer, archivePath, archiveMsg)).show();
        }
        //showing the bin icon
        if(this.is_binned)
        {
            (new NoteIcon(this, outlinedIconClasses, "me-auto", deleteforeverTooltip, "delete_forever", this.note_card_footer, deleteforeverPath, delForeverMsg)).show();
            (new NoteIcon(this, outlinedIconClasses, "", restoreTooltip, "restore_from_trash", this.note_card_footer, restorePath, unbinMsg)).show();
        }
        else
        {
            this.deleteIcon = (new NoteIcon(this, outlinedIconClasses, "ms-auto", deleteTooltip, "delete", this.note_card_footer, deletePath, binMsg));
            this.deleteIcon.show();
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
        if(arguments.length==1)
        {
            this.note_container_row.prepend(this.note_col);
            this.masonry.prepended(this.note_col);
            // this.masonry.layout();
        }
        else
        {
            this.note_container_row.appendChild(this.note_col);
            this.masonry.appended(this.note_col);
            // this.masonry.layout();
        }
    }
}

//class for icons related to notes such as pin, unpin, archive, etc.
class NoteIcon
{
    constructor(note, iconclasses, buttonclass, tooltip, iconcontent, iconcontainer, path, toastMsg)
    {
        //data members
        this.note = note;
        this.icon_classes = iconclasses;
        this.icon_container = iconcontainer;
        this.tool_tip = tooltip;
        this.path = path;

        // console.log(this.tool_tip+this.path);

        //element for button
        this.button_element = document.createElement("button");
        this.button_element.classList.add("btn", "btn-light", "btn-floating", "ripple");
        this.button_element.classList+=(" "+buttonclass);
        this.button_element.setAttribute("title", this.tool_tip);
        this.button_element.setAttribute("data-mdb-ripple-color", "dark");

        //element for icon
        this.icon_element = document.createElement("span");
        this.icon_element.classList = this.icon_classes;
        this.icon_element.innerText = iconcontent;

        //placing icon inside button
        this.button_element.appendChild(this.icon_element);

        //adding event listener for click on button
        this.button_element.addEventListener("click", (click)=>
        {
            //stop propagation
            click.stopPropagation();

            console.log(this.path);

            //sending ajax request to pin
            fetch(this.path, 
            {
                method: "POST",
                headers:
                {
                    "Content-type": "application/x-www-form-urlencoded"
                },
                body: "noteid=" + this.note.note_id
            })
            .then((response)=>
            {
                if(!(response.ok))
                {
                    throw new Error("Cannot complete " + this.tool_tip+ " operation: "+response.status);
                }
                return response.text();
            })
            .then((respText)=>
            {
                console.log(respText);
            })
            .catch((error)=>
            {
                console.log(error);
            });

            //now removing the note from the masonry
            this.note.masonry.remove(this.note.note_col);
            //layout masonry
            this.note.masonry.layout();

            //showing message in toast
            msg_toast.show(toastMsg);
        });

        //adding special callback for pin
        if(this.tool_tip===pinTooltip)
        {
            this.button_element.addEventListener("click", (click)=>
            {
                click.stopPropagation();
                //creating new note
                console.log(this.note.note_id);
                console.log(this.note.note_title);
                console.log(this.note.note_content);
                let newnote = new Note(this.note.note_id, this.note.note_card_title.innerText, this.note.note_card_text.innerText, 1, 0, 0, this.note.note_modal, pinnedMasonry);
                newnote.show("start");
            });
        }

        //adding special callback for unpin
        else if(this.tool_tip===unpinTooltip)
        {
            this.button_element.addEventListener("click", (click)=>
            {
                click.stopPropagation();
                //creating new note
                console.log(this.note.note_id);
                console.log(this.note.note_title);
                console.log(this.note.note_content);
                let newnote = new Note(this.note.note_id, this.note.note_card_title.innerText, this.note.note_card_text.innerText, 0, 0, 0, this.note.note_modal, unpinnedMasonry);
                newnote.show("start");
            });
        }
        
        
        
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

//class for toast
class ActionToast
{
    constructor()
    {
        //creating toast
        this.toast_container = document.createElement("div");
        this.toast_container.classList.add("toast-container", "p-3", "top-0", "end-0", "position-fixed");
        this.toast_element = document.createElement("div");
        this.toast_element.classList.add("toast", "toast-primary");
        this.toast_element.setAttribute("role", "alert");
        this.toast_element.setAttribute("aria-atomic", "true");
        this.toast_element.setAttribute("aria-live", "assertive");
        this.flex_container = document.createElement("div");
        this.flex_container.classList.add("d-flex", "justify-content-between", "align-items-center");
        this.toast_body = document.createElement("div");
        this.toast_body.classList.add("toast-body", "ms-4");
        this.close_btn = document.createElement("button");
        this.close_btn.classList.add("btn-close", "me-4");
        this.close_btn.setAttribute("data-mdb-dismiss", "toast");
        this.close_btn.setAttribute("aria-label", "Close");

        this.flex_container.append(this.toast_body, this.close_btn);
        this.toast_element.appendChild(this.flex_container);
        this.toast_container.appendChild(this.toast_element);

        //getting mdb instance for toast
        this.mdb_toast = new mdb.Toast(this.toast_element);

        document.body.querySelector("aside").appendChild(this.toast_container);
    }

    //method to show this toast with a given message
    show(message)
    {
        this.toast_body.innerText = message;
        this.mdb_toast.show();
    }
}