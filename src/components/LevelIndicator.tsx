import { getLevelColor } from "../utils/ColorIndicator";

const LevelIndicator = ({ currentWaterLevel }: { currentWaterLevel: number }) => {
    return (
        <div 
            className={`
                absolute transform translate-y-1/2 flex items-center justify-center gap-1
                ${currentWaterLevel === 0 ? '-right-21' : currentWaterLevel === 100 ? '-right-21' : '-right-1.5'}
            `}
            style={{
                bottom: `${currentWaterLevel}%`,
            }}
        >
            <div
                className="w-3 h-3 rounded-full border-2 border-white transition-all duration-300 ease-in-out animate-pulse"
                style={{
                    backgroundColor: getLevelColor(currentWaterLevel),
                }}
            />
            <div 
                className={`
                    transition-all duration-300 ease-in-out px-2 py-1 font-bold text-xs text-white rounded-sm animate-bounce 
                    ${currentWaterLevel === 100 || currentWaterLevel === 0 ? 'visible' : 'hidden'}
                `}
                style={{
                    backgroundColor: getLevelColor(currentWaterLevel),
                }}
            >
                {currentWaterLevel}% {currentWaterLevel === 100 ? 'Full' : currentWaterLevel === 0 ? 'Empty' : ''}
            </div>
                
        </div>
    );
};

export default LevelIndicator;