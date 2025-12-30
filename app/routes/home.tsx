import type { Route } from "./+types/home";
import { MapLayer } from "~/components/layer/map-layer";
import { useEffect } from "react";
import { fetchFlightData } from "~/redux/actions";
import { useDispatch } from "react-redux";
import { interpolateFlightPositionsAction } from "~/redux/slices/flights-slice";
import { APP_TITLE, INTERPOLATION_INTERVAL_MS, OPENSKY_API_REFRESH_INTERVAL_MS } from "~/utils/constants";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${APP_TITLE}` },
    { name: "description", content: `${APP_TITLE}` },
  ];
}

export default function Home() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFlightData());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => dispatch(fetchFlightData()), OPENSKY_API_REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => dispatch(interpolateFlightPositionsAction()), INTERPOLATION_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [dispatch]);

  return <div id='home-tsx'><MapLayer/></div>
}

