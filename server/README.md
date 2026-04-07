## Taskflow Project API

Este proyecto implementa una API REST desarrollada con Node.js y Express que permite gestionar tareas.  
La aplicación sigue una arquitectura por capas, separando responsabilidades entre rutas, controladores, servicios y middleware de errores para mantener un código limpio, mantenible y escalable.  
Actualmente la persistencia se simula mediante un array en memoria, por lo que la API no persiste.

---
### Arquitectura

La estructura del proyecto sigue una organización modular para separar responsabilidades.

Request -> Route -> Controller -> Service -> Response

```bash
server 
│ 
├── src 
│    │ 
│    ├── config/
│    │   └── env.js 
│    │   └── swagger.js
│    │ 
│    ├── controllers/
│    │    └── task.controller.js 
│    │    └── userPreferencesControllers.js
│    │ 
│    ├── routes/
│    │   └── task.routes.js 
│    │   └── userPreferences.js
│    │ 
│    ├── services/
│    │    └── task.service.js 
│    │  
│    └── index.js 
│ 
├── .env 
├── .gitignore 
├── package.json 
└── package-lock.json
```


### Descipción de carpetas
**config**  
Configuración global del servidor.
`env.js`: carga las variables de entorno mediante `dotenv`

**controllers**  
Los controladores gestionan las peticiones HTTP.
Responsabilidades:
 - Recibir solicitudes de clientes
 - Validar datos de entrada
 - Invocar la lógica del servicio
 - Enviar respuestas HTTP adecuadas

**services**  
Contiene la lógica de negocio de la aplicación.
Responsabilidades: 
 - Manipular datos
 - Gestionar tareas
 - Lanzar errores cuando ocurre un problema de dominio

**routes**  
Define los endpoints de la API y conecta cada ruta con su controlador correspondiente.

**index.js**  
Es el punto de entrada del servidor.

Responsabilidades:
 - Crear la aplicación Express
 - Registrar middlewares
 - Montar rutas
 - Implementar el middleware global de errores
 - Inicia el servidor


---
### Tecnologías utilizadas
 - Node.js (runtime)
 - Express (framework HTTP)
 - Cors (Cross-Origin Resource Sharing)
 - Dotenv (configuración de entorno)
 - Nodemon (hot reload en desarrollo)
 - Swagger (swagger-ui-express, swagger-jsdoc)

---
 ### Instalación
  1. Clonar el repositorio:
  ```bash
    git clone <https://github.com/Nereag443/taskflow-project.git>
    cd server
  ```
  2. Instalar dependencias:
  ```bash
    npm install
  ```
  3. Ejecutar el servidor:
  ```bash
    npm run dev
  ```

Servidor por defecto en: http://localhost:3000


### Base URL

http://localhost:3000/api/v1


---
### Endpoints principales

**Tareas**  
Obtener todas las tareas:

GET /api/v1/tasks

Respuesta:

[
  {
    "id": 1,
    "text": "Comprar comida",
    "completed": false,
    "urgent": false
  }
]

Crear una tarea:
POST /api/v1/tasks

Body:

{
  "text": "Estudiar Node"
}

Respuesta:

{
  "id": 2,
  "text": "Estudiar Node",
  "completed": false,
  "urgent": false
}

Eliminar tarea:
DELETE /api/v1/tasks/:id

Respuesta: 
Sin contenido



### Preferencias de usuario

Obtener preferencias:

GET /api/v1/user/preferences

Respuesta:

{
  "theme": "light",
  "userAvatar": "avatar1.png"
}

Actualizar preferencias:

POST /api/v1/user/preferences

Body:

{
  "theme": "dark",
  "avatar": "avatar2.png"
}

Respuesta:

{
  "message": "Preferences updated",
  "preferences": {
    "theme": "dark",
    "avatar": "avatar2.png"
  }
}


---
### Manejo de errores
La API implementa in middleware global de errores que normaliza las respuestas HTTP.

🔴 400 - Bad Request -> Error de validación o datos incorrectos

Ejemplo:

POST /api/v1/tasks

Body inválido:

{}

Respuesta:

{
  "error": "El texto de la tarea es obligatorio"
}

🔴 404 - Not Found -> Recurso inexistente

GET /api/v1/tasks/999

Respuesta:

{
  "error": "Recurso no encontrado"
}

🔴 500 - Internal Server Error -> Error inesperado en el servidor

GET /api/v1/tasks/999

Respuesta:

{
  "error": "Error interno del servidor"
}

### Testing Postman

Se han probado los endpoints con: 
 - Creación de tareas válidas
 - Envío de datos inválidos (error 400)
 - Rutas inexistentes (error 404)
 - Errores forzados en el servidor (error 500)


---
### Documentación Swagger
La API está documentada con OpenAPI 3.0 mediante swagger-jsdoc y swagger-ui-express

Disponible en: http://localhost:3000/api/docs

Permite:

 - Ver todos los endpoints
 - Probar request directamente
 - Ver esquemas de datos


 ---
### Middleware global de errores
```js
app.use((err, req, res, next) => {
  if (err.message === "NOT_FOUND") {
    return res.status(404).json({
      error: "Recurso no encontrado"
    });
  }

  res.status(500).json({
    error: "Error interno del servidor"
  });
});
```

---
### Notas
No hay autenticación implementada (req.user no disponible)  
Persistencia en memoria (no base de datos)