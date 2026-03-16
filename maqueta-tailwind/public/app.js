const taskListEl = document.getElementById("task-block");
const taskInputEl = document.getElementById("task-text");
const addTaskButtonEl = document.getElementById("add-task-button");
const searchInputEl = document.getElementById("finder-text");
const searchButtonEl = document.getElementById("search-task");
const urgencyFilterEl = document.getElementById("urgency-filter");
const sortAlphaButtonEl = document.getElementById("sort-alpha");

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
 * @returns {{ text: string; completed: boolean; urgent: boolean; createdAt?: string | null }[]} Lista de tareas normalizadas.
 */

function loadTasks() {
  try {
    const parsed = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((t) => ({
        text: normalizeTaskText(t?.text),
        completed: Boolean(t?.completed),
        urgent: Boolean(t?.urgent),
        createdAt: typeof t?.createdAt === "string" ? t.createdAt : null,
      }))
      .filter((t) => t.text.length > 0);
  } catch {
    return [];
  }
}

let taskItems = loadTasks();
let currentTextFilter = "";
let currentUrgencyFilter = "all";

/**
 * Formatea la fecha de creación de una tarea a un formato legible.
 *
 * @param {string | null | undefined} isoString
 * @returns {string}
 */
function formatTaskCreatedDate(isoString) {
  if (!isoString) return "fecha desconocida";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "fecha desconocida";

  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Renderiza en el DOM todas las tareas actuales de `taskItems`.
 * No modifica el estado de las tareas, solo su representación visual.
 */

function renderTasks() {
  taskListEl.innerHTML = "";

  taskItems.forEach((task, taskIndex) => {
    taskListEl.innerHTML += `
      <section
        class="task-card flex items-center rounded-lg p-8 bg-rose-200 bg-opacity-40 shadow-md transition transform hover:-translate-y-1 hover:shadow-lg ${task.completed ? "opacity-50" : ""} ${task.urgent ? "border-2 border-rose-500" : ""}"
        data-urgent="${task.urgent ? "true" : "false"}"
      >
      <label class="flex items-center cursor-pointer mr-4">
  <input
    type="checkbox"
    class="check"
    data-index="${taskIndex}"
    ${task.completed ? "checked" : ""}
  />
</label>
        <header class="flex flex-col w-full">
        <div class="flex items-center justify-between w-full">
          <h3 class="text-lg font-medium flex-1 ${task.completed ? "line-through text-gray-400" : ""}" data-index="${taskIndex}">${escapeHtml(task.text)}
          </h3>
          <button 
      type="button" 
      class="edit-button ml-2 text-gray-600 hover:text-rose-500 dark:text-white" 
      data-index="${taskIndex}"
      title="Editar tarea"
    >
      Editar tarea
    </button>
    </div>
          <p class="text-xs text-gray-600 dark:text-gray-300">
            Añadida el ${escapeHtml(formatTaskCreatedDate(task.createdAt))}
          </p>
          <div class="border-t-2 border-rose-400 w-full mt-2"></div>
          <div class="flex items-center gap-2 text-xs">
            <span class="font-semibold">Urgente:</span>
            <button
              type="button"
              class="urgent-toggle px-2 py-1 rounded-full text-xs font-semibold ${
                task.urgent
                  ? "bg-rose-400 text-gray-800 hover:bg-rose-400"
                  : "text-gray-800 hover:bg-rose-400"
              }"
              data-index="${taskIndex}"
            >
              ${task.urgent ? "Sí" : "No"}
            </button>
          </div>
        </header>
        <button class="delete-button ml-auto w-6 h-6 bg-rose-400 text-white rounded hover:bg-rose-500 transition dark:bg-gray-700" data-index="${taskIndex}">&times;</button>
      </section>
    `;
  });

  applyTaskFilters();
}

function updateStats() {
  const total = taskItems.length;
  const completed = taskItems.filter((t) => t.completed).length;
  const pending = total - completed;

  document.getElementById("total-tasks").textContent = total;
  document.getElementById("completed-tasks").textContent = completed;
  document.getElementById("pending-tasks").textContent = pending;
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
  updateStats();
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
  errorEl.className = "mt-2 text-sm text-rose-700 dark:text-rose-200 hidden";

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
    return {
      ok: false,
      text: normalized,
      error: "Escribe una tarea antes de añadirla.",
    };
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
  taskItems.push({
    text: validation.text,
    completed: false,
    urgent: false,
    createdAt: new Date().toISOString(),
  });
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

/**
 * Manejador de clicks en la lista de tareas que centraliza
 * la lógica asociada al botón de borrado.
 *
 * Usa delegación de eventos y `closest` para tolerar futuros
 * cambios en el contenido interno del botón.
 *
 * @param {MouseEvent} event
 */
function handleTaskListDeleteClick(event) {
  const deleteButton = event.target.closest(".delete-button");
  if (!deleteButton || !taskListEl.contains(deleteButton)) return;

  const taskIndex = Number(deleteButton.dataset.index);
  if (Number.isNaN(taskIndex)) return;

  taskItems.splice(taskIndex, 1);
  persistAndRenderTasks();
}

taskListEl.addEventListener("click", handleTaskListDeleteClick);

/**
 * Manejador de clicks en los controles de urgencia de cada tarjeta.
 *
 * Permite marcar una tarea como urgente o no urgente después de crearla.
 *
 * @param {MouseEvent} event
 */
function handleTaskListUrgentClick(event) {
  const urgentButton = event.target.closest(".urgent-toggle");
  if (!urgentButton || !taskListEl.contains(urgentButton)) return;

  const taskIndex = Number(urgentButton.dataset.index);
  if (Number.isNaN(taskIndex)) return;

  taskItems[taskIndex].urgent = !taskItems[taskIndex].urgent;
  persistAndRenderTasks();
}

taskListEl.addEventListener("click", handleTaskListUrgentClick);

// Inicializa la interfaz con los datos cargados de localStorage (incluye estadísticas)
persistAndRenderTasks();

// Edición de las tareas ya existentes
taskListEl.addEventListener("click", (e) => {
  const editButton = e.target.closest(".edit-button");
  if (!editButton || !taskListEl.contains(editButton)) return;

  const taskIndex = Number(editButton.dataset.index);
  if (Number.isNaN(taskIndex)) return;

  const h3 = taskListEl.querySelector(`h3[data-index="${taskIndex}"]`);
  if (!h3) return;

  const currentText = taskItems[taskIndex].text;

  // Crear input editable
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.className =
    "border-b-2 border-rose-400 focus:outline-none w-full bg-transparent text-gray-900 dark:text-gray-100 p-1 rounded-sm transition-colors placeholder-gray-400 dark:placeholder-gray-400";

  // Reemplaza el h3 por el input
  h3.textContent = "";
  h3.appendChild(input);
  input.focus();
  input.select();

  // Mostrar error inline en caso de duplicado o longitud
  const showInlineError = (msg) => {
    const errorEl = ensureInlineErrorEl();
    if (!msg) {
      errorEl.textContent = "";
      errorEl.classList.add("hidden");
      return;
    }
    errorEl.textContent = msg;
    errorEl.classList.remove("hidden");
  };

  const saveChanges = () => {
    const newText = input.value.trim();
    const normalizedKey = newText.toLowerCase();
    const isDuplicate = taskItems.some(
      (t, i) => i !== taskIndex && t.text.toLowerCase() === normalizedKey,
    );

    if (!newText) {
      showInlineError("El texto no puede estar vacío.");
      input.focus();
      return;
    }
    if (newText.length < TASK_TEXT_MIN_LEN) {
      showInlineError(
        `La tarea debe tener al menos ${TASK_TEXT_MIN_LEN} caracteres.`,
      );
      input.focus();
      return;
    }
    if (newText.length > TASK_TEXT_MAX_LEN) {
      showInlineError(
        `La tarea no puede superar ${TASK_TEXT_MAX_LEN} caracteres.`,
      );
      input.focus();
      return;
    }
    if (isDuplicate) {
      showInlineError("Esa tarea ya existe.");
      input.focus();
      return;
    }

    showInlineError(""); // limpiar error
    taskItems[taskIndex].text = newText;
    persistAndRenderTasks();
  };

  input.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") saveChanges();
  });

  input.addEventListener("blur", () => renderTasks());
});

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
    const taskText = (
      card.querySelector("h3")?.textContent ?? ""
    ).toLowerCase();
    card.style.display = taskText.includes(query) ? "" : "none";
  });
}

