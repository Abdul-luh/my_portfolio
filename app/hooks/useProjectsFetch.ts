import { useState, useEffect } from "react";
import axios from "axios";

interface Technology {
  techName: string;
  _id: string;
}

export interface Project {
  _id: string;
  title: string;
  header: string;
  description: string;
  image: string;
  repoLink: string;
  demoLink: string;
  technologies: Technology[];
}

export function useProjectsFetch() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/projects");
      setProjects(response.data.projects);
    } catch (err: any) {
      setError("Failed to fetch projects.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, error, refetch: fetchProjects };
}
