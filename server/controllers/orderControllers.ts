import { Request, Response } from 'express';
import Order, { IOrder } from '../models/Order';
import { unhandledExceptionsHandler } from '../utils/error';

/**
 * @access user,
 * @method /api/user/new-order POST
 */

const newOrder = unhandledExceptionsHandler(async(req: Request, res: Response) => {
	return res.json();
});

/**
 * @access user
 * @method /api/user/orders/:id GET
 */

const getOrderByID =  unhandledExceptionsHandler(async(req: Request, res: Response) => {
	return res.json();
});

/**
 * @access admin
 * @method /api/admin/orders GET
 */ 

const getAllOrders = unhandledExceptionsHandler(async(req: Request, res: Response) => {
	return res.json();
});

/**
 * @access admin
 * @method /api/admin/orders/:id/to-shipping POST
 */
const orderToShipping = unhandledExceptionsHandler(async(req: Request, res: Response)=> {
	return res.json();
});

/**
 * @access admin
 * @method /api/admin/orders/:id DELETE
 */
const deleteOrderByID = unhandledExceptionsHandler(async(req: Request, res: Response) => {
	return res.json();
});

/**
 * @access user,
 * @method /api/user/orders/:id
 */

const refundOrder = unhandledExceptionsHandler(async(req: Request, res: Response)=> {
	return res.json();
});

export default {newOrder, getOrderByID, deleteOrderByID, getAllOrders, orderToShipping, refundOrder}