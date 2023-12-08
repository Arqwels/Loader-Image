const Router = require('express');
const imagesController = require('../controllers/images-controller');
const router = new Router();

router.post('/upload', imagesController.loadImage);
router.get('/:id', );

module.exports = router;