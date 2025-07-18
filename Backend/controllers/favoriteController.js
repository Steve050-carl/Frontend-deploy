import Favorite from '../models/Favorite.js';

export const getFavorites = async (req, res) => {
  let fav = await Favorite.findOne({ user: req.user.id }).populate('items');
  if (!fav) {
    fav = await Favorite.create({ user: req.user.id, items: [] });
  }
  res.json(fav);
};

export const addFavorite = async (req, res) => {
  const { productId } = req.body;
  let fav = await Favorite.findOne({ user: req.user.id });
  if (!fav) fav = await Favorite.create({ user: req.user.id, items: [] });

  if (!fav.items.includes(productId)) {
    fav.items.push(productId);
    await fav.save();
  }
  res.json(fav);
};

export const removeFavorite = async (req, res) => {
  const { productId } = req.body;
  const fav = await Favorite.findOne({ user: req.user.id });
  if (fav) {
    fav.items = fav.items.filter(id => id.toString() !== productId);
    await fav.save();
  }
  res.json(fav);
};
