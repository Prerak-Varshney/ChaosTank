"use client";
import Navbar from "@/components/Navbar";
import Tank from "@/components/Tank";
import Pump from "@/components/Pump";
import Loading from "@/components/Loading";
import Button from "@/components/Button";
import Error from "@/components/Error";
import useFetch from "@/hooks/useFetch";
import { getLevelColor } from "@/utils/ColorIndicator";
import { LEVELS } from "@/constants/levels";
const Home = () => {

  const { data, showLoading, setShowLoading, loading, error, refetch } = useFetch();

  return (
    <div className={`w-full h-screen flex flex-col items-center justify-start bg-background text-foreground`}>
      <Navbar />
        <div className={`w-full h-[calc(100vh-5rem)] flex items-center justify-center`}>
            {
              showLoading ? <Loading /> : (
                error === "url" ? <Error message={"Invalid URL. Please check the configuration."} onClick={() => { setShowLoading(true); refetch(); }} /> :
                error === "network" ? <Error message={"Network error. Please check your connection."} onClick={() => { setShowLoading(true); refetch(); }} /> :
                error === "fetch" ? <Error message={"Error while fetching data. Please try again later."} onClick={() => { setShowLoading(true); refetch(); }} /> :
                error === "invalid" ? <Error message={data ? data.message : "Invalid response from server."} onClick={() => { setShowLoading(true); refetch(); }} /> :
                  <div className={`w-full h-full flex items-center justify-center`}>
                    <div className={`w-120 h-full flex flex-col items-center justify-center`}>
                      <Tank levels={LEVELS} CurrentWaterLevel={data ? data.currentWaterLevel : 0}/>
                      <div className={`w-60 h-20 font-bold text-white text-lg flex items-center justify-center gap-2`}>
                        <div>Current Water Level:</div>
                        <div style={{
                          color: getLevelColor(data ? data.currentWaterLevel : 0)
                        }}>
                          {data ? data.currentWaterLevel : 0}%
                        </div>
                      </div>
                      <Button 
                        loading={loading} 
                        buttonName="Refresh" 
                        onClick={() => { 
                          setShowLoading(true); 
                          refetch(); 
                        }} 
                      />
                    </div>
                    {/* <div className={`w-120 h-full flex items-center justify-center pb-30`}>
                      <Pump />
                    </div> */}
                  </div>
                )
              
            }
        </div>
    </div>
  )
}

export default Home;