import express, { Router } from 'express';
import { adminViewOrderDetail, cancelOrderByID, getAllOrders, getUserOrderDetails, getUserOrders, hardResetOrders, newOrder, orderToShipping, refundOrder } from '../controllers/orderControllers';
import { auth } from '../middleware/auth';

const orderRouter: Router = express.Router();

orderRouter.route('/new-order').post(auth, newOrder);
orderRouter.route('/user/:user').get(auth, getUserOrders);
orderRouter.route('/user/:user/:order').get(auth, getUserOrderDetails);
orderRouter.route('/user/refund').delete(auth, refundOrder);
//// admin routes
orderRouter.route('/').get(auth, getAllOrders).delete(auth, hardResetOrders);
orderRouter.route('/admin/details/:order').get(auth, adminViewOrderDetail);
orderRouter.route('/admin/to-shipping/:order').put(auth, orderToShipping);
orderRouter.route('/admin/cancel/:order').delete(auth, cancelOrderByID);

export default orderRouter;
