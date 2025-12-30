export default class Plane {
    public icao24: string
    public callsign: string | null
    public originCountry: string
    public timePosition: number
    public lastContact: number
    public longitude: number | null
    public latitude: number | null
    public baroAltitude: number | null
    public onGround: boolean
    public velocity: number | null
    public trueTrack: number | null
    public verticalRate: number | null
    public sensors: number[] | null
    public geoAltitude: string | null
    public squawk: string | null
    public spi: boolean
    public positionSource: number
    public category: number

    constructor(
        icao24: string = '',
        callsign: string | null = null,
        originCountry: string = '',
        timePosition: number = 0,
        lastContact: number = 0,
        longitude: number | null = null,
        latitude: number | null = null,
        baroAltitude: number | null = null,
        onGround: boolean = false,
        velocity: number | null = null,
        trueTrack: number | null = null,
        verticalRate: number | null = null,
        sensors: number[] | null = null,
        geoAltitude: string | null = null,
        squawk: string | null = null,
        spi: boolean = false,
        positionSource: number = 0,
        category: number = 0
    ) {
        this.icao24 = icao24;
        this.callsign = callsign;
        this.originCountry = originCountry;
        this.timePosition = timePosition;
        this.lastContact = lastContact;
        this.longitude = longitude;
        this.latitude = latitude;
        this.baroAltitude = baroAltitude;
        this.onGround = onGround;
        this.velocity = velocity;
        this.trueTrack = trueTrack;
        this.verticalRate = verticalRate;
        this.sensors = sensors;
        this.geoAltitude = geoAltitude;
        this.squawk = squawk;
        this.spi = spi;
        this.positionSource = positionSource;
        this.category = category;
    }
    

    static fromOpenSkyResponse(data: any[]) {
        return new Plane(
            data[0],
            data[1],
            data[2],
            data[3],
            data[4],
            data[5],
            data[6],
            data[7],
            data[8],
            data[9],
            data[10],
            data[11],
            data[12],
            data[13],
            data[14],
            data[15],
            data[16],
            data[17]
        );
    }
}