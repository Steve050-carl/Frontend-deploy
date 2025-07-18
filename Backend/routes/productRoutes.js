import express from "express";
import { getAllProducts, getProductById, rateProduct } from "../controllers/productController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id/rate", protect, rateProduct);

export default router;
