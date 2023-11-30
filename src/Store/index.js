import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./Slices/WeatherSlice";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export default store;
