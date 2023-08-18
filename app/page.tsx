import Navbar from "./components/Navbar";
import Main from "./components/Main";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Certificates from "./components/Certificates";

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
