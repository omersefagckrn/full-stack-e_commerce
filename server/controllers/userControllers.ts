import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import generateToken from '../utils/generateToken';

export const registerUser = async (req: Request, res: Response) => {
	try {
		const { name, surname, email, password } = req.body as IUser;

		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const user = await User.create({ name, surname, email, password });
		return res.status(201).json({
			_id: user._id,
			name: user.name,
			surname: user.surname,
			email: user.email,
			isAdmin: user.isAdmin
		});
	} catch (error) {
		console.error(error);
		return res.status(400).json({ message: error });
	}
};

export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body as IUser;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: 'Invalid email or password' });
		}

		const isMatch = await user.matchPassword(password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid email or password' });
		}

		return res.status(200).json({
			_id: user._id,
			name: user.name,
			surname: user.surname,
			email: user.email,
			token: generateToken(user._id)
		});
	} catch (error) {
		console.error(error);
		return res.status(401).json({ message: error });
	}
};

export const getUserProfile = async (req: Request, res: Response) => {
	try {
		const user = await User.findOne({ token: req.user?.token });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json({
			_id: user._id,
			name: user.name,
			surname: user.surname,
			email: user.email,
			isAdmin: user.isAdmin
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Failed to get user profile' });
	}
};

export const updateUserProfile = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.user?._id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;

		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();
		return res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Failed to update user profile' });
	}
};
