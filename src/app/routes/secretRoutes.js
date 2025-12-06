const express = require('express');
const { createSecret, getSecret } = require('../controllers/secretController');
const ipRestrictionMiddleware = require('../middlewares/ipRestrictionMiddleware');

const router = express.Router();

/**
 * @swagger
 * /secrets:
 *   post:
 *     summary: Crea un nuevo secreto
 *     tags: [Secrets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *                 description: Clave del secreto
 *               value:
 *                 type: string
 *                 description: Valor del secreto
 *               app:
 *                 type: string
 *                 description: Aplicación que crea el secreto
 *     responses:
 *       200:
 *         description: Secreto creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/secrets', ipRestrictionMiddleware, createSecret);

/**
 * @swagger
 * /secrets/{app}:
 *   post:
 *     summary: Obtiene un secreto por su clave
 *     tags: [Secrets]
 *     parameters:
 *       - in: path
 *         name: app
 *         required: true
 *         schema:
 *           type: string
 *         description: Aplicación que crea el secreto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *                 description: Clave del secreto
 *     responses:
 *       200:
 *         description: Secreto obtenido exitosamente
 *       404:
 *         description: Secreto no encontrado
 */
router.post('/secrets/:app', ipRestrictionMiddleware, getSecret);

// Healthcheck endpoint para Docker (sin restricción de IP)
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', service: 'api-secrets' });
});

module.exports = router;

