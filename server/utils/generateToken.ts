import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const generateToken = (id: Types.ObjectId) => {
	if (process.env.JWT_SECRET !== undefined) {
		return jwt.sign({ id }, process.env.JWT_SECRET, {
			expiresIn: '10m'
		});
	}
};

export default generateToken;
