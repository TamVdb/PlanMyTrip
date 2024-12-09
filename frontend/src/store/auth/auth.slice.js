import { createSlice } from "@reduxjs/toolkit";

// Get user from localStorage
const user = localStorage.getItem('user');

const initialState = {
   user: user ? user : null // Initialisation avec l'utilisateur de localStorage si disponible
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setCredentials: (state, action) => {
         state.user = action.payload; // User infos
         localStorage.setItem('user', JSON.stringify(action.payload)); // Save to localStorage
      },
      clearCredentials: (state) => {
         state.user = null; // Clear user infos from state
         localStorage.removeItem('user'); // Remove from localStorage
      }
   },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
