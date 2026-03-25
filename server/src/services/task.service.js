let tasks = []
let idCounter = 1

function obtenerTodas() {
  return tasks
}

function crearTarea(data) {
  const newTask = {
    id: idCounter++,
    title: data.title
  }

  tasks.push(newTask)
  return newTask
}

function eliminarTarea(id) {

  const index = tasks.findIndex(task => task.id === id)

  if (index === -1) {
    throw new Error('NOT_FOUND')
  }

  tasks.splice(index, 1)
}

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea
}