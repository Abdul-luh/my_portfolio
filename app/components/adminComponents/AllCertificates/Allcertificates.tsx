import certificates from "../../data/Certificates";
import { StaticImageData } from "next/image";
import Card from "../Card";

interface Cert {
	url: StaticImageData;
	name: string;
}

const AllTechnologies = () => {
	return (
		<section id="AllTechnologies" className={"w-full  p-4"}>
			{/* <p className="text-xl tracking-widest uppercase text-[#5651e5]">
				Certificates
			</p> */}
			<div className="max-w-[1240px] mx-auto h-full flex flex-col justify-center items-center">
				<div className="grid  gap-8">
					{certificates.map((cert: Cert) => {
						return <Card key={cert.name} text={cert.name} />;
					})}
				</div>
			</div>
		</section>
	);
};

export default AllTechnologies;
