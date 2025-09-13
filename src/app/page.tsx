import Tank from "@/components/Tank";
import { levels } from "@/constants/levels";
import Navbar from "@/components/Navbar";
import { getLevelColor } from "@/utils/ColorIndicator";
const Home = () => {

  const currentWaterLevel = 80;

  return (
    <div className={`w-full h-screen flex flex-col items-center justify-start bg-background text-foreground`}>
      <Navbar />
      <div className={`w-full h-[calc(100vh-5rem)] flex flex-col items-center justify-center`}>
        <Tank levels={levels} CurrentWaterLevel={currentWaterLevel}/>
        <div className={`w-60 h-20 font-bold text-white text-lg flex items-center justify-center gap-2`}>
          <div>Current Water Level:</div>
          <div style={{
            color: getLevelColor(currentWaterLevel)
          }}>
            {currentWaterLevel}%
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;