import { createSlice } from "@reduxjs/toolkit";
import { addTrip, getTrips, getTrip, deleteTrip, updateTrip, checkTrip } from "./trip.action";

const initialState = {
   trips: [],
   currentTrip: null,
   isError: false,
   isSuccess: false,
   isLoading: false,
   message: ''
};

const tripSlice = createSlice({
   name: 'trip',
   initialState,
   reducers: { reset: (state) => initialState },
   extraReducers: (builder) => {
      builder
         .addCase(addTrip.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(addTrip.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.trips.push(action.payload);
            console.log(action.payload);
         })
         .addCase(addTrip.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         })
         .addCase(getTrips.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getTrips.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.trips = action.payload || [];
         })
         .addCase(getTrips.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         })
         .addCase(getTrip.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getTrip.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.currentTrip = action.payload || null;
         })
         .addCase(getTrip.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         })
         .addCase(deleteTrip.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteTrip.fulfilled, (state, action) => {
            const tripIdToDelete = action.payload.id;
            state.isLoading = false;
            state.isSuccess = true;
            state.trips = state.trips.filter(trip => trip.id !== tripIdToDelete);
         })
         .addCase(deleteTrip.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         })
         .addCase(updateTrip.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(updateTrip.fulfilled, (state, action) => {
            const tripIdToUpdate = action.payload.id;
            state.isLoading = false;
            state.isSuccess = true;
            const updatedTrips = state.trips.map(trip =>
               trip.id === tripIdToUpdate ? { ...trip, ...action.payload } : trip
            );
            state.trips = updatedTrips;
         })
         .addCase(updateTrip.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         })
         .addCase(checkTrip.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(checkTrip.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            const isCheckedTrip = action.payload.isCheckedTrip;
            state.trips = state.trips.map(trip =>
               trip.id === isCheckedTrip.id ? isCheckedTrip : trip
            );
         })
         .addCase(checkTrip.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         });
   },
});


export const { reset } = tripSlice.actions;
export default tripSlice.reducer;