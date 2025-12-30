import { createSlice } from "@reduxjs/toolkit";
import { fetchFlightData, fetchFlightRouteDetails } from "../actions/index";
import { formatOpenSkyResponse, calculateNewPosition, updateFlightsMap } from "~/utils/opensky-api";
import type Plane from "~/model/plane";
import { INTERPOLATION_INTERVAL_MS } from "~/utils/constants";

const initialState = {
  isLoading: false,
  error: null,
  flightList: [],
  flightsOnMap: {}
};

const flightSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    interpolateFlightPositions(state, action) {
      Object.values(state.flightsOnMap).map((plane: Plane) => {
        if (plane.latitude && plane.longitude &&
          plane.geoAltitude && plane.velocity && plane.trueTrack) {
          const timeElapsed = INTERPOLATION_INTERVAL_MS/1000; // seconds

          const { newLat, newLon } = calculateNewPosition(
            plane.latitude,
            plane.longitude,
            plane.velocity,
            timeElapsed,
            plane.trueTrack
          );

          return state.flightsOnMap[plane.icao24] = {
            ...plane,
            latitude: newLat,
            longitude: newLon
          };
        }
        return state.flightsOnMap[plane.icao24] = plane;
      });
    }
  },
  extraReducers: (builder) => { //for Asyncs
    builder.addCase(fetchFlightData.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchFlightData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.payload;
    })
    .addCase(fetchFlightData.fulfilled, (state, action) => {
      const deserializedResponse = formatOpenSkyResponse(action.payload);
      state.isLoading = false;
      state.error = null;
      state.flightList = deserializedResponse;
      state.flightsOnMap = updateFlightsMap(deserializedResponse, state.flightsOnMap);
    })
    .addCase(fetchFlightRouteDetails.fulfilled, (state, action) => {
      const adsdbResponse = action.payload;
      const flightrouteDetails = adsdbResponse.response.flightroute;
      const callsign = flightrouteDetails.callsign
      Object.values(state.flightsOnMap).map((plane: Plane) => {
        if (plane.callsign && plane.callsign === callsign) {
          return state.flightsOnMap[plane.icao24] = {
            ...plane,
            flightroute: flightrouteDetails
          };
        }
        return plane;
      });
    });
  },
});

export const { interpolateFlightPositions: interpolateFlightPositionsAction } = flightSlice.actions;  

export default flightSlice.reducer;