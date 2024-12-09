const express = require('express');
const TripModel = require('../models/tripModel');
const ActivityModel = require('../models/activityModel');

// @desc    Get activities
// @route   GET /api/trip/:tripId/activities
// @access  Private
const getActivities = async (req, res) => {
   try {
      // Fetch trip id 
      const tripId = req.params.tripId.toString();
      // console.log(tripId);

      // Check if trip exists
      const trip = await TripModel.findById(tripId);
      if (!trip) {
         return res.status(404).json({ error: 'Trip not found' });
      }

      // Get activities for the trip
      const activities = await ActivityModel.find({ trip: tripId });

      res.status(200).json({ tripId, activities });
      // console.log("Trip ID:", tripId);
      // console.log("Activities:", activities);

   } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
   }
};

const getInitialActivities = async (req, res) => {
   try {
      // Fetch trip id 
      const tripId = req.params.tripId.toString();
      // console.log(tripId);

      // Check if trip exists
      const trip = await TripModel.findById(tripId);
      if (!trip) {
         return res.status(404).json({ error: 'Trip not found' });
      }

      // Get activities for the trip
      const activities = await ActivityModel.find({ trip: tripId, day: 0 });

      res.status(200).json({ tripId, activities });

   } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
   }
};


// @desc    Get activity
// @route   GET /api/trip/:tripId/activity/get/:activityId
// @access  Private
const getActivity = async (req, res) => {
   try {

      // Fetch trip id 
      const tripId = req.params.tripId.toString();

      // Check if trip exists
      const trip = await TripModel.findById(tripId);
      if (!trip) {
         return res.status(401).json({ error: 'Trip not found' });
      }

      // Fetch activity id 
      const activityId = req.params.activityId.toString();

      // Get the activity
      const activity = await ActivityModel.findById(activityId);
      if (!activity) {
         return res.status(404).json({ error: 'Activity not found' });
      }

      res.status(200).json(activity);

   } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
   }
};

// @desc    Create a new activity
// @route   POST /api/trip/:tripId/activity/add
// @access  Private
const addActivity = async (req, res) => {
   try {
      // Fetch trip id 
      const tripId = req.params.tripId;

      // // Check if trip exists
      // const trip = await TripModel.findById(tripId);
      // if (!trip) {
      //    return res.status(404).json({ error: 'Trip not found' });
      // }

      // Check if activity already exists for this trip
      const existingActivity = await ActivityModel.findOne({ trip: tripId, name: req.body.name });

      if (existingActivity) {
         return res.status(400).json({ error: 'Activity with the same name already exists for this trip' });
      }

      const activity = await ActivityModel.create({ trip: tripId, ...req.body });

      res.status(200).json(activity);

   } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
   }
};

// @desc    Update activity
// @route   PUT /api/trip/:tripId/activity/update/:activityId
// @access  Private
const updateActivity = async (req, res) => {
   try {
      // Fetch trip id 
      const tripId = req.params.tripId.toString();

      // Check if trip exists
      const trip = await TripModel.findById(tripId);
      if (!trip) {
         return res.status(404).json({ error: 'Trip not found' });
      }

      // Fetch activity id
      const activityId = req.params.activityId.toString();

      // Get the activity
      const activity = await ActivityModel.findById(activityId);
      if (!activity) {
         return res.status(404).json({ error: 'Activity not found' });
      }

      // Update activity
      const updateActivity = await ActivityModel.findByIdAndUpdate(activityId, req.body, { new: true });

      res.status(200).json({ tripId, activityId, updateActivity });
      // console.log("ID", activityId);
      // console.log("Updated activity", updateActivity);

   } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
   }
};

// @desc    Delete trip
// @route   DELETE /api/trip/:tripId/activity/delete/:activityId
// @access  Private
const deleteActivity = async (req, res) => {
   try {

      // Fetch trip id 
      const tripId = req.params.tripId.toString();
      // console.log(tripId);

      // Check if trip exists
      const trip = await TripModel.findById(tripId);
      if (!trip) {
         return res.status(401).json({ error: 'Trip not found' });
      }

      // Fetch activity id 
      const activityId = req.params.activityId.toString();

      // Get the activity to delete
      const activity = await ActivityModel.findById(activityId);
      if (!activity) {
         return res.status(404).json({ error: 'Activity not found' });
      }

      // Delete activity
      await activity.deleteOne();
      res.status(200).json({ tripId, activityId });
      // console.log("TripID", tripId);
      // console.log("ActivityID", activityId);

   } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
   }
};

// @desc    Update activity day
// @route   PUT /api/trip/:tripId/activity/update/:activityId/day
// @access  Private
const updateActivityDay = async (req, res) => {
   try {
      // Fetch trip id 
      const tripId = req.params.tripId.toString();

      // Check if trip exists
      const trip = await TripModel.findById(tripId);
      if (!trip) {
         return res.status(404).json({ error: 'Trip not found' });
      }

      // Fetch activity id
      const activityId = req.params.activityId.toString();

      // Get the activity
      const activity = await ActivityModel.findById(activityId);
      if (!activity) {
         return res.status(404).json({ error: 'Activity not found' });
      }

      // Update only the day of the activity
      const updateDay = await ActivityModel.findByIdAndUpdate(activityId, { day: req.body.day }, { new: true });

      res.status(200).json({ tripId, activityId, updateDay });
      // console.log("ID", activityId);
      // console.log("Updated day", updateDay);

   } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
   }
};


module.exports = { getActivities, getInitialActivities, getActivity, addActivity, deleteActivity, updateActivity, updateActivityDay };