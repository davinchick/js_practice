// markdown:
// **lalala** <--- bold
// #lalalal <--- <h1>
// - lalal - lallal - allala <--- list
// [link to...](https://...) <--link


const form = document.getElementById('form')
const input = document.getElementById('input')
const todolist = document.getElementById('todolist')


const allToDo = JSON.parse(localStorage.getItem('todos'))
if(allToDo){
    allToDo.forEach(el => {
        addToDo(el)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    addToDo()

})

function addToDo(el) {
    let todo = input.value

    if(el){
        todo = el.text
    }

    if(todo){
        const todoLI = document.createElement('li')
        todoLI.innerText = todo
        if(todo && todo.completed){
            todoLI.classList.add('completed')
        }

        todoLI.addEventListener('click', ()=> {
            todoLI.classList.toggle('completed')
            updateLS()
        })
        todoLI.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            todoLI.remove()
            updateLS()
        })
        todolist.appendChild(todoLI)
        input.value = ''
        updateLS()
    }
}

function updateLS () {
    const notesLI = document.querySelectorAll('li')
    const arr =[]
    notesLI.forEach(note => {
        arr.push({
            text: note.innerText,
            completed: note.classList.contains('completed')
        })
    })
    localStorage.setItem('todos', JSON.stringify(arr))

}