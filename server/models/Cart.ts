import { Document, model, Schema, Types } from 'mongoose';
import { IProduct } from './Product';

export interface ICart extends Document {
	user: Types.ObjectId;
	cartItems: Array<{ product: string | IProduct; quantity: number }>;
}

const CartSchema = new Schema(
	{
		user: { type: Types.ObjectId, ref: 'User' },
		cartItems: [
			{
				product: { type: Types.ObjectId, ref: 'Product' },
				quantity: { type: Number, default: 0 }
			}
		]
	},
	{
		timestamps: true
	}
);

export default model<ICart>('Cart', CartSchema);
