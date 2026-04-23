import { useEffect, useState } from "react";
import { fetchPlaceName, type GeoResult } from "../services/apiService";

export const useFetchLocation = (lat: number | string, lng: number | string) => {
    const [locationName, setLocationName] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPlace() {
            setIsLoading(true);
            const data: GeoResult = await fetchPlaceName(lat, lng);
            setLocationName(data.city || data.locality || "Unknown place");
            setIsLoading(false);
        }

        fetchPlace();
    }, [lat, lng]);

    return { locationName, isLoading };
}