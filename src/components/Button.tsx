// import Loading from "./Loading";
interface ButtonProps {
    buttonName: string;
    loading?: boolean;
    onClick?: () => void;
    color?: "foreground" | "error";
    type?: "button" | "submit" | "reset";
    variant?: "outline" | "filled";
    fullWidth?: boolean;
}
const Button = ({ buttonName, loading = false, onClick, color = "foreground", type = "button", variant = "outline", fullWidth = false }: ButtonProps) => {
    const baseStyles = "px-4 py-2 font-bold text-md rounded-md border transition-all duration-300 ease-in-out flex items-center justify-center";
    const widthStyles = fullWidth ? "w-full" : "";

    const outlineStyles = color === "foreground"
        ? `border-foreground bg-background ${!loading && `text-white hover:bg-foreground hover:text-white`}`
        : `border-red-600 bg-transparent text-red-600 ${!loading && `hover:bg-red-600 hover:text-white`}`;

    const filledStyles = color === "foreground"
        ? `border-foreground bg-foreground text-white ${!loading && `hover:opacity-80`}`
        : `border-red-600 bg-red-600 text-white ${!loading && `hover:bg-red-700`}`;

    return (
        <button
            type={type}
            className={`${baseStyles} ${widthStyles} ${variant === "filled" ? filledStyles : outlineStyles}`}
            onClick={onClick}
            disabled={loading}
        >
            {/* {loading ? <Loading size={5} /> : buttonName} */}
            {buttonName}
        </button>
    );
}

export default Button