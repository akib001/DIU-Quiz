import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    retriveUserData(state, action) {
        state.token = action.payload.token;
        state.userEmail = action.payload.userEmail;
        state.userName = action.payload.userEmail;
    },

    isUserLoggedIn(state) {
      state.userLoggedIn = !!state.token;
    },

    userLogin(state, action) {
      state.role = action.payload.role;
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice;
