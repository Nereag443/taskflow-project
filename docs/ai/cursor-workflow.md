Atajos de teclado más usados: 
- Ctrl + L (Chat contextual)
- Ctrl + K (Edición inline)
- Ctrl + I (Composer)
- Ctrl + J (Terminal)

Dos ejemplos claros en los que ha mejorado mi código han sido:
Al pedirle mediante Composer que añada manejo de errores en todo el código, ya que lo hace menos repetitivo.

Ejemplo: 
function handleError(error, context = "") {
  console.error("Task app error:", context, error);
  alert("Ha ocurrido un error inesperado. Revisa la consola para más detalles.");
}

let tasks = [];
try {
  const storedTasks = localStorage.getItem("tasks");
  tasks = storedTasks ? JSON.parse(storedTasks) : [];
} catch (error) {
  handleError(error, "Leyendo tareas de localStorage");
  tasks = [];
}


Y al usar la edición inline, pidiendole que refactorice parte de este codigo para que sea más legible:

const darkMode = document.getElementById("darkModeButton");
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
  darkMode.textContent = "🌞";
} else {
  document.documentElement.classList.remove("dark");
  darkMode.textContent = "🌙";
}

darkMode.addEventListener("click", () =>{
  document.documentElement.classList.toggle("dark");
  if (document.documentElement.classList.contains("dark")) {
    darkMode.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    darkMode.textContent = "🌙";


Cambiándolo a esto:


function setDarkMode(isDark) {
  if (isDark) {
    document.documentElement.classList.add("dark");
    darkModeButton.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    darkModeButton.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
}

// Inicializa el tema basado en el valor guardado en localStorage
const isDarkSaved = localStorage.getItem("theme") === "dark";
setDarkMode(isDarkSaved);

darkModeButton.addEventListener("click", () => {
  const isDarkActive = document.documentElement.classList.contains("dark");
  setDarkMode(!isDarkActive);
});


Cinco funciones refactorizadas:


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



// Eliminar tareas
taskBlock.addEventListener("click", (event) => {
  if (!event.target.classList.contains("delete-button")) return;

  const index = Number(event.target.dataset.index);
  tasks.splice(index, 1);
  saveAndRender();
});



// Añadir tareas con Enter
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleAddTask();
  }
});



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




Model context protocol: es un estandar abierto que permite que las aplicaciones de IA se conecten de forma segura y estandarizada con serivicios externos como bases de datos, herramientas, etc.