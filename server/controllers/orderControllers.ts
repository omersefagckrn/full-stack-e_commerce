import { Request, Response } from 'express';
import User from '../models/User';
import { unhandledExceptionsHandler } from '../utils/error';
import { createPayment } from '../utils/PaymentSystem/createPayment';
import { IPaymentFailResponse, IPaymentResponse } from '../types/Payment/Payment.types';
import Order,{ OrderFields } from '../models/Order';
import OrderDetail, { OrderDeatilFields, OrderDeatilResponse } from '../models/OrderDetail';
import Payment from '../models/Payment';
import { IAdminOrdersResponse, IRefundOrderResponse, IUserOrderResponse } from '../types/OrderTypes/Order.responses.types';
import { CancelPayment, GetAllOrdersForAdmin, GetOrderDetailAdmin, GetOrderDetails, GetUserRecentOrders, RefundOrder, SetOrderToShipping } from '../utils/OrderManager/OrderResponseController';
import { IGetOrderDetailResponse } from '../types/OrderTypes/Order.responses.types';
import { ICancelPaymentResponse, IRefundPaymentResponse } from '../types/Payment/Cancel.types';


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

export const getUserOrders = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const orders: OrderFields[] = await Order.find({user_id: req.params.user});
	if(orders)
	{
		const ordersResponse: IUserOrderResponse = await GetUserRecentOrders(orders);
		return res.status(200).json(ordersResponse);
	}
	return res.status(404).json();
});

export const getUserOrderDetails = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const user = req.params.user;
	const order = req.params.order;
	const detailResponse: IGetOrderDetailResponse = (await GetOrderDetails(order, user)) as IGetOrderDetailResponse;
	if(detailResponse)
		res.status(200).json(detailResponse);
	return res.status(404).json();
});


export const getAllOrders = unhandledExceptionsHandler(async (req: Request, res: Response) => {	
	const orders: IAdminOrdersResponse = await GetAllOrdersForAdmin() as IAdminOrdersResponse;
	console.log("Running");
	if(orders)
	{
		return res.status(200).json(orders);
	}
	return res.status(404).json();
});

export const adminViewOrderDetail = unhandledExceptionsHandler(async (req: Request, res:Response) => {
	const order_id = req.params.order;
	const detailResponse: IGetOrderDetailResponse = await GetOrderDetailAdmin(order_id) as IGetOrderDetailResponse;
	if(detailResponse)
		return res.status(200).json(detailResponse);
	return res.status(500).json();
});

export const orderToShipping = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const order_id: string = req.params.order;
	if(order_id)
	{
		const result:boolean = await SetOrderToShipping(order_id);
		return result ? res.status(200).json({
			message: "Başarılı şekilde kargoya verildi.",
			requirement: "DISPATCH ORDERS"
		}) : res.status(400).json({
			message: "Ürün zaten kargoya verilmiştir.",
			requirement: ""
		})
	}
	return res.status(404).json();
});


export const cancelOrderByID = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const order_id = req.params.order;
	const result:IPaymentFailResponse | ICancelPaymentResponse | null = await CancelPayment(order_id);
	if(result && result.status == 'success')
		return res.status(200).json(result);
	else
		return res.status(500).json(result);
});

/**
 * @access user,
 * @method /api/user/orders/refund
 */

export const refundOrder = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const {order_id, payment_id, item_transaction_id, price, currency, ip, description} = req.body;
	const result = await RefundOrder(order_id, payment_id, item_transaction_id, price, currency, ip, description) as IPaymentFailResponse | IRefundPaymentResponse;
	if(result.status == 'success')
		return res.status(200).json(result);
	else
		return res.status(400).json(result);
});
export const hardResetOrders = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	//await Order.deleteMany({});
	//await OrderDetail.deleteMany({});
	//await Payment.deleteMany({});
	let response = {
		//orders: await Order.find({}),
		//details: await OrderDetail.find({}),
		//payments: await Payment.find({}),
		
		results: {
			order: await Order.find({}),
			details: await OrderDetail.find({}),
			payment: await Payment.find({}),
		}
		
	}
	return res.status(200).json({message: "success", response});
	
});

