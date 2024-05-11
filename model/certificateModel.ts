import mongoose from "mongoose";

const certSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "do the needful and provide the damn image"],
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

const Certificate =
	mongoose.models.certificates || mongoose.model("certficates", certSchema);
export default Certificate;
