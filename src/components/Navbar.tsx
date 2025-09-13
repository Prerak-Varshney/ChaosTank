import Hamburger from "./Hamburger"

const Navbar = () => {
    return (
        <div className={`w-full h-20 flex items-center justify-between px-10 md:px-20 border-b border-b-foreground text-foreground`}>
            <h1 className="text-3xl md:text-4xl font-bold">ChaosTank</h1>
            <Hamburger />
        </div>
    )
}

export default Navbar