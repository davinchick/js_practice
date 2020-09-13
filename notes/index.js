// markdown:
// **lalala** <--- bold
// #lalalal <--- <h1>
// - lalal - lallal - allala <--- list
// [link to...](https://...) <--link



const addnoteBTN = document.getElementById('addnote')

const notes = JSON.parse(localStorage.getItem('notes'))
if(notes){
    notes.forEach(el => {
        addNewNote(el)
    })
}




addnoteBTN.addEventListener('click', ()=> {
    addNewNote()
})

function addNewNote(noteText = ''){
    const note = document.createElement('div')
    note.classList.add('notes_container')
    note.innerHTML = `
        <div class="tools">
            <button id="edit"></button>
            <button id="delete"></button>
        </div>
        <div class="main ${noteText ? 'showen' : ''}">
        </div>
        <textarea name="" id="textarea" class="textarea ${noteText ? 'showen' : ''}"></textarea>
    `;

    const textarea = note.querySelector('.textarea')
    const mainDiv = note.querySelector('.main')

    textarea.value = noteText;
    mainDiv.innerHTML = marked(noteText);

    note.querySelector('#edit').addEventListener('click', () => {
        mainDiv.classList.toggle('showen')
        textarea.classList.toggle('showen')
    })

    textarea.addEventListener('input', (e) => {
        const {value} = e.target
        mainDiv.innerHTML = marked(value);
        updateLocalStorage()
    })

    note.querySelector('#delete').addEventListener('click', ()=>{
        note.remove()
        updateLocalStorage()
    })

    document.body.appendChild(note)
}

function updateLocalStorage(){
    const notesText = document.querySelectorAll('.textarea');
    const notes = []
    notesText.forEach(el => notes.push(el))
    localStorage.setItem('notes', JSON.stringify(notes))
}



