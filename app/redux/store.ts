import { configureStore } from '@reduxjs/toolkit'
import flightReducer from './slices/flights-slice.ts';

export default configureStore({
  reducer: {
    flights: flightReducer,
  },
})