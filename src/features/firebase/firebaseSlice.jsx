import { createSlice } from "@reduxjs/toolkit";
import {  emailSignIn ,fbSignIn, ggSignIn } from "./firebase";
const initialState = {
  user: null,
  isLogin:false,
};

export const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    fb: (state) => {
      state.isLogin=true
      state.user = fbSignIn();
    },
    gg: (state) => {
      state.isLogin=true
      state.user= ggSignIn();
    },
    email: (state ,action) => {
      state.isLogin=true

      state.user= emailSignIn(action.payload.username,action.payload.password)
      
    },
    signUp: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { fb, gg, email, signUp } = login.actions;

export default login.reducer;
