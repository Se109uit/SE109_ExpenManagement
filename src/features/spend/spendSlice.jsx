import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
}

export const addspendSlice = createSlice({
  name: 'addspend',
  initialState,
  reducers: {
    openadd: (state) => {
        state.isOpen = true
    },
    closeadd: (state) => {
        state.isOpen = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { openadd, closeadd } = addspendSlice.actions

export default addspendSlice.reducer