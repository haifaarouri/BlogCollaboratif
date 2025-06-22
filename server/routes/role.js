import express from "express";
import {
  createRole,
  deleteRole,
  getAllRoles,
  updateRole,
} from "../controllers/role.controller.js";
import { verifyToken } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/role.js";

const router = express.Router();

router.get("/", verifyToken, requireRole(["Admin"]), getAllRoles);

router.post("/create", verifyToken, requireRole(["Admin"]), createRole);

router.put("/update/:id", verifyToken, requireRole(["Admin"]), updateRole);

router.delete("/delete/:id", verifyToken, requireRole(["Admin"]), deleteRole);

export default router;
