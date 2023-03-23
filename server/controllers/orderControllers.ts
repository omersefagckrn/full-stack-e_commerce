import { Request, Response } from 'express';
import { unhandledExceptionsHandler } from '../utils/error';
import { createPayment } from '../utils/PaymentSystem/createPayment';

/**
 * @access user,
 * @method /api/orders/new-order POST
 */

export const newOrder = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	return res.json();
});

/**
 * @access user
 * @method /api/orders/:user GET
 */

export const getUserOrders = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	return res.json();
});

/**
 * @access admin
 * @method /api/admin/orders GET
 */

export const getAllOrders = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	
	return res.status(404).json({ message: 'No Orders' });
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
