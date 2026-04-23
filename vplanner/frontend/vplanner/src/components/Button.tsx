import styles from "./Button.module.css";

type ButtonType = "submit" | "button" | "reset";
type ButtonVariant = "teal" | "rose" | "blush" | "sand" | "mint" | "ghost";

interface ButtonProps {
    label: string;
    type?: ButtonType;
    variant?: ButtonVariant;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ label, type = "button", variant = "teal", onClick }: ButtonProps) {
    return (
        <button
            className={`${styles.button} ${styles[variant]}`}
            type={type}
            onClick={onClick}
        >
            {label}
        </button>
    );
}

export default Button;
