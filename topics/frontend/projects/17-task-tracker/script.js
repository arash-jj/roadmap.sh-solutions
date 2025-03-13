// tasks array
let tasks = []
// selecting elements 
const addInput = document.getElementById("taskInput")
const addBtn = document.getElementById("add")
const taskList = document.getElementById("list")
// adding task by press ENTER key and adding system
addInput.addEventListener("keypress",(e)=>{
    if(e.key === "Enter")
        addTask()
})
addBtn.addEventListener("click",addTask);

// add tack logic
function addTask() {
    if (addInput.value !== '') {
        const taskText = addInput.value.trim()
        const newTask = {
            taskInfo: taskText,
            isComplete: false
        }
        tasks.push(newTask)
        addInput.value = ""
        render()
    } else {
        return
    }
}
// remove task logic
function removeTask(index) {
    tasks.splice(index, 1);
    render()
}
// toggle complete status
function toggleComplete(index) {
    tasks[index].isComplete = !tasks[index].isComplete;
    render()
}
// render tasks
function render() {
    taskList.innerHTML = '';
    const sortedTasks = tasks.slice().sort((a, b) => a.isComplete - b.isComplete);
    sortedTasks.forEach((task, index)=>{
        const item = document.createElement("li")
        item.className = "task"
        if(task.isComplete)
            item.classList.add("done")
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = task.isComplete
        checkbox.addEventListener("change",()=>toggleComplete(tasks.indexOf(task)));
        const taskText = document.createElement("span")
        taskText.className = "task-text"
        taskText.innerText = task.taskInfo
        const delBtn = document.createElement("span")
        delBtn.className = "task-remove"
        delBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
        </svg>
        `
        delBtn.addEventListener("click",()=>removeTask(tasks.indexOf(task)))
        item.appendChild(checkbox)
        item.appendChild(taskText)
        item.appendChild(delBtn)
        taskList.appendChild(item)
    })
}