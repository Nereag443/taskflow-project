En este documento experimentare con varios prompts.

Primero le dare prompts con ejemplos (few-shot prompting):

Dime los tipos de datos:
Ejemplo 1:
Input: 1

Output: int

Ejemplo 2:
Input: Hola

Output: String

Ahora responde:

Input: True

Output:

Respuesta: Output: bool



Convierte JSON a una descripción.

Ejemplo 1:
Input:
{ "nombre": "Marcos", "edad": 17 }

Output:
Marcos tiene 17 años.

Ejemplo 2:
Input:
{ "nombre": "María", "edad": 82 }

Output:
María tiene 82 años.

Ahora responde:

Input:
{ "nombre": "Abel", "edad": 27 }

Output:

Respuesta: Output: Abel tiene 27 años.


Traduce las siguientes frases del español al inglés:
Ejemplo1:
Español: Hola, ¿cómo estás?
Inglés: Hello, how are you?

Ejemplo2:
Español: Me gusta el chocolate.
Inglés: I like chocolate.

Español: ¿Dónde está el baño?
Inglés:

Respuesta: 
Inglés: Where is the bathroom?



Dame un sinónimo de la palabra:

Palabra: Acabar
Sinónimo: Terminar

Palabra: Cómodo
Sinónimo: Confortable

Palabra: Mirar
Sinónimo:

Respuesta: 
Sinónimo: Ver



Ahora le pido que me explique paso a paso una parte de código:
const darkModeButtonEl = document.getElementById("darkModeButton");

if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
  darkModeButtonEl.textContent = "🌞";
} else {
  document.documentElement.classList.remove("dark");
  darkModeButtonEl.textContent = "🌙";
}

Respuesta:
Línea 264 – Referencia al botón

const darkModeButtonEl = document.getElementById("darkModeButton");
Busca en el DOM el elemento cuyo id es "darkModeButton" (tu botón de modo oscuro) y guarda la referencia en la constante darkModeButtonEl.
A partir de aquí, cualquier cambio en el texto/icono del botón se hace usando esta variable.
Línea 266 – Comprobación del tema guardado

