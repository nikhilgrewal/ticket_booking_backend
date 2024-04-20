const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');
const { verifyToken, isAdmin } = require('../middlewares/auth');

router.post('/add', [verifyToken, isAdmin], trainController.addTrain);

router.get('/availability', trainController.getTrainsWithAvailability);

router.post('/book', trainController.bookSeat);

module.exports = router;
