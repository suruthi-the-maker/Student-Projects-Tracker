import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  description: { type: String, default: "", trim: true, maxlength: 2000 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  teamMembers: [{ type: String, trim: true, maxlength: 80 }],
  deadline: { type: Date, default: null }
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);