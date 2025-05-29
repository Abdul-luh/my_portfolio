import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
  page: String,
  device: String,
  userAgent: String,
  timestamp: Date,
  referrer: String,
  ip: String,
});

const Visit = mongoose.models.Visit || mongoose.model("Visit", visitSchema);
export default Visit;
