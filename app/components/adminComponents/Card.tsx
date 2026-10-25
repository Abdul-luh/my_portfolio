import React from "react";
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
    <div className="p-5 shadow-lg dark:shadow-gray-950/40 shadow-gray-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 w-full rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1 min-w-0">
          {header ? (
            <Link href={`/project/${id}`}>
              <h3 className="uppercase text-sm sm:text-base font-semibold truncate hover:text-[#5651e5] transition-colors">
                {text}
              </h3>
            </Link>
          ) : (
            <h3 className="uppercase text-sm sm:text-base font-semibold truncate">
              {text}
            </h3>
          )}
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            type="button"
            title="Update"
            onClick={() => handleUpdate(id)}
            className="p-2 rounded-lg text-blue-500 hover:bg-blue-500/10 transition-colors !shadow-none !bg-transparent border-0 cursor-pointer"
          >
            <MdUpdate size={24} />
          </button>
          <button
            type="button"
            title="Delete"
            onClick={() => handleDelete?.(id)}
            className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors !shadow-none !bg-transparent border-0 cursor-pointer"
          >
            <MdDelete size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
