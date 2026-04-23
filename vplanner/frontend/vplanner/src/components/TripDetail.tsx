import { useNavigate, useParams } from "@tanstack/react-router";
import { TRIPS } from "../data/trips";
import styles from "./TripDetail.module.css";

function TripDetail() {
    const { tripId } = useParams({ strict: false });
    const navigate = useNavigate();
    const trip = TRIPS.find((t) => t.id === tripId);

    if (!trip) return <p className={styles.error}>Trip not found.</p>;

    function showOnMap() {
        navigate({ to: "/", search: { lat: trip!.lat, lng: trip!.lng } });
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.name}>{trip.name}</h2>
            <button className={styles.coords} onClick={showOnMap}>
                {trip.lat.toFixed(4)}, {trip.lng.toFixed(4)}
            </button>
        </div>
    );
}

export default TripDetail;
