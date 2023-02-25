import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) res.status(401).json({ message: 'Session is undefined!' });

	JWT.verify(token as string, process.env.JWT_SECRET!, (err: JWT.VerifyErrors | null, user: string | JWT.JwtPayload | undefined) => {
		if (err) {
			return res.status(401).json({ message: 'Your session has expired, you are being redirected to the login!' });
		}
		req.user = user;
		next();
	});
};

export const admin = async (req: Request, res: Response, next: NextFunction) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401).json({ message: 'Not authorized as an admin!' });
	}
};
