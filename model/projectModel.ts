import mongoose from "mongoose";

const technologySchema = new mongoose.Schema({
	techName: { type: String, required: true },
});

const ProjectSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	header: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	technologies: [technologySchema],
	demoLink: {
		type: String,
		required: true,
	},
	repoLink: {
		type: String,
		required: true,
	},
	featured: {
		type: Boolean,
		default: true,
	},
	githubId: {
		type: String,
	},
	repoName: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});
const Projects =
	mongoose.models.projects || mongoose.model("projects", ProjectSchema);
export default Projects;
