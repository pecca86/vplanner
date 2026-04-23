import { useEffect } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
    title?: string;
    onClose: () => void;
    children: React.ReactNode;
    size?: "sm" | "md" | "lg";
}

function Modal({ title, onClose, children, size = "md" }: ModalProps) {
    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [onClose]);

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={`${styles.modal} ${styles[size]}`} onClick={e => e.stopPropagation()}>
                {title !== undefined && (
                    <div className={styles.header}>
                        <h2 className={styles.title}>{title}</h2>
                        <button className={styles.closeBtn} onClick={onClose}>✕</button>
                    </div>
                )}
                {title === undefined && (
                    <button className={styles.closeBtnFloating} onClick={onClose}>✕</button>
                )}
                <div className={styles.body}>{children}</div>
            </div>
        </div>
    );
}

export default Modal;
