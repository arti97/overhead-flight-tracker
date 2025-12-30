export default class Place {
    public country_iso_name: string;
    public country_name: string;
    public elevation: number;
    public iata_code: string;
    public icao_code: string;
    public latitude: number;
    public longitude: number;
    public municipality: string;
    public name: string;

    constructor(
        country_iso_name: string = '',
        country_name: string = '',
        elevation: number = 0,
        iata_code: string = '',
        icao_code: string = '',
        latitude: number = 0,
        longitude: number = 0,
        municipality: string = '',
        name: string = ''
    ) {
        this.country_iso_name = country_iso_name;
        this.country_name = country_name;
        this.elevation = elevation;
        this.iata_code = iata_code;
        this.icao_code = icao_code;
        this.latitude = latitude;
        this.longitude = longitude;
        this.municipality = municipality;
        this.name = name;
    }
}