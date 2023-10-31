const express = require('express');
const {
  createAuthorization,
  getAuthorizations,
  getAuthorizationById,
  updateAuthorization,
  deleteAuthorization,
} = require('../controllers/authorizationController');

const router = express.Router();

/**
 * @swagger
 * /api/v1/authorizations:
 *   post:
 *     summary: Create a new authorization
 *     tags: [Authorization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Authorization'
 *     responses:
 *       201:
 *         description: Successfully created
 */
router.post('/', createAuthorization);

/**
 * @swagger
 * /api/v1/authorizations/{user_id}:
 *   get:
 *     summary: Get all authorizations for a user
 *     tags: [Authorization]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched
 */
router.get('/:user_id', getAuthorizations);

/**
 * @swagger
 * /api/v1/authorizations/{id}:
 *   get:
 *     summary: Get an authorization by ID
 *     tags: [Authorization]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched
 */
router.get('/:id', getAuthorizationById);

/**
 * @swagger
 * /api/v1/authorizations/{id}:
 *   put:
 *     summary: Update an authorization by ID
 *     tags: [Authorization]
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
 *             $ref: '#/components/schemas/Authorization'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/:id', updateAuthorization);

/**
 * @swagger
 * /api/v1/authorizations/{id}:
 *   delete:
 *     summary: Delete an authorization by ID
 *     tags: [Authorization]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/:id', deleteAuthorization);

module.exports = router;