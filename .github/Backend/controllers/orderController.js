import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import sendEmail from '../utils/sendEmail.js';
import PDFDocument from "pdfkit";

export const downloadInvoice = async (req, res) => {
  const order = await Order.findById(req.params.id).populate("items.product");
  if (!order) return res.status(404).json({ message: "Order not found" });

  const doc = new PDFDocument();
  res.setHeader("Content-Disposition", `attachment; filename=invoice_${order._id}.pdf`);
  res.setHeader("Content-Type", "application/pdf");
  doc.pipe(res);

  doc.fontSize(20).text("CampusMart Invoice", { align: "center" });
  doc.moveDown();
  doc.text(`Order ID: ${order._id}`);
  doc.text(`Customer: ${order.user.name}`);
  doc.text(`Date: ${order.createdAt.toLocaleDateString()}`);
  doc.text(`Total Amount: Ksh ${order.totalAmount}`);
  doc.moveDown().text("Items:");

  order.items.forEach(item => {
    doc.text(`- ${item.product.name} x${item.quantity}`);
  });

  doc.end();
};

export const placeOrder = async (req, res) => {
  try {
    const { totalAmount } = req.body;

    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const order = await Order.create({
      user: req.user.id,
      items: cart.items,
      totalAmount,
      isPaid: true,
      paidAt: new Date()
    });

    cart.items = [];
    await cart.save();

    // ✅ Email now correctly sent inside the route function
    await sendEmail({
      to: req.user.email,
      subject: 'Order Confirmation – CampusMart',
      text: `Your order has been placed successfully!\nOrder ID: ${order._id}\nTotal: Ksh ${order.totalAmount}`
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order placement failed" });
  }
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('items.product');
  res.json(orders);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('user').sort({ createdAt: -1 });
  res.json(orders);
};
