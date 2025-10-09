const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

loadTasks();

addBtn.addEventListener("click", addTask);
taskList.addEventListener("click", handleTaskClick);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerHTML = `${taskText} <button class="delete-btn">Delete</button>`;
  taskList.appendChild(li);

  saveTasks();
  taskInput.value = "";
}

function handleTaskClick(e) {
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
  } else {
    e.target.classList.toggle("completed");
  }
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.childNodes[0].textContent.trim(),
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t.text;
    if (t.completed) li.classList.add("completed");
    const del = document.createElement("button");
    del.textContent = "Delete";
    del.classList.add("delete-btn");
    li.appendChild(del);
    taskList.appendChild(li);
  });
}
