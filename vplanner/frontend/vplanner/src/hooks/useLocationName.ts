import { useEffect, useState } from "react";
import { fetchPlaceName, type GeoResult } from "../services/apiService";

export const useFetchPlace = (lat: number | string, lng: number | string) => {
    const [placeName, setPlaceName] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPlace() {
            setIsLoading(true);
            const data: GeoResult = await fetchPlaceName(lat, lng);
            setPlaceName(data.city || data.locality || "Unknown place");
            setIsLoading(false);
        }

        fetchPlace();
    }, [lat, lng]);

    return { placeName, isLoading };
}