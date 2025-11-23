"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { debounce, throttle } from "@/utils/DbandTh";

const useFetch = () => {
  const [data, setData] = useState<{
    code: number;
    status: string;
    message: string;
    currentWaterLevel: number;
  } | null>(null);

  const [showLoading, setShowLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<"url" | "network" | "fetch" | "invalid" | null>(null);
  const firstLoad = useRef(true);

  const URL = process.env.NEXT_PUBLIC_API_URL || "/api/v1";

  // console.log("API URL:", URL);

  const fetchData = useCallback(async () => {
    if (!URL) {
      setError("url");
      setData({
        code: 400,
        status: "error",
        message: "Invalid URL",
        currentWaterLevel: 0,
      });
      setShowLoading(false);
      setLoading(false);
      //   console.error("Invalid URL");
      return;
    }

    if (firstLoad.current || error) {
      setShowLoading(true);
    }

    setLoading(true);
    try {
      const response = await fetch(`${URL}/water-level`, { method: "GET" });
      if (!response.ok) {
        setError("network");
        setData({
          code: 500,
          status: "error",
          message: "Network Error",
          currentWaterLevel: 0,
        });
        firstLoad.current = false;
        setShowLoading(false);
        setLoading(false);
        // console.error("Network Error");
        return;
      }

      const result = await response.json();
      setError(result.status === "invalid" ? "invalid" : null);
      setData(result);
      //   console.log(result);

    } catch (err) {
      setData({
        code: 500,
        status: "error",
        message: `Error while fetching data: ${err}`,
        currentWaterLevel: 0,
      });
      setError("fetch");
      //   console.error("Error while fetching data: ", err);

    } finally {
      firstLoad.current = false;
      setLoading(false);
      setShowLoading(false);
    }
  }, [error]);

  const debouncedFetch = useRef(debounce(fetchData, 300)).current;
  const throttledFetch = useRef(throttle(fetchData, 5000)).current;

  useEffect(() => {
    fetchData();
    const interval = setInterval(throttledFetch, 5000);
    return () => clearInterval(interval);
  }, [fetchData, throttledFetch]);

  return { data, showLoading, setShowLoading, loading, error, refetch: debouncedFetch };
};

export default useFetch;
