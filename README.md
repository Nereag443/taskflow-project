## Taskflow Project

Proyecto con **maquetas/experimentos** de una app tipo “to‑do”, probando distintos enfoques de UI y arquitectura front:

- **HTML/CSS puro**
- **HTML/CSS + JavaScript con estado en localStorage**
- **Tailwind CSS con build tooling (npm)**

Sirve como base para experimentar con listas de tareas, filtros, estados y organización de flujos de trabajo sencillos.

### Estructura del proyecto

- `apps/maqueta-html/`: maqueta solo HTML/CSS (sin lógica).
- `apps/maqueta-js/`: maqueta HTML/CSS + JS (localStorage, buscador, etc.).
- `apps/maqueta-tailwind/`: maqueta con Tailwind (CSS generado en `src/output.css`).
- `docs/`: documentación (IA, notas, etc.).

---

### Requisitos previos

Para **ver las maquetas básicas** (HTML y JS) solo necesitas un navegador moderno.

Para trabajar con la maqueta de **Tailwind**, necesitas:

- **Node.js** (recomendado LTS) y `npm` instalados.

---

### Instalación

No hay dependencia de backend ni base de datos. La instalación se reduce a preparar el entorno de Tailwind (si lo quieres modificar).

1. Clonar el repositorio:
   - `git clone <URL-del-repo>`
   - `cd taskflow-project`
2. (Opcional, solo para Tailwind) Instalar dependencias en la carpeta de Tailwind:
   - `cd apps/maqueta-tailwind`
   - `npm install`

---

### Cómo usar el proyecto

#### 1. Maqueta HTML (solo UI estática)

- **Objetivo**: Ver el diseño de la app de tareas sin lógica.
- **Uso**:
  - Abrir `apps/maqueta-html/index.html` directamente en el navegador (doble clic o `Abrir con…`).
  - Navegar por la interfaz, revisar layout y estilos.

#### 2. Maqueta JS (UI + lógica básica)

- **Objetivo**: Probar una versión funcional con:
  - Alta/baja de tareas.
  - Persistencia en `localStorage`.
  - Buscador/filtros (según lo implementado).
- **Uso**:
  - Abrir `apps/maqueta-js/index.html` en el navegador.
  - Añadir tareas, marcarlas como completadas, refrescar la página y comprobar que se mantienen.

#### 3. Maqueta Tailwind (UI con Tailwind + build)

- **Objetivo**: Explorar el mismo concepto de app to‑do pero con Tailwind y un flujo de build.
- **Uso rápido (sin tocar código)**:
  - Abrir `apps/maqueta-tailwind/index.html` en el navegador.

- **Modificar estilos o estructura**:
  1. Ir a la carpeta:
     - `cd apps/maqueta-tailwind`
  2. Instalar dependencias (una sola vez):
     - `npm install`
  3. Para ver cambios mientras editas (`src`):
     - `npm run dev`
     - Tailwind regenerará `src/output.css` mientras guardas cambios.
  4. Para hacer un build puntual:
     - `npm run build`

---

### Flujo de trabajo recomendado

1. Revisar primero la **maqueta HTML** para entender la estructura base.
2. Pasar a la **maqueta JS** para ver cómo se añade lógica mínima con localStorage.
3. Explorar la **maqueta Tailwind** si quieres evolucionar la UI y el sistema de estilos con tooling moderno.

### Ejemplos de uso

- **Ejemplo 1: Lista de tareas personales (maqueta JS)**  
  1. Abre `apps/maqueta-js/index.html` en el navegador.  
  2. Añade tareas como "Sacar al perro", "Hacer la compra".  
  3. Márcalas como completadas y refresca la página para comprobar que siguen guardadas gracias a `localStorage`.  
  4. Usa el buscador/filtros (si están activos) para encontrar tareas por texto.

