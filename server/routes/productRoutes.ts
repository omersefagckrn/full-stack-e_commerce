import express, { Router } from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productsControllers';
import { admin, auth } from '../middleware/auth';

const router: Router = express.Router();

router.route('/').get(getAllProducts).post(auth, admin, createProduct);
router.route('/:id').delete(auth, admin, deleteProduct).put(auth, admin, updateProduct).get(getProductById);

export default router;
