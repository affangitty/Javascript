const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* Render */

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.classList.add("task-text");

        if (task.completed) {
            span.classList.add("completed");
        }

        /* Toggle using ID */
        span.addEventListener("click", () => {
            task.completed = !task.completed;
            updateStorage();
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            updateStorage();
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

/* Add Task */

addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (!text){
        alert("box is empty!");
        return;
    } 

    tasks.push({
        id: Date.now(),
        text,
        completed: false
    });

    taskInput.value = "";
    updateStorage();
    renderTasks();
});

/* Storage */

function updateStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Init */

renderTasks();