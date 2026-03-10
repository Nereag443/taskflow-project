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