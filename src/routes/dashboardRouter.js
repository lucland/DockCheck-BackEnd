const express = require('express');
const dashboardController = require('../controllers/dashboardController');

const router = express.Router();

/**
 * @swagger
 * /api/v1/dashboard/area-access-count:
 *   post:
 *     summary: Get access count of each area
 *     tags: [Dashboard]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - projectId
 *               - startDate
 *               - endDate
 *             properties:
 *               projectId:
 *                 type: string
 *                 description: The project ID
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: Start date for the query
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: End date for the query
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - name: "Main Hall"
 *                 accessCount: 15
 *               - name: "Conference Room"
 *                 accessCount: 8
 *       500:
 *         description: Server error
 */
router.post('/area-access-count', dashboardController.getAreaAccessCount);

/**
 * @swagger
 * /api/v1/dashboard/third-company-hours:
 *   post:
 *     summary: Get hours worked by each third company
 *     tags: [Dashboard]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - projectId
 *               - startDate
 *               - endDate
 *             properties:
 *               projectId:
 *                 type: string
 *                 description: The project ID
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: Start date for the query
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: End date for the query
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - name: "Third Company A"
 *                 totalHours: 120
 *               - name: "Third Company B"
 *                 totalHours: 90
 *       500:
 *         description: Server error
 */
router.post('/third-company-hours', dashboardController.getThirdCompanyHours);

/**
 * @swagger
 * /api/v1/dashboard/third-company-access-count:
 *   post:
 *     summary: Get access count for each third company
 *     tags: [Dashboard]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - projectId
 *               - startDate
 *               - endDate
 *             properties:
 *               projectId:
 *                 type: string
 *                 description: The project ID
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: Start date for the query
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: End date for the query
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - name: "Third Company A"
 *                 accessCount: 30
 *               - name: "Third Company B"
 *                 accessCount: 20
 *       500:
 *         description: Server error
 */
router.post('/third-company-access-count', dashboardController.getThirdCompanyAccessCount);

/**
 * @swagger
 * /api/v1/dashboard/total-unique-employees:
 *   post:
 *     summary: Get the total number of unique employees
 *     tags: [Dashboard]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - projectId
 *             properties:
 *               projectId:
 *                 type: string
 *                 description: The project ID
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               totalEmployees: 50
 *       500:
 *         description: Server error
 */
router.post('/total-unique-employees', dashboardController.getTotalUniqueEmployees);

module.exports = router;
