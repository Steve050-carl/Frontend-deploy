import mongoose from 'mongoose';

const favSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

export default mongoose.model('Favorite', favSchema);
