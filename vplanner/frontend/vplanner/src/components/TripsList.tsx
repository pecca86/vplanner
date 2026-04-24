import { Link } from "@tanstack/react-router";
import { TRIPS } from "../data/trips";
import styles from "./TripsList.module.css";
import Grid from "../layout/Grid";

function TripsList() {
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Planned Trips</h2>
            <ul className={styles.list}>
                {TRIPS.map((trip) => (
                    <li key={trip.id}>
                        <TripListItem trip={trip} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

function TripListItem({ trip }: { trip: typeof TRIPS[number] }) {
    return (
        <Link
            to="/trips/$tripId"
            params={{ tripId: trip.id }}
            className={styles.tripLink}
            activeProps={{ className: `${styles.tripLink} ${styles.active}` }}
        >
            <Grid>
                <Grid.Item>
                    <span className={styles.tripCity}>{trip.locationData?.city}</span>
                    <span className={styles.tripSep}>·</span>
                    <span className={styles.tripCountry}>{trip.locationData?.country}</span>
                </Grid.Item>
                <Grid.Item>
                    <span className={styles.tripDates}>{trip.dateSpan?.start} - {trip.dateSpan?.end}</span>
                </Grid.Item>
            </Grid>
        </Link>
    )
}

export default TripsList;
