import { useState } from "react";

interface GeolocationCoords {
  lat: number;
  lng: number;
}

export function useGeolocation(defaultPosition: GeolocationCoords | null = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<GeolocationCoords | null>(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}
