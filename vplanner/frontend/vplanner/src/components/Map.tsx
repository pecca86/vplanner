import { useNavigate } from "@tanstack/react-router";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";

import styles from "./Map.module.css";
import { useEffect, useMemo, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "../context/CititesContext";
import { useSearchLoading } from "../context/SearchLoadingContext";
import PlaceFormModal from "./PlaceFormModal";
import Button from "./Button";
import { fetchPlaceName } from "../services/apiService";

interface City {
    id: number | string;
    cityName: string;
    emoji: string;
    position: { lat: number; lng: number };
}

interface ClickedPos {
    lat: number;
    lng: number;
}

function Map() {
    const { cities } = useCities();
    const { position: geolocationPosition } = useGeolocation();
    const [mapLat, mapLng] = useUrlPosition();
    const [clickedPos, setClickedPos] = useState<ClickedPos | null>(null);
    const { isSearching } = useSearchLoading();
    const [locationName, setLocationName] = useState<string | null>(null);


    useEffect(() => {
        async function getLocationData() {
            const name = await fetchPlaceName(mapLat as number, mapLng as number);
            setLocationName(name.city || name.locality || "Unknown place");
        }
        getLocationData();
    }, [mapLat, mapLng]);


    const mapPosition = useMemo<[number, number]>(() => {
        if (geolocationPosition) return [geolocationPosition.lat, geolocationPosition.lng];
        if (mapLat && mapLng) return [mapLat, mapLng];
        return [40, 0];
    }, [geolocationPosition, mapLat, mapLng]);

    return (
        <div className={styles.mapContainer}>
            <MapContainer
                center={mapPosition}
                zoom={6}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city: City) => (
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}
                    >
                        <Popup>
                            <span>{city.emoji}</span> <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}

                {mapLat && mapLng && (
                    <Marker position={[mapLat, mapLng]}>
                        <Popup>
                            <Button label="Add new travel plan" onClick={() => setClickedPos({ lat: mapLat, lng: mapLng })} />
                            <span className={styles.locationName}>{locationName}</span> ({mapLat.toFixed(4)}, {mapLng.toFixed(4)})
                        </Popup>
                    </Marker>
                )}

                <ChangeCenter position={mapPosition} />
                <DetectClick onMapClick={setClickedPos} />
            </MapContainer>

            {isSearching && (
                <div className={styles.spinnerOverlay}>
                    <div className={styles.spinner} />
                </div>
            )}

            {clickedPos && (
                <PlaceFormModal
                    lat={clickedPos.lat}
                    lng={clickedPos.lng}
                    onClose={() => setClickedPos(null)}
                />
            )}
        </div>
    );
}

function ChangeCenter({ position }: { position: [number, number] }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick({ onMapClick }: { onMapClick: (pos: ClickedPos) => void }) {
    const navigate = useNavigate();

    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            navigate({ to: "/", search: { lat, lng } });
            onMapClick({ lat, lng });
        },
    });

    return null;
}

export default Map;
