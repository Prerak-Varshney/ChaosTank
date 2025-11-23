"use client"
import { useState, useRef } from "react";
import { useTheme } from "@/context/ThemeContext"
import { THEMES } from "@/constants/levels";
interface ThemeButtonProps {
    label: string;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    setShowMenu: (show: boolean) => void;
}
const ThemeButton = ({ label, onMouseEnter, onMouseLeave, setShowMenu }: ThemeButtonProps) => {
    const [showThemeMenu, setShowThemeMenu] = useState<boolean>(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const { theme, setTheme } = useTheme();

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowThemeMenu(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowThemeMenu(false);
        }, 300);
    };
    return (
        <div
            className={`w-full h-8 flex items-center justify-center hover:bg-foreground hover:text-white cursor-pointer transition-all duration-300 font-bold`}
            onMouseEnter={() => {
                handleMouseEnter();
                onMouseEnter();
            }}
            onMouseLeave={() => {
                handleMouseLeave();
                onMouseLeave();
            }}
        >
            <div>{label}</div>
            {
                showThemeMenu &&
                <div className={`absolute border border-foreground w-full top-16 right-18 transform -translate-y-1/2 -translate-x-1/2 rounded-sm`}>
                    {
                        THEMES.map((t: "Ocean" | "Sky" | "Aqua" | "Purple", index: number) => (
                            <div
                                key={index}
                                className={`
                                            w-full h-8 flex items-center justify-center hover:bg-foreground hover:text-white cursor-pointer transition-all duration-300 font-bold 
                                            ${index !== 0 ? 'border-t border-t-foreground' : ''}
                                            ${theme === t ? 'bg-foreground text-white' : 'bg-background text-foreground'}
                                        `}
                            >
                                <button onClick={() => { setTheme(t); setShowThemeMenu(false); setShowMenu(false); }}>{t}</button>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default ThemeButton;