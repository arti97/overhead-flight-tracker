export default class Airline {
    public name: string
    public icao: string
    public iata: string
    public country: string
    public country_iso: string
    public callsign: string

    constructor(
        name: string = '',
        icao: string = '',
        iata: string = '',
        country: string = '',
        country_iso: string = '',
        callsign: string = ''
    ) {
        this.name = name;
        this.icao = icao;
        this.iata = iata;
        this.country = country;
        this.country_iso = country_iso;
        this.callsign = callsign;
    }
}