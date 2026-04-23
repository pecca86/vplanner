import { useSearch } from "@tanstack/react-router";

export function useUrlPosition(): [number | null, number | null] {
  const { lat, lng } = useSearch({ strict: false });
  return [lat ?? null, lng ?? null];
}
