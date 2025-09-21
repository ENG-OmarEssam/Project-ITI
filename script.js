const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addTask");
const list = document.getElementById("taskList");
const clearBtn = document.getElementById("clearAll");

window.onload = loadTasks;

addBtn.onclick = () => {
  if (input.value.trim() === "") return;
  addTask(input.value);
  input.value = "";
  saveTasks();
};

function addTask(taskText, done = false) {
  const li = document.createElement("li");
  li.textContent = taskText;

  if (done) li.classList.add("done");

  li.onclick = () => {
    li.classList.toggle("done");
    saveTasks();
  };

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.style.background = "red";
  delBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(delBtn);
  list.appendChild(li);
}

clearBtn.onclick = () => {
  list.innerHTML = "";
  saveTasks();
};

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("li").forEach(li => {
    tasks.push({ text: li.firstChild.textContent, done: li.classList.contains("done") });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
  saved.forEach(task => addTask(task.text, task.done));
}
