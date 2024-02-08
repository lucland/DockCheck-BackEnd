const express = require('express');
const vesselController = require('../controllers/vesselController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * /api/v1/vessels/create:
 *   post:
 *     summary: Create a new vessel
 *     tags: [Vessels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vessel'
 *     responses:
 *       '201':
 *         description: Vessel created successfully
 *       '500':
 *         description: Internal Server Error
 */
router.post('/create', authenticateJWT, vesselController.createVessel);

/**
 * @swagger
 * /api/v1/vessels/{id}:
 *   get:
 *     summary: Get a vessel by ID
 *     tags: [Vessels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '404':
 *         description: Vessel not found
 *       '500':
 *         description: Internal Server Error
 */
router.get('/:id', authenticateJWT, vesselController.getVessel);

/**
 * @swagger
 * /api/v1/vessels/{id}:
 *   put:
 *     summary: Update a vessel by ID
 *     tags: [Vessels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vessel'
 *     responses:
 *       '200':
 *         description: Vessel updated successfully
 *       '404':
 *         description: Vessel not found
 *       '500':
 *         description: Internal Server Error
 */
router.put('/:id', authenticateJWT, vesselController.updateVessel);

/**
 * @swagger
 * /api/v1/vessels/{id}:
 *   delete:
 *     summary: Delete a vessel by ID
 *     tags: [Vessels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Vessel deleted successfully
 *       '404':
 *         description: Vessel not found
 *       '500':
 *         description: Internal Server Error
 */
router.delete('/:id', authenticateJWT, vesselController.deleteVessel);

/**
 * @swagger
 * /api/v1/vessels/company/{company_id}:
 *   get:
 *     summary: Get all vessels for a specific company
 *     tags: [Vessels]
 *     parameters:
 *       - in: path
 *         name: company_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '404':
 *         description: No vessels found for this company
 *       '500':
 *         description: Internal Server Error
 */
router.get('/company/:company_id', authenticateJWT, vesselController.getVesselsByCompany);

/**
 * @swagger
 * /api/v1/vessels:
 *   get:
 *     summary: Get all vessels
 *     tags: [Vessels]
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '500':
 *         description: Internal Server Error
 */
router.get('/', authenticateJWT, vesselController.getAllVessels);

module.exports = router;
