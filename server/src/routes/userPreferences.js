const express = require("express");
const router = express.Router();

const { getUserPreferences, updateUserPreferences } = require ("../controllers/userPreferencesController.js");

/**
 * @swagger
 * tags:
 *   name: User Preferences
 *   description: Endpoints para gestionar las preferencias del usuario
 */

/** * 
 * @swagger
 * /api/v1/user/preferences:
 *   get:
 *     summary: Obtiene las preferencias del usuario
 *     tags: [User Preferences]
 *     responses:
 *       200:
 *         description: Preferencias obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPreferences'
 *       500:
 *         description: Error al obtener las preferencias
 *         content:
 *           application/json:  
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", getUserPreferences);

/** * 
 * @swagger
 * /api/v1/user/preferences:
 *   post:
 *     summary: Actualiza las preferencias del usuario
 *     tags: [User Preferences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPreferences'
 *     responses:
 *       200:
 *         description: Preferencias actualizadas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPreferences'
 *       400:
 *         description: Error al actualizar las preferencias
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", updateUserPreferences);


module.exports = router;
