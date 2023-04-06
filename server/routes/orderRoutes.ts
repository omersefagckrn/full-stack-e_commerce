import express, { Router } from 'express';
import { getAllOrders, getUserOrders, newOrder, getUserOrderDetails, hardResetOrders, adminViewOrderDetail } from '../controllers/orderControllers';
import { auth } from '../middleware/auth';

const orderRouter: Router = express.Router();

orderRouter.route('/new-order').post(auth, newOrder);
orderRouter.route('/:user').get(auth, getUserOrders);
orderRouter.route('/:user/:order').get(auth, getUserOrderDetails);
//// admin routes
orderRouter.route('/').get(auth, getAllOrders); // admin
orderRouter.route('/admin/orders/:order').get(auth, adminViewOrderDetail); // admin
orderRouter.route('/').delete(auth, hardResetOrders); //admin
export default orderRouter;
