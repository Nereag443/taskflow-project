const taskBlock = document.getElementById("task-block");
const taskInput = document.getElementById("task-text");
const addTask = document.getElementById("add-task-button");
const finderText = document.getElementById("finder-text");
const finderButton =document.getElementById("search-task");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/**
 * Renderiza todas las tareas almacenadas en `tasks` dentro del contenedor `taskBlock`.
 * No modifica el estado de las tareas, solo su representación en el DOM.
 */
function render() {
  taskBlock.innerHTML = "";

  tasks.forEach((task, index) => {
    taskBlock.innerHTML += `
      <section class="task-card ${task.completed ? "completed" : ""}">
        <input type="checkbox" class="check" data-index="${index}"${task.completed ? "checked" : ""}
        >
        <header>
          <h3>${task.text}</h3>
        </header>
        <button class="delete-button" data-index="${index}">&times;
        </button>
      </section>
    `;
  });
}

/**
 * Convierte el array `tasks` a texto JSON y lo guarda en localStorage.
 */
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * Guarda las tareas y vuelve a renderizar la lista en pantalla.
 */
function saveAndRender() {
  saveTasks();
  render();
}

addTask.addEventListener("click", () => { 
  const inputText = taskInput.value.trim();
  if (!inputText) return;
  tasks.push({text: inputText, completed: false});
  taskInput.value = "";
  saveAndRender();
});

// Añadir tareas con enter
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask.click();
  }
});
taskBlock.addEventListener("change", (e) => {
  if (e.target.classList.contains("check")) {
    const index = Number(e.target.dataset.index);
    tasks[index].completed = e.target.checked;
    saveTasks();
    e.target.parentElement.classList.toggle("completed", e.target.checked);
  }
});

taskBlock.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    const index = Number(e.target.dataset.index);
    tasks.splice(index, 1);
    saveAndRender();
  }
});

render();

finderButton.addEventListener("click", findTask);
finderText.addEventListener("input", findTask);

/**
 * Filtra visualmente las tarjetas de tareas en función del texto
 * introducido en el buscador `finderText`.
 */
function findTask(){
  const text=finderText.value.toLowerCase();
  const taskCards=document.querySelectorAll(".task-card");

  taskCards.forEach(card => {const taskText =card.querySelector("h3").textContent.toLowerCase();
    if(taskText.includes(text)) {
      card.style.display="";
    }else {
      card.style.display="none"
    }
  })
}
