import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "please provide a title"],
	},
	header: {
		type: String,
		required: [true, "please provide a header text"],
	},
	image: {
		type: String,
		required: [true, "please provide a header text"],
	},
	decription: {
		type: String,
		required: [true, "please provide a header text"],
	},
	technologies: {
		techName: [{ type: String }],
		required: [true, "please provide a header text"],
	},
	demoLink: {
		type: String,
		required: [true, "please provide a header text"],
	},
	repoLink: {
		type: String,
		required: [true, "please provide a header text"],
	},
});
