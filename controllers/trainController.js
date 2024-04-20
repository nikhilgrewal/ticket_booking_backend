const db = require('../models');
const Train = db.Train;

const addTrain = async (req, res) => {
    try {
        const { source, destination, seatsAvailable } = req.body;
        const train = await Train.create({
            source,
            destination,
            seatsAvailable
        });
        res.send(train);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getTrainsWithAvailability = async (req, res) => {
    try {
        const { source, destination } = req.query;
        const trains = await Train.findAll({
            where: {
                source: source,
                destination: destination,
                seatsAvailable: {
                    [db.Sequelize.Op.gt]: 0  // Only return trains with available seats
                }
            }
        });
        if (trains.length > 0) {
            res.send(trains);
        } else {
            res.status(404).send({ message: "No available trains found for the specified route." });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const bookSeat = async (req, res) => {
    const { userId, trainId } = req.body;
    const t = await db.sequelize.transaction();

    try {
        // Find the train and lock the row in the database
        const train = await Train.findByPk(trainId, { lock: t.LOCK.UPDATE, transaction: t });
        if (!train) {
            await t.rollback();
            return res.status(404).send({ message: "Train not found." });
        }

        if (train.seatsAvailable < 1) {
            await t.rollback();
            return res.status(400).send({ message: "No seats available." });
        }

        // Decrease the available seats
        train.seatsAvailable -= 1;
        await train.save({ transaction: t });

        // Create a booking record
        await Booking.create({
            userId,
            trainId
        }, { transaction: t });

        // Commit the transaction
        await t.commit();
        res.send({ message: "Seat booked successfully." });
    } catch (error) {
        // Roll back the transaction on error
        await t.rollback();
        res.status(500).send({ message: "Failed to book seat: " + error.message });
    }
};

module.exports = {
    addTrain, getTrainsWithAvailability, bookSeat
};
