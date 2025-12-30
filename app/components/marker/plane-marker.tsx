import { AdvancedMarker } from "@vis.gl/react-google-maps";
import Plane from "~/model/plane";
import flightIcon from "../../assets/flight-icon.svg";
import { DEFAULT_FLIGHT_ICON_TILT } from "~/utils/constants";

export function PlaneMarker({ plane }: { plane: Plane }) {

    const heading = plane && plane.trueTrack && plane.trueTrack - DEFAULT_FLIGHT_ICON_TILT || 0;

    return (
        <AdvancedMarker 
            position={{ 
                lat: plane.latitude, 
                lng: plane.longitude, 
                altitude: plane.geoAltitude||0 }}
            draggable={false}
            title={`Flight: ${plane.callsign || 'N/A'}`}
            clickable={false}>
            <img
                height={30}
                width={30}
                src={flightIcon} 
                alt="Plane Icon"
                style={{
                    transform: `rotate(${heading}deg)`}}/>
        </AdvancedMarker>
    );
}
