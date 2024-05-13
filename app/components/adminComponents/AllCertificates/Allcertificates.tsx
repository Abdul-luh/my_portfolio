import certificates from "../../data/Certificates";
import { StaticImageData } from "next/image";
import Card from "../Card";
import axios from "axios";

interface Cert {
	url: StaticImageData;
	name: string;
}

const handleDelete = async (id: string) => {
	try {
		const res = await axios.delete(`/api/technologies/${id}`);
		// const updatteTechnologies =
		const data = await res.data;
		console.log(data);
	} catch (error: any) {
		console.error(error);
	}
};

const AllCertificates = () => {
	return (
		<section id="AllCertificates" className={"w-full  p-4"}>
			{/* <p className="text-xl tracking-widest uppercase text-[#5651e5]">
				Certificates
			</p> */}
			<div className="max-w-[1240px] mx-auto h-full flex flex-col justify-center items-center">
				<div className="grid  gap-8">
					{certificates.map((cert: Cert) => {
						return (
							<Card
								key={cert.name}
								id={cert.name}
								handleDelete={handleDelete}
								text={cert.name}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default AllCertificates;
