export interface Trip {
    id: string;
    name: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
}

export const TRIPS: Trip[] = [
    { id: "1", name: "Helsinki, Finland", city: "Helsinki", country: "Finland", lat: 60.1699, lng: 24.9384 },
    { id: "2", name: "Stockholm, Sweden", city: "Stockholm", country: "Sweden", lat: 59.3293, lng: 18.0686 },
];
