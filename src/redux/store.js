import { configureStore } from '@reduxjs/toolkit';
import appReducer  from './reducers/counterReducer';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export default store;