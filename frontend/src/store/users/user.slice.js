import { createSlice } from "@reduxjs/toolkit";
import { signup, login, logout } from './user.action';

const initialState = {
   isError: false,
   isSuccess: false,
   isLoading: false,
   message: ''
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(signup.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(signup.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = 'User created successfully';
         })
         .addCase(signup.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = 'An error occurred during signup';
         })
         .addCase(login.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
         })
         .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = 'User logged in successfully';
         })
         .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = 'An error occurred during login';
         })
         .addCase(logout.fulfilled, (state) => {
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
         });
   }
});

export default userSlice.reducer;
