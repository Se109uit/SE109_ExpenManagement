  // import { createSlice } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {  emailSignIn ,fbSignIn, ggSignIn, signUp, logOut } from "./firebase";
import { red } from '@mui/material/colors';
import { use } from 'i18next';

const initialState = {
  user: null,
  isLogin:false,
  status: null,
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
export const signup =createAsyncThunk('users/signup', async ({birthday, gender, username, email, password}) => {
  const em = signUp(birthday, gender, username, email, password)
  return em;
});
export const signout =createAsyncThunk('users/signout', async () => {
  const em = logOut()
  return em;
});
export const login = createSlice({
  name: "login",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(email.fulfilled, (state ,action) => {
        const userInfor = action.payload
        state.user = userInfor;
        if(state.user){
          state.isLogin = true
        }
        else {
          state.isLogin = false
        }
        state.status = "email";
      })
      .addCase(fb.fulfilled, (state ,action) => {
        const userInfor = action.payload
        state.user = userInfor
        if(state.user){
          state.isLogin = true
        }
        else
          state.isLogin = false

        state.status = "fb";
      })
      .addCase(gg.fulfilled, (state ,action) => {
        const userInfor = action.payload
        state.user = userInfor
        // console.log("user", state.user)
        if(state.user){
          state.isLogin = true
        }
        else
          state.isLogin = false

        state.status = "gg";
      })
      .addCase(signup.fulfilled, (state ,action) => {
        const userInfor = action.payload
        state.user = userInfor
        if(state.user){
          state.isLogin = true
        }
        else
          state.isLogin = false

        state.status = "email";
      })
      .addCase(signout.fulfilled, (state ,action) => {
        state.user = null
        state.isLogin = false
      })
      },

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

  //     const re = signUp(
  //       action.payload.username, 
  //       action.payload.email, 
  //       action.payload.gender, 
  //       action.payload.dob, 
  //       action.payload.password);
  //     state.user = re;
  //   },
  // },
});

// Action creators are generated for each case reducer function
// export const { fb, gg, email, regiser } = login.actions;

export const selectUsers = (state) => state.login.user;

export default login.reducer;

//test pr