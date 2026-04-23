import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface SearchLoadingContextType {
    isSearching: boolean;
    setIsSearching: (v: boolean) => void;
}

const SearchLoadingContext = createContext<SearchLoadingContextType>({
    isSearching: false,
    setIsSearching: () => {},
});

export function SearchLoadingProvider({ children }: { children: ReactNode }) {
    const [isSearching, setIsSearching] = useState(false);
    return (
        <SearchLoadingContext.Provider value={{ isSearching, setIsSearching }}>
            {children}
        </SearchLoadingContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSearchLoading() {
    return useContext(SearchLoadingContext);
}
