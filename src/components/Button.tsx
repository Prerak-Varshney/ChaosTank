interface ButtonProps {
    buttonName: string;
    onClick?: () => void;
    color?: "foreground" | "error";
}
const Button = ({buttonName, onClick, color = "foreground"}: ButtonProps) => {
    return (
        <button 
            type="button" 
            className={`
                px-4 py-1 font-bold text-md rounded-md border transition-colors duration-300 ease-in-out
                 
                 ${color === "foreground" ? `border-foreground bg-background text-foreground hover:bg-foreground hover:text-white` : 
                    `border-red-600 bg-transparent text-red-600 hover:bg-red-600 hover:text-white`
                 }
            `} 
            onClick={onClick}
        >
            {buttonName}
        </button>
    );
}

export default Button