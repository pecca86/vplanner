import { Link } from "@tanstack/react-router";
import { TRIPS } from "../data/trips";
import styles from "./TripsList.module.css";

function TripsList() {
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Planned Trips</h2>
            <ul className={styles.list}>
                {TRIPS.map((trip) => (
                    <li key={trip.id}>
                        <Link
                            to="/trips/$tripId"
                            params={{ tripId: trip.id }}
                            className={styles.tripLink}
                            activeProps={{ className: `${styles.tripLink} ${styles.active}` }}
                        >
                            {trip.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TripsList;
