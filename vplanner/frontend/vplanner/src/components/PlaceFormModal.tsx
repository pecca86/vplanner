import { useEffect, useState } from "react";
import styles from "./PlaceFormModal.module.css";
import { fetchPlaceName, type GeoResult } from "../services/apiService";

interface Props {
    lat: number;
    lng: number;
    onClose: () => void;
}


function PlaceFormModal({ lat, lng, onClose }: Props) {
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

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>✕</button>
                {isLoading ? (
                    <p className={styles.loading}>Loading...</p>
                ) : (
                    <>
                        <h2 className={styles.placeName}>{placeName}</h2>
                        <button className={styles.ctaBtn} onClick={onClose}>
                            Add to trip
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default PlaceFormModal;
