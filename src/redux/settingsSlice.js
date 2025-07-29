import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'js',
  fontSize: 16,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
  },
});

export const { setLanguage, setFontSize } = settingsSlice.actions;

export default settingsSlice.reducer;
