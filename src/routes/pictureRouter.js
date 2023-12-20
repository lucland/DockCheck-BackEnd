const express = require('express');
const pictureController = require('../controllers/pictureController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');


router.post('/', pictureController.createPicture);
router.get('/:id', pictureController.getPicture);
router.put('/:id', pictureController.updatePicture);
router.delete('/:id', pictureController.deletePicture);

module.exports = router;
