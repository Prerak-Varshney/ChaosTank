const LevelLine = ({level}: {level: number}) => (
    <div
      className="absolute left-0 w-full border-t border-dashed border-foreground text-xs"
      style={{
        bottom: `${level}%`
      }}
    >
      <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-500 text-white font-bold px-1 rounded">
        {level}%
      </span>
    </div>
);

export default LevelLine;