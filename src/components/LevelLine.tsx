interface LevelLineProps {
  level: number;
  currentWaterLevel: number;
}
const LevelLine = ({level, currentWaterLevel}: LevelLineProps) => (
    <div
      className="absolute left-0 w-full border-t border-dashed border-foreground text-xs"
      style={{
        bottom: `${level}%`
      }}
    >
        <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background text-foreground font-bold px-1 rounded">
          {level}%
        </span>

        <span className="absolute left-3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background text-foreground font-bold p-2 rounded">
          <div className={`rounded-full w-2 h-2 ${currentWaterLevel >= level ? 'bg-green-500 shadow-[0_0_12px_rgba(34,235,100,0.8),0_0_40px_rgba(34,235,100,0.8)]' : 'bg-red-900'}`}></div>
        </span>

        <span className="absolute -right-3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background text-foreground font-bold p-2 rounded">
          <div className={`rounded-full w-2 h-2 ${currentWaterLevel >= level ? 'bg-green-500 shadow-[0_0_12px_rgba(34,235,100,0.8),0_0_40px_rgba(34,235,100,0.8)]' : 'bg-red-900'}`}></div>
        </span>
    </div>
);

export default LevelLine;

// oklch(72.3% 0.219 149.579)