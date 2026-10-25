"use client";
import React, { useEffect, useState } from "react";
import CertificateForm from "../forms/CertificateForm";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function AddCertificate() {
  const searchParams = useSearchParams();
  const certId = searchParams?.get("id");
  const [initialTitle, setInitialTitle] = useState("");
  const [initialImage, setInitialImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (certId) {
      const fetchCert = async () => {
        setLoading(true);
        try {
          const res = await axios.get(`/api/certificates/${certId}`);
          const data = res.data.certificate;
          if (data) {
            setInitialTitle(data.title);
            setInitialImage(data.image);
          }
        } catch (error) {
          console.error("Failed to fetch cert:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCert();
    }
  }, [certId]);

  const handleSubmit = async (formData: FormData) => {
    try {
      if (certId) {
        await axios.put(`/api/certificates/${certId}`, formData);
      } else {
        await axios.post("/api/certificates", formData);
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="w-full flex justify-center items-center py-4">
      <div
        id="AddCertificate"
        className="w-full max-w-xl mx-auto bg-white/60 dark:bg-gray-800/60 backdrop-blur-md shadow-2xl dark:shadow-gray-950/60 shadow-gray-300 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold mb-6 text-center tracking-wide">
          {certId ? "Edit Certificate" : "Upload Certificate"}
        </h2>
        <CertificateForm
          initialTitle={initialTitle}
          initialImage={initialImage}
          onSubmit={handleSubmit}
          isEdit={!!certId}
        />
      </div>
    </div>
  );
}
