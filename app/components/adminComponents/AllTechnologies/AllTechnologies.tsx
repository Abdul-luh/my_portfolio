// AllTechnologies.tsx
"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import spinner from "@/public/Spinner@1x-1.0s-200px-200px.svg";
import Card from "../Card";
import { useRouter } from "next/navigation"; // import at top

interface MySkills {
  _id: string;
  img: StaticImageData;
  title: string;
}

const AllTechnologies = () => {
  const [technologies, setTechnologies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [err, setErr] = useState(false);
  const [editingTech, setEditingTech] = useState<MySkills | null>(null);
  const router = useRouter();

  const fetchReq = async () => {
    try {
      setIsLoading(true);
      setErrMsg("");
      setErr(false);
      const res = await axios.get("/api/technologies");
      const data = await res.data;
      setTechnologies(data.technologies);
      if (data.error) {
        setErr(true);
        setErrMsg(data.error);
      }
    } catch (error: any) {
      console.error(error);
      setErr(true);
      setErrMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReq();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/technologies/${id}`);
      fetchReq();
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleUpdate = async (id: string): Promise<void> => {
    router.push(`/admin/home/add/technologies?id=${id}`);
  };

  return (
    <section id="AllTechnologies" className="w-full p-4">
      <div className="max-w-[1240px] mx-auto h-full flex flex-col justify-center items-center">
        <div className="grid gap-8">
          {technologies.map((tech: MySkills) => (
            <Card
              key={tech._id}
              id={tech._id}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              text={tech.title}
            />
          ))}

          {isLoading && (
            <Image
              src={spinner}
              alt="loading..."
              width={250}
              height={250}
              className="w-full mx-auto"
            />
          )}

          {!technologies.length && err && (
            <div className="text-xl capitalize">
              Sorry, an error occurred, try to{" "}
              <span
                className="font-bold underline cursor-pointer"
                onClick={() => fetchReq()}
              >
                refresh🔄
              </span>
              <p className="text-red-700">{errMsg}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllTechnologies;