- **Ejemplo 2: Tablero de trabajo simple (maqueta HTML)**  
  1. Abre `apps/maqueta-html/index.html`.  
  2. Imagina columnas o bloques como "Pendiente", "En curso", "Hecho" y usa la maqueta para discutir con el equipo cómo debería verse un flujo tipo kanban.  
  3. Anota cambios deseados de UI (colores, tamaños, orden de secciones) antes de pasar a la maqueta JS o Tailwind.

- **Ejemplo 3: Probar cambios rápidos de estilo (maqueta Tailwind)**  
  1. Ve a `apps/maqueta-tailwind` y ejecuta:  
     - `npm install` (solo la primera vez)  
     - `npm run dev`  
  2. Modifica clases de Tailwind en los archivos de `src/` (por ejemplo, cambiar colores de botones o tamaños de tipografías).  
  3. Guarda y recarga `index.html` para ver cómo afectan los cambios a la experiencia de la lista de tareas.

---

### Funcionalidades principales por maqueta

#### Maqueta JS (`apps/maqueta-js/app.js`)

- **Gestión de tareas con persistencia**  
  - Carga y guarda tareas en `localStorage` (`tasks`).  
  - Cada tarea tiene texto y estado de completada (`completed`).  
  - Puedes añadir, marcar como completada y borrar tareas.

- **Funciones clave**  
  - `render()`: dibuja las tarjetas de tareas en el contenedor `#task-block`.  
  - `saveTasks()` / `saveAndRender()`: persisten el array de tareas en `localStorage` y actualizan la vista.  
  - `handleTaskDeleteClick(event)`: maneja los clics en botones de borrado usando delegación de eventos.  
  - `findTask()`: filtra visualmente las tarjetas según el texto introducido en el buscador.

- **Interacción de usuario**  
  - Botón "Aceptar" y tecla Enter para añadir tareas.  
  - Checkbox por tarjeta para marcar como completada.  
  - Buscador de texto con botón y evento `input` para filtrar.

#### Maqueta Tailwind (`apps/maqueta-tailwind/app.js`)

- **Modelo de datos y validación avanzada**  
  - `loadTasks()`: lee y normaliza tareas desde `localStorage` (`TASKS_STORAGE_KEY`).  
  - `normalizeTaskText()`: limpia espacios y unifica el formato del texto.  
  - `validateNewTaskText()`: valida longitud, duplicados y límite máximo de tareas.  
  - `persistTasks()` / `persistAndRenderTasks()`: guardan el estado en `localStorage` y repintan la lista.

- **Renderizado y presentación**  
  - `renderTasks()`: pinta las tarjetas con estilos Tailwind, estado de completada y marca de urgencia.  
  - `escapeHtml()`: escapa el texto para evitar inyección en el DOM.  
  - `formatTaskCreatedDate()`: muestra la fecha de creación con formato legible en español.

- **Filtros y ordenación**  
  - Estado de filtros en memoria (`currentTextFilter`, `currentUrgencyFilter`).  
  - `applyTaskFilters()`: combina filtro de texto y de urgencia (todas, urgentes, no urgentes).  
  - `setTaskCardsVisibilityByText()` / `handleSearchChange()`: filtran tarjetas mientras el usuario escribe.  
  - `handleUrgencyFilterChange()`: aplica el filtro de urgencia seleccionado.  
  - `handleSortAlphaClick()`: ordena las tareas alfabéticamente (A–Z).

- **Interacción con la lista de tareas**  
  - `handleTaskListDeleteClick(event)`: borra tareas usando delegación de eventos.  
  - `handleTaskListUrgentClick(event)`: alterna el estado de urgencia de una tarea.  
  - Listeners de cambio en los checkboxes para marcar tareas como completadas.

- **Modo oscuro**  
  - Lee el tema actual desde `localStorage` (`theme`).  
  - Alterna la clase `dark` en `<html>` y el icono del botón.  
  - Persiste la preferencia de tema para próximas visitas.

