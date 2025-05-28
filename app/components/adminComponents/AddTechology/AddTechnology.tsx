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
          setInitialImage(data.img); // ensure your API returns the image URL or base64
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

  if (loading) return <p className="text-center">Loading...</p>;
  return (
    <div
      id="AddTechnology"
      className="md:col-span-3 w-full h-auto shadow-xl dark:shadow-gray-700 shadow-gray-400 rounded-xl lg:p-4"
    >
      <TechnologyForm
        initialTitle={initialTitle}
        initialImage={initialImage}
        onSubmit={handleSubmit}
        isEdit={!!techId}
      />{" "}
    </div>
  );
}
