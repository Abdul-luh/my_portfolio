import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { Project, Technology } from "@/utils/interfaces/projects";

export type { Project, Technology };

type CacheEntry = {
  data: Project[];
  timestamp: number;
};

// In-memory module cache persisted across client route transitions
const projectsCache: {
  all?: CacheEntry;
  featured?: CacheEntry;
} = {};

const CACHE_TTL_MS = 120 * 1000; // 2 minutes

export function invalidateProjectsCache() {
  delete projectsCache.all;
  delete projectsCache.featured;
}

export function useProjectsFetch(featuredOnly?: boolean) {
  const cacheKey = featuredOnly ? "featured" : "all";
  const cached = projectsCache[cacheKey];

  // If cached data is present, initialize with cached data and loading: false (zero UI flicker)
  const [projects, setProjects] = useState<Project[]>(cached ? cached.data : []);
  const [loading, setLoading] = useState<boolean>(!cached);
  const [error, setError] = useState<string>("");
  const isMountedRef = useRef(true);

  const fetchProjects = useCallback(
    async (force = false) => {
      const currentCache = projectsCache[cacheKey];
      const isFresh = currentCache && Date.now() - currentCache.timestamp < CACHE_TTL_MS;

      // If fresh and not forced, reuse existing cache without re-fetching
      if (isFresh && !force && currentCache) {
        if (isMountedRef.current) {
          setProjects(currentCache.data);
          setLoading(false);
        }
        return;
      }

      // Only show spinner if we don't have ANY data yet
      if (!currentCache) {
        setLoading(true);
      }

      try {
        const url = featuredOnly ? "/api/projects?featured=true" : "/api/projects";
        const response = await axios.get(url, {
          headers: {
            "Cache-Control": "no-cache",
          },
        });

        const data: Project[] = response.data.projects || [];
        // Save to in-memory cache
        projectsCache[cacheKey] = {
          data,
          timestamp: Date.now(),
        };

        if (isMountedRef.current) {
          setProjects(data);
          setError("");
        }
      } catch (err: any) {
        if (isMountedRef.current) {
          setError("Failed to fetch projects.");
        }
        console.error("Error fetching projects:", err);
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    },
    [cacheKey, featuredOnly]
  );

  useEffect(() => {
    isMountedRef.current = true;
    fetchProjects();
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    refetch: () => fetchProjects(true),
  };
}
