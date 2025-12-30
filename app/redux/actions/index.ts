import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADSBDB_API_URL, FLIGHT_ACTION_FETCH_FLIGHT_DATA, GENERIC_API_ERROR_MESSAGE, 
  API_ERROR_MESSAGE, OPENSKY_API_URL, FLIGHT_ACTION_FETCH_FLIGHT_ROUTE_DETAILS } from "~/utils/constants";
import { createGetRequestParams } from "~/utils/opensky-api";

export const fetchFlightData = createAsyncThunk(
  `${FLIGHT_ACTION_FETCH_FLIGHT_DATA}`,
  async (): Promise<void> => {
    try {
      const request = new Request(`${OPENSKY_API_URL}?${createGetRequestParams()}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.TOKEN}`
        },
      });
      const response = await fetch(request);
      if (!response.ok) {
        throw new Error(`${API_ERROR_MESSAGE("OpenSky")}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(`${GENERIC_API_ERROR_MESSAGE}`);
    }
  }
);

export const fetchFlightRouteDetails = createAsyncThunk(
  `${FLIGHT_ACTION_FETCH_FLIGHT_ROUTE_DETAILS}`,
  async (callsign: string): Promise<void> => {
    try {
      const request = new Request(`${ADSBDB_API_URL}/${callsign}`, {
        method: 'GET',
      });
      const response = await fetch(request);
      if (!response.ok) {
        throw new Error(`${API_ERROR_MESSAGE("ADSBDB")}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(`${GENERIC_API_ERROR_MESSAGE}`);
    }
  }
);  
