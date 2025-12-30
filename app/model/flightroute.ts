import Airline from "./airline";
import Place from "./place";

export default class Flightroute {
    public callsign: string;
    public callsign_icao: string
    public callsign_iata: string
    public airline: Airline | null;
    public origin: Place | null
    public destination: Place | null

    constructor(
        callsign: string = '',
        callsign_icao: string = '',
        callsign_iata: string = '',
        airline: Airline | null = null,
        origin: Place | null = null,
        destination: Place | null = null
    ) {
        this.callsign = callsign;
        this.callsign_icao = callsign_icao;
        this.callsign_iata = callsign_iata;
        this.airline = airline;
        this.origin = origin;
        this.destination = destination;
    }   
}