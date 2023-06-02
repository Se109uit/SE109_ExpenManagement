import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isChange: false,
  changeId: null,
}

export const changespendSlice = createSlice({
  name: 'changespend',
  initialState,
  reducers: {
    openchange: (state, action) => {
        state.isChange = true
        state.changeId = action.payload
    },
    closechange: (state) => {
        state.isChange = false
        state.changeId = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { openchange, closechange } = changespendSlice.actions

export default changespendSlice.reducer