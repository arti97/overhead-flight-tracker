import Plane from "~/model/plane";
import { MAXIMUM_LATITUDE, MAXIMUM_LONGITUDE, MINIMUM_LATITUDE, MINIMUM_LONGITUDE,
  OPENSKY_PARAM_LAMAX, OPENSKY_PARAM_LAMIN, OPENSKY_PARAM_LOMAX, OPENSKY_PARAM_LOMIN,
  EARTH_RADIUS_METRES, DEGREES_TO_RADIANS, RADIANS_TO_DEGREES   
  } from "./constants";

export const createGetRequestParams = () => {
  const params = new URLSearchParams();
  params.append(`${OPENSKY_PARAM_LAMIN}`, MINIMUM_LATITUDE.toString());
  params.append(`${OPENSKY_PARAM_LOMIN}`, MINIMUM_LONGITUDE.toString());
  params.append(`${OPENSKY_PARAM_LAMAX}`, MAXIMUM_LATITUDE.toString());
  params.append(`${OPENSKY_PARAM_LOMAX}`, MAXIMUM_LONGITUDE.toString());
  return params.toString();
}

export const formatOpenSkyResponse = (data: any) => {
  if (!data || !data.states) {
    return [];
  }
  const currOpenSkyFlightList = data.states.map((eachFlight: any) => {
    return Plane.fromOpenSkyResponse(eachFlight);
  }); 
  return currOpenSkyFlightList;
}

export const calculateNewPosition = (
  prevLat: number, 
  prevLong: number, 
  speed: number, 
  time: number, 
  heading: number) => {
    const prevLatRad = prevLat * DEGREES_TO_RADIANS; // lat/lon in degrees
    const prevLonRad = prevLong * DEGREES_TO_RADIANS;
    const bearingRad = heading * DEGREES_TO_RADIANS;
    const distance = speed * time; // speed in m/s, time in seconds
    const d = distance / EARTH_RADIUS_METRES; // Angular distance
    const newLatRad = Math.asin(Math.sin(prevLatRad) * Math.cos(d) +
                              Math.cos(prevLatRad) * Math.sin(d) * Math.cos(bearingRad));

    const newLongRad = prevLonRad + Math.atan2(Math.sin(bearingRad) * Math.sin(d) * Math.cos(prevLatRad),
                                         Math.cos(d) - Math.sin(prevLatRad) * Math.sin(newLatRad));
    const newLat = newLatRad * RADIANS_TO_DEGREES;
    const newLon = newLongRad * RADIANS_TO_DEGREES;

    return { newLat, newLon };
}

export const updateFlightsMap = (
  flightList: Plane[], 
  flightsOnMap: { [key: string]: Plane }) => {
    // if flightsOnMap is empty, add all flights from flightList 
    // where onGround is false in key-value pairs 
    // where key is the icao24 string and the value is the Plane object
  if (Object.keys(flightsOnMap).length === 0) {
    const newFlightsMap: { [key: string]: Plane } = {};
    flightList.forEach((plane: Plane) => {
      if (!plane.onGround) {
        newFlightsMap[plane.icao24] = plane;
      }
    });
    return newFlightsMap;
  }
  // if flightsOnMap is not empty, then for existing keys update value from flightList, 
  // for new Plane objects in flightList where onGround is false add new key-value pairs, 
  // and remove any keys from flightsOnMap that are not present in flightList or have onGround true
  const updatedFlightsMap: { [key: string]: Plane } = { ...flightsOnMap };
  const currentIcao24Set = new Set(flightList.map((plane: Plane) => plane.icao24));

  // Remove planes that are no longer in the flightList or are on the ground
  for (const icao24 in updatedFlightsMap) {
    if (!currentIcao24Set.has(icao24) || flightList.find(plane => plane.icao24 === icao24)?.onGround) {
      delete updatedFlightsMap[icao24];
    }
  }

  // Add or update planes from the flightList
  flightList.forEach((plane: Plane) => {
    if (!plane.onGround) {
      updatedFlightsMap[plane.icao24] = plane;
    }
  });

  return updatedFlightsMap;
}