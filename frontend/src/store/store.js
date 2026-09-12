import { configureStore } from '@reduxjs/toolkit';
import activityReducer from './activity/activity.slice';

// Les domaines "modal", "auth", "user" et "trip" sont passés à Jotai (voir
// store/modal/modal.atom.js, store/auth/auth.atom.js, store/users/user.atom.js,
// store/trip/trip.atom.js) : ils n'ont plus de reducer Redux, donc plus d'entrée ici.
export const store = configureStore({
   reducer: {
      activities: activityReducer
   },
});

export default store;