// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  stock: Number,
  category: String,
}, { timestamps: true });

export default mongoose.model("Product", productSchema); // ✅ default export
