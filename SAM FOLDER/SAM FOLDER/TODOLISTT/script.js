document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    loadCompletedTasks();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = {
            text: taskText,
            timestamp: new Date().toLocaleString()
        };
        saveTask(task);
        taskInput.value = "";
        displayTask(task);
    }
}

function displayTask(task) {
    const taskList = document.getElementById("taskList");
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        ${task.text} <span>(Added: ${task.timestamp})</span>
        <button onclick="completeTask(this)">Complete</button>
    `;
    taskList.appendChild(taskItem);
}

function completeTask(button) {
    const taskItem = button.parentElement;
    const taskText = taskItem.childNodes[0].nodeValue.trim();
    const timestamp = new Date().toLocaleString();
    const completedTask = {
        text: taskText,
        completedTimestamp: timestamp
    };
    saveCompletedTask(completedTask);
    taskItem.remove();
    displayCompletedTask(completedTask);
}

function displayCompletedTask(completedTask) {
    const completedTaskList = document.getElementById("completedTaskList");
    const completedTaskItem = document.createElement("li");
    completedTaskItem.innerHTML = `
        ${completedTask.text} <span>(Completed: ${completedTask.completedTimestamp})</span>
    `;
    completedTaskList.appendChild(completedTaskItem);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveCompletedTask(completedTask) {
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    completedTasks.push(completedTask);
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => displayTask(task));
}

function loadCompletedTasks() {
    const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    completedTasks.forEach(task => displayCompletedTask(task));
}
