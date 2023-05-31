import { createSlice } from '@reduxjs/toolkit'
import { changeLanguage } from 'i18next'

const initialState = {
  choose: 'vi',
}

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    vietnamese: (state) => {
        state.choose = 'vi'
    },
    english: (state) => {
        state.choose = 'en'
    },
    lang: (state, action) => {
        state.choose = action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { vietnamese, english, lang } = languageSlice.actions

export default languageSlice.reducer