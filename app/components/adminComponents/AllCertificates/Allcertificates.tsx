"use client";

import { useEffect, useState } from "react";
import Card from "../Card";
import axios from "axios";
import { StaticImageData } from "next/image";

interface Cert {
  _id: string;
  title: string;
  image: string | StaticImageData; // ensure image can be a string or StaticImageData
}

const AllCertificates = () => {
  const [certificates, setCertificates] = useState<Cert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCertificates = async () => {
    try {
      const res = await axios.get("/api/certificates");
      setCertificates(res.data.certificates);
    } catch (err: any) {
      setError("Failed to load certificates");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleDelete = async (id: string) => {
    console.log("Deleting:", id);
    // implement actual delete later
  };

  const handleUpdate = async (id: string) => {
    console.log("Updating:", id);
    // implement actual update later
  };

  return (
    <section id="AllCertificates" className="w-full p-4">
      <div className="max-w-[1240px] mx-auto h-full flex flex-col justify-center items-center">
        {isLoading && <p>Loading certificates...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid gap-8">
          {certificates.map((cert) => (
            <Card
              key={cert._id}
              id={cert._id}
              text={cert.title}
              // image={cert.image}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllCertificates;
