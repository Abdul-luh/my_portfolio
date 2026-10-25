"use client";

import { useEffect, useState } from "react";
import Card from "../Card";
import axios from "axios";
import { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

interface Cert {
  _id: string;
  title: string;
  image: string | StaticImageData;
}

const AllCertificates = () => {
  const [certificates, setCertificates] = useState<Cert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchCertificates = async () => {
    try {
      const res = await axios.get("/api/certificates");
      setCertificates(res.data.certificates || []);
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
    try {
      await axios.delete(`/api/certificates/${id}`);
      fetchCertificates();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleUpdate = async (id: string) => {
    router.push(`/admin/home/add/certificates?id=${id}`);
  };

  return (
    <section id="AllCertificates" className="w-full py-4">
      <div className="max-w-[1240px] mx-auto w-full">
        {isLoading && <p className="text-center py-6">Loading certificates...</p>}
        {error && <p className="text-red-500 text-center py-6">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
          {certificates.map((cert) => (
            <Card
              key={cert._id}
              id={cert._id}
              text={cert.title}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))}
        </div>
        {!isLoading && !certificates.length && !error && (
          <p className="text-center py-10 opacity-70">No certificates found.</p>
        )}
      </div>
    </section>
  );
};

export default AllCertificates;
