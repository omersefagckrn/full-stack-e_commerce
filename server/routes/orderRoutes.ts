import express, { Router } from 'express';
import { getAllOrders, getUserOrders, newOrder, getUserOrderDetails, hardResetOrders } from '../controllers/orderControllers';
import { auth } from '../middleware/auth';

const orderRouter: Router = express.Router();

orderRouter.route('/new-order').post(auth, newOrder);
orderRouter.route('/:user').get(auth, getUserOrders);
orderRouter.route('/:user/:order').get(auth, getUserOrderDetails);
orderRouter.route('/').get(auth, getAllOrders);
orderRouter.route('/').delete(auth, hardResetOrders);
export default orderRouter;
