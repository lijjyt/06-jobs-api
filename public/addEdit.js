import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showNotes } from "./notes.js";

let addEditDiv = null;
let title = null;
let note = null;
let tag = null;
let addingNote = null;

export const handleDelete = () => {
    title = document.getElementById("title");
    note = document.getElementById("note");
    tag = document.getElementById("tag");
    addingNote = document.getElementById("adding-note");

}

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-note");
  title = document.getElementById("title");
  note = document.getElementById("note");
  tag = document.getElementById("tag");
  addingNote = document.getElementById("adding-note");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingNote) {
        enableInput(false);
  
        let method = "POST";
        let url = "/api/v1/notes";

        if (addingNote.textContent === "update") {
            method = "PATCH";
            url = `/api/v1/notes/${addEditDiv.dataset.id}`;
          }

        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: title.value,
              note: note.value,
              tag: tag.value,
              
            }),
          });
  
          const data = await response.json();
          if (response.status === 200 || response.status === 201) {
            if (response.status === 200) {
                // a 200 is expected for a successful update
                message.textContent = "The job entry was updated.";
            } else {
                // a 201 is expected for a successful create
                message.textContent = "The job entry was created.";
            }
  
            title.value = "";
            note.value = "";
            tag.value = "";
  
            showNotes();
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.log(err);
          message.textContent = "A communication error occurred.";
        }
  
        enableInput(true);
      } else if (e.target === editCancel) {
        message.textContent = "";
        showNotes();
      }
    }
  });
};



export const showAddEdit = async (noteId) => {
    if (!noteId) {
      title.value = "";
      note.value = "";
      tag.value = "";
      addingNote.textContent = "add";
      message.textContent = "";
  
      setDiv(addEditDiv);
    } else {
      enableInput(false);
  
      try {
        const response = await fetch(`/api/v1/notes/${noteId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        console.log(data.note);
        if (response.status === 200) {
          title.value = data.note.title;
          note.value = data.note.note;
          tag.value = data.note.tag;
          addingNote.textContent = "update";
          message.textContent = "";
          addEditDiv.dataset.id = noteId;
  
          setDiv(addEditDiv);
        } else {
          message.textContent = "The notes entry was not found";
          showNotes();
        }
      } catch (err) {
        console.log(err);
        message.textContent = "A communications error has occurred.";
        showNotes();
      }
  
      enableInput(true);
    }
  };

export const deleteEntry = async (noteId) => {
    try {
        const response = await fetch(`/api/v1/notes/${noteId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
            showNotes(); 
            message.textContent = "The entry was deleted successfully.";
        } else {
            message.textContent = "Failed to delete the entry. Please try again.";
        }
    } catch (err) {
        console.log(err);
        message.textContent = "A communications error has occurred.";
        showNotes();
      }
    
}