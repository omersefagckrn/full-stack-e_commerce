import { Request, Response } from 'express';
import User from '../models/User';
import { unhandledExceptionsHandler } from '../utils/error';
import { createPayment } from '../utils/PaymentSystem/createPayment';
import { IPaymentFailResponse, IPaymentResponse } from '../types/Payment/Payment.types';
import Order,{ OrderFields } from '../models/Order';
import OrderDetail, { OrderDeatilFields, OrderDeatilResponse } from '../models/OrderDetail';
import Payment from '../models/Payment';
import { IUserOrderResponse } from '../types/OrderTypes/Order.responses.types';
import { GetOrderDetails, GetUserRecentOrders } from '../utils/OrderManager/OrderResponseController';
import { IGetOrderDetailResponse } from '../types/OrderTypes/Order.responses.types';
/**
 * @access user,
 * @method /api/orders/new-order POST
 */

export const newOrder = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const {
		user_id,
		price, 
		paidPrice,
		installment,
		paymentCard,
		buyer,
		shippingAddress,
        billingAddress,
        basketItems,
        currency,
	} = req.body;
	const user = await User.findById(user_id);
	if(user)
	{
		var response: IPaymentResponse | IPaymentFailResponse = await createPayment({
				price,
            	paidPrice,
            	installment,
            	paymentCard,
            	buyer,
				shippingAddress,
				billingAddress,
				basketItems,
            	currency
			}, user_id);
		return res.status(200).json(response);
	}
	return res.status(404).json();
});

/**
 * @access user
 * @method /api/orders/:user GET
 */

export const getUserOrders = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const orders: OrderFields[] = await Order.find({user_id: req.params.user});
	if(orders)
	{
		const ordersResponse: IUserOrderResponse = await GetUserRecentOrders(orders);
		return res.status(200).json(ordersResponse);
	}
	return res.status(404).json();
});
/**
 * @access user
 * @method /api/orders/:user/:order
 */
export const getUserOrderDetails = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const user = req.params.user;
	const order = req.params.order;
	const detailResponse: IGetOrderDetailResponse = (await GetOrderDetails(order, user)) as IGetOrderDetailResponse;
	if(detailResponse)
		res.status(200).json(detailResponse);
	return res.status(404).json();
});

/**
 * @access admin
 * @method /api/orders/admin GET
 */
export const getAllOrders = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const orders: OrderFields[] = await Order.find({});	
	if(orders)
	{
		return res.status(200).json({
			orders: orders,
		});
	}
	return res.status(404).json();
});

/**
 * @access admin
 * @method /api/admin/orders/:id/to-shipping POST
 */
const orderToShipping = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	return res.json();
});

/**
 * @access admin
 * @method /api/admin/orders/:id DELETE
 */
const deleteOrderByID = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	return res.json();
});

/**
 * @access user,
 * @method /api/user/orders/:id
 */

const refundOrder = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	return res.json();
});
export const hardResetOrders = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	let orders = await Order.deleteMany({});
	let details = await OrderDetail.deleteMany({});
	let payment = await Payment.deleteMany({});
	
	let response = {
		orders: await Order.find({}),
		details: await OrderDetail.find({}),
		payments: await Payment.find({}),
		/*results: {
			order: orders,
			details: details,
			payment: payment,
		}
		*/
	}
	return res.status(200).json({message: "success", response});
	
});

