import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "skill Title required"],
		unique: true,
	},
	image: {
		type: String,
		required: [true, "Is there a skill without logo?"],
	},
});

const Skill = mongoose.models.skills || mongoose.model("skills", skillsSchema);
export default Skill;
