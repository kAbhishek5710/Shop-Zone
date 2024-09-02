import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUpStart: (state) => {
      state.loading = true;
    },
    signUpSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    signUpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutStart: (state) => {
      state.loading = true;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateClientStart: (state) => {
      state.loading = true;
    },
    updateClientSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateClientFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteClientStart: (state) => {
      state.loading = true;
    },
    deleteClientSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteClientFailure: (state, acton) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
  updateClientStart,
  updateClientSuccess,
  updateClientFailure,
  deleteClientStart,
  deleteClientSuccess,
  deleteClientFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
} = userSlice.actions;

export default userSlice.reducer;
