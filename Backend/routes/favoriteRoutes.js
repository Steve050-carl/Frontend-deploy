import express from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoriteController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.get('/', protect, getFavorites);
router.post('/add', protect, addFavorite);
router.post('/remove', protect, removeFavorite);

export default router;
