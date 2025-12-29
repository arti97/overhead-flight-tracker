import { createSlice } from "@reduxjs/toolkit";
import { fetchFlightData } from "../actions/index";
import { formatOpenSkyResponse } from "~/utils/opensky-api";

const initialState = {
  isLoading: false,
  error: null,
  flightList: [],
};

const flightSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {},
  extraReducers: (builder) => { //for Asyncs
    builder.addCase(fetchFlightData.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchFlightData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.payload;
    })
    .addCase(fetchFlightData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.flightList = formatOpenSkyResponse(action.payload);
    });
  },
});

export default flightSlice.reducer;