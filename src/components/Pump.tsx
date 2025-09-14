"use client";
import Button from "./Button";
import { useState, useEffect, useCallback } from "react";

const Pump = () => {
    const [isAutomatic, setIsAutomatic] = useState(false);
    const [isInAutoMode, setIsInAutoMode] = useState(false);
    const [motorStatus, setMotorStatus] = useState<boolean>(false);

    const handleAutomaticMotor = useCallback(() => {
        if(!isAutomatic || !isInAutoMode){
            setMotorStatus(false);
            setIsInAutoMode(false);
            return;
        }

        setMotorStatus(prev => !prev);
    }, [isAutomatic, isInAutoMode]);

    const handleManualMotor = () => {
        if(isAutomatic || isInAutoMode) return;
        setMotorStatus(prev => !prev);
    }

    useEffect(() => {
        if(isInAutoMode){
            const interval = setInterval(() => {
                handleAutomaticMotor();
            }, 5000);
            return () => clearInterval(interval);
        }else {
            setMotorStatus(false);
        }

    }, [isInAutoMode, handleAutomaticMotor]);

    return (
        <div className={`h-110 w-80 border border-foreground rounded-3xl flex flex-col justify-between items-center`}>
            <div className={`w-full h-12 border-b rounded-t-3xl border-foreground flex items-center justify-center`}>
                <button 
                    className={`
                        w-1/2 h-full flex items-center justify-center font-bold text-lg text-foreground transition-colors duration-300 border-r border-r-foreground rounded-tl-3xl
                        ${isAutomatic ? "bg-foreground text-white" : ""}
                        ${isInAutoMode || motorStatus ? "cursor-not-allowed" : "hover:text-white hover:bg-foreground"}                    
                    `} 
                    onClick={() => setIsAutomatic(true)}
                    disabled={motorStatus || isInAutoMode}
                >
                    Automatic
                </button>
                <button 
                    className={`
                        w-1/2 h-full flex items-center justify-center font-bold text-lg text-foreground transition-colors duration-300 rounded-tr-3xl 
                        ${!isAutomatic ? "bg-foreground text-white" : ""}
                        ${isInAutoMode || motorStatus ? "cursor-not-allowed" : "hover:text-white hover:bg-foreground"}
                    `} 
                    onClick={() => setIsAutomatic(false)}
                    disabled={motorStatus || isInAutoMode}
                >
                    Manual
                </button>
            </div>

            <div className={`w-full h-full flex flex-col items-center justify-center rounded-b-3xl gap-4`}>
                <div className={`w-full h-10 flex items-center justify-center font-bold text-lg text-foreground`}>
                    Motor Status: {motorStatus === true ? 
                        <span className={`text-green-500 ml-2`}>On</span> : 
                        <span className={`text-red-500 ml-2`}>Off</span>
                    }
                </div>
               { 
                isAutomatic ?
                <Button 
                    buttonName={isInAutoMode ? "Stop" : "Start"} 
                    onClick={() => setIsInAutoMode(prev => !prev)} 
                /> :
                <Button 
                    buttonName={motorStatus ? "Motor Off" : "Motor On"} 
                    onClick={() => handleManualMotor()} 
                />
            }
            </div>
        </div>
    )
}

export default Pump;