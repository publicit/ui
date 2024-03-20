export class Location {
    id: string
    lat: number
    lng: number
    position: number

    constructor() {
        this.id = ""
        this.lat = 0
        this.lng = 0
        this.position = 0
    }

    url(): string {
        return `https://maps.google.com/?q=${this.lat},${this.lng}`
    }
}


export function toLocation(v: any): Location {
    const c = new Location()
    if (!v) return c
    c.id = v.id
    c.lng = v.lng
    c.position = v.position
    c.lat = v.lat
    return c
}
