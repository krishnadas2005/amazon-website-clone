document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.createElement("input");
    searchBar.type = "text";
    searchBar.placeholder = "Search tasks...";
    searchBar.style.position = "absolute";
    searchBar.style.top = "10px";
    searchBar.style.left = "10px";
    searchBar.style.padding = "5px";
    searchBar.style.borderRadius = "5px";
    searchBar.style.border = "1px solid #ccc";
    searchBar.style.backgroundColor = "yellow";
    document.body.appendChild(searchBar);

    // Calendar for selecting the day to save/load tasks
    const calendar = document.createElement("input");
    calendar.type = "date";
    calendar.style.position = "absolute";
    calendar.style.top = "50px";
    calendar.style.left = "10px";
    calendar.style.padding = "5px";
    calendar.style.borderRadius = "5px";
    calendar.style.border = "1px solid #ccc";
    document.body.appendChild(calendar);

    const statusBar = document.createElement("div");
    statusBar.textContent = "Tasks Done: 0 / Total Tasks: 0";
    statusBar.style.position = "absolute";
    statusBar.style.top = "10px";
    statusBar.style.right = "10px";
    statusBar.style.padding = "5px 10px";
    statusBar.style.borderRadius = "5px";
    statusBar.style.border = "1px solid #ccc";
    statusBar.style.backgroundColor = "yellow";
    document.body.appendChild(statusBar);

    // Update the status bar with the current task counts
    function updateStatusBar() {
        const totalTasks = document.querySelectorAll("li").length;
        const completedTasks = document.querySelectorAll("li input:checked").length;
        statusBar.textContent = `Tasks Done: ${completedTasks} / Total Tasks: ${totalTasks}`;
    }

    // Get the selected date or default to today (formatted as YYYY-MM-DD)
    function getSelectedDate() {
        return calendar.value || new Date().toISOString().split("T")[0];
    }

    // Save the current tasks to local storage under the selected date key
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("li").forEach(task => {
            tasks.push({
                text: task.querySelector("span").textContent,
                completed: task.querySelector("input").checked
            });
        });
        localStorage.setItem(getSelectedDate(), JSON.stringify(tasks));
    }

    // Load tasks from local storage for the selected date
    function loadTasks() {
        todoList.innerHTML = ""; // Clear current tasks
        const tasks = JSON.parse(localStorage.getItem(getSelectedDate())) || [];
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(this); updateStatusBar(); saveTasks();">
                <span>${task.text}</span>
                <button class="edit" onclick="editTask(this); saveTasks();">Edit</button>
                <button class="delete" onclick="removeTask(this); updateStatusBar(); saveTasks();">Delete</button>
            `;
            todoList.appendChild(li);
        });
        updateStatusBar();
    }

    // Add a new task and save it
    function addTask() {
        const text = todoInput.value.trim();
        if (text === "") return;

        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" onchange="toggleTask(this); updateStatusBar(); saveTasks();">
            <span>${text}</span>
            <button class="edit" onclick="editTask(this); saveTasks();">Edit</button>
            <button class="delete" onclick="removeTask(this); updateStatusBar(); saveTasks();">Delete</button>
        `;
        todoList.appendChild(li);
        todoInput.value = "";
        updateStatusBar();
        saveTasks();
    }

    // Filter tasks based on search input
    searchBar.addEventListener("input", () => {
        const searchText = searchBar.value.toLowerCase();
        document.querySelectorAll("li").forEach(task => {
            const taskText = task.textContent.toLowerCase();
            task.style.display = taskText.includes(searchText) ? "flex" : "none";
        });
    });

    const todoInput = document.getElementById("todoInput");
    const todoList = document.getElementById("todoList");
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Dark Mode";
    toggleButton.style.position = "absolute";
    toggleButton.style.bottom = "10px";
    toggleButton.style.left = "10px";
    toggleButton.style.padding = "10px";
    toggleButton.style.borderRadius = "5px";
    toggleButton.style.border = "none";
    toggleButton.style.backgroundColor = "#333";
    toggleButton.style.color = "white";
    toggleButton.style.cursor = "pointer";
    document.body.appendChild(toggleButton);

    toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Global functions for task operations
    window.toggleTask = (checkbox) => {
        checkbox.nextElementSibling.classList.toggle("completed", checkbox.checked);
        updateStatusBar();
        saveTasks();
    };

    window.editTask = (button) => {
        const taskSpan = button.previousElementSibling;
        const newText = prompt("Edit task:", taskSpan.textContent);
        if (newText) taskSpan.textContent = newText;
        saveTasks();
    };

    window.removeTask = (button) => {
        button.parentElement.remove();
        updateStatusBar();
        saveTasks();
    };

    window.showAll = () => {
        document.querySelectorAll("li").forEach(task => task.style.display = "flex");
    };

    window.showCompleted = () => {
        document.querySelectorAll("li").forEach(task => {
            task.style.display = task.querySelector("input").checked ? "flex" : "none";
        });
    };

    window.showPending = () => {
        document.querySelectorAll("li").forEach(task => {
            task.style.display = task.querySelector("input").checked ? "none" : "flex";
        });
    };

    window.addTask = addTask;

    // Load tasks when the calendar date changes
    calendar.addEventListener("change", loadTasks);

    // Set the calendar to today's date if not already set
    if (!calendar.value) {
        calendar.value = new Date().toISOString().split("T")[0];
    }

    // Load tasks for the selected date on initial load
    loadTasks();
});