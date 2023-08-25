import mongoose from "mongoose";

const certSchema = new mongoose.Schema({
	imagePath: {
		type: String,
		required: [true, "do the needful and provide the damn image"],
	},
});

const Certificate =
	mongoose.models.users || mongoose.model("certficates", certSchema);
export default certSchema;
