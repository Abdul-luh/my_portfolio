import certificates from "../../data/Certificates";
import { StaticImageData } from "next/image";
import Card from "../Card";

interface Cert {
  name: string;
  url: StaticImageData;
  id?: string; // Make id optional if not all certificates have it
}

const AllCertificates = () => {
  const handleDelete = async (id: string) => {
    console.log("Deleting:", id);
  };

  const handleUpdate = async (id: string) => {
    console.log("Updating:", id);
  };

  return (
    <section id="AllCertificates" className={"w-full  p-4"}>
      {/* <p className="text-xl tracking-widest uppercase text-[#5651e5]">
				Certificates
			</p> */}
      <div className="max-w-[1240px] mx-auto h-full flex flex-col justify-center items-center">
        <div className="grid  gap-8">
          {certificates.map((cert, idx) => {
            return (
              <Card
                key={cert.name}
                text={cert.name}
                // image={cert.url}
                id={cert.id ?? idx.toString()} // Use cert.id if available, otherwise fallback to index
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AllCertificates;
