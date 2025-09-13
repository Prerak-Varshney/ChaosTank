"use client"
import Hamburger from "./Hamburger"
import { useTheme } from "@/context/ThemeContext"

const Navbar = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className={`w-full h-20 flex items-center justify-between px-10 md:px-20 border-b border-b-foreground text-foreground`}>
            <h1 className="text-3xl md:text-4xl font-bold">ChaosTank</h1>
            <Hamburger onClick={() => setTheme(theme === "sky" ? "aqua" : "sky")} />
        </div>
    )
}

export default Navbar