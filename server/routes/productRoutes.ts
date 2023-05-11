import express, { Router } from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productsControllers';
import { auth } from '../middleware/auth';

const router: Router = express.Router();

router.route('/').get(getAllProducts);
router.route('/:id').get(getProductById);
// admin side
router.route('/admin/products').get(auth, getAllProducts).post(auth, createProduct);
router.route('/admin/products/:id').delete(auth, deleteProduct).put(auth, updateProduct);

export default router;
