const express = require('express');
const TripModel = require('../models/tripModel');
const UserModel = require('../models/userModel');

// @desc    Get trips
// @route   GET /api/trips
// @access  Private
const getTrips = async (req, res) => {
   try {
      const trips = await TripModel.find({ user: req.user._id });
      if (trips) {
         return res.status(200).json(trips);
      } else {
         return res.status(404).json({ error: 'No trips found' });
      }
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
   }
};


// @desc    Get trip
// @route   GET /api/trip/:id
// @access  Private
const getTrip = async (req, res) => {
   try {
      const trip = await TripModel.findById(req.params.id);
      if (!trip) {
         return res.status(404).json({ error: 'Trip not found' });
      }
      res.status(200).json(trip);
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
   }
};

// @desc    Create a new trip
// @route   POST /api/trips/add
// @access  Private
const addTrip = async (req, res) => {
   try {
      const trip = await TripModel.create({ user: req.user._id, ...req.body });
      res.status(200).json(trip);
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
   }
};

// @desc    Update trip
// @route   PUT /api/trips/update/:id
// @access  Private
const updateTrip = async (req, res) => {
   try {
      const tripId = req.params.id;

      // Check if trip exists
      const trip = await TripModel.findById(tripId);
      if (!trip) {
         return res.status(404).json({ error: 'Trip not found' });
      }

      // Make sure the logged in user matches the trip user
      if (trip.user.toString() !== req.user._id.toString()) {
         return res.status(403).json({ error: 'Unauthorized: You do not own this trip' });
      }

      const updatedTrip = await TripModel.findByIdAndUpdate(tripId, req.body, { new: true });

      // Réponse formatée avec `id` au lieu de `_id`
      res.status(200).json({ id: tripId, updatedTrip });
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
   }
};

// @desc    Delete trip
// @route   DELETE /api/trips/delete/:id
// @access  Private
const deleteTrip = async (req, res) => {
   try {
      const trip = await TripModel.findById(req.params.id);

      if (!trip) {
         return res.status(404).json({ error: 'Trip not found' });
      }

      const user = await UserModel.findById(req.user._id);

      // Check if user exists
      if (!user) {
         return res.status(401).json({ error: 'User not found' });
      }

      // Make sure the logged in user matches the trip user
      if (trip.user.toString() !== user._id.toString()) {
         return res.status(401).json({ error: 'Unauthorized' });
      }

      await trip.deleteOne();
      res.status(200).json({ id: req.params.id });

   } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
   }
};

// @desc    Check/uncheck trip as done
// @route   PATCH /api/trips/check/:id
// @access  Private
const checkTrip = async (req, res) => {
   try {
      const tripId = req.params.id;

      // Check if trip exists
      const trip = await TripModel.findById(tripId);
      if (!trip) {
         return res.status(404).json({ error: 'Trip not found' });
      }

      if (!req.user || !req.user._id) {
         return res.status(401).json({ error: 'User not authenticated' });
      }

      // Make sure the logged in user matches the trip user
      if (trip.user.toString() !== req.user._id.toString()) {
         return res.status(403).json({ error: 'Unauthorized: You do not own this trip' });
      }

      trip.isChecked = !trip.isChecked;
      await trip.save();
      // Retourne directement l'objet trip mis à jour avec `id` au lieu de `_id`
      res.status(200).json({
         id: trip._id,
         ...trip.toObject()
      });

   } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
   }
};


module.exports = { addTrip, getTrips, updateTrip, deleteTrip, checkTrip, getTrip };