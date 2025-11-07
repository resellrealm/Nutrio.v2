import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import nutritionReducer from './nutritionSlice';
import achievementsReducer from './achievementsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    nutrition: nutritionReducer,
    achievements: achievementsReducer,
  },
});
