const express = require('express');
const { addActivity, getActivities, deleteActivity, getActivity, getInitialActivities, updateActivity, updateActivityDay } = require('../controllers/activityController');
const { protect } = require('../middleware/authMiddleware');

const activityRoutes = express.Router();

activityRoutes.post('/:tripId/activity/add', protect, addActivity);
activityRoutes.get('/:tripId/activities/get', protect, getActivities);
activityRoutes.get('/:tripId/activities/getInitial', protect, getInitialActivities);
activityRoutes.put('/:tripId/activity/update/:activityId', protect, updateActivity);
activityRoutes.put('/:tripId/activity/update/:activityId/day', protect, updateActivityDay);
activityRoutes.delete('/:tripId/activity/delete/:activityId', protect, deleteActivity);
activityRoutes.get('/:tripId/activity/get/:activityId', protect, getActivity);

module.exports = activityRoutes;