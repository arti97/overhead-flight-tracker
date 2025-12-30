import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Plane from "~/model/plane";
import { fetchFlightRouteDetails } from "~/redux/actions";


export function MarkerInfo({ plane, marker }: { plane: Plane, marker: any }) {

    const dispatch = useDispatch();

    useEffect(() => {
        if(plane.flightroute?.airline == null || plane.flightroute?.airline.name == null
            || plane.flightroute?.airline?.name == '') {
            dispatch(fetchFlightRouteDetails(plane.callsign));
        }       
    }, []);

    return (
        plane.flightroute && plane.flightroute?.airline && plane.flightroute?.airline?.name && 
        <div id='marker-info'>
            <span 
                style={{
                    display: 'inline-flex',
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', sans-serif',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px 14px',
                    borderRadius: '999px',
                    border: '1px solid rgba(248,113,113,0.7)',
                    background: 'rgba(248,113,113,0.08)',
                    color: '#fecaca',
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                    boxShadow: '0 0 0 1px rgba(248,113,113,0.25)' }}>
                {plane.flightroute?.airline?.name} <br/>  
                {plane.flightroute?.origin?.iata_code} ➔ {plane.flightroute?.destination?.iata_code} <br/>   
                {plane.baroAltitude}m
            </span>
        </div>
    );  
}