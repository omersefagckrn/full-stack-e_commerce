import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import Address, { AddressField } from '../models/address';
import { unhandledExceptionsHandler } from '../utils/error';
import generateToken from '../utils/generateToken';

export const loginUser = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body as IUser;

	const user = await User.findOne({ email });
	if (!user) {
		return res.status(400).json({ message: 'Invalid email or password!' });
	}

	const isMatch = await user.matchPassword(password);
	if (!isMatch) {
		return res.status(400).json({ message: 'Invalid email or password!' });
	}

	return res.status(200).json({
		_id: user._id,
		name: user.name,
		surname: user.surname,
		email: user.email,
		isAdmin: user.isAdmin,
		token: generateToken(user._id)
	});
});

export const registerUser = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const { name, surname, email, password, phone } = req.body as IUser;

	const userExists = await User.findOne({ email });

	if (userExists) {
		return res.status(400).json({ message: 'User already exists!' });
	}

	const user = await User.create({ name, surname, email, password, phone, isAdmin: false });

	return res.status(201).json({ message: 'Your registration has been successfully created!', user });
});

export const getUserProfile = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const user = await User.findById({ _id: req.user?.id });

	if (!user) {
		return res.status(404).json({ message: 'User not found!' });
	}

	return res.status(200).json({
		_id: user._id,
		name: user.name,
		surname: user.surname,
		email: user.email,
		phone: user.phone,
		updatedAt: user.updatedAt
	});
});

export const updateUserProfile = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const user = await User.findByIdAndUpdate(
		req.user?.id,
		{
			name: req.body.name,
			surname: req.body.surname,
			email: req.body.email,
			phone: req.body.phone
		},
		{ new: true }
	);

	if (!user) {
		return res.status(404).json({ message: 'User not found!' });
	}

	return res.status(200).json({
		message: `${user.name} ${user.surname} updated successfully!`
	});
});

export const getUserAddress = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const user = (await User.findById({ _id: req.user?.id })) as IUser;

	if (!user) {
		return res.status(404).json({ message: 'User not found!' });
	}

	const address = (await Address.find({ user_id: req.user?.id })) as AddressField[];

	if (!address) {
		return res.status(404).json({ message: 'Address not found!' });
	}

	return res.status(200).json(address);
});

export const deleteUserAddress = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const user = (await User.findById({ _id: req.user?.id })) as IUser;

	if (!user) {
		return res.status(404).json({ message: 'User not found!' });
	}

	const address = (await Address.findByIdAndDelete({ _id: req.params.id })) as AddressField;

	if (!address) {
		return res.status(404).json({ message: 'Address not found!' });
	}

	return res.status(200).json({
		message: `Address deleted successfully!`
	});
});

export const updateUserAddress = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const user = await User.findById({ _id: req.user?.id });

	if (!user) {
		return res.status(404).json({ message: 'User not found!' });
	}

	const address = await Address.findByIdAndUpdate(
		{ _id: req.params.id },
		{
			title: req.body.title,
			address: req.body.address,
			zip_code: req.body.zip_code,
			city_name: req.body.city_name,
			country_name: req.body.country_name
		},
		{ new: true }
	);

	if (!address) {
		return res.status(404).json({ message: 'Address not found!' });
	}

	return res.status(201).json({
		message: `Address updated successfully!`
	});
});

export const addUserAddress = unhandledExceptionsHandler(async (req: Request, res: Response) => {
	const user = await User.findById({ _id: req.user?.id });

	if (!user) {
		return res.status(404).json({ message: 'User not found!' });
	}

	const address = await Address.create({
		user_id: user._id,
		title: req.body.title,
		address: req.body.address,
		zip_code: req.body.zip_code,
		city_name: req.body.city_name,
		country_name: req.body.country_name
	});

	if (!address) {
		return res.status(400).json({ message: 'Invalid address data!' });
	}

	return res.status(201).json({ address });
});
