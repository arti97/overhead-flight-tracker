import type { Route } from "./+types/home";
import { MapLayer } from "~/components/layer/map-layer";
import { useEffect, useState } from "react";
import Plane from "~/model/plane";
import { fetchFlightData } from "~/redux/actions";
import { useDispatch, useSelector } from "react-redux";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Overhead Flight tracker" },
    { name: "description", content: "Overhead Flight tracker" },
  ];
}

export default function Home() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFlightData());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => dispatch(fetchFlightData()), 2000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return <MapLayer/>;
}

