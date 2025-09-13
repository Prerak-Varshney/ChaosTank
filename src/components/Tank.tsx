import LevelIndicator from "./LevelIndicator";
import LevelLine from "./LevelLine";
import Water from "./Water";
interface TankProps {
    levels: number[];
    CurrentWaterLevel: number;
}

const Tank = ({levels, CurrentWaterLevel}: TankProps) => {

    return (
        <div className={`relative border border-foreground rounded-3xl h-110 w-80 flex flex-col justify-between items-center py-4`}>
            {
                levels.map((level, index) => (
                    <LevelLine 
                        level={level} 
                        key={index} 
                    />
                ))
            }

           <Water currentWaterLevel={CurrentWaterLevel} />
           <LevelIndicator currentWaterLevel={CurrentWaterLevel} />

        </div>
    )
}

export default Tank;