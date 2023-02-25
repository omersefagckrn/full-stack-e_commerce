import express, { Router } from 'express';
import { addToCart, getCartItems, removeFromCart } from '../controllers/cartControllers';
import { auth } from '../middleware/auth';

const router: Router = express.Router();

router.route('/').get(auth, getCartItems).post(auth, addToCart).delete(auth, removeFromCart);

export default router;
