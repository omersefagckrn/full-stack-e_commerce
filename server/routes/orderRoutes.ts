import express, { Router } from 'express';
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToDelivered, updateOrderToPaid } from '../controllers/orderControllers';
import { admin, auth } from '../middleware/auth';

const router: Router = express.Router();

router.route('/').post(auth, addOrderItems).get(auth, admin, getOrders);
router.route('/myorders').get(auth, getMyOrders);
router.route('/:id').get(auth, getOrderById);
router.route('/:id/pay').put(auth, updateOrderToPaid);
router.route('/:id/deliver').put(auth, admin, updateOrderToDelivered);

export default router;
