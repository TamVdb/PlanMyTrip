import { createSlice } from "@reduxjs/toolkit";
import { addActivity, getActivities, deleteActivity, updateActivity, updateActivityDay } from "./activity.action";

const initialState = {
   activities: [],
   isError: false,
   isSuccess: false,
   isLoading: false,
   message: ''
};

const activitySlice = createSlice({
   name: 'activity',
   initialState,
   reducers: { reset: (state) => initialState },
   extraReducers: (builder) => {
      builder
         .addCase(addActivity.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(addActivity.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.activities = [...state.activities, action.payload];
         })
         .addCase(addActivity.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         })
         .addCase(getActivities.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getActivities.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.activities = action.payload;
         })
         .addCase(getActivities.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         })
         .addCase(deleteActivity.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteActivity.fulfilled, (state, action) => {
            const activityIdToDelete = action.payload.id;
            state.isLoading = false;
            state.isSuccess = true;
            state.activities = state.activities.filter(activity => activity.id !== activityIdToDelete);
         })
         .addCase(deleteActivity.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         })
         .addCase(updateActivity.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(updateActivity.fulfilled, (state, action) => {
            const activityIdToUpdate = action.payload.id;
            state.isLoading = false;
            state.isSuccess = true;
            const updatedActivities = state.activities.map(activity =>
               activity.id === activityIdToUpdate ? { ...activity, ...action.payload } : activity
            );
            state.activities = updatedActivities;
         })
         .addCase(updateActivity.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         })
         .addCase(updateActivityDay.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(updateActivityDay.fulfilled, (state, action) => {
            const activityIdToUpdate = action.payload.id;
            state.isLoading = false;
            state.isSuccess = true;
            const updatedActivities = state.activities.map(activity =>
               activity.id === activityIdToUpdate ? { ...activity, day: action.payload.day } : activity
            );
            state.activities = updatedActivities;
         })
         .addCase(updateActivityDay.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         });
   },
});


export const { reset } = activitySlice.actions;
export default activitySlice.reducer;