if (localStorage.getItem("theme") === "dark") {
Lee de localStorage la clave "theme".
Si el valor guardado es exactamente "dark", significa que el usuario había elegido modo oscuro anteriormente.
Líneas 267–268 – Caso: tema oscuro

document.documentElement.classList.add("dark");
document.documentElement es la etiqueta <html>.
Añade la clase dark al <html>, lo que activa los estilos de modo oscuro (por ejemplo, en Tailwind, dark:).
darkModeButtonEl.textContent = "🌞";
Cambia el texto del botón para mostrar el icono de sol, indicando que ahora estás en modo oscuro y, si haces clic, “pasarías a claro”.
Líneas 269–272 – Caso contrario: tema claro (o no definido)

document.documentElement.classList.remove("dark");
Asegura que la clase dark no esté en <html>, es decir, la página se ve en modo claro.
darkModeButtonEl.textContent = "🌙";
Cambia el texto del botón al icono de luna, indicando que estás en modo claro y que el botón sirve para ir al modo oscuro.
Resumen
Lee la preferencia de tema desde localStorage nada más cargar la página.
Aplica o quita la clase dark al <html> según ese valor.
Sincroniza el icono del botón (🌞 o 🌙) con el estado actual para que el usuario vea visualmente si está en modo oscuro o claro.



Ahora le pido que explique el mismo código del ejemplo anterior pero con dos restricciones: respuesta más corta y quitando la refencia a las lineas del código de la explicación:

Respuesta:
Explicación corta del código
 Se obtiene el botón con id="darkModeButton" y se guarda en darkModeButtonEl.
 Se mira en localStorage el valor de "theme".
 Si el valor es "dark":
   Se añade la clase dark al <html> para activar el modo oscuro.
   El texto del botón pasa a ser 🌞 (indica que estás en oscuro y podrías cambiar a claro).
 Si no es "dark":
   Se quita la clase dark del <html> para usar el modo claro.
   El texto del botón pasa a ser 🌙 (indica que estás en claro y podrías cambiar a oscuro).



Además le pido que documente el proyecto al completo por carpetas, sin referencias a los nombres de las variables y de forma clara y sintetizada:

Respuesta:
Raíz del proyecto
  Descripción: Conjunto de maquetas de una aplicación de tareas (to‑do) en distintos enfoques: solo maquetación, maquetación con lógica en el navegador y maquetación con Tailwind.
  Contenido: archivo de descripción general y configuración básica del repositorio.
Carpeta apps/maqueta-html
  Objetivo: Demostración puramente visual de la app de tareas, orientada a estructura y estilos sin  comportamiento dinámico.
  HTML: página con cabecera, menú lateral de navegación y sección principal de tareas con tarjetas estáticas y un formulario de nueva tarea solo decorativo.
 CSS: define paleta de colores, tipografía, distribución con flexbox, diseño de tarjetas, checkboxes personalizados y comportamiento responsive en pantallas pequeñas.
Carpeta apps/maqueta-js
  Objetivo: Versión funcional de la app con interacción en el navegador, manteniendo un diseño similar a la maqueta HTML.
  HTML: misma estructura base, añadiendo un bloque de búsqueda de tareas y una zona donde se insertan dinámicamente las tarjetas.
  CSS: estilos similares a la maqueta HTML, adaptados a la nueva estructura (buscador, contenedor dinámico de tareas).
  JavaScript:
  Carga y guarda tareas en almacenamiento local del navegador.
  Genera y actualiza las tarjetas a partir de una lista en memoria.
  Permite añadir, marcar como completadas y borrar tareas.
  Incluye un buscador que filtra las tareas mostradas según el texto introducido.
Carpeta apps/maqueta-tailwind
  Objetivo: Versión de la app con Tailwind CSS, mejorando el diseño y añadiendo modo oscuro.
  HTML:
  Usa clases utilitarias para maquetar cabecera, menú lateral y sección de tareas.
  Integra un botón para alternar entre modo claro y oscuro.
  Mantiene buscador, lista dinámica de tareas y formulario de alta.
  JavaScript:
  Gestiona una lista de tareas con validaciones (longitud, duplicados, límite máximo).
  Persiste el estado en almacenamiento local y vuelve a dibujar la interfaz cuando cambian los datos.
  Aplica filtrado visual de tarjetas según el texto del buscador.
  Controla el modo oscuro mediante una clase en el documento y recordando la preferencia del usuario.
  Configuración Tailwind:
  Activa modo oscuro por clase.
  Define rutas de análisis de contenido para eliminar estilos no usados.
  Añade una lista de clases garantizadas para elementos generados dinámicamente.
  Extiende la paleta de colores y ajustes de transición.
  Build de estilos:
  Incluye configuración de dependencias y comandos para generar el CSS final utilizado por la página.
Carpeta docs/ai
  Objetivo: Recoger notas y experimentos relacionados con asistentes de IA y el flujo de trabajo en el editor.
  Documento de flujo de trabajo: explica cómo se usan las herramientas del editor, atajos de teclado y ejemplos de cómo la IA ayuda a refactorizar y mejorar código.
  Documento de prompts: reúne pruebas de diseño de instrucciones, ejemplos con entradas y salidas y análisis de cómo responde la IA a distintos formatos de petición.
  Documento de comparación de IA: contrasta respuestas de distintos modelos sobre conceptos de programación, detección de errores y generación de funciones a partir de lenguaje natural.



Ahora le pido que me explique esta parte del código pero que se salte los buttons:
function renderTasks() {
  taskListEl.innerHTML = "";

  taskItems.forEach((task, taskIndex) => {
    taskListEl.innerHTML += `
      <section
        class="task-card flex items-center rounded-lg p-8 bg-rose-200 bg-opacity-40 shadow-md transition transform hover:-translate-y-1 hover:shadow-lg ${task.completed ? "opacity-50 line-through" : ""} ${task.urgent ? "border-2 border-rose-500" : ""}"
        data-urgent="${task.urgent ? "true" : "false"}"
      >
        <header class="flex flex-col w-full">
          <h3 class="text-lg font-medium">${escapeHtml(task.text)}</h3>
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

  Respuesta:Explicación del código (sin centrarnos en los button)
Función renderTasks
Define una función que se encarga de pintar en pantalla todas las tareas.

Limpieza inicial de la lista

taskListEl.innerHTML = "";
Antes de volver a dibujar las tareas, vacía el contenido HTML del contenedor (taskListEl) para no duplicar elementos.

Recorrido de las tareas

taskItems.forEach((task, taskIndex) => {
Recorre el array taskItems. Para cada elemento:

task es el objeto tarea actual.
taskIndex es su posición en el array (se usa luego en data-index).
Construcción del HTML de cada tarjeta de tarea

taskListEl.innerHTML += `
  <section
    class="task-card ... ${task.completed ? "opacity-50 line-through" : ""} ${task.urgent ? "border-2 border-rose-500" : ""}"
    data-urgent="${task.urgent ? "true" : "false"}"
  >
    <header class="flex flex-col w-full">
      <h3 class="text-lg font-medium">${escapeHtml(task.text)}</h3>
      <p class="text-xs text-gray-600 dark:text-gray-300">
        Añadida el ${escapeHtml(formatTaskCreatedDate(task.createdAt))}
      </p>
      <div class="border-t-2 border-rose-400 w-full mt-2"></div>
      <div class="flex items-center gap-2 text-xs">
        <span class="font-semibold">Urgente:</span>
        ...
      </div>
    </header>
    ...
  </section>
`;
Uso de template literal: Se utiliza una cadena con backticks (`) para insertar HTML y poder mezclar texto con variables (${...}).
Clases condicionales en class:
task.completed ? "opacity-50 line-through" : ""
Si la tarea está completada, añade clases para hacerla más transparente y tachada.
task.urgent ? "border-2 border-rose-500" : ""
Si la tarea es urgente, añade un borde rojo.
Atributo data-urgent:
data-urgent="${task.urgent ? "true" : "false"}"
Guarda en el HTML si la tarea es urgente (true o false), útil para scripts o estilos.
Contenido del header

Título de la tarea:
<h3 ...>${escapeHtml(task.text)}</h3>
Muestra el texto de la tarea. escapeHtml se usa para evitar problemas de seguridad (como inyección de HTML).
Fecha de creación formateada:
Añadida el ${escapeHtml(formatTaskCreatedDate(task.createdAt))}
Llama a formatTaskCreatedDate para formatear la fecha createdAt y la pasa también por escapeHtml.
Línea separadora:
<div class="border-t-2 border-rose-400 w-full mt-2"></div>
Es solo una línea visual que separa el título/fecha de la parte inferior de la tarjeta.
Contenedor “Urgente:”
<div class="flex items-center gap-2 text-xs">
  <span class="font-semibold">Urgente:</span>
  ...
</div>
Prepara la sección visual donde se muestra la etiqueta “Urgente:” y, al lado, el botón (que estamos ignorando en la explicación lógica).
En resumen, esta parte del código reconstruye toda la lista de tareas en el DOM, generando para cada tarea una tarjeta (section) con estilos condicionales según si la tarea está completada o es urgente, mostrando su texto y la fecha formateada.



Le pido que refactorice funciones que tengan que ver con el botón de borrar que aparece en todo el proyecto:
Respuesta: refactorización de las funciones del botón de borrar el ambas versiones de la app:
/**
 * Manejador de clicks en el contenedor de tareas que se encarga
 * únicamente de la lógica asociada al botón de borrado.
 *
 * Usa delegación de eventos y `closest` para ser robusto aunque
 * se añadan elementos internos dentro del botón.
 *
 * @param {MouseEvent} event
 */
function handleTaskDeleteClick(event) {
  const deleteButton = event.target.closest(".delete-button");
  if (!deleteButton || !taskBlock.contains(deleteButton)) return;

  const index = Number(deleteButton.dataset.index);
  if (Number.isNaN(index)) return;

  tasks.splice(index, 1);
  saveAndRender();
}

taskBlock.addEventListener("click", handleTaskDeleteClick);

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

Refactor de lógica del botón de borrar
He buscado todos los usos de delete-button y he refactorizado la lógica asociada en las dos apps funcionales.

En la versión JS (maqueta-js):

Antes: un listener anónimo en el contenedor comprobaba directamente e.target.classList.contains("delete-button") y borraba la tarea.
Ahora: hay una función específica handleTaskDeleteClick que:
Usa closest(".delete-button") para ser robusta si cambias el contenido interno del botón.
Valida que el botón pertenece al contenedor y que el índice es numérico.
Encapsula la eliminación del elemento de la lista y el re‑renderizado.
El contenedor de tareas añade un único listener reutilizando esa función.
En la versión Tailwind (maqueta-tailwind):

Antes: patrón muy similar, con un listener anónimo que borraba directamente.
Ahora: función handleTaskListDeleteClick con la misma idea:
Delegación con closest, comprobaciones de seguridad y borrado centralizado.
El contenedor de la lista de tareas solo registra esta función como manejador.
No he tocado el marcado HTML ni los estilos; solo he mejorado y unificado la forma en la que se gestiona el botón de borrar para que el código sea más claro, reutilizable y resistente a cambios en la estructura interna de las tarjetas.
