const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');


router.post('/create', userController.createUser);


router.get('/:id', authenticateJWT, userController.getUser);

router.put('/:id', authenticateJWT, userController.updateUser);



router.delete('/:id', authenticateJWT, userController.deleteUser);


router.get('/', authenticateJWT, userController.getAllUsers);


router.get('/:id/authorizations', authenticateJWT, userController.getUserAuthorizations);


router.get('/search', authenticateJWT, userController.searchUsers);


router.get('/all/lastnumber', authenticateJWT, userController.getUserNumber)


router.get('/valids/:vesselID', authenticateJWT, userController.getValidUsersByVesselID);


router.put('/block/:id', authenticateJWT, userController.blockUser);


router.get('/ids', authenticateJWT, userController.getAllUserIds);


router.get('/all/blocked', authenticateJWT, userController.getAllBlockedUserIds);


router.get('/all/approved', authenticateJWT, userController.getApprovedUserIds);

router.get('/user/rfid/:rfid', userController.getUserByRfid);

router.get('/user/itag/:number', userController.checkIfUserExists);

module.exports = router;
