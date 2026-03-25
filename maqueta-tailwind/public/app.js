let userAvatar = "avatar1.png"; // Valor por defecto del avatar
let darkMode = false;
let userData = {
  username: "",
  fullName: "",
  email: "",
  password: "",
};
const taskListEl = document.getElementById("task-block");
const taskInputEl = document.getElementById("task-text");
const addTaskButtonEl = document.getElementById("add-task-button");
const avatar = document.getElementById("avatar");
const avatarOptions = document.querySelectorAll(".avatar-option");
const usernameInput = document.getElementById("username");
const fullNameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password"); 
const searchInputEl = document.getElementById("finder-text");
const searchButtonEl = document.getElementById("search-task");
const urgencyFilterEl = document.getElementById("urgency-filter");
const taskFilterEl = document.getElementById("task-filter");
const toggleFiltersButtonEl = document.getElementById("toggle-filters");
const taskFiltersContentEl = document.getElementById("task-filters-content");
const loadingEl = document.getElementById("loading");
const errorMessageEl = document.getElementById("error-message");

async function getUserPreferences() {
  try {
    const response = await fetch(`${API_BASE}/api/v1/user/preferences`);
    if (!response.ok) {
      throw new Error("Failed to fetch user preferences");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    return { theme: "light", userAvatar: "avatar1.png" };
  }
}

async function updateUserPreferences(preferences) {
  try {
    await fetch(`${API_BASE}/api/v1/user/preferences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferences),
    });
  } catch (error) {
    console.error("Error updating user preferences:", error);
  }
}



function showLoading(show) {
  if (loadingEl) {
    loadingEl.classList.toggle("hidden", !show);
  }
}

function showErrorMessage(show) {
  if (errorMessageEl) {
    errorMessageEl.classList.toggle("hidden", !show);
  }
}

function hideError() {
  showErrorMessage(false);
}

// Seleccionamos todos los enlaces del aside
const navItems = document.querySelectorAll('aside ul li');

navItems.forEach(li => {
  li.addEventListener('click', e => {
    e.preventDefault();

    const link = li.querySelector('a'); // obtenemos el <a> dentro del li
    if (!link) return;

    const targetId = link.getAttribute('href').substring(1);

    // Ocultar todas las secciones
    document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));

    // Mostrar la sección correspondiente
    const targetScreen = document.getElementById(targetId);
    if (targetScreen) targetScreen.classList.remove('hidden');

    // Resaltar el enlace activo
    navItems.forEach(l => l.classList.remove('bg-rose-300', 'dark:bg-gray-500'));
    li.classList.add('bg-rose-300', 'dark:bg-gray-500');
  });
});

let currentSortFilter = "all";

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

let taskItems = [];
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

async function loadTasksFromApi() {
  showLoading(true);
  hideError();
  try {
    const response = await fetch(`${API_BASE}/api/v1/tasks`);
    if (!response.ok) throw new Error("Failed to fetch tasks from API");
    
    const tasksFromApi = await response.json();
    taskItems = tasksFromApi;
    renderTasks();
    updateStats();
  } catch (error) {
    console.error("Error loading tasks from API:", error);
    showErrorMessage(true);
  } finally {
    showLoading(false);
  }
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

addTaskButtonEl.addEventListener("click", async () => {
  const validation = validateNewTaskText(taskInputEl.value);
  if (!validation.ok) {
    setTaskError(validation.error);
    return;
  }

  setTaskError("");
  try {
    const newTask = {
      text: validation.text,
      completed: false,
      urgent: false,
      createdAt: new Date().toISOString(),
    };
    const createdTask = await createTask(newTask) || {...newTask, id: Date.now()}; // Fallback con ID temporal si la API no responde con el nuevo objeto
    taskItems.push(createdTask);
  } catch (error) {
    console.error("Error adding task:", error);
  }

  taskInputEl.value = "";
  renderTasks();
  updateStats();
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
    renderTasks();
    updateStats();
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

  try {
    const [removed] = taskItems.splice(taskIndex, 1);
    deleteTask(removed.id).catch((error) => {
      console.error("Error deleting task:", error);
    });
    renderTasks();
    updateStats();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
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
  renderTasks();
  updateStats();
}

taskListEl.addEventListener("click", handleTaskListUrgentClick);

// Inicializa la interfaz con los datos cargados de localStorage (incluye estadísticas)
renderTasks();
updateStats();

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
    renderTasks();
    updateStats();
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
  const status = currentSortFilter; // completed/pending/all
  const taskCards = document.querySelectorAll(".task-card");

  taskCards.forEach((card) => {
    const taskText = (
      card.querySelector("h3")?.textContent ?? ""
    ).toLowerCase();
    const isUrgent = card.dataset.urgent === "true";
    const taskIndex = Number(card.querySelector(".check")?.dataset.index);
    const task = Number.isNaN(taskIndex) ? null : taskItems[taskIndex];
    const isCompleted = task ? task.completed : false;

    const matchesText = taskText.includes(query);
    let matchesUrgency = true;
    let matchesStatus = true;

    if (urgency === "urgent") {
      matchesUrgency = isUrgent;
    } else if (urgency === "non-urgent") {
      matchesUrgency = !isUrgent;
    }

    if (status === "completed") {
      matchesStatus = isCompleted;
    } else if (status === "pending") {
      matchesStatus = !isCompleted;
    }

    card.style.display = matchesText && matchesUrgency && matchesStatus ? "" : "none";
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
 * Ordena `taskItems` según la opción seleccionada en el desplegable.
 */
function applyTaskSorting() {
  switch (currentSortFilter) {
    case "alphabetic":
      taskItems.sort((a, b) => a.text.localeCompare(b.text, "es", { sensitivity: "base" }));
      break;
    case "alphabetic-reverse":
      taskItems.sort((a, b) => b.text.localeCompare(a.text, "es", { sensitivity: "base" }));
      break;
    case "created-newest":
      taskItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case "created-oldest":
      taskItems.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      break;
    case "completed":
    case "pending":
    case "all":
    default:
      // No reordenamos para estas opciones, solo filtrar en visibilidad.
      break;
  }
}

function handleTaskFilterChange() {
  currentSortFilter = taskFilterEl.value;
  applyTaskSorting();
  renderTasks();
  updateStats();
}

if (taskFilterEl) {
  taskFilterEl.addEventListener("change", handleTaskFilterChange);
} else {
  console.warn("task-filter select not found");
}

if (toggleFiltersButtonEl && taskFiltersContentEl) {
  toggleFiltersButtonEl.addEventListener("click", () => {
    taskFiltersContentEl.classList.toggle("hidden");
    toggleFiltersButtonEl.textContent = taskFiltersContentEl.classList.contains("hidden")
      ? "Filtrar"
      : "Ocultar filtros";
  });
} else {
  console.warn("toggle-filters button or task-filters-content container not found");
}

const darkModeButtonEl = document.getElementById("darkModeButton");

if (darkModeButtonEl) {
  darkModeButtonEl.addEventListener("click", async () => {
  darkMode = !darkMode;

  document.documentElement.classList.toggle("dark", darkMode);
  userData.theme = darkMode ? "dark" : "light";
  darkModeButtonEl.textContent = darkMode ? "☀️" : "🌙";
  await updateUserPreferences({ theme: darkMode ? "dark" : "light" });
} );
}

const markAllCompletedBtn = document.getElementById("mark-all-completed-tasks");
if (markAllCompletedBtn) {
  markAllCompletedBtn.addEventListener("click", () => {
    taskItems = taskItems.map((t) => ({ ...t, completed: true }));
    renderTasks();
    updateStats();
  });
} else {
  console.warn("mark-all-completed-tasks button not found");
}

const clearCompletedBtn = document.getElementById("clear-completed-tasks");
if (clearCompletedBtn) {
  clearCompletedBtn.addEventListener("click", () => {
    taskItems = taskItems.filter((t) => !t.completed);
    renderTasks();
    updateStats();
  });
} else {
  console.warn("clear-completed-tasks button not found");
}

avatarOptions.forEach((option) => {
  option.addEventListener("click", async () => {
    userData.userAvatar = option.src;
    avatar.src = option.src;
    await updateUserPreferences(userData);
  });
});


const toggleAvatarBtn = document.getElementById("toggle-avatar-options");
const avatarOptionsContainer = document.getElementById("avatar-options");

if (toggleAvatarBtn && avatarOptionsContainer) {
  toggleAvatarBtn.addEventListener("click", () => {
    avatarOptionsContainer.classList.toggle("hidden");
  });
}

if (usernameInput) {
  usernameInput.addEventListener("input", async () => {
    userData.username = usernameInput.value;
    await updateUserPreferences({ username: usernameInput.value });
  });
}

if (fullNameInput) {
  fullNameInput.addEventListener("input", async () => {
    userData.fullName = fullNameInput.value;
    await updateUserPreferences({ fullName: fullNameInput.value });
  });
}
if (emailInput) {
  emailInput.addEventListener("input", async () => {
    userData.email = emailInput.value;
    await updateUserPreferences({ email: emailInput.value });
  });
}
if (passwordInput) {
  passwordInput.addEventListener("input", async () => {
    userData.password = passwordInput.value;
    await updateUserPreferences({ password: passwordInput.value });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const preferences = await getUserPreferences();
  userData = {
    username: preferences.username || "",
    fullName: preferences.fullName || "",
    email: preferences.email || "",
    password: preferences.password || "",
  };
  if (preferences.theme === "dark") {
    document.documentElement.classList.add("dark");
    if (darkModeButtonEl) {
      darkModeButtonEl.textContent = "☀️";
    }
  }
  if (preferences.userAvatar && avatar) {
    avatar.src = preferences.userAvatar;
  }
  if (usernameInput) usernameInput.value = userData.username || "";
  if (fullNameInput) fullNameInput.value = userData.fullName || "";
  if (emailInput) emailInput.value = userData.email || "";
  if (passwordInput) passwordInput.value = userData.password || "";

  renderTasks();
  updateStats();
  await loadTasksFromApi();
});