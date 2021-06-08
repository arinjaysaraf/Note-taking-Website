// User adds a Notes => add to Local Storage
let addbtn = document.getElementById('add-btn');
addbtn.addEventListener("click", (e) => {
    let addTxt = document.getElementById('add-text');
    let addtitle = document.getElementById('title');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addtitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addtitle.value = "";
    // console.log(notesObj);
    showNotes();

});

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach((element, index) => {
        html += `<div class="card-added">
                    <h2 class="note-head">${element.title}</h2>
                    <p class="note-text">${element.text}</p>
                    <div class="added-note"> 
                        <button onclick="DeleteNote(this.id)" class="add-note" id="${index}">Delete</button>
                    </div>
                </div>`;
    });
    let notesElm = document.getElementById("note-list");
    if (notesElm.length != 0) {
        notesElm.innerHTML = html;
    }
}

//Delete Note
function DeleteNote(index) {
    // console.log('Deleting Note...', index);

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let searchtxt = document.getElementById('search-text');
searchtxt.addEventListener('input', () => {
    let inputval = searchtxt.value.toLowerCase();
    // console.log("input event {searching}...",inputval);
    let notecard = document.getElementsByClassName('card-added');
    Array.from(notecard).forEach((element) => {
        let cardTxt = element.getElementsByTagName('p')[0].innerHTML;
        if (cardTxt.includes(inputval)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";

        }
    });
});