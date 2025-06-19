import express from "express";
import {
  createRole,
  deleteRole,
  getAllRoles,
  updateRole,
} from "../controllers/role.controller.js";

const router = express.Router();

router.get("/", getAllRoles);

router.post("/create", createRole);

router.put("/update/:id", updateRole);

router.delete("/delete/:id", deleteRole);

export default router;
