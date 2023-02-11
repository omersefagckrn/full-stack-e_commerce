import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import JWT from 'jsonwebtoken';

export const auth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) res.status(401).json({ message: 'Not authorized, no token' });

	JWT.verify(token as string, process.env.JWT_SECRET!, (err, user) => {
		if (err) {
			res.status(401).json({ message: 'Not authorized, token failed' });
		}
		req.user = user;
		next();
	});
});

export const admin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401).json({ message: 'Not authorized as an admin' });
	}
});
