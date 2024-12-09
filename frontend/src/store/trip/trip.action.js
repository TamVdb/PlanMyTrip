import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = `${import.meta.env.VITE_APP_URL}/api/trips`;

// Action to create a trip
export const addTrip = createAsyncThunk('trips/add', async (tripData, { rejectWithValue }) => {
   try {
      const response = await axios.post(`${API_URL}/add`, tripData, { withCredentials: true });

      const trip = response.data;

      const newTrip = {
         id: trip._id,
         name: trip.name,
         description: trip.description,
         location: trip.location,
         startDate: trip.startDate,
         endDate: trip.endDate,
         days: trip.days,
         isChecked: trip.isChecked
      };

      console.log("API Response:", newTrip);
      return newTrip;

   } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
   }
});

// Action to get trips
export const getTrips = createAsyncThunk('trips/get', async (_, { rejectWithValue }) => {
   try {
      const response = await axios.get(`${API_URL}/get`, { withCredentials: true });

      // Mapping => Convertir les données de l'API en format adapté a l'app
      const data = response.data.map(trip => ({
         id: trip._id,
         name: trip.name,
         description: trip.description,
         location: trip.location,
         startDate: trip.startDate,
         endDate: trip.endDate,
         days: trip.days,
         isChecked: trip.isChecked
      }));

      return data;

   } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
   }
});


// Action to get trip
export const getTrip = createAsyncThunk('trip/get', async (id, { rejectWithValue }) => {
   try {
      const response = await axios.get(`${API_URL}/get/${id}`, { withCredentials: true });

      // Mapping => Convertir les données de l'API en format adapté a l'app
      const trip = response.data;
      const data = {
         id: trip._id,
         name: trip.name,
         description: trip.description,
         location: trip.location,
         startDate: trip.startDate,
         endDate: trip.endDate,
         days: trip.days,
         isChecked: trip.isChecked
      };

      return data;

   } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
   }
});

// Action to uptdate a trip
export const updateTrip = createAsyncThunk('trip/update', async ({ id, updatedTrip }, { rejectWithValue }) => {
   try {
      const response = await axios.put(`${API_URL}/update/${id}`, updatedTrip, { withCredentials: true });

      const trip = response.data.updatedTrip;

      const tripToUpdate = {
         id: trip._id,
         name: trip.name,
         description: trip.description,
         location: trip.location,
         startDate: trip.startDate,
         endDate: trip.endDate,
         days: trip.days
      };
      return tripToUpdate;

   } catch (error) {
      // console.log('Tam :o', error);
      return rejectWithValue(error.response?.data || 'An error occurred');
   }
});

// Action to delete a trip
export const deleteTrip = createAsyncThunk('trip/delete', async (id, { rejectWithValue }) => {
   try {
      const response = await axios.delete(`${API_URL}/delete/${id}`, { withCredentials: true });
      const tripToDelete = {
         id: response.data.id
      };

      return tripToDelete;
   } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
   }
});

// Action to check/uncheck a trip
export const checkTrip = createAsyncThunk('trip/check', async (id, { rejectWithValue }) => {
   try {
      const response = await axios.patch(`${API_URL}/check/${id}`, {}, { withCredentials: true });

      const isCheckedTrip = {
         id: response.data._id,
         ...response.data
      };
      return { isCheckedTrip };

   } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
   }
});
