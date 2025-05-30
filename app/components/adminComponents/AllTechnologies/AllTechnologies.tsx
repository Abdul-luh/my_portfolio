"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Card from "../Card";
import spinner from "@/public/Spinner@1x-1.0s-200px-200px.svg";
import { useTechnologyFetch } from "@/app/hooks/useTechnologyFetch";

const AllTechnologies = () => {
  const { technologies, isLoading, err, errMsg, refetch } =
    useTechnologyFetch();

  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/technologies/${id}`, { method: "DELETE" });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id: string) => {
    router.push(`/admin/home/add/technologies?id=${id}`);
  };

  return (
    <section id="AllTechnologies" className="w-full p-4">
      <div className="max-w-[1240px] mx-auto h-full flex flex-col justify-center items-center">
        <div className="grid gap-8 w-full">
          {technologies.map((tech) => (
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
                onClick={refetch}
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
