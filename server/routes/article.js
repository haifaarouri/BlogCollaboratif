import express from "express";
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  updateArticle,
} from "../controllers/article.controller.js";
import { upload } from "../utils/multer.config.js";
import { verifyToken } from "../middlewares/auth.js";
import { requirePermission } from "../middlewares/permission.js";

const router = express.Router();

router.get("/", verifyToken, getAllArticles);

router.post(
  "/create",
  verifyToken,
  requirePermission("create-article"),
  upload.single("image"),
  createArticle
);

router.put(
  "/update/:id",
  verifyToken,
  requirePermission("edit-article"),
  upload.single("image"),
  updateArticle
);

router.delete(
  "/delete/:id",
  verifyToken,
  requirePermission("delete-article"),
  verifyToken,
  deleteArticle
);

export default router;
