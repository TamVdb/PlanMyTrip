import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth.slice';
import userReducer from './users/user.slice';
import tripReducer from './trip/trip.slice';
import activityReducer from './activity/activity.slice';

// Le domaine "modal" est passé à Jotai (voir store/modal/modal.atom.js) :
// il n'a plus de reducer Redux, donc plus d'entrée ici.
export const store = configureStore({
   reducer: {
      auth: authReducer,
      user: userReducer,
      trips: tripReducer,
      activities: activityReducer
   },
});

export default store;