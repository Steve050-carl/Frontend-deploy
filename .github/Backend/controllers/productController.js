import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  const { category, search, min, max } = req.query;

  let filter = {};

  if (category && category !== "All") filter.category = category;
  if (search) filter.name = { $regex: search, $options: "i" };
  if (min || max) {
    filter.price = {};
    if (min) filter.price.$gte = Number(min);
    if (max) filter.price.$lte = Number(max);
  }

  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

export const rateProduct = async (req, res) => {
  const { rating } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  product.rating = rating; // For basic single rating
  await product.save();
  res.json({ message: "Rating updated", rating: product.rating });
};
