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
        document.body.blur()
        this.modal_body_element.focus();
    }

    
}    


// testing the modal
let edit_note_modal = new EditNoteModal(document.getElementById("editNoteModal"));


//testing
let cont = document.querySelector(".container");
let row = document.querySelector(".row")
let newnote = new Note(1, "My Note0", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis suscipit sed dolore incidunt. Nulla voluptate alias consectetur tenetur culpa ex. Et voluptas saepe laboriosam ullam repellendus eligendi ex incidunt perspiciatis eius! Quisquam dolore repudiandae ullam id inventore eaque atque sint nihil consequatur libero, velit deserunt possimus officia, veritatis ex doloremque.", 0, 0, 0, edit_note_modal, row);

let newnote1 = new Note(1, "My Note1", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ullam adipisci magnam delectus ratione voluptatum nisi! Nam maiores id quasi?", 0, 0, 0, edit_note_modal, row);

let newnote2 = new Note(1, "My Note2", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis suscipit sed dolore incidunt. Nulla voluptate alias consectetur tenetur culpa ex. Et voluptas saepe laboriosam ullam repellendus eligendi ex incidunt perspiciatis eius! Quisquam dolore repudiandae ullam id inventore eaque atque sint nihil consequatur libero, velit deserunt possimus officia, veritatis ex doloremque.", 0, 0, 0, edit_note_modal, row);

let newnote3 = new Note(1, "My Note3", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, quae? Quis exercitationem molestiae voluptatibus, magni fuga id qui, cupiditate sit neque voluptas omnis ad molestias voluptatem dolorem sapiente sed hic asperiores cumque. Nobis, non molestias.", 0, 0, 0, edit_note_modal, row);

let newnote4 = new Note(1, "My Note4", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, porro.", 0, 0, 0, edit_note_modal, row);

let newnote5 = new Note(1, "My Note5", "Lorem ipsum dolor sit amet, consectfnjdfbfjdsbfjdbfjbfjdfbjdfbjdfbjdfbjetur adipisicing elit. Inventore, porro.", 0, 0, 0, edit_note_modal, row);

newnote.show();
newnote1.show();
newnote2.show();
newnote3.show();
newnote4.show();
newnote5.show();

