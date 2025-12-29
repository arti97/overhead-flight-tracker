import { createAsyncThunk } from "@reduxjs/toolkit";
import { OPENSKY_API_URL } from "~/utils/constants";
import { createGetRequestParams } from "~/utils/opensky-api";

export const fetchFlightData = createAsyncThunk(
  "flights/fetchFlightData",
  async (): Promise<void> => {
    try {
      const response = await fetch(`${OPENSKY_API_URL}?${createGetRequestParams()}`);
      if (!response.ok) {
        throw new Error("OpenSky API might be down. Please try again later.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Error making request to OpenSky API.");
    }
  }
);
