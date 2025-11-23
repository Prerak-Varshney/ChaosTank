"use client"
import { useRef } from "react";
interface AuthButtonProps {
    label: string;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    setShowMenu: (show: boolean) => void;
    onClick?: () => void;
}
const AuthButton = ({ label, onMouseEnter, onMouseLeave, onClick }: AuthButtonProps) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
        }, 300);
    };
    return (
        <div
            className={`w-full h-8 flex border-t border-t-foreground items-center justify-center hover:bg-foreground hover:text-white cursor-pointer transition-all duration-300 font-bold`}
            onMouseEnter={() => {
                handleMouseEnter();
                onMouseEnter();
            }}
            onMouseLeave={() => {
                handleMouseLeave();
                onMouseLeave();
            }}
            onClick={onClick}
        >
            {label}
        </div >
    )
}

export default AuthButton;