import {APIProvider, ColorScheme, Map} from '@vis.gl/react-google-maps';
import { useDispatch, useSelector } from 'react-redux';
import { PlaneMarker } from '~/components/marker/plane-marker';
import Plane from '~/model/plane';
import { MAXIMUM_LATITUDE, MAXIMUM_LONGITUDE, MINIMUM_LATITUDE, MINIMUM_LONGITUDE } from '~/utils/constants';

export function MapLayer() {

        const flightList = useSelector((store) => store.flights && store.flights.flightList || []);

        return(
        <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY} region='IN' disableUsageAttribution>
            <Map
                mapId = 'd803a5a7e83398ec3b9aab41'
                colorScheme = {ColorScheme.DARK}
                style={{width: '100vw', height: '100vh'}}
                defaultBounds={{
                    north: MAXIMUM_LATITUDE,
                    south: MINIMUM_LATITUDE,
                    east: MAXIMUM_LONGITUDE,
                    west: MINIMUM_LONGITUDE}}
                disableDefaultUI>
                    {flightList.map((plane: Plane) => {
                        return <PlaneMarker plane={plane}/>;
                    })}  
            </Map>
        </APIProvider>
  )}