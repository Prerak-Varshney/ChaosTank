import { getWaterColor } from "../utils/ColorIndicator";
const Water = ({ currentWaterLevel }:{currentWaterLevel: number}) => {
    return(
        <div
            className={`absolute bottom-0 left-0 rounded-b-3xl w-full transition-all duration-300 ease-in-out opacity-40 ${currentWaterLevel === 100 && 'rounded-t-3xl'}`}
            style={{
                height: `${currentWaterLevel}%`,
                backgroundColor: getWaterColor(currentWaterLevel),
            }}    
        >
        </div>
    );
};

export default Water;