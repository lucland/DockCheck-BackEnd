const express = require('express');
const router = express.Router();
const receptorController = require('../controllers/receptorController');
const authenticateJWT = require('../middleware/auth');

router.get('/all', authenticateJWT, receptorController.getAllReceptors);

router.post('/create', authenticateJWT, receptorController.createReceptor);

router.get('/:id', authenticateJWT, receptorController.getReceptor);

router.put('/:id', authenticateJWT, receptorController.updateReceptor);

router.delete('/:id', authenticateJWT, receptorController.deleteReceptor);

module.exports = router;