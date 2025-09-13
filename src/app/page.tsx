import Tank from "@/components/Tank";
import levels from "@/constants/levels";
const Home = () => {
  return (
    <div className={`w-full h-screen flex items-center justify-center bg-background text-foreground`}>
      <Tank levels={levels} CurrentWaterLevel={100}/>
    </div>
  )
}

export default Home;