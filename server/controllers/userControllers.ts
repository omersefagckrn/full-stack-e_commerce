import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import User, { IUser } from '../models/User';
import generateToken from '../utils/generateToken';

export const registerUser = expressAsyncHandler(async (req: Request, res: Response) => {
	const { name, surname, email, password } = req.body as IUser;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400).json({ message: 'User already exists' });
	}

	const user = await User.create({
		name,
		surname,
		email,
		password
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			surname: user.surname,
			email: user.email,
			isAdmin: user.isAdmin
		});
	} else {
		res.status(400).json({ message: 'Invalid user data' });
	}
});

export const loginUser = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body as IUser;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.status(200).json({
			_id: user._id,
			name: user.name,
			surname: user.surname,
			email: user.email,
			token: generateToken(user._id)
		});
		next();
	} else {
		res.status(401).json({ message: 'Invalid email or password' });
	}
});

export const getUserProfile = expressAsyncHandler(async (req: Request, res: Response) => {
	const user = await User.findById(req.user?._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			surname: user.surname,
			email: user.email
		});
	} else {
		res.status(404).json({ message: 'User not found' });
	}
});

export const updateUserProfile = expressAsyncHandler(async (req: Request, res: Response) => {
	const user = await User.findById(req.user?._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;

		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id)
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

export const getUsers = expressAsyncHandler(async (req: Request, res: Response) => {
	const users = await User.find({});
	res.json(users);
});

export const deleteUser = expressAsyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params as { id: string };

	const user = await User.findById(id);
	if (user) {
		await user.remove();
		res.json({ message: 'User removed' });
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

export const getUserById = expressAsyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params as { id: string };
	const user = await User.findById(id).select('-password');

	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

export const updateUser = expressAsyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params as { id: string };
	const user = await User.findById(id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin;

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});
