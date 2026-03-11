En este documento experimentare con varior prompts

Primero le dare prompts con ejemplos (few-shot prompting):

Dime los tipos de datos:
Ejemplo 1:
Input:
1

Output:
int

Ejemplo 2:
Input:
Hola

Output:
String

Ahora responde:

Input:
True

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