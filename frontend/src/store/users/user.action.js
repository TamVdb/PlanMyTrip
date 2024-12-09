import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = `${import.meta.env.VITE_APP_URL}/api/users`;

// Action pour l'inscription
export const signup = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
   try {
      const response = await axios.post(`${API_URL}/signup`, userData, { withCredentials: true });
      return response.data;
   } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
   }
});

// Action pour la connexion
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
   try {
      const response = await axios.post(`${API_URL}/login`, credentials, { withCredentials: true });
      return response.data;
   } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response?.data || 'An error occurred');
   }
});

// Action pour la déconnexion
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
   try {
      const response = await axios.post(`${API_URL}/logout`);
      return response.data;
   } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
   }
});