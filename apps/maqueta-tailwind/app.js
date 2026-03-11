const taskListEl = document.getElementById("task-block");
const taskInputEl = document.getElementById("task-text");
const addTaskButtonEl = document.getElementById("add-task-button");
const searchInputEl = document.getElementById("finder-text");
const searchButtonEl = document.getElementById("search-task");

let taskItems = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskListEl.innerHTML = "";

  taskItems.forEach((task, taskIndex) => {
    taskListEl.innerHTML += `
      <section class="task-card flex items-center gap-3 rounded-lg p-8 mb-3 bg-rose-200 bg-opacity-40 shadow-md transition hover:-translate-y-1 hover:shadow-lg ${task.completed ? "opacity-50 line-through" : ""}">
        <header class="flex flex-col">
          <h3 class="text-base font-medium">${task.text}</h3>
        </header>
        <button class="delete-button ml-auto w-6 h-6 bg-rose-400 text-white rounded hover:bg-rose-500 transition" data-index="${taskIndex}">&times;
        </button>
      </section>
    `;
  });
}

//Convierte array tasks a texto y lo guarda en el localStorage
function persistTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskItems));
}
function persistAndRenderTasks() {
  persistTasks();
  renderTasks();
}

addTaskButtonEl.addEventListener("click", () => {
  const newTaskText = taskInputEl.value.trim();
  if (!newTaskText) return;
  taskItems.push({ text: newTaskText, completed: false });
  taskInputEl.value = "";
  persistAndRenderTasks();
});

// Añadir tareas con enter
taskInputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTaskButtonEl.click();
  }
});
taskListEl.addEventListener("change", (e) => {
  if (e.target.classList.contains("check")) {
    const taskIndex = Number(e.target.dataset.index);
    taskItems[taskIndex].completed = e.target.checked;
    persistAndRenderTasks();
  }
});

taskListEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    const taskIndex = Number(e.target.dataset.index);
    taskItems.splice(taskIndex, 1);
    persistAndRenderTasks();
  }
});

renderTasks();

searchButtonEl.addEventListener("click", filterTasksBySearchText);
searchInputEl.addEventListener("input", filterTasksBySearchText);
function filterTasksBySearchText() {
  const searchText = searchInputEl.value.toLowerCase();
  const taskCards = document.querySelectorAll(".task-card");

  taskCards.forEach((card) => {
    const taskText = card.querySelector("h3").textContent.toLowerCase();
    if (taskText.includes(searchText)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}


const darkModeButtonEl = document.getElementById("darkModeButton");

if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
  darkModeButtonEl.textContent = "🌞";
} else {
  document.documentElement.classList.remove("dark");
  darkModeButtonEl.textContent = "🌙";
}

darkModeButtonEl.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  if (document.documentElement.classList.contains("dark")) {
    darkModeButtonEl.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    darkModeButtonEl.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});
