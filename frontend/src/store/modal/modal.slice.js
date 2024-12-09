import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   isOpen: false,
   modalType: '',
   currentTripId: null,
   currentActivityId: null
};

const modalSlice = createSlice({
   name: 'modal',
   initialState,
   reducers: {
      openModal: (state, action) => {
         state.isOpen = true;
         state.modalType = action.payload;
         state.currentTripId = null;
         state.currentActivityId = null;
      },
      closeModal: (state) => {
         state.isOpen = false;
         state.modalType = '';
         state.currentTripId = null;
         state.currentActivityId = null;
      },
      switchToLogin: (state) => {
         state.isOpen = true;
         state.modalType = 'login';
         state.currentTripId = null;
         state.currentActivityId = null;
      },
      switchToSignup: (state) => {
         state.isOpen = true;
         state.modalType = 'signup';
         state.currentTripId = null;
         state.currentActivityId = null;
      },
      switchToAddtrip: (state) => {
         state.isOpen = true;
         state.modalType = 'addTrip';
         state.currentTripId = null;
         state.currentActivityId = null;
      },
      switchToUpdatetrip: (state, action) => {
         state.isOpen = true;
         state.modalType = 'updateTrip';
         state.currentTripId = action.payload;
         state.currentActivityId = null;
      },
      switchToAddActivity: (state, action) => {
         state.isOpen = true;
         state.modalType = 'addActivity';
         state.currentTripId = action.payload.tripId;
         state.currentActivityId = null;
      },
      switchToUpdateActivity: (state, action) => {
         state.isOpen = true;
         state.modalType = 'updateActivity';
         state.currentTripId = action.payload.tripId;
         state.currentActivityId = action.payload.activityId;
      }
   }
});

export const { openModal, closeModal, switchToLogin, switchToSignup, switchToAddtrip, switchToUpdatetrip, switchToAddActivity, switchToUpdateActivity } = modalSlice.actions;

export default modalSlice.reducer;