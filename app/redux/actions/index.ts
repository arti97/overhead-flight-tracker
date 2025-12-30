import { createAsyncThunk } from "@reduxjs/toolkit";
import { FLIGHT_ACTION_FETCH_FLIGHT_DATA, GENERIC_API_ERROR_MESSAGE, OPENSKY_API_ERROR_MESSAGE, OPENSKY_API_URL } from "~/utils/constants";
import { createGetRequestParams } from "~/utils/opensky-api";

export const fetchFlightData = createAsyncThunk(
  `${FLIGHT_ACTION_FETCH_FLIGHT_DATA}`,
  async (): Promise<void> => {
    try {
      const response = await fetch(`${OPENSKY_API_URL}?${createGetRequestParams()}`);
      if (!response.ok) {
        throw new Error(`${OPENSKY_API_ERROR_MESSAGE}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(`${GENERIC_API_ERROR_MESSAGE}`);
    }
  }
);
