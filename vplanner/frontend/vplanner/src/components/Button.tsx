import styles from "./GeoSearch.module.css";

type ButtonType = "submit" | "button" | "reset";

interface ButtonProps {
    label: string;
    type?: ButtonType;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ label, type = "button", onClick }: ButtonProps) {
    return (
        <button className={styles.button} type={type} onClick={onClick}>
            {label}
        </button>
    );
}

export default Button;
