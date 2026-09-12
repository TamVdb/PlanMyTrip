import { configureStore } from '@reduxjs/toolkit';

// Les domaines "modal", "auth", "user", "trip" et "activity" sont passés à Jotai
// (voir store/modal/modal.atom.js, store/auth/auth.atom.js, store/users/user.atom.js,
// store/trip/trip.atom.js, store/activity/activity.atom.js) : plus aucun reducer
// Redux à ce stade. Ne reste que le domaine "map" (voir store/map/) avant de
// pouvoir retirer complètement le <Provider> Redux dans main.jsx.
export const store = configureStore({
   reducer: {},
});

export default store;