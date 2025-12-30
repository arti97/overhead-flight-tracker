import Plane from "~/model/plane";
import { MAXIMUM_LATITUDE, MAXIMUM_LONGITUDE, MINIMUM_LATITUDE, MINIMUM_LONGITUDE,
  OPENSKY_PARAM_LAMAX, OPENSKY_PARAM_LAMIN, OPENSKY_PARAM_LOMAX, OPENSKY_PARAM_LOMIN,
  EARTH_RADIUS_METRES, DEGREES_TO_RADIANS, RADIANS_TO_DEGREES,   
  ADSBDB_API_URL
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
  flightsOnMap: object ) => {
    let updatedFlightsMap = { ...flightsOnMap };

    // if flightsOnMap is empty, add all flights from flightList 
    // where onGround is false in key-value pairs 
    // where key is the icao24 string and the value is the Plane object
  if (Object.keys(updatedFlightsMap).length === 0) {
    flightList.map(async (plane: Plane) => {
      if (!plane.onGround) {
        return updatedFlightsMap[plane.icao24] = { ...plane };
      }
    });
    return updatedFlightsMap;
  }
  // if flightsOnMap is not empty, then for existing keys update value from flightList, 
  // for new Plane objects in flightList where onGround is false add new key-value pairs, 
  // and remove any keys from flightsOnMap that are not present in flightList or have onGround true
  const currentIcao24Set = new Set(flightList.map((plane: Plane) => plane.icao24));

  // Remove planes that are no longer in the flightList or are on the ground
  for (const icao24 in updatedFlightsMap) {
    if (!currentIcao24Set.has(icao24) || flightList.find(plane => plane.icao24 === icao24)?.onGround) {
      delete updatedFlightsMap[icao24];
    } else {
      // Update existing plane details
      const updatedPlane = flightList.find(plane => plane.icao24 === icao24);
      if (updatedPlane) {
        updatedFlightsMap[icao24] = {
          ...updatedFlightsMap[icao24],
          latitude: updatedPlane.latitude,
          longitude: updatedPlane.longitude,
          geoAltitude: updatedPlane.geoAltitude,
          velocity: updatedPlane.velocity,
          trueTrack: updatedPlane.trueTrack
        }
        currentIcao24Set.delete(icao24);
      } 
    }
  }

  // Add or update planes from the flightList
  currentIcao24Set.forEach(icao24 => {
    const planeToAdd = flightList.find(plane => plane.icao24 === icao24);
    if (planeToAdd && !planeToAdd.onGround) {
      updatedFlightsMap[icao24] = {
        ...planeToAdd
      }
    }
  });

  console.warn(updatedFlightsMap);
  return updatedFlightsMap;
}


async function fetchFlightDetailFromAdsbDb(callsign: string) {
  const flightDetailFromAdsbDb = await fetch(`${ADSBDB_API_URL}/${callsign}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      return data.response.flightroute || null ;
    })
    .catch(error => {
      console.error("Error fetching flight details from ADSBdb:", error);
      return null;
    });
  return flightDetailFromAdsbDb;
}