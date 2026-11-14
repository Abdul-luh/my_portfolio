// app/hooks/useTechnologyFetch.ts
import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";

export interface MySkills {
  _id: string;
  image?: string;
  img?: string;
  title: string;
  projectCount?: number;
}

type TechCacheEntry = {
  data: MySkills[];
  timestamp: number;
};

// In-memory module cache persisted across client route transitions
let techCache: TechCacheEntry | null = null;
const CACHE_TTL_MS = 120 * 1000; // 2 minutes

export function invalidateTechCache() {
  techCache = null;
}

export const useTechnologyFetch = () => {
  // If cache exists, initialize immediately with data and isLoading: false (instant render)
  const [technologies, setTechnologies] = useState<MySkills[]>(techCache ? techCache.data : []);
  const [isLoading, setIsLoading] = useState<boolean>(!techCache);
  const [errMsg, setErrMsg] = useState<string>("");
  const [err, setErr] = useState<boolean>(false);
  const isMountedRef = useRef(true);

  const fetchTechnologies = useCallback(async (force = false) => {
    const currentTechCache = techCache;
    const isFresh = currentTechCache && Date.now() - currentTechCache.timestamp < CACHE_TTL_MS;

    if (isFresh && !force && currentTechCache) {
      if (isMountedRef.current) {
        setTechnologies(currentTechCache.data);
        setIsLoading(false);
      }
      return;
    }

    if (!techCache) {
      setIsLoading(true);
    }

    try {
      setErr(false);
      setErrMsg("");
      const res = await axios.get("/api/technologies");
      const data = res.data;

      if (!data.error && Array.isArray(data.technologies)) {
        techCache = {
          data: data.technologies,
          timestamp: Date.now(),
        };

        if (isMountedRef.current) {
          setTechnologies(data.technologies);
        }
      } else {
        if (isMountedRef.current) {
          setErr(true);
          setErrMsg(data.error || "Unknown error fetching technologies");
        }
      }
    } catch (error: any) {
      if (isMountedRef.current) {
        setErr(true);
        setErrMsg("Failed to fetch technologies. Please try again later.");
      }
      console.error(error);
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    fetchTechnologies();
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchTechnologies]);

  return {
    technologies,
    isLoading,
    err,
    errMsg,
    refetch: () => fetchTechnologies(true),
  };
};
