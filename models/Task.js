import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  title: { type: String, required: true, trim: true, maxlength: 160 },
  assignedTo: { type: String, default: "", trim: true, maxlength: 80 },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  deadline: { type: Date, default: null },
  comments: [{ author: { type: String, default: "Team" }, text: { type: String, required: true, maxlength: 1000 }, createdAt: { type: Date, default: Date.now } }]
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);