/**
 * Aplica conjuntamente el filtro de texto y el de urgencia
 * sobre las tarjetas actualmente renderizadas.
 */
function applyTaskFilters() {
  const query = normalizeTaskText(currentTextFilter).toLowerCase();
  const urgency = currentUrgencyFilter;
  const taskCards = document.querySelectorAll(".task-card");

  taskCards.forEach((card) => {
    const taskText = (
      card.querySelector("h3")?.textContent ?? ""
    ).toLowerCase();
    const isUrgent = card.dataset.urgent === "true";

    const matchesText = taskText.includes(query);
    let matchesUrgency = true;

    if (urgency === "urgent") {
      matchesUrgency = isUrgent;
    } else if (urgency === "non-urgent") {
      matchesUrgency = !isUrgent;
    }

    card.style.display = matchesText && matchesUrgency ? "" : "none";
  });
}

/**
 * Manejador de cambio de búsqueda que lee el valor del input
 * y aplica el filtro de visibilidad a las tarjetas.
 */

function handleSearchChange() {
  currentTextFilter = searchInputEl.value;
  applyTaskFilters();
}

searchButtonEl.addEventListener("click", handleSearchChange);
searchInputEl.addEventListener("input", handleSearchChange);

/**
 * Manejador de cambio de filtro de urgencia.
 */
function handleUrgencyFilterChange() {
  currentUrgencyFilter = urgencyFilterEl.value;
  applyTaskFilters();
}

urgencyFilterEl.addEventListener("change", handleUrgencyFilterChange);

/**
 * Ordena las tareas alfabéticamente por su texto y las persiste.
 */
function handleSortAlphaClick() {
  taskItems.sort((a, b) =>
    a.text.localeCompare(b.text, "es", { sensitivity: "base" }),
  );
  persistAndRenderTasks();
}

if (sortAlphaButtonEl) {
  sortAlphaButtonEl.addEventListener("click", handleSortAlphaClick);
} else {
  console.warn("sort-alpha button not found");
}

const darkModeButtonEl = document.getElementById("darkModeButton");

if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
  darkModeButtonEl.textContent = "☀️";
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

const markAllCompletedBtn = document.getElementById("mark-all-completed-tasks");
if (markAllCompletedBtn) {
  markAllCompletedBtn.addEventListener("click", () => {
    taskItems = taskItems.map((t) => ({ ...t, completed: true }));
    persistAndRenderTasks();
  });
} else {
  console.warn("mark-all-completed-tasks button not found");
}

const clearCompletedBtn = document.getElementById("clear-completed-tasks");
if (clearCompletedBtn) {
  clearCompletedBtn.addEventListener("click", () => {
    taskItems = taskItems.filter((t) => !t.completed);
    persistAndRenderTasks();
  });
} else {
  console.warn("clear-completed-tasks button not found");
}
