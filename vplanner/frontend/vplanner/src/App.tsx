import { Link, Outlet } from "@tanstack/react-router"
import SideNav from "./components/SideNav"
import GeoSearch from "./components/GeoSearch"
import TripsList from "./components/TripsList"
import { CitiesProvider } from "./context/CititesContext"
import { SearchLoadingProvider } from "./context/SearchLoadingContext"
import styles from "./App.module.css"

function App() {
  return (
    <SearchLoadingProvider>
    <CitiesProvider>
      <div className={styles.layout}>
        <SideNav>
          <GeoSearch />
          <Link to="/" className={styles.mapLink} activeProps={{ className: `${styles.mapLink} ${styles.mapLinkActive}` }}>
            World Map
          </Link>
          <TripsList />
        </SideNav>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </CitiesProvider>
    </SearchLoadingProvider>
  )
}

export default App
