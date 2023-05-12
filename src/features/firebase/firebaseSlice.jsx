  // import { createSlice } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {  emailSignIn ,fbSignIn, ggSignIn, signUp } from "./firebase";
const initialState = {
  user: null,
  password: null,
  isLogin:false,
};
  
export const email =createAsyncThunk('users/login', async ({username, password}) => {
  const em = emailSignIn(username, password)
  return em;
});   
export const fb =createAsyncThunk('users/loginfb', async () => {
  const em = fbSignIn()
  return em;
}); 
export const gg =createAsyncThunk('users/logingg', async () => {
  const em = ggSignIn()
  return em;
}); 
export const signup =createAsyncThunk('users/signup', async ({username, password}) => {
  const em = signUp(username, password)
  return em;
});
export const login = createSlice({
  name: "login",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(email.fulfilled, (state ,action) => {
        state.user = action.payload.user
        state.password = action.payload.password
        state.isLogin = true
      })
      .addCase(fb.fulfilled, (state ,action) => {
        state.user = action.payload.user
        state.isLogin = true
      })
      .addCase(gg.fulfilled, (state ,action) => {
        state.user = action.payload.user
        state.isLogin = true
      })
    }
  // reducers: {
  //   fb: (state) => {
  //     state.isLogin=true
  //     state.user = fbSignIn();
  //   },
  //   gg: (state) => {
  //     state.isLogin=true
  //     state.user= ggSignIn();
  //   },
  //   email: (state ,action) => {
  //     state.isLogin=true
  //     const em = emailSignIn(action.payload.username,action.payload.password)
  //     console.log(em)
  //     state.user= em;
  //   },
  //   regiser: (state, action) => {
  //     state.isLogin=true

  //     state.user = signUp(
  //       action.payload.username, 
  //       action.payload.email, 
  //       action.payload.gender, 
  //       action.payload.dob, 
  //       action.payload.password);
  //   },
  // },
});

// Action creators are generated for each case reducer function
// export const { fb, gg, email, regiser } = login.actions;
export const selectUsers = (state) => state.login;

export default login.reducer;

//test pr