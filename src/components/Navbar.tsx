"use client"
import { useState, useRef } from "react";
import Hamburger from "./Hamburger"
import ThemeButton from "@/components/ThemeButton";
import AuthButton from "./AuthButton";

import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
    const { logout } = useAuth();
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowMenu(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowMenu(false);
        }, 300);
    };

    return (
        <div className={`w-full h-20 flex items-center justify-between px-10 md:px-20 border-b border-b-foreground text-foreground`}>
            <h1 className="text-3xl md:text-4xl font-bold">ChaosTank</h1>
            <div className={`relative`}>
                <Hamburger
                    onClick={() => { }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />
                {
                    showMenu && (
                        <div className={`absolute bg-background border border-foreground w-30 rounded-sm flex flex-col items-center justify-start top-0 right-10 transition-all duration-300 z-20`}>
                            <ThemeButton
                                label={"Theme"}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                setShowMenu={setShowMenu}
                            />
                            <AuthButton
                                label={"Sign Out"}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                setShowMenu={setShowMenu}
                                onClick={logout}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar