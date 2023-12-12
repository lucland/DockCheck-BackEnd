const express = require('express');
const router = express.Router();
const beaconController = require('../controllers/beaconController');
const authenticateJWT = require('../middleware/auth');

router.get('/all', authenticateJWT, beaconController.getAllBeacons);

router.post('/create', authenticateJWT, beaconController.createBeacon);

router.get('/:id', authenticateJWT, beaconController.getBeacon);

router.put('/:id', authenticateJWT, beaconController.updateBeacon);

router.delete('/:id', authenticateJWT, beaconController.deleteBeacon);

module.exports = router;