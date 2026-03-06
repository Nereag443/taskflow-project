const taskBlock = document.getElementById("task-block");
const taskInput = document.getElementById("task-text");
const addTask = document.getElementById("add-task-button");
const finderText = document.getElementById("finder-text");
const finderButton =document.getElementById("search-task");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function render() {
  taskBlock.innerHTML = "";

  tasks.forEach((task, index) => {
    taskBlock.innerHTML += `
      <section class="task-card flex items-center gap-3 rounded-lg p-8 mb-3 bg-rose-200 bg-opacity-40 shadow-md transition hover:-translate-y-1 hover:shadow-lg ${task.completed ? "opacity-50 line-through" : ""}">
        <header class="flex flex-col">
          <h3 class="text-base font-medium">${task.text}</h3>
        </header>
        <button class="delete-button ml-auto w-6 h-6 bg-rose-400 text-white rounded hover:bg-rose-500 transition" data-index="${index}">&times;
        </button>
      </section>
    `;
  });
}

//Convierte array tasks a texto y lo guarda en el localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
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
    saveAndRender();
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
    localStorage.setItem("theme", "light");
  }
});
