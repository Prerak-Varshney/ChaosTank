"use client";
import Tank from "@/components/Tank";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import Button from "@/components/Button";
import Error from "@/components/Error";
import useFetch from "@/hooks/useFetch";
import { getLevelColor } from "@/utils/ColorIndicator";
import { LEVELS } from "@/constants/levels";
const Home = () => {

  const { data, loading, error, refetch } = useFetch();

  return (
    <div className={`w-full h-screen flex flex-col items-center justify-start bg-background text-foreground`}>
      <Navbar />
        <div className={`w-full h-[calc(100vh-5rem)] flex flex-col items-center justify-center`}>
            {
              loading ? <Loading /> : (
                error === "url" ? <Error message={"Invalid URL. Please check the configuration."} /> :
                error === "network" ? <Error message={"Network error. Please check your connection."} /> :
                error === "fetch" ? <Error message={"Error while fetching data. Please try again later."} /> :
                error === "invalid" ? <Error message={data ? data.message : "Invalid response from server."} /> :
                  <>
                    <Tank levels={LEVELS} CurrentWaterLevel={data ? data.currentWaterLevel : 0}/>
                    <div className={`w-60 h-20 font-bold text-white text-lg flex items-center justify-center gap-2`}>
                      <div>Current Water Level:</div>
                      <div style={{
                        color: getLevelColor(data ? data.currentWaterLevel : 0)
                      }}>
                        {data ? data.currentWaterLevel : 0}%
                      </div>
                    </div>
                    <Button buttonName="Refresh" onClick={refetch} />
                  </>
                )
              
            }
        </div>
    </div>
  )
}

export default Home;