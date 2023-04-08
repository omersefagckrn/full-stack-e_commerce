import express, { Router } from 'express';
import { getAllOrders, getUserOrders, newOrder, getUserOrderDetails, hardResetOrders, adminViewOrderDetail, orderToShipping, cancelOrderByID } from '../controllers/orderControllers';
import { auth } from '../middleware/auth';

const orderRouter: Router = express.Router();

orderRouter.route('/new-order').post(auth, newOrder);
orderRouter.route('/:user').get(auth, getUserOrders);
orderRouter.route('/:user/:order').get(auth, getUserOrderDetails);
//// admin routes
orderRouter.route('/').get(auth, getAllOrders); // admin
orderRouter.route('/admin/details/:order').get(auth, adminViewOrderDetail);
orderRouter.route('/admin/:id/to-shipping').put(auth, orderToShipping);
orderRouter.route('/admin/cancel/:id').delete(auth, cancelOrderByID); // admin 
orderRouter.route('/').delete(auth, hardResetOrders); //admin
export default orderRouter;
