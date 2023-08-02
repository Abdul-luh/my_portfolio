import projImg01 from "../../../public/images/img01.jpg";
import segam from "../../../public/images/segam.png";
import acme from "../../../public/images/acme.png";
import newsHompage from "../../../public/images/news-homepage.png";
import calculator from "../../../public/images/calculator.png";
import todoList from "../../../public/images/todo-list.png";
import alarmClock from "../../../public/images/alarm-clock.png";
import portfolio01 from "../../../public/images/portfolio-sample.png";
import acmeSolutions from "../../../public/images/acme-solutions.png";

let lastAssignedId = 0;

function getNextId() {
	lastAssignedId += 1;
	return lastAssignedId;
}

const allProps = [
	{
		id: 0,
		projName: "ACME",
		projHead: "react | tailwind ",
		projImg: acme,
		projDescr:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro dolor a optio inventore. Facere eos ipsum voluptates fuga repudiandae eligendi labore! Cum, reiciendis, quidem excepturi totam magnam aut soluta fuga ullam iusto doloremque commodi, qui perferendis inventore quis beatae sapiente iste ut ad vel consequuntur veniam modi. Facere, porro iusto!",
		projTech: [
			{ id: 1, techName: "REACT" },
			{ id: 2, techName: "TAILWIND" },
		],
		demoLink: "https://incandescent-naiad-f30e25.netlify.app/",
		repoLink: "https://github.com/Abdul-luh/Tailwind-project/",
	},
	{
		id: 0,
		projName: "Segam Mobile Service",
		projHead: "HTML | CSS | TAILWIND |JS ",
		projImg: segam,
		projDescr:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium voluptate deleniti totam ea id, vitae dolorem voluptatibus perferendis excepturi? Quidem tempora ducimus ipsam aliquam doloribus optio nam neque quaerat, soluta voluptas reprehenderit et hic deleniti eveniet quibusdam labore dicta fugit possimus. Laboriosam, id consectetur saepe expedita aut non impedit dolore?",
		projTech: [
			{ id: 1, techName: "html" },
			{ id: 2, techName: "css" },
			{ id: 3, techName: "TAILWIND" },
			{ id: 4, techName: "TYPESCRIPT" },
		],
		demoLink: "https://www.segamservices.com/",
		repoLink: "https://github.com/Abdul-luh/segam-mobile-service",
	},
	{
		id: 0,
		projName: "News Hompage main",
		projHead: "html | css ",
		projImg: newsHompage,
		projDescr:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro dolor a optio inventore. Facere eos ipsum voluptates fuga repudiandae eligendi labore! Cum, reiciendis, quidem excepturi totam magnam aut soluta fuga ullam iusto doloremque commodi, qui perferendis inventore quis beatae sapiente iste ut ad vel consequuntur veniam modi. Facere, porro iusto!",
		projTech: [
			{ id: 1, techName: "REACT" },
			{ id: 2, techName: "TAILWIND" },
		],
		demoLink: "https://abdul-luh.github.io/news-homepage-main/",
		repoLink: "https://github.com/Abdul-luh/news-homepage-main",
	},
	{
		id: 0,
		projName: "PortFolio Sample",
		projHead: "html | css ",
		projImg: portfolio01,
		projDescr:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro dolor a optio inventore. Facere eos ipsum voluptates fuga repudiandae eligendi labore! Cum, reiciendis, quidem excepturi totam magnam aut soluta fuga ullam iusto doloremque commodi, qui perferendis inventore quis beatae sapiente iste ut ad vel consequuntur veniam modi. Facere, porro iusto!",
		projTech: [
			{ id: 1, techName: "html" },
			{ id: 2, techName: "css" },
			{ id: 3, techName: "javascipt" },
		],
		demoLink: "https://abdul-luh.github.io/portfolio_001/",
		repoLink: "https://github.com/Abdul-luh/portfolio_001",
	},
	{
		id: 0,
		projName: "acme solutions",
		projHead: "html | css | responsiveness",
		projImg: acmeSolutions,
		projDescr:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro dolor a optio inventore. Facere eos ipsum voluptates fuga repudiandae eligendi labore! Cum, reiciendis, quidem excepturi totam magnam aut soluta fuga ullam iusto doloremque commodi, qui perferendis inventore quis beatae sapiente iste ut ad vel consequuntur veniam modi. Facere, porro iusto!",
		projTech: [
			{ id: 1, techName: "Node" },
			{ id: 2, techName: "TAILWIND" },
			{ id: 3, techName: "TYPESCRIPT" },
		],
		demoLink: "https://abdul-luh.github.io/Simple_resposive_website/",
		repoLink: "https://github.com/Abdul-luh/Simple_resposive_website",
	},
	{
		id: 0,
		projName: "calculator",
		projHead: "html | css | js",
		projImg: calculator,
		projDescr:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro dolor a optio inventore. Facere eos ipsum voluptates fuga repudiandae eligendi labore! Cum, reiciendis, quidem excepturi totam magnam aut soluta fuga ullam iusto doloremque commodi, qui perferendis inventore quis beatae sapiente iste ut ad vel consequuntur veniam modi. Facere, porro iusto!",
		projTech: [
			{ id: 1, techName: "Node" },
			{ id: 2, techName: "TAILWIND" },
			{ id: 3, techName: "TYPESCRIPT" },
		],
		demoLink: "https://abdul-luh.github.io/Calculator-app/",
		repoLink: "https://github.com/Abdul-luh/Calculator-app",
	},
	{
		id: 0,
		projName: "Alarm Clock",
		projHead: "html | css | js",
		projImg: alarmClock,
		projDescr:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro dolor a optio inventore. Facere eos ipsum voluptates fuga repudiandae eligendi labore! Cum, reiciendis, quidem excepturi totam magnam aut soluta fuga ullam iusto doloremque commodi, qui perferendis inventore quis beatae sapiente iste ut ad vel consequuntur veniam modi. Facere, porro iusto!",
		projTech: [
			{ id: 1, techName: "html" },
			{ id: 2, techName: "TAILWIND" },
			{ id: 3, techName: "TYPESCRIPT" },
		],
		demoLink: "https://abdul-luh.github.io/AlarmClock/",
		repoLink: "https://github.com/Abdul-luh/AlarmClock",
	},
	{
		id: 0,
		projName: " todo List",
		projHead: "html | css | js",
		projImg: todoList,
		projDescr:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro dolor a optio inventore. Facere eos ipsum voluptates fuga repudiandae eligendi labore! Cum, reiciendis, quidem excepturi totam magnam aut soluta fuga ullam iusto doloremque commodi, qui perferendis inventore quis beatae sapiente iste ut ad vel consequuntur veniam modi. Facere, porro iusto!",
		projTech: [
			{ id: 1, techName: "html" },
			{ id: 2, techName: "TAILWIND" },
			{ id: 3, techName: "TYPESCRIPT" },
		],
		demoLink: "https://abdul-luh.github.io/todo-list-app_project/",
		repoLink: "https://github.com/Abdul-luh/todo-list-app_project",
	},
];

allProps.forEach((item) => {
	item.id = getNextId();
});

export default allProps;
