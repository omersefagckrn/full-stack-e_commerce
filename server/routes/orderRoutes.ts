import express, { Router } from 'express';
import { getAllOrders, getUserOrders, newOrder, getUserOrderDetails, hardResetOrders, adminViewOrderDetail, orderToShipping, cancelOrderByID, refundOrder } from '../controllers/orderControllers';
import { auth } from '../middleware/auth';

const orderRouter: Router = express.Router();

orderRouter.route('/new-order').post(auth, newOrder);
orderRouter.route('/:user').get(auth, getUserOrders);
orderRouter.route('/:user/:order').get(auth, getUserOrderDetails);
orderRouter.route('/refund').delete(auth, refundOrder);
//// admin routes
orderRouter.route('/').get(auth, getAllOrders).delete(auth, hardResetOrders); // admin
orderRouter.route('/admin/details/:order').get(auth, adminViewOrderDetail);
orderRouter.route('/admin/:order/to-shipping').put(auth, orderToShipping);
orderRouter.route('/admin/cancel/:order').delete(auth, cancelOrderByID);
 // admin 
 //admin
export default orderRouter;
