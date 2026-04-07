const express = require('express')

const router = express.Router()

const taskController = require('../controllers/task.controller')
/** * 
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Endpoints para gestionar tareas
 */

/** * 
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Obtiene todas las tareas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/', taskController.getTasks)
/** * 
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarea creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error al crear la tarea
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.post('/', taskController.createTask)

/** * 
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea por su ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 *       404:
 *         description: Tarea no encontrada
 */

router.delete('/:id', taskController.deleteTask)

module.exports = router