const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnAddNewTask = document.querySelector('#btnAddNewTask');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');

let taskInStorage;

function createItem(text) {
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    const link = document.createElement('a');
    link.setAttribute('href', '#');
    link.className = 'delete-item float-right';
    link.innerHTML = '<i class="fas fa-times"></i>';
    li.appendChild(link);

    taskList.appendChild(li);
}

eventListeners();

function eventListeners() {
    loadTasks();
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', deleteTask);
    btnDeleteAll.addEventListener('click', deleteAllTasks);
}

function loadTasks() {
    taskInStorage = getTasksFromStorage();
    taskInStorage.forEach(function (item) {
        createItem(item);
    });
}

function getTasksFromStorage(){
    if(localStorage.getItem("tasks") === null){
        taskInStorage = [];
    }else{
        taskInStorage = JSON.parse(localStorage.getItem("tasks"));
    }
    return taskInStorage;
}

function setTaskFromStorage(newTask){
    taskInStorage=getTasksFromStorage();
    taskInStorage.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskInStorage));
}

function addTask(e) {
    let control = true;

    document.getElementById('task-list').childNodes.forEach(function (item) {
        if (item.innerText == input.value) {
            control = false;
        }
    });

    if (input.value === '') {
        alert('Please add a task');
    } else if (!control) {
        alert('Task already exists');
        input.value = '';
    } else {
        createItem(input.value);
        setTaskFromStorage(input.value);
        input.value = '';
    }
    e.preventDefault();
}

function deleteTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            deleteTaskFromStorage(e.target.parentElement.parentElement.innerText);
        }
    }
    e.preventDefault();
}

function deleteAllTasks(e) {
    if (confirm('Are you sure?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
}

function deleteTaskFromStorage(deleteTask){
    taskInStorage=getTasksFromStorage();
    taskInStorage.forEach(function (item, index) {
        if(item == deleteTask){
            taskInStorage.splice(index, 1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(taskInStorage));
}

