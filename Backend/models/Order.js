import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number
    }
  ],
  totalAmount: Number,
  paymentMethod: { type: String, default: 'M-Pesa' },
  isPaid: { type: Boolean, default: false },
  paidAt: Date,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);
