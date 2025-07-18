// routes/adminRoutes.js
import express from 'express';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';
import { createProduct, updateProduct, deleteProduct } from '../controllers/adminProductController.js';
import Order from "../models/Order.js";

const router = express.Router(); // ✅ router must be declared before use

// Admin analytics route
router.get("/analytics", protect, adminOnly, async (req, res) => {
  try {
    const totalRevenueAgg = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const topProductsAgg = await Order.aggregate([
      { $unwind: "$items" },
      { $group: { _id: "$items.product", count: { $sum: "$items.quantity" } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      { $project: { name: "$product.name", sold: "$count" } },
    ]);

    res.json({
      totalRevenue: totalRevenueAgg[0]?.total || 0,
      topProducts: topProductsAgg,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate analytics" });
  }
});

// Admin product management routes
router.post('/product', protect, adminOnly, createProduct);
router.put('/product/:id', protect, adminOnly, updateProduct);
router.delete('/product/:id', protect, adminOnly, deleteProduct);

export default router;
