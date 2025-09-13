"use client";
import { getWaterColor } from "../utils/ColorIndicator";
import { useTheme } from "@/context/ThemeContext";

const Water = ({ currentWaterLevel }:{currentWaterLevel: number}) => {
    const { theme } = useTheme();

    return(
        <div
            className={`absolute bottom-0 left-0 rounded-b-3xl w-full transition-all duration-300 ease-in-out opacity-40 ${currentWaterLevel === 100 && 'rounded-t-3xl'}`}
            style={{
                height: `${currentWaterLevel}%`,
                backgroundColor: getWaterColor(currentWaterLevel, theme),
            }}    
        >
        </div>
    );
};

export default Water;