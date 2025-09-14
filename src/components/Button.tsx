// import Loading from "./Loading";
interface ButtonProps {
    buttonName: string;
    loading?: boolean;
    onClick?: () => void;
    color?: "foreground" | "error";
}
const Button = ({buttonName, loading=false, onClick, color = "foreground"}: ButtonProps) => {
    return (
        <button 
            type="button" 
            className={`
                px-4 py-1 font-bold text-md rounded-md border transition-colors duration-300 ease-in-out flex items-center justify-center
                 ${color === "foreground" ? `border-foreground bg-background ${!loading && `text-foreground hover:bg-foreground hover:text-white`}` : 
                    `border-red-600 bg-transparent text-red-600 ${!loading && `hover:bg-red-600 hover:text-white`}`
                 }
            `} 
            onClick={onClick}
            disabled={loading}
        >
            {/* {loading ? <Loading size={5} /> : buttonName} */}
            {buttonName}
        </button>
    );
}

export default Button