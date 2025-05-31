import mongoose from "mongoose";

const certSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "do the needful and provide the damn image"],
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Certificate =
  mongoose.models.Certificate || mongoose.model("Certificate", certSchema);

export default Certificate;
