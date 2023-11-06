import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { hostName, appId } from "../../../config/config";

// get city data
export const getCityData = createAsyncThunk("city", async (obj) => {
  try {
    const request = await axios.get(
      `${hostName}/data/2.5/weather?q=${obj.city}&units=${obj.unit}&APPID=${appId}`
    );
    const response = await request.data;
    return {
      data: response,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err.response.data.message,
    };
  }
});

// get 5 days forecast of the city
export const get5DaysForecast = createAsyncThunk("5days", async (obj) => {
  const request = await axios.get(
    `${hostName}/data/2.5/forecast?lat=${obj.lat}&lon=${obj.lon}&units=${obj.unit}&APPID=${appId}`
  );
  const response = await request.data;
  return response;
});

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    citySearchLoader: false,
    citySearchData: null,
    forecastLoader: false,
    forecastData: null,
    forecastError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCityData.pending, (state) => {
        state.citySearchLoader = true;
        state.citySearchData = null;
      })
      .addCase(getCityData.fulfilled, (state, action) => {
        state.citySearchLoader = false;
        state.citySearchData = action.payload;
      })
      .addCase(get5DaysForecast.pending, (state) => {
        state.forecastLoader = true;
        state.forecastData = null;
        state.forecastError = null;
      })
      .addCase(get5DaysForecast.fulfilled, (state, action) => {
        state.forecastLoader = false;
        state.forecastData = action.payload;
        state.forecastError = null;
      })
      .addCase(get5DaysForecast.rejected, (state, action) => {
        state.forecastLoader = false;
        state.forecastData = null;
        state.forecastError = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
