import { Request, Response } from 'express';
import Order, { IOrder } from '../models/Order';
import { unhandledExceptionsHandler } from '../utils/error';

/**
 * @access Private
 * @route GET /api/order/:id
 */

export const getOrderById = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const order = await Order.findById(req.params.id).populate('user', 'id name');
	if (!order) {
		return res.status(200).json({ message: 'Order not found!' });
	}
	return res.status(404).json(order);
});

/**
 * @access Private
 * @route GET /api/order/myorders
 */

export const getMyOrders = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const orders = await Order.find({ user: req.user._id });
	return res.status(200).json(orders);
});

/**
 * @access Private
 * @route POST /api/orders
 */

export const addOrderItems = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
	const user = req.user._id as string;

	if (orderItems && orderItems.length === 0) {
		return res.status(400).json({ message: 'No order items!' });
	} else {
		const order = (await Order.create(
			{
				orderItems,
				user,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				taxPrice,
				shippingPrice,
				totalPrice
			},
			{ new: true }
		)) as IOrder[];

		return res.status(201).json(order);
	}
});

/**
 * @access Private
 * @route PUT /api/orders/:id/pay
 */

export const updateOrderToPaid = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const order = await Order.findById(req.params.id);
	if (order) {
		order.isPaid = true;
		order.paidAt = new Date();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address
		};
		const updatedOrder = await order.save();
		return res.status(200).json(updatedOrder);
	} else {
		return res.status(404).json({ message: 'Order not found!' });
	}
});

/**
 * @access Private/admin
 * @route GET /api/orders/:id/deliver
 */

export const updateOrderToDelivered = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const order = await Order.findById(req.params.id);
	if (order) {
		order.isDelivered = true;
		order.deliveredAt = new Date();
		const updatedOrder = await order.save();
		return res.status(200).json(updatedOrder);
	} else {
		return res.status(404).json({ message: 'Order not found!' });
	}
});

/**
 * @access Private/Admin
 * @route GET /api/order
 */

export const getOrders = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const orders = await Order.find({}).populate('user', 'id name');
	return res.status(200).json(orders);
});
