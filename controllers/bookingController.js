const db = require('../models');
const Booking = db.Booking;
const Train = db.Train;

const bookSeat = async (req, res) => {
    const { userId, trainId, source, destination } = req.body;

    try {
        // Begin a database transaction
        const t = await db.sequelize.transaction();

        // Check if the provided source and destination are valid for the selected train route
        const train = await Train.findByPk(trainId, { transaction: t });
        if (!train) {
            await t.rollback(); // Rollback transaction if train is not found
            return res.status(404).send({ message: "Train not found." });
        }

        if (train.source !== source || train.destination !== destination) {
            await t.rollback(); // Rollback transaction if source or destination is invalid
            return res.status(400).send({ message: "Invalid source or destination for the selected train." });
        }

        // Check if there are available seats
        if (train.seatsAvailable < 1) {
            await t.rollback(); // Rollback transaction if no seats available
            return res.status(400).send({ message: "No seats available for booking." });
        }

        // Decrease available seats and create a booking record
        train.seatsAvailable -= 1;
        await train.save({ transaction: t });

        await Booking.create({
            userId,
            trainId
        }, { transaction: t });

        // Commit the transaction
        await t.commit();

        // Send success response
        res.send({ message: "Seat booked successfully." });
    } catch (error) {
        // Rollback the transaction and send error response
        await t.rollback();
        res.status(500).send({ message: "Failed to book seat: " + error.message });
    }
};

module.exports = {
    bookSeat
};
