import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
} from "../controllers/productController.js";

const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProductById);

export default router;
