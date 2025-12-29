import { AdvancedMarker } from "@vis.gl/react-google-maps";
import Plane from "~/model/plane";
import flightIcon from "../../assets/plane4.svg";

export function PlaneMarker({ plane }: { plane: Plane }) {

    //TODO: Rotate the plane icon based on plane.heading

    return (
        <AdvancedMarker position={{ lat: plane.latitude, lng: plane.longitude, altitude: plane.geoAltitude||0 }}>
            <img src={flightIcon} alt="Plane Icon" />
        </AdvancedMarker>
    );
}
