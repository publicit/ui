export class Coordinate {
    lat: number
    lng: number

    constructor() {
        this.lat = 0
        this.lng = 0
    }

    url(): string {
        return `https://maps.google.com/?q=${this.lat},${this.lng}`
    }
}