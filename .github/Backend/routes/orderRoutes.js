import express from 'express';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';
import { placeOrder, getUserOrders, getAllOrders } from '../controllers/orderController.js';
import { downloadInvoice } from "../controllers/orderController.js";

const router = express.Router();
router.get("/:id/invoice", protect, downloadInvoice);
router.post('/', protect, placeOrder);               // Place order
router.get('/my', protect, getUserOrders);           // User order history
router.get('/all', protect, adminOnly, getAllOrders); // Admin view

export default router;
