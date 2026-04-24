export type LocationData = {
    city: string;
    country: string;
    lat: number;
    lng: number;
}

export type DateSpan = {
    start: string; // ISO date string
    end: string;   // ISO date string
}

export type TripDocument = {
    title: string;
    url: string;
    type: "TICKET" | "RESERVATION" | "OTHER";
    reference?: string;
}

export type Booking = {
    type: "FLIGHT" | "HOTEL" | "ACTIVITY" | "TRAIN" | "RENTAL_CAR";
    details: string;
    bookingReference?: string;
    price?: number;
    documents?: TripDocument[];
    paymentStatus?: "PAID" | "PENDING" | "CANCELLED";
    payedBy?: string;
}

export type TripDay = {
    date: string; // ISO date string
    tags: string[];
    description: string;
    images: string[];
    bookings: Booking[];
    locationData?: LocationData[];
}

export interface Trip {
    id: string;
    title: string;
    locationData?: LocationData;
    dateSpan?: DateSpan;
    description?: string;
    tripDays?: TripDay[];
}

// In the real implementation, the tripDays would likely be fetched separately when viewing the trip details, but for this example we include them here directly.
export const TRIPS: Trip[] = [
    {
        id: "1",
        title: "Helsinki, Finland",
        locationData: {
            city: "Helsinki",
            country: "Finland",
            lat: 60.1699,
            lng: 24.9384
        },
        dateSpan: {
            start: "2023-01-01",
            end: "2023-01-10"
        },
        description: "A winter trip to Helsinki and the surrounding Finnish cities.",
        tripDays: [
            {
                date: "2023-01-01",
                tags: ["Arrive in Helsinki", "Check into hotel"],
                description: "Arrived in Helsinki and checked into the hotel. The weather was cold but the city looked beautiful with snow.",
                images: ["https://upload.wikimedia.org/wikipedia/commons/4/45/Helsinki_%2823883925315%29.jpg", "https://thumbs.dreamstime.com/b/helsinki-finland-scenic-summer-panorama-market-square-kauppatori-old-town-pier-33718725.jpg"],
                bookings: [
                    {
                        type: "FLIGHT",
                        details: "Flight from New York to Helsinki, ABC Airlines, Flight 123, Departure: 2023-01-01 08:00, Arrival: 2023-01-01 16:00",
                        bookingReference: "ABC123",
                        price: 500,
                        documents: [{
                            name: "Boarding Pass",
                            url: "https://example.com/boardingpass.pdf",
                            type: "TICKET",
                            reference: "BP123"
                        }],
                        paymentStatus: "PAID",
                        payedBy: "John Doe"
                    },
                ],
                locationData: [
                    {
                        name: "Helsinki, Finland",
                        city: "Helsinki",
                        country: "Finland",
                        lat: 60.1699,
                        lng: 24.9384
                    }
                ],
            },
            {
                date: "2023-01-02",
                tags: ["Turku", "Party with friends"],
                description: "Visited Turku with friends and had a great time exploring the city and enjoying the nightlife.",
                images: ["https://media.istockphoto.com/id/1582219829/photo/finland-turku-aura-river-and-turku-cathedral-aerial-view-in-summer.jpg?s=612x612&w=0&k=20&c=NQDmgu_rtZO3Cr5GKdehrBcpuQk8Ogwyq8FzyiZTLI8=", "https://ichef.bbci.co.uk/images/ic/480xn/p0jv77w9.jpg.webp"],
                bookings: [
                    {
                        type: "TRAIN",
                        details: "Train from Helsinki to Turku, Train 456, Departure: 2023-01-02 10:00, Arrival: 2023-01-02 12:00",
                        bookingReference: "ABC123",
                        price: 500,
                        documents: [{
                            name: "Train Ticket",
                            url: "https://example.com/trainticket.pdf",
                            type: "TICKET",
                            reference: "TT456"
                        }],
                        paymentStatus: "PAID",
                        payedBy: "Harrison Ford"
                    },
                ],
                locationData: [
                    {
                        name: "Turku, Finland",
                        city: "Turku",
                        country: "Finland",
                        lat: 60.4518,
                        lng: 22.2673
                    }
                ],
            },

        ]
    },
    {
        id: "2",
        title: "Amsterdam, Netherlands",
        locationData: {
            city: "Amsterdam",
            country: "Netherlands",
            lat: 52.3676,
            lng: 4.9041
        },
        dateSpan: {
            start: "2023-01-01",
            end: "2023-01-10"
        },
        description: "A winter trip to Amsterdam and the surrounding Dutch cities.",
        tripDays: [
            {
                date: "2023-01-01",
                tags: ["Arrive in Amsterdam", "Check into hotel"],
                description: "Arrived in Amsterdam and checked into the hotel. The weather was cold but the city looked beautiful with snow.",
                images: ["https://upload.wikimedia.org/wikipedia/commons/4/45/Helsinki_%2823883925315%29.jpg", "https://thumbs.dreamstime.com/b/helsinki-finland-scenic-summer-panorama-market-square-kauppatori-old-town-pier-33718725.jpg"],
                bookings: [
                    {
                        type: "FLIGHT",
                        details: "Flight from New York to Amsterdam, ABC Airlines, Flight 123, Departure: 2023-01-01 08:00, Arrival: 2023-01-01 16:00",
                        bookingReference: "ABC123",
                        price: 500,
                        documents: [{
                            title: "Boarding Pass",
                            url: "https://example.com/boardingpass.pdf",
                            type: "TICKET",
                            reference: "BP123"
                        }],
                        paymentStatus: "PAID",
                        payedBy: "John Doe"
                    },
                ],
                locationData: [
                    {
                        city: "Helsinki",
                        country: "Finland",
                        lat: 60.1699,
                        lng: 24.9384
                    }
                ],
            },
            {
                date: "2023-01-02",
                tags: ["Turku", "Party with friends"],
                description: "Visited Turku with friends and had a great time exploring the city and enjoying the nightlife.",
                images: ["https://media.istockphoto.com/id/1582219829/photo/finland-turku-aura-river-and-turku-cathedral-aerial-view-in-summer.jpg?s=612x612&w=0&k=20&c=NQDmgu_rtZO3Cr5GKdehrBcpuQk8Ogwyq8FzyiZTLI8=", "https://ichef.bbci.co.uk/images/ic/480xn/p0jv77w9.jpg.webp"],
                bookings: [
                    {
                        type: "TRAIN",
                        details: "Train from Helsinki to Turku, Train 456, Departure: 2023-01-02 10:00, Arrival: 2023-01-02 12:00",
                        bookingReference: "ABC123",
                        price: 500,
                        documents: [{
                            title: "Train Ticket",
                            url: "https://example.com/trainticket.pdf",
                            type: "TICKET",
                            reference: "TT456"
                        }],
                        paymentStatus: "PAID",
                        payedBy: "Harrison Ford"
                    },
                ],
                locationData: [
                    {
                        city: "Turku",
                        country: "Finland",
                        lat: 60.4518,
                        lng: 22.2673
                    }
                ],
            },

        ]
    },
];
