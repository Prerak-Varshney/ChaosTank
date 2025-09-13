interface HamburgerProps {
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const Hamburger = ({onClick, onMouseEnter, onMouseLeave} : HamburgerProps) => {
    return (
        <div 
            className={`w-8 h-8 flex flex-col justify-center items-center cursor-pointer space-y-2 group`} 
            onClick={onClick} 
            onMouseEnter={onMouseEnter} 
            onMouseLeave={onMouseLeave}
        >
            {[1,2,3].map((_) => (
                <div key={_} className={`w-full h-0.5 bg-white rounded-full group-hover:animate-pulse group-hover:bg-foreground transition-all duration-300`}></div>
            ))}
        </div>
    )
}

export default Hamburger