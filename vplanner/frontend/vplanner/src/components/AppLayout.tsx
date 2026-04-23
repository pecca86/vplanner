import { Link, Outlet } from "@tanstack/react-router"
import SideNav from "./SideNav"
import GeoSearch from "./GeoSearch"
import TripsList from "./TripsList"
import styles from "../App.module.css"

function AppLayout() {
    return (
        <div className={styles.layout}>
            <SideNav>
                <GeoSearch />
                <Link
                    to="/"
                    className={styles.mapLink}
                    activeProps={{ className: `${styles.mapLink} ${styles.mapLinkActive}` }}
                >
                    World Map
                </Link>
                <TripsList />
            </SideNav>
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    )
}

export default AppLayout
