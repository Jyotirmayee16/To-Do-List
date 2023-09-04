document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage on page load
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(function (task, index) {
            addTaskToList(task, index);
        });
    }

    // Add a new task to the list
    function addTaskToList(taskText, index) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete" data-index="${index}">Delete</button>
        `;
        taskList.appendChild(li);
    }

    // Add a new task when the "Add" button is clicked
    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.push(taskText);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            addTaskToList(taskText, tasks.length - 1);
            taskInput.value = "";
        }
    });

    // Delete a task when the "Delete" button is clicked
    taskList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete")) {
            const index = event.target.getAttribute("data-index");
            const tasks = JSON.parse(localStorage.getItem("tasks"));
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskList.innerHTML = "";
            loadTasks();
        }
    });

    // Load tasks on page load
    loadTasks();
});
