import mongoose from "mongoose";

const technologySchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "skill Title required"],
		unique: true,
	},
	image: {
		name: String,
		path: String,
		size: String,
		type: String,
		required: true,
	},
});

const Technology =
	mongoose.models.technologies ||
	mongoose.model("technologies", technologySchema);
export default Technology;
