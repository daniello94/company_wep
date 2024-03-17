import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    viewsContainer: '',
  },
  reducers: {
    setViewsContainer: (state, action) => {
      state.viewsContainer = action.payload;
    },
    
  },
});

export const { setViewsContainer } = appSlice.actions;

export default appSlice.reducer;