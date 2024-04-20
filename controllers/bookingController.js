const db = require('../models');
const Booking = db.Booking;
const Train = db.Train;

const bookSeat = async (req, res) => {
    const { userId, trainId, source, destination } = req.body;

    try {
        // Check if the provided source and destination are valid for the selected train route
        const train = await Train.findByPk(trainId);
        if (!train) {
            return res.status(404).send({ message: "Train not found." });
        }

        if (train.source !== source || train.destination !== destination) {
            return res.status(400).send({ message: "Invalid source or destination for the selected train." });
        }

        // Proceed with the booking process
        // Example: Create a booking record in the database
        const booking = await Booking.create({
            userId,
            trainId
        });

        res.send({ message: "Seat booked successfully.", booking });
    } catch (error) {
        res.status(500).send({ message: "Failed to book seat: " + error.message });
    }
};

module.exports = {
    bookSeat
};
