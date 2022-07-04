const inputTodo = document.getElementById('inputTodo')
const addBtn = document.getElementById('addBtn')
const todoItems = document.getElementById('todoItems')

let tasks
let tasksCompleted = []
!localStorage.tasks
    ? (tasks = [])
    : (tasks = JSON.parse(localStorage.getItem('tasks')))

function Task(body) {
    this.body = body
    this.completed = false
}

const createTemplate = (item, index) => {
    return `
        <div class="todo-items-item ${item.completed ? 'checked' : ''}" >
            <div class="item-body">${item.body}</div>
            <div class="btns">
                <input onclick="completeTask(${index})" id="btnComplete" type="checkbox" ${
        item.completed ? 'checked' : ''
    }></input>
                <button onclick="deleteTask(${index})" id="btnDelete" >Delete</button>
                <button onclick="editTask(${index})" id="btnDelete" >Edit</button>
            </div>
        </div>
    `
}

const fillList = () => {
    todoItems.innerHTML = ''
    if (tasks.length) {
        tasks.map((i, index) => {todoItems.innerHTML += createTemplate(i, index)})
        tasksCompleted = document.querySelectorAll('.todo-items-item')
    }
}

fillList()

const updateStorage = () => localStorage.setItem('tasks', JSON.stringify(tasks))

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed
    if (tasks[index].completed) tasksCompleted[index].classList.add('checked')
    else tasksCompleted[index].classList.remove('checked')
    updateStorage()
    fillList()
}

const deleteTask = index => {
    tasks.splice(index, 1)
    updateStorage()
    fillList()
}

const editTask = index => {
    inputTodo.value = tasks[index].body
    tasks.splice(index, 1)
    updateStorage()
    fillList()
}

addBtn.addEventListener('click', () => {
    tasks.push(new Task(inputTodo.value))
    updateStorage()
    fillList()
    inputTodo.value = ''
})
