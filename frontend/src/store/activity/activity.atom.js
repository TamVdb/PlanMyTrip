import { atom } from 'jotai';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_APP_URL}/api/trip`;

// Équivalent de l'état de activity.slice.js
const initialActivityState = {
   activities: [],
   isError: false,
   isSuccess: false,
   isLoading: false,
   message: ''
};

export const activityStateAtom = atom(initialActivityState);

// Équivalent du reducer `reset` (pas utilisé ailleurs, même situation que
// trip.atom.js et l'ancien nanoid - ported pour rester fidèle au module complet)
export const resetActivityStateAtom = atom(null, (get, set) => {
   set(activityStateAtom, initialActivityState);
});

// Comme pour `trip`, aucune de ces actions n'était appelée avec .unwrap() côté
// composants : aucune ne relance l'erreur, toutes mettent juste à jour l'état.

// Équivalent de la thunk `addActivity` + ses 3 reducers
export const addActivityAtom = atom(null, async (get, set, { tripId, activityData }) => {
   set(activityStateAtom, (prev) => ({ ...prev, isLoading: true }));
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
      set(activityStateAtom, (prev) => ({ ...prev, isLoading: false, isSuccess: true, activities: [...prev.activities, newActivity] }));
      return newActivity;
   } catch (error) {
      set(activityStateAtom, (prev) => ({ ...prev, isLoading: false, isError: true, message: error.response?.data || 'An error occurred' }));
   }
});

// Équivalent de la thunk `getActivities` + ses 3 reducers
export const getActivitiesAtom = atom(null, async (get, set, { tripId }) => {
   set(activityStateAtom, (prev) => ({ ...prev, isLoading: true }));
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
      set(activityStateAtom, (prev) => ({ ...prev, isLoading: false, isSuccess: true, activities: activitiesData }));
      return activitiesData;
   } catch (error) {
      set(activityStateAtom, (prev) => ({ ...prev, isLoading: false, isError: true, message: error.response?.data || 'An error occurred' }));
   }
});

// Équivalent de la thunk `updateActivity` + ses 3 reducers
export const updateActivityAtom = atom(null, async (get, set, { tripId, activityId, updatedActivity }) => {
   set(activityStateAtom, (prev) => ({ ...prev, isLoading: true }));
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
      set(activityStateAtom, (prev) => ({
         ...prev,
         isLoading: false,
         isSuccess: true,
         activities: prev.activities.map(a => a.id === activityToUpdate.id ? { ...a, ...activityToUpdate } : a)
      }));
      return activityToUpdate;
   } catch (error) {
      console.error("API Error:", error);
      set(activityStateAtom, (prev) => ({ ...prev, isLoading: false, isError: true, message: error.response?.data || 'An error occurred' }));
   }
});

// Équivalent de la thunk `updateActivityDay` + ses 3 reducers
export const updateActivityDayAtom = atom(null, async (get, set, { tripId, activityId, updatedDay }) => {
   set(activityStateAtom, (prev) => ({ ...prev, isLoading: true }));
   try {
      const response = await axios.put(`${API_URL}/${tripId}/activity/update/${activityId}/day`, updatedDay, { withCredentials: true });
      const activity = response.data.updateDay;
      const activityToUpdate = {
         id: activity._id,
         day: activity.day
      };
      set(activityStateAtom, (prev) => ({
         ...prev,
         isLoading: false,
         isSuccess: true,
         activities: prev.activities.map(a => a.id === activityToUpdate.id ? { ...a, day: activityToUpdate.day } : a)
      }));
      return activityToUpdate;
   } catch (error) {
      console.error("API Error:", error);
      set(activityStateAtom, (prev) => ({ ...prev, isLoading: false, isError: true, message: error.response?.data || 'An error occurred' }));
   }
});

// Équivalent de la thunk `deleteActivity` + ses 3 reducers
export const deleteActivityAtom = atom(null, async (get, set, { tripId, activityId }) => {
   set(activityStateAtom, (prev) => ({ ...prev, isLoading: true }));
   try {
      await axios.delete(`${API_URL}/${tripId}/activity/delete/${activityId}`, { withCredentials: true });
      const activityToDelete = { id: activityId };
      set(activityStateAtom, (prev) => ({
         ...prev,
         isLoading: false,
         isSuccess: true,
         activities: prev.activities.filter(a => a.id !== activityToDelete.id)
      }));
      return activityToDelete;
   } catch (error) {
      set(activityStateAtom, (prev) => ({ ...prev, isLoading: false, isError: true, message: error.response?.data || 'An error occurred' }));
   }
});
