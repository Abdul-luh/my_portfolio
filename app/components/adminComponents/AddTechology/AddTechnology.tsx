"use client";
import React, { useEffect, useState } from "react";
import TechnologyForm from "../forms/TechnologyForm";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function AddTechnology() {
  const searchParams = useSearchParams();
  const techId = searchParams.get("id");
  const [initialTitle, setInitialTitle] = useState("");
  const [initialImage, setInitialImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (techId) {
      const fetchTech = async () => {
        setLoading(true);
        try {
          const res = await axios.get(`/api/technologies/${techId}`);
          const data = res.data.technology;
          setInitialTitle(data.title);
          setInitialImage(data.img);
        } catch (error) {
          console.error("Failed to fetch tech:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchTech();
    }
  }, [techId]);

  const handleSubmit = async (formData: FormData) => {
    try {
      if (techId) {
        await axios.put(`/api/technologies/${techId}`, formData);
      } else {
        await axios.post("/api/technologies", formData);
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="w-full flex justify-center items-center py-4">
      <div
        id="AddTechnology"
        className="w-full max-w-xl mx-auto bg-white/60 dark:bg-gray-800/60 backdrop-blur-md shadow-2xl dark:shadow-gray-950/60 shadow-gray-300 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold mb-6 text-center tracking-wide">
          {techId ? "Edit Technology" : "Add New Technology"}
        </h2>
        <TechnologyForm
          initialTitle={initialTitle}
          initialImage={initialImage}
          onSubmit={handleSubmit}
          isEdit={!!techId}
        />
      </div>
    </div>
  );
}
