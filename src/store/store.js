import { configureStore, createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    language: 'js',
    fontSize: 14,
  },
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
    },
    setFontSize(state, action) {
      state.fontSize = action.payload;
    },
  },
});

export const { setLanguage, setFontSize } = settingsSlice.actions;

export const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
  },
});
