import styles from "./Snackbar.module.css";

export type SnackbarPosition = "top" | "center" | "bottom";
export type SnackbarType = "info" | "success" | "error";

interface SnackbarProps {
    message: React.ReactNode;
    position: SnackbarPosition;
    type: SnackbarType;
    visible: boolean;
}

function Snackbar({ message, position, type, visible }: SnackbarProps) {
    return (
        <div className={`${styles.wrapper} ${styles[position]} ${visible ? styles.visible : ""}`}>
            <div className={`${styles.snackbar} ${styles[type]}`}>
                {message}
            </div>
        </div>
    );
}

export default Snackbar;
