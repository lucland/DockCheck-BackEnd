const express = require('express');
const router = express.Router();
const InviteController = require('../controllers/inviteController');

/**
 * @swagger
 * /invites:
 *   post:
 *     summary: Create a new invite
 *     tags: [Invites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               thirdCompanyName:
 *                 type: string
 *             example:
 *               email: john@example.com
 *               thirdCompanyName: Example Company
 *     responses:
 *       201:
 *         description: Invite created successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post('/', InviteController.createInvite);

/**
 * @swagger
 * /invites/{id}:
 *   get:
 *     summary: Get an invite by ID
 *     tags: [Invites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the invite
 *     responses:
 *       200:
 *         description: Invite found
 *       404:
 *         description: Invite not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', InviteController.getInviteById);

/**
 * @swagger
 * /invites:
 *   get:
 *     summary: Get all invites
 *     tags: [Invites]
 *     responses:
 *       200:
 *         description: Invites found
 *       500:
 *         description: Internal server error
 */
router.get('/', InviteController.getAllInvites);

/**
 * @swagger
 * /invites/{id}:
 *   put:
 *     summary: Update an invite by ID
 *     tags: [Invites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the invite
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               thirdCompanyName:
 *                 type: string
 *             example:
 *               email: john@example.com
 *               thirdCompanyName: Example Company
 *     responses:
 *       200:
 *         description: Invite updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Invite not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', InviteController.updateInvite);

//cancelInvite with proper swagger documentation
/**
 * @swagger
 * /invites/{id}:
 *   delete:
 *     summary: Cancel an invite by ID
 *     tags: [Invites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the invite
 *     responses:
 *       200:
 *         description: Invite cancelled successfully
 *       404:
 *         description: Invite not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', InviteController.cancelInvite);

//get all invites by project_id where invite.project_id = project_id
/**
 * @swagger
 * /invites/project/{projectId}:
 *   get:
 *     summary: Get all invites by project ID
 *     tags: [Invites]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the project
 *     responses:
 *       200:
 *         description: Invites found
 *       500:
 *         description: Internal server error
 */
router.get('/project/:projectId', InviteController.getAllInvitesByProjectId);

module.exports = router;