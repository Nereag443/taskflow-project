En este documento voy a comparar la eficiencia al resorver problemas comparando mi código y el de la IA.
Primero resuelvo tres problemas de programación sencillos en javascript:

Problema sencillo para determinar si una persona es mayor de edad:
Sin IA:

function mayorDeEdad (age) {
    if(age>=18){
        console.log("Eres mayor de edad")
    }else{
        console.log("Eres menor de edad")
    }
}

mayorDeEdad();

Tiempo: 2min

Con IA:

let edad = hoy.getFullYear() - nacimiento.getFullYear();

if (
  hoy.getMonth() < nacimiento.getMonth() ||
  (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())
) {
  edad--;
}

const esMayor = edad >= 18;

Tiempo: 1min

Problema para comprobar si un número es primo:

Sin IA:

function isPrime (number){
    if(number<=1) {
        return false
    }
    for(let i = 2 i <= Math.sqrt(numero); i++){
        if(numero % i === 0) {
            return false;
        }
    }
    return true;
}

console.log(isPrime(7))
console.log(esPrimo(10))

Tiempo: 3min

Con IA:

function esPrimo(n) {
  if (n < 2) return false;       // 0 y 1 no son primos
  if (n === 2) return true;      // 2 es el único primo par
  if (n % 2 === 0) return false; // descarta todos los pares

  // solo comprueba divisores impares hasta √n
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

Tiempo: 1min

Problema para eliminar duplicados de un array:

Sin IA:

const duplicatedArray = [1, 2, 3, 4, 4, 5, 5, 5, 6]
const uniqueArray = [..new Set(duplicatedArray)];
console.log(uniques)

Tiempo: 1min

Con IA:

javascriptfunction eliminarDuplicados(array) {
  return [...new Set(array)];
}

// --- Ejemplo de uso ---
const original = [1, 2, 3, 2, "hola", "hola", true, 1];
const resultado = eliminarDuplicados(original);

console.log("Original:       ", original);
console.log("Sin duplicados: ", resultado);

Tiempo: 1min

El resultado de estos ejercicios es que la IA tarda menos en generar el código, pero lo hace menos simplificado y al ser ejercicios simples la comprensión del ejercicio dado es bastante buena, sin necesidad de dar indicaciones extra.



Ahora haré lo mismo pero con tres tareas de mi proyecto:

Función para añadir tareas con enter:

Sin IA:

taskInputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTaskButtonEl.click();
  }
});


Con IA:

javascripttaskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const inputText = taskInput.value.trim();

    if (!inputText) return;

    tasks.push({ text: inputText, completed: false });
    taskInput.value = "";
    saveAndRender();
  }
});

Función para hacer un input editable:

Sin IA:

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

Con IA:

function makeEditable(index) {
  const taskItem = document.querySelector(`[data-index="${index}"]`);
  const taskText = taskItem.querySelector(".task-text");
  const originalText = taskText.textContent;

  // Convertir el texto en un input editable
  const input = document.createElement("input");
  input.type = "text";
  input.value = originalText;
  input.classList.add("edit-input");
  taskText.replaceWith(input);
  input.focus();
}

Crear un botón para poner la página en modo oscuro:

Sin IA:

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

Con IA:

const darkMode = document.getElementById("darkMode");

// Aplicar tema guardado al cargar la página
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  darkMode.textContent = "☀️";
}

// Alternar tema al pulsar el botón
darkMode.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");

  darkMode.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

En este caso ha sido igual, el tiempo de generación de código de la IA es menor, pero para que funcionasen bien en mi código he tenido que dar indicaciones extra.
