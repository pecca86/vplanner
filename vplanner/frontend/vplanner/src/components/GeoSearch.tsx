import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSearchLoading } from "../context/SearchLoadingContext";
import styles from "./GeoSearch.module.css";

const API_KEY = "22e26b45c66e4263afadebaf9c1ce39e";

function GeoSearch() {
    const [query, setQuery] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { setIsSearching } = useSearchLoading();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!query.trim()) return;

        setError(null);
        setIsSearching(true);
        try {
            const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(query)}&format=json&apiKey=${API_KEY}`;
            const res = await fetch(url);
            const data = await res.json();

            if (!data.results?.length) {
                setError("No results found.");
                return;
            }

            const { lat, lon: lng } = data.results[0];
            navigate({ to: "/", search: { lat, lng } });
        } finally {
            setIsSearching(false);
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                className={styles.input}
                type="text"
                placeholder="Search for a location..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className={styles.button} type="submit">Search</button>
            {error && <p className={styles.error}>{error}</p>}
        </form>
    );
}

export default GeoSearch;
