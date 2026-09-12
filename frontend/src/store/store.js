import { configureStore } from '@reduxjs/toolkit';
import tripReducer from './trip/trip.slice';
import activityReducer from './activity/activity.slice';

// Les domaines "modal", "auth" et "user" sont passés à Jotai (voir
// store/modal/modal.atom.js, store/auth/auth.atom.js, store/users/user.atom.js) :
// ils n'ont plus de reducer Redux, donc plus d'entrée ici.
export const store = configureStore({
   reducer: {
      trips: tripReducer,
      activities: activityReducer
   },
});

export default store;