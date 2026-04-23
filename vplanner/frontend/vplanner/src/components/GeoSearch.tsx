import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSearchLoading } from "../context/SearchLoadingContext";
import styles from "./GeoSearch.module.css";
import Button from "./Button";
import { fetchCoordinates } from "../services/apiService";

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
            const data = await fetchCoordinates(query);

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
            <Button label="Search" type="submit" />
            {error && <p className={styles.error}>{error}</p>}
        </form>
    );
}

export default GeoSearch;
