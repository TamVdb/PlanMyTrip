import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = `${import.meta.env.VITE_APP_URL}/api/trip`;

// Action to create an activity
export const addActivity = createAsyncThunk('activities/add', async ({ tripId, activityData }, { rejectWithValue }) => {
   try {
      const response = await axios.post(`${API_URL}/${tripId}/activity/add`, activityData, { withCredentials: true });

      const activity = response.data;

      const newActivity = {
         id: activity._id,
         name: activity.name,
         location: activity.location,
         duration: activity.duration,
         price: activity.price,
         day: activity.day
      };

      return newActivity;

   } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
   }
});

// Action to get activities
export const getActivities = createAsyncThunk('activities/get', async ({ tripId }, { rejectWithValue }) => {
   // console.log("Dispatching getActivities with tripId:", tripId);
   try {
      const response = await axios.get(`${API_URL}/${tripId}/activities/get`, { withCredentials: true });

      const activitiesData = response.data.activities.map(activity => ({
         id: activity._id,
         name: activity.name,
         location: activity.location,
         duration: activity.duration,
         price: activity.price,
         day: activity.day
      }));

      return activitiesData;

   } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
   }
});


// Action to uptdate an activity
export const updateActivity = createAsyncThunk('trip/update', async ({ tripId, activityId, updatedActivity }, { rejectWithValue }) => {
   // console.log("Dispatching updateActivity with tripId:", tripId, "and activityId:", activityId);

   try {
      const response = await axios.put(`${API_URL}/${tripId}/activity/update/${activityId}`, updatedActivity, { withCredentials: true });

      const activity = response.data.updateActivity;

      const activityToUpdate = {
         id: activity._id,
         name: activity.name,
         location: activity.location,
         duration: activity.duration,
         price: activity.price
      };
      return activityToUpdate;

   } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data || 'An error occurred');
   }
});

// Action to uptdate an activity day
export const updateActivityDay = createAsyncThunk('activities/day/update', async ({ tripId, activityId, updatedDay }, { rejectWithValue }) => {
   // console.log("Dispatching updateActivityDay with tripId:", tripId, " activityId:", activityId, "and updatedDay:", updatedDay);

   try {
      const response = await axios.put(`${API_URL}/${tripId}/activity/update/${activityId}/day`, updatedDay, { withCredentials: true });

      const activity = response.data.updateDay;

      const activityToUpdate = {
         id: activity._id,
         day: activity.day
      };
      return activityToUpdate;

   } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data || 'An error occurred');
   }
});

// Action to delete an activity
export const deleteActivity = createAsyncThunk('activities/delete', async ({ tripId, activityId }, { rejectWithValue }) => {
   // console.log("Dispatching deleteActivity with tripId:", tripId, "and activityId:", activityId);

   try {
      const response = await axios.delete(`${API_URL}/${tripId}/activity/delete/${activityId}`, { withCredentials: true });

      const activityToDelete = {
         id: activityId
      };

      return activityToDelete;
   } catch (error) {
      // console.error("API Error:", error);
      return rejectWithValue(error.response?.data || 'An error occurred');
   }
});
