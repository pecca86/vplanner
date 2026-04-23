
const GEO_API_KEY = "22e26b45c66e4263afadebaf9c1ce39e";

export interface GeoResult {
    city: string;
    locality: string;
    countryName: string;
}

export interface WikiResult {
    pages: {
        id: number;
        key: string;
        title: string;
        excerpt: string;
        matched_title: string | null;
        anchor: string | null;
        description: string;
        thumbnail: {
            mimetype: string;
            width: number;
            height: number;
            duration: number | null;
            url: string;
        } | null;
    }[];
}

export const fetchCoordinates = async (query: string) => {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(query)}&format=json&apiKey=${GEO_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export const fetchPlaceName = async (lat: number | string, lng: number | string): Promise<GeoResult> => {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export const fetchWikiData = async (query: string) => {
    const url = `https://en.wikipedia.org/w/rest.php/v1/search/page?q=${encodeURIComponent(query)}&limit=1`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}