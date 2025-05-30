// app/hooks/useTechnologyFetch.ts
import { useEffect, useState } from "react";
import axios from "axios";

interface MySkills {
  _id: string;
  img: string;
  title: string;
}

export const useTechnologyFetch = () => {
  const [technologies, setTechnologies] = useState<MySkills[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [err, setErr] = useState<boolean>(false);

  const fetchTechnologies = async () => {
    try {
      setIsLoading(true);
      setErr(false);
      setErrMsg("");
      const res = await axios.get("/api/technologies");
      const data = await res.data;
      if (!data.error) {
        setTechnologies(data.technologies);
      } else {
        setErr(true);
        setErrMsg(data.error);
      }
    } catch (error: any) {
      setErr(true);
      setErrMsg("Failed to fetch technologies. Please try again later.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  return {
    technologies,
    isLoading,
    err,
    errMsg,
    refetch: fetchTechnologies,
  };
};
