"use client";
import CertificateForm from "../forms/CertificateForm";

export default function AddCertificate() {
  return (
    <div
      id="AddCertificate"
      className="md:col-span-3 w-full h-auto shadow-xl dark:shadow-gray-700 shadow-gray-400 rounded-xl lg:p-4"
    >
      <CertificateForm />
    </div>
  );
}
