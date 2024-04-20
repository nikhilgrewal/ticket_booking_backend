const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/:id', bookingController.getBookingDetails);

router.post('/book', verifyToken, bookingController.bookSeat);

module.exports = router;
