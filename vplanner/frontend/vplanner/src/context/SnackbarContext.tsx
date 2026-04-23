import { createContext, useCallback, useContext, useRef, useState } from "react";
import Snackbar, { type SnackbarPosition, type SnackbarType } from "../components/Snackbar";

interface SnackbarOptions {
    duration?: number;
    position?: SnackbarPosition;
    type?: SnackbarType;
}

interface SnackbarContextValue {
    showSnackbar: (message: React.ReactNode, options?: SnackbarOptions) => void;
}

interface SnackbarState {
    message: React.ReactNode;
    position: SnackbarPosition;
    type: SnackbarType;
    visible: boolean;
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<SnackbarState>({
        message: "",
        position: "bottom",
        type: "info",
        visible: false,
    });
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showSnackbar = useCallback((message: React.ReactNode, options: SnackbarOptions = {}) => {
        const { duration = 2000, position = "bottom", type = "info" } = options;

        if (timerRef.current) clearTimeout(timerRef.current);

        setState({ message, position, type, visible: true });

        timerRef.current = setTimeout(() => {
            setState(prev => ({ ...prev, visible: false }));
        }, duration);
    }, []);

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar
                message={state.message}
                position={state.position}
                type={state.type}
                visible={state.visible}
            />
        </SnackbarContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSnackbar() {
    const ctx = useContext(SnackbarContext);
    if (!ctx) throw new Error("useSnackbar must be used within a SnackbarProvider");
    return ctx;
}
