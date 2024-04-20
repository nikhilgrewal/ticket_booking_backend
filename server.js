require('dotenv').config();
const express = require('express');
const db = require('./models'); // Ensure models are loaded.

const app = express();
app.use(express.json());

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const trainRoutes = require('./routes/trainRoutes');
app.use('/api/trains', trainRoutes);

const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        await db.sequelize.sync();
        console.log('Database synchronized.');
    } catch (error) {
        console.error('Failed to sync database: ' + error.message);
    }
});
