import { Request, Response } from 'express';
import Cart, { ICart } from '../models/Cart';
import Product, { IProduct } from '../models/Product';
import { unhandledExceptionsHandler } from '../utils/error';

export const getCartItems = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const cart: ICart | null = await Cart.findOne({ user: req.user?._id }).populate('cartItems.product', '-__v');
	if (!cart) {
		return res.status(404).json({ message: 'Cart not found' });
	}
	return res.status(200).json({ cart });
});

export const addToCart = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const user = req.user?._id;
	const { productId, quantity } = req.body;

	const cart = await Cart.findOne({ user });

	const product: IProduct | null = await Product.findById(productId);
	if (!product) {
		return res.status(404).json({ message: 'Product not found' });
	}

	if (cart) {
		let itemIndex = -1;
		for (let i = 0; i < cart.cartItems.length; i++) {
			if (cart.cartItems[i].product.toString() === productId) {
				itemIndex = i;
				break;
			}
		}

		if (itemIndex > -1) {
			cart.cartItems[itemIndex].quantity += quantity;
		} else {
			cart.cartItems.push({
				product: product._id,
				quantity
			});
		}
		await cart.save();
		return res.status(200).json(cart);
	} else {
		// Cart does not exist for the user, create new cart
		const newCart = await Cart.create({
			user: user,
			cartItems: [{ product: product._id, quantity }]
		});
		return res.status(200).json(newCart);
	}
});

export const removeFromCart = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const productId = req.params?.id;
	let cart: ICart | null = await Cart.findOne({ user: req.user?._id });

	if (!cart) {
		return res.status(404).json({ message: 'Cart not found' });
	}

	cart.cartItems = cart.cartItems.filter((item) => item.product.toString() !== productId);

	await cart.save();

	return res.json({ cart });
});
