import React from "react";
// import Image, { StaticImageData } from "next/image";
import { MdUpdate, MdDelete } from "react-icons/md";
import Link from "next/link";

export default function Card({
  text,
  id,
  header,
  handleDelete = async (id) => {
    console.log(id);
  },
  handleUpdate = async (id) => {
    console.log(id);
  },
}: {
  text: string;
  id: string;
  header?: string;
  handleDelete?: (id: string) => Promise<void>;
  handleUpdate?: (id: string) => Promise<void>;
}) {
  return (
    <div className="p-6 shadow-xl hover:scale-105 ease-in duration-300 w-full h-full rounded-xl">
      <div className="grid grid-cols-2 gap-4 justify-center items-center">
        {header ? (
          <Link
            href={`/project/${id}`}
            className="flex flex-col items-center justify-center
							"
          >
            <h3 className="uppercase">{text}</h3>
          </Link>
        ) : (
          <div
            className="flex flex-col items-center justify-center
							"
          >
            <h3 className="uppercase">{text}</h3>
          </div>
        )}

        <div className="m-auto flex jsustify-between">
          <MdUpdate
            size={30}
            className="hover:text-blue-700"
            onClick={() => handleUpdate(id)}
          />
          <MdDelete
            size={30}
            className="hover:text-red-700"
            onClick={() => handleDelete?.(id)}
          />
        </div>
      </div>
    </div>
  );
}
