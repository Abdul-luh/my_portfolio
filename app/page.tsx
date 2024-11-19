import Navbar from "./components/general/Navbar";
import Main from "./components/general/Main";
import About from "./components/general/About";
import Skills from "./components/general/Skills";
import Projects from "./components/general/Projects";
import Contact from "./components/general/Contact";
import Certificates from "./components/general/Certificates";

export default function Home() {
	return (
		<div className="">
			<Navbar />
			<Main />
			<About />
			<Skills />
			<Projects />
			<Certificates />
			<Contact />
		</div>
	);
}
