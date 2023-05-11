import { Request, Response } from 'express';
import Product, { IProduct } from '../models/Product';
import { unhandledExceptionsHandler } from '../utils/error';

/**
 * @access Public
 * @route GET /api/products
 */
export const getAllProducts = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const products = await Product.find({});
	return res.status(200).json(products);
});

/**
 * @access Public
 * @route GET /api/products/:id
 */
export const getProductById = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const product = (await Product.findById(req.params.id)) as IProduct;

	if (!product) {
		return res.status(404).json({ message: 'Product not found!' });
	}
	return res.status(200).json(product);
});

/**
 * @access Private/Admin
 * @route POST /api/products/:id
 */
export const deleteProduct = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const product = (await Product.findById(req.params.id)) as IProduct;

	if (!product) {
		return res.status(404).json({ message: 'Product not found!' });
	}
	await product.remove();

	return res.status(200).json({ message: 'Product has been successfully deleted!' });
});

/**
 * @access Private/Admin
 * @route POST /api/products
 */

export const createProduct = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const { name, price, image, rating, category, countInStock, description } = req.body as IProduct;

	const product = await Product.create({
		name,
		price,
		image,
		rating,
		category,
		countInStock,
		description
	});

	return res.status(201).json(product);
});

/**
 * @access Private/Admin
 * @route PUT /api/products/:id
 */

export const updateProduct = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const products = (await Product.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			price: req.body.price,
			image: req.body.image,
			category: req.body.category,
			countInStock: req.body.countInStock,
			description: req.body.description,
			rating: req.body.rating
		},
	)) as IProduct;

	if (!products) {
		return res.status(404).json({ message: 'Product not found!' });
	}

	return res.status(201).json({
		message: 'Product updated successfully'
	});
});
