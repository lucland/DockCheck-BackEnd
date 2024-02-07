const express = require('express');
const vesselController = require('../controllers/vesselController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');


router.post('/create', authenticateJWT, vesselController.createVessel);

router.get('/:id', authenticateJWT, vesselController.getVessel);

router.put('/:id', authenticateJWT, vesselController.updateVessel);

router.delete('/:id', authenticateJWT, vesselController.deleteVessel);

router.get('/company/:company_id', authenticateJWT, vesselController.getVesselsByCompany);

router.get('/', authenticateJWT, vesselController.getAllVessels);

router.get('/name/:vessel_name', authenticateJWT, vesselController.getVesselByName);

router.get('/ids', authenticateJWT, vesselController.getAllVesselIds);

router.get('/onboarded/:id', authenticateJWT, vesselController.getOnboardedUsers);

router.get('/events/:vessel_id', authenticateJWT, vesselController.getEventsByVessel);


module.exports = router;
