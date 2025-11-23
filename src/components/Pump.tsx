"use client";
import Button from "./Button";
import { useState, useEffect, useCallback } from "react";

const Pump = () => {
    const [isAutomatic, setIsAutomatic] = useState(false);
    const [isInAutoMode, setIsInAutoMode] = useState(false);
    const [motorStatus, setMotorStatus] = useState<boolean>(false);
    const URL = process.env.NEXT_PUBLIC_API_URL;

    const fetchMotorStatus = useCallback(async () => {
        try {
            const response = await fetch(`${URL}/motor`);
            const data = await response.json();
            if (data.status === 'success') {
                setMotorStatus(data.motorStatus);
            }
        } catch (error) {
            console.error("Error fetching motor status:", error);
        }
    }, [URL]);

    const updateMotorStatus = async (status: boolean) => {
        try {
            const response = await fetch(`${URL}/motor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ motorStatus: status ? 'on' : 'off' }),
            });
            const data = await response.json();
            if (data.status === 'success') {
                setMotorStatus(data.motorStatus);
            }
        } catch (error) {
            console.error("Error updating motor status:", error);
        }
    };

    const handleAutomaticMotor = useCallback(() => {
        if (!isAutomatic || !isInAutoMode) {
            updateMotorStatus(false);
            setIsInAutoMode(false);
            return;
        }

        updateMotorStatus(!motorStatus);
    }, [isAutomatic, isInAutoMode, motorStatus]);

    const handleManualMotor = () => {
        if (isAutomatic || isInAutoMode) return;
        updateMotorStatus(!motorStatus);
    }

    useEffect(() => {
        fetchMotorStatus();
    }, [fetchMotorStatus]);

    useEffect(() => {
        if (isInAutoMode) {
            const interval = setInterval(() => {
                handleAutomaticMotor();
            }, 5000);
            return () => clearInterval(interval);
        } else {
            // If we exit auto mode, ensure motor is off (or handle as per requirement)
            // For now, let's not force it off here to avoid conflict with manual, 
            // but the handleAutomaticMotor logic above seems to handle the 'stop' case.
            // Actually, if we just toggled isInAutoMode to false, we might want to ensure motor is off?
            // The original logic had setMotorStatus(false) in the else block.
            // Let's keep it consistent but use API.
            if (!isAutomatic && !isInAutoMode && motorStatus) {
                // updateMotorStatus(false); // Optional: turn off when switching modes? 
                // Keeping original behavior:
                // setMotorStatus(false); 
            }
        }

    }, [isInAutoMode, handleAutomaticMotor, isAutomatic, motorStatus]);

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