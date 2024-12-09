const express = require('express');
const { addTrip, getTrips, updateTrip, deleteTrip, checkTrip, getTrip } = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');

const tripRoutes = express.Router();

tripRoutes.post('/add', protect, addTrip);
tripRoutes.get('/get', protect, getTrips);
tripRoutes.put('/update/:id', protect, updateTrip);
tripRoutes.delete('/delete/:id', protect, deleteTrip);
tripRoutes.patch('/check/:id', protect, checkTrip);
tripRoutes.get('/get/:id', protect, getTrip);

module.exports = tripRoutes;