import { useEffect, useState } from "react";
import styles from "./PlaceFormModal.module.css";
import { fetchWikiData } from "../services/apiService";
import { useFetchLocation } from "../hooks/useLocationName";

interface Props {
    lat: number;
    lng: number;
    onClose: () => void;
}


function PlaceFormModal({ lat, lng, onClose }: Props) {
    const [isLoading, setIsLoading] = useState(true);
    const { locationName } = useFetchLocation(lat, lng);
    const [description, setDescription] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    useEffect(() => {
        async function fetchPlace() {
            setIsLoading(true);
            const descriptionData = await fetchWikiData(locationName as string);
            setDescription(descriptionData.pages[0]?.description || "No description available");
            setImgUrl(descriptionData.pages[0]?.thumbnail?.url || "");
            setIsLoading(false);
        }

        fetchPlace();
    }, [locationName]);

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>✕</button>
                {isLoading ? (
                    <p className={styles.loading}>Loading...</p>
                ) : (
                    <>
                        <h1>{locationName}</h1>
                        <p>{description}</p>
                        {imgUrl && <img height="200" width="300" src={imgUrl} alt="Place" className={styles.placeImage} />}
                    </>
                )}
            </div>
        </div>
    );
}

export default PlaceFormModal;
