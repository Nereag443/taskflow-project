const taskBlock = document.getElementById("task-block");
const taskInput = document.getElementById("task-text");
const addTaskButton = document.getElementById("add-task-button");
const finderText = document.getElementById("finder-text");
const finderButton = document.getElementById("search-task");
const darkModeButton = document.getElementById("darkModeButton");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ----- Gestión de tareas -----

const createTaskCardHTML = (task, index) => `
  <section class="task-card flex items-center gap-3 rounded-lg p-8 mb-3 bg-rose-200 bg-opacity-40 shadow-md transition hover:-translate-y-1 hover:shadow-lg ${task.completed ? "opacity-50 line-through" : ""}">
    <header class="flex flex-col">
      <h3 class="text-base font-medium">${task.text}</h3>
    </header>
    <button
      class="delete-button ml-auto w-6 h-6 bg-rose-400 text-white rounded hover:bg-rose-500 transition"
      data-index="${index}"
    >
      &times;
    </button>
  </section>
`;

const renderTasks = () => {
  taskBlock.innerHTML = tasks.map(createTaskCardHTML).join("");
};

// Convierte el array tasks a texto y lo guarda en localStorage
const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const saveAndRender = () => {
  saveTasks();
  renderTasks();
};

const handleAddTask = () => {
  const inputText = taskInput.value.trim();
  if (!inputText) return;

  tasks.push({ text: inputText, completed: false });
  taskInput.value = "";
  saveAndRender();
};

// Añadir tareas con botón
addTaskButton.addEventListener("click", handleAddTask);

// Añadir tareas con Enter
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleAddTask();
  }
});

// Eliminar tareas
taskBlock.addEventListener("click", (event) => {
  if (!event.target.classList.contains("delete-button")) return;

  const index = Number(event.target.dataset.index);
  tasks.splice(index, 1);
  saveAndRender();
});

renderTasks();

// ----- Búsqueda / filtro de tareas -----

const filterTasks = (text) => {
  const normalizedText = text.trim().toLowerCase();
  const taskCards = document.querySelectorAll(".task-card");

  taskCards.forEach((card) => {
    const taskText = card
      .querySelector("h3")
      .textContent.toLowerCase();

    card.style.display = taskText.includes(normalizedText) ? "" : "none";
  });
};

const handleFilterChange = () => {
  filterTasks(finderText.value);
};

finderButton.addEventListener("click", handleFilterChange);
finderText.addEventListener("input", handleFilterChange);

// ----- Modo oscuro -----

const applyInitialTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  const isDark = storedTheme === "dark";

  document.documentElement.classList.toggle("dark", isDark);
  darkModeButton.textContent = isDark ? "🌞" : "🌙";
};

const toggleTheme = () => {
  const html = document.documentElement;
  const isDark = !html.classList.contains("dark");

  html.classList.toggle("dark", isDark);
  darkModeButton.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
};

applyInitialTheme();
darkModeButton.addEventListener("click", toggleTheme);
