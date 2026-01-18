let todoList = [];
let totalTasks = 0;
let completedTasks = 0;

function addTask() {
  const input = document.getElementById("todoInput");
  const taskText = input.value.trim();

  if (taskText !== "") {
    const task = {
      text: taskText,
      completed: false
    };
    todoList.push(task);
    totalTasks++;
    input.value = "";  // Clear the input field
    renderTodoList();
  }
}

function renderTodoList() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todoList.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("click", () => toggleCompletion(index));

    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editTask(index));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(index));

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    list.appendChild(li);
  });

  updateStatusBar();
}

function toggleCompletion(index) {
  todoList[index].completed = !todoList[index].completed;
  if (todoList[index].completed) {
    completedTasks++;
  } else {
    completedTasks--;
  }
  renderTodoList();
}

function editTask(index) {
  const taskText = document.getElementById(`taskText-${index}`);
  const editButton = document.getElementById(`editButton-${index}`);
  
  if (editButton.textContent === "Edit") {
    taskText.contentEditable = true;
    taskText.style.border = "1px solid #ccc";  // Add a border to indicate edit mode
    editButton.textContent = "Save";
  } else {
    taskText.contentEditable = false;
    taskText.style.border = "none";  // Remove the border after editing
    editButton.textContent = "Edit";
    todoList[index].text = taskText.textContent;  // Update task text
  }
}

function renderTodoList() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todoList.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("click", () => toggleCompletion(index));

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    taskText.id = `taskText-${index}`; // Unique ID for the task text

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.id = `editButton-${index}`; // Unique ID for the edit button
    editButton.addEventListener("click", () => editTask(index));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(index));

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    list.appendChild(li);
  });

  updateStatusBar();
}

function deleteTask(index) {
  todoList.splice(index, 1);
  totalTasks--;
  renderTodoList();
}

function updateStatusBar() {
  const progress = document.getElementById("progress");
  const todoCount = document.getElementById("todoCount");

  const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  progress.style.width = `${progressPercentage}%`;
  todoCount.textContent = `Tasks Remaining: ${totalTasks - completedTasks}`;
}

function filterTasks() {
  const searchTerm = document.getElementById("searchBar").value.toLowerCase();
  const filteredTasks = todoList.filter(task => task.text.toLowerCase().includes(searchTerm));
  
  renderFilteredTasks(filteredTasks);
}

function renderFilteredTasks(tasks) {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("click", () => toggleCompletion(index));

    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editTask(index));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(index));

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    list.appendChild(li);
  });

  updateStatusBar();
}

function showAll() {
  renderTodoList();
}

function showCompleted() {
  const completedTasksList = todoList.filter(task => task.completed);
  renderFilteredTasks(completedTasksList);
}

function showPending() {
  const pendingTasksList = todoList.filter(task => !task.completed);
  renderFilteredTasks(pendingTasksList);
}