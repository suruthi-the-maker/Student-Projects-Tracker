import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { listProjects, createProject, getProject, updateProject, deleteProject } from "../controllers/projectController.js";
const router = Router();
router.use(protect);
router.route("/").get(listProjects).post(createProject);
router.route("/:id").get(getProject).put(updateProject).delete(deleteProject);
export default router;