import { atom } from 'jotai';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_APP_URL}/api/trips`;

// Équivalent de l'état de trip.slice.js
const initialTripState = {
   trips: [],
   currentTrip: null,
   isError: false,
   isSuccess: false,
   isLoading: false,
   message: ''
};

export const tripStateAtom = atom(initialTripState);

// Équivalent du reducer `reset` (pas utilisé ailleurs dans le code, pareil que
// dans trip.slice.js d'origine - ported pour rester fidèle au module complet)
export const resetTripStateAtom = atom(null, (get, set) => {
   set(tripStateAtom, initialTripState);
});

// Aucune des actions ci-dessous n'était appelée avec .unwrap() côté composants
// (contrairement à `login` dans user.atom.js) : aucune ne relance l'erreur,
// toutes se contentent de mettre à jour tripStateAtom en cas d'échec.

// Équivalent de la thunk `addTrip` + ses 3 reducers
export const addTripAtom = atom(null, async (get, set, tripData) => {
   set(tripStateAtom, (prev) => ({ ...prev, isLoading: true }));
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
      set(tripStateAtom, (prev) => ({ ...prev, isLoading: false, isSuccess: true, trips: [...prev.trips, newTrip] }));
      return newTrip;
   } catch (error) {
      set(tripStateAtom, (prev) => ({ ...prev, isLoading: false, isError: true, message: error.response?.data || 'An error occurred' }));
   }
});

// Équivalent de la thunk `getTrips` + ses 3 reducers
export const getTripsAtom = atom(null, async (get, set) => {
   set(tripStateAtom, (prev) => ({ ...prev, isLoading: true }));
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
      set(tripStateAtom, (prev) => ({ ...prev, isLoading: false, isSuccess: true, trips: data || [] }));
      return data;
   } catch (error) {
      set(tripStateAtom, (prev) => ({ ...prev, isLoading: false, isError: true, message: error.response?.data || 'An error occurred' }));
   }
});

// Équivalent de la thunk `getTrip` + ses 3 reducers
export const getTripAtom = atom(null, async (get, set, id) => {
   set(tripStateAtom, (prev) => ({ ...prev, isLoading: true }));
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
      set(tripStateAtom, (prev) => ({ ...prev, isLoading: false, isSuccess: true, currentTrip: data || null }));
      return data;
   } catch (error) {
      set(tripStateAtom, (prev) => ({ ...prev, isLoading: false, isError: true, message: error.response?.data || 'An error occurred' }));
   }
});

// Équivalent de la thunk `updateTrip` + ses 3 reducers
export const updateTripAtom = atom(null, async (get, set, { id, updatedTrip }) => {
   set(tripStateAtom, (prev) => ({ ...prev, isLoading: true }));
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
      set(tripStateAtom, (prev) => ({
         ...prev,
         isLoading: false,
         isSuccess: true,
         trips: prev.trips.map(t => t.id === tripToUpdate.id ? { ...t, ...tripToUpdate } : t)
      }));
      return tripToUpdate;
   } catch (error) {
      set(tripStateAtom, (prev) => ({ ...prev, isLoading: false, isError: true, message: error.response?.data || 'An error occurred' }));
   }
});

// Équivalent de la thunk `deleteTrip` + ses 3 reducers
export const deleteTripAtom = atom(null, async (get, set, id) => {
   set(tripStateAtom, (prev) => ({ ...prev, isLoading: true }));
   try {
      const response = await axios.delete(`${API_URL}/delete/${id}`, { withCredentials: true });
      const tripToDelete = { id: response.data.id };
      set(tripStateAtom, (prev) => ({
         ...prev,
         isLoading: false,
         isSuccess: true,
         trips: prev.trips.filter(t => t.id !== tripToDelete.id)
      }));
      return tripToDelete;
   } catch (error) {
      set(tripStateAtom, (prev) => ({ ...prev, isLoading: false, isError: true, message: error.response?.data || 'An error occurred' }));
   }
});

// Équivalent de la thunk `checkTrip` + ses 3 reducers
export const checkTripAtom = atom(null, async (get, set, id) => {
   set(tripStateAtom, (prev) => ({ ...prev, isLoading: true }));
   try {
      const response = await axios.patch(`${API_URL}/check/${id}`, {}, { withCredentials: true });
      const isCheckedTrip = { id: response.data._id, ...response.data };
      set(tripStateAtom, (prev) => ({
         ...prev,
         isLoading: false,
         isSuccess: true,
         trips: prev.trips.map(t => t.id === isCheckedTrip.id ? isCheckedTrip : t)
      }));
      return { isCheckedTrip };
   } catch (error) {
      set(tripStateAtom, (prev) => ({ ...prev, isLoading: false, isError: true, message: error.response?.data || 'An error occurred' }));
   }
});
