import Plane from "~/model/plane";
import { MAXIMUM_LATITUDE, MAXIMUM_LONGITUDE, MINIMUM_LATITUDE, MINIMUM_LONGITUDE,  } from "./constants";

export const createGetRequestParams = () => {
  const params = new URLSearchParams();
  params.append("lamin", MINIMUM_LATITUDE.toString());
  params.append("lomin", MINIMUM_LONGITUDE.toString());
  params.append("lamax", MAXIMUM_LATITUDE.toString());
  params.append("lomax", MAXIMUM_LONGITUDE.toString());
  return params.toString();
}

export const formatOpenSkyResponse = (data: any) => {
  if (!data || !data.states) {
    return [];
  }

  return data.states.map((eachFlight: any) => {
    return Plane.fromOpenSkyResponse(eachFlight);
  });     
}
