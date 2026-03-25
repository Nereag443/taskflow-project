const taskService = require('../services/task.service')

function getTasks(req, res, next) {

  try {

    const tasks = taskService.obtenerTodas()

    res.json(tasks)

  } catch (err) {

    next(err)

  }
}

function createTask(req, res, next) {

  try {

    const { title } = req.body

    if (!title || title.trim() === '') {
      return res.status(400).json({
        error: 'El campo "title" es obligatorio'
      })
    }

    const task = taskService.crearTarea({ title })

    res.status(201).json(task)

  } catch (err) {

    next(err)

  }
}

function deleteTask(req, res, next) {

  try {

    const id = parseInt(req.params.id)

    taskService.eliminarTarea(id)

    res.status(204).send()

  } catch (err) {

    next(err)

  }
}

module.exports = {
  getTasks,
  createTask,
  deleteTask
}