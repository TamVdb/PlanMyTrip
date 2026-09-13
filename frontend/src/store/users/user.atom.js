import { atom } from 'jotai';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_APP_URL}/api/users`;

// Équivalent de l'état de user.slice.js
export const userStateAtom = atom({
   isError: false,
   isSuccess: false,
   isLoading: false,
   message: ''
});

// Équivalent de la thunk `signup` (user.action.js) + ses 3 reducers
// pending/fulfilled/rejected (user.slice.js). Un atome "action" peut avoir
// une fonction d'écriture asynchrone : pas besoin de createAsyncThunk, on
// met juste à jour userStateAtom aux mêmes moments qu'avant/après l'appel API.
export const signupAtom = atom(null, async (get, set, userData) => {
   set(userStateAtom, (prev) => ({ ...prev, isLoading: true }));
   try {
      const response = await axios.post(`${API_URL}/signup`, userData, { withCredentials: true });
      set(userStateAtom, (prev) => ({ ...prev, isLoading: false, isSuccess: true, message: 'User created successfully' }));
      return response.data;
   } catch {
      set(userStateAtom, (prev) => ({ ...prev, isLoading: false, isError: true, message: 'An error occurred during signup' }));
      // Pas de rethrow : dans le code d'origine, Signup.jsx dispatche signup()
      // sans .unwrap(), donc l'échec ne devait jamais remonter comme rejet de
      // promesse - juste mettre à jour l'état (lu ensuite via isError/message).
   }
});

// Équivalent de la thunk `login` + ses 3 reducers
export const loginAtom = atom(null, async (get, set, credentials) => {
   set(userStateAtom, (prev) => ({ ...prev, isLoading: true, isError: false, isSuccess: false }));
   try {
      const response = await axios.post(`${API_URL}/login`, credentials, { withCredentials: true });
      set(userStateAtom, (prev) => ({ ...prev, isLoading: false, isSuccess: true, message: 'User logged in successfully' }));
      return response.data;
   } catch (error) {
      set(userStateAtom, (prev) => ({ ...prev, isLoading: false, isError: true, message: 'An error occurred during login' }));
      // Login.jsx fait `await loginAction(...)` dans son propre try/catch et a
      // besoin du message d'erreur du backend : on relance la même valeur que
      // rejectWithValue(...) + .unwrap() renvoyaient avant.
      throw error.response?.data || 'An error occurred';
   }
});

// Équivalent de la thunk `logout` + son seul reducer (fulfilled - il n'y avait
// pas de handler `rejected` dans l'ancien user.slice.js pour logout, donc un
// échec ne modifiait pas l'état `user` avant : même comportement ici).
export const logoutAtom = atom(null, async (get, set) => {
   try {
      const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      set(userStateAtom, (prev) => ({ ...prev, isSuccess: false, isError: false, message: '' }));
      return response.data;
   } catch {
      return undefined;
   }
});
