import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  name: '',
  email: '', 
  role: '',
  clicked: ''
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    // retriveUserData(state, action) {
    //     state.token = action.payload.token;
    //     state.userEmail = action.payload.userEmail;
    //     state.userName = action.payload.userEmail;
    // },

    // isUserLoggedIn(state) {
    //   state.userLoggedIn = !!state.token;
    // },

    handleAuth(state, action) {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      
      localStorage.setItem('token', state.token);
      localStorage.setItem('name', state.name);
      localStorage.setItem('email', state.email);
      localStorage.setItem('role', state.role);
    },

    userClicked(state) {
      state.clicked = true;
    }
    // userLogout(state) {
    //   state.token = '';
    //   state.userEmail = '';

    //   localStorage.removeItem('token');
    //   localStorage.removeItem('userEmail');
    // },

    // setUserProfile(state, action) {
    //   state.userName = action.payload.name;
    //   state.userEmail = action.payload.email;
    //   localStorage.setItem('userName', state.userName);
    //   localStorage.setItem('userEmail', state.userEmail);
    // },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice;
