import express, { Router } from 'express';
import { getAllOrders, getUserOrders, newOrder } from '../controllers/orderControllers';
import { auth } from '../middleware/auth';

const orderRouter: Router = express.Router();

orderRouter.route('/new-order').post(auth, newOrder);
orderRouter.route('/:user').get(auth, getUserOrders);
orderRouter.route('/').get(auth, getAllOrders);

export default orderRouter;
