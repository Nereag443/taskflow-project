const taskListEl = document.getElementById("task-block");
const taskInputEl = document.getElementById("task-text");
const addTaskButtonEl = document.getElementById("add-task-button");
const searchInputEl = document.getElementById("finder-text");
const searchButtonEl = document.getElementById("search-task");

const TASKS_STORAGE_KEY = "tasks";
const TASK_TEXT_MIN_LEN = 2;
const TASK_TEXT_MAX_LEN = 80;
const TASKS_MAX_COUNT = 100;

/**
 * Normaliza el texto de una tarea eliminando espacios extra
 * y asegurando que siempre sea una cadena.
 *
 * @param {unknown} rawText - Valor bruto introducido por el usuario.
 * @returns {string} Texto normalizado sin espacios sobrantes.
 */

function normalizeTaskText(rawText) {
  return String(rawText ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Escapa caracteres especiales HTML para evitar inyección en el DOM.
 *
 * @param {unknown} unsafe - Texto potencialmente inseguro.
 * @returns {string} Texto seguro para insertar como HTML.
 */

function escapeHtml(unsafe) {
  return String(unsafe)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * Carga las tareas persistidas desde localStorage y devuelve
 * únicamente las que tengan texto válido.
 *
 * @returns {{ text: string; completed: boolean }[]} Lista de tareas normalizadas.
 */

function loadTasks() {
  try {
    const parsed = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((t) => ({
        text: normalizeTaskText(t?.text),
        completed: Boolean(t?.completed),
      }))
      .filter((t) => t.text.length > 0);
  } catch {
    return [];
  }
}

let taskItems = loadTasks();

/**
 * Renderiza en el DOM todas las tareas actuales de `taskItems`.
 * No modifica el estado de las tareas, solo su representación visual.
 */

function renderTasks() {
  taskListEl.innerHTML = "";

  taskItems.forEach((task, taskIndex) => {
    taskListEl.innerHTML += `
      <section class="task-card flex items-center gap-3 rounded-lg p-8 mb-3 bg-rose-200 bg-opacity-40 shadow-md transition hover:-translate-y-1 hover:shadow-lg ${task.completed ? "opacity-50 line-through" : ""}">
        <header class="flex flex-col">
          <h3 class="text-base font-medium">${escapeHtml(task.text)}</h3>
        </header>
        <button class="delete-button ml-auto w-6 h-6 bg-rose-400 text-white rounded hover:bg-rose-500 transition" data-index="${taskIndex}">&times;
        </button>
      </section>
    `;
  });
}

/**
 * Convierte el array `taskItems` a JSON y lo guarda en localStorage.
 */
function persistTasks() {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(taskItems));
}

/**
 * Guarda las tareas en localStorage y vuelve a renderizar la lista.
 */
function persistAndRenderTasks() {
  persistTasks();
  renderTasks();
}

/**
 * Asegura que exista un elemento de error inline para el input de tareas
 * y lo devuelve para poder reutilizarlo.
 *
 * @returns {HTMLParagraphElement} Elemento de párrafo usado para mostrar errores.
 */

function ensureInlineErrorEl() {
  const existing = document.getElementById("task-error");
  if (existing) return existing;

  const errorEl = document.createElement("p");
  errorEl.id = "task-error";
  errorEl.className =
    "mt-2 text-sm text-rose-700 dark:text-rose-200 hidden";

  const taskInputContainer = document.getElementById("task-input");
  const header = taskInputContainer?.querySelector("header");
  (header ?? taskInputContainer ?? taskListEl)?.appendChild(errorEl);

  return errorEl;
}

/**
 * Muestra u oculta el mensaje de error asociado al input de tareas.
 *
 * @param {string} message - Mensaje de error a mostrar. Si está vacío, se oculta.
 */

function setTaskError(message) {
  const errorEl = ensureInlineErrorEl();
  if (!message) {
    errorEl.textContent = "";
    errorEl.classList.add("hidden");
    return;
  }
  errorEl.textContent = message;
  errorEl.classList.remove("hidden");
}

/**
 * Valida el texto de una nueva tarea y devuelve el resultado de la validación.
 *
 * @param {string} rawText - Texto introducido por el usuario.
 * @returns {{ ok: boolean; text: string; error: string }} Resultado de la validación.
 */

function validateNewTaskText(rawText) {
  const normalized = normalizeTaskText(rawText);

  if (!normalized) {
    return { ok: false, text: normalized, error: "Escribe una tarea antes de añadirla." };
  }

  if (normalized.length < TASK_TEXT_MIN_LEN) {
    return {
      ok: false,
      text: normalized,
      error: `La tarea debe tener al menos ${TASK_TEXT_MIN_LEN} caracteres.`,
    };
  }

  if (normalized.length > TASK_TEXT_MAX_LEN) {
    return {
      ok: false,
      text: normalized,
      error: `La tarea no puede superar ${TASK_TEXT_MAX_LEN} caracteres.`,
    };
  }

  if (taskItems.length >= TASKS_MAX_COUNT) {
    return {
      ok: false,
      text: normalized,
      error: `Has alcanzado el máximo de ${TASKS_MAX_COUNT} tareas.`,
    };
  }

  const normalizedKey = normalized.toLowerCase();
  const isDuplicate = taskItems.some(
    (t) => normalizeTaskText(t.text).toLowerCase() === normalizedKey,
  );
  if (isDuplicate) {
    return { ok: false, text: normalized, error: "Esa tarea ya existe." };
  }

  return { ok: true, text: normalized, error: "" };
}

addTaskButtonEl.addEventListener("click", () => {
  const validation = validateNewTaskText(taskInputEl.value);
  if (!validation.ok) {
    setTaskError(validation.error);
    return;
  }

  setTaskError("");
  taskItems.push({ text: validation.text, completed: false });
  taskInputEl.value = "";
  persistAndRenderTasks();
});

// Añadir tareas con enter
taskInputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTaskButtonEl.click();
  }
});
taskInputEl.addEventListener("input", () => {
  if (document.getElementById("task-error")?.textContent) {
    setTaskError("");
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

/**
 * Actualiza la visibilidad de las tarjetas de tareas en función
 * de si su texto contiene la consulta indicada.
 *
 * @param {string} rawQuery - Texto de búsqueda introducido por el usuario.
 */

function setTaskCardsVisibilityByText(rawQuery) {
  const query = normalizeTaskText(rawQuery).toLowerCase();
  const taskCards = document.querySelectorAll(".task-card");

  taskCards.forEach((card) => {
    const taskText = (card.querySelector("h3")?.textContent ?? "").toLowerCase();
    card.style.display = taskText.includes(query) ? "" : "none";
  });
}

/**
 * Manejador de cambio de búsqueda que lee el valor del input
 * y aplica el filtro de visibilidad a las tarjetas.
 */

function handleSearchChange() {
  setTaskCardsVisibilityByText(searchInputEl.value);
}

searchButtonEl.addEventListener("click", handleSearchChange);
searchInputEl.addEventListener("input", handleSearchChange);


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
