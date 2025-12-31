//Opensky API constants
export const OPENSKY_API_URL = "https://opensky-network.org/api/states/all";
export const OPENSKY_API_REFRESH_INTERVAL_MS = 10800; // 10.8 seconds
export const OPENSKY_PARAM_LAMIN = "lamin";
export const OPENSKY_PARAM_LOMIN = "lomin";     
export const OPENSKY_PARAM_LAMAX = "lamax";
export const OPENSKY_PARAM_LOMAX = "lomax";

//ADSB DB API constants
export const ADSBDB_API_URL = "https://api.adsbdb.com/v0/callsign";

//Default coordinates for Delhi area
export const MINIMUM_LATITUDE = 28.44355877
export const MAXIMUM_LATITUDE = 28.64140845
export const MINIMUM_LONGITUDE = 77.02243629
export const MAXIMUM_LONGITUDE = 77.34238503

//App related constants
export const APP_TITLE = "Overhead Flight tracker";
export const INTERPOLATION_INTERVAL_MS = 10;
export const GENERIC_API_ERROR_MESSAGE = "Error making request to API.";
export const API_ERROR_MESSAGE = (apiSource: string) => `${apiSource} API might be down. Please try again later.`;

//Redux action types
export const FLIGHT_ACTION_FETCH_FLIGHT_DATA = "flights/fetchFlightData";
export const FLIGHT_ACTION_FETCH_FLIGHT_ROUTE_DETAILS = "flights/fetchFlightRouteDetails";

//Calculation constants
export const EARTH_RADIUS_METRES = 6378137
export const DEGREES_TO_RADIANS = Math.PI / 180;
export const RADIANS_TO_DEGREES = 180 / Math.PI;
export const DEFAULT_FLIGHT_ICON_TILT = 45;
