const express = require('express');
const router = express.Router();
const syncController = require('../controllers/syncController');

/**
 * @swagger
 * /api/v1/projects:
 *   put:
 *     summary: Sync all models
 *     responses:
 *       200:
 *         description: Sync completed successfully
 *       500:
 *         description: An error occurred during sync
 */
router.put('/sync', syncController);

module.exports = router;