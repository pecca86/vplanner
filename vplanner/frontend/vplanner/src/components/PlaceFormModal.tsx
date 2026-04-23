import { useEffect, useState } from "react";
import styles from "./PlaceFormModal.module.css";

interface Props {
    lat: number;
    lng: number;
    onClose: () => void;
}

interface GeoResult {
    city: string;
    locality: string;
    countryName: string;
}

function PlaceFormModal({ lat, lng, onClose }: Props) {
    const [placeName, setPlaceName] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPlace() {
            setIsLoading(true);
            const res = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
            );
            const data: GeoResult = await res.json();
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
                    <h2 className={styles.placeName}>{placeName}</h2>
                )}
            </div>
        </div>
    );
}

export default PlaceFormModal;
