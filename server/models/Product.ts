import { Document, model, Schema, Types } from 'mongoose';

export interface IProduct extends Document {
	_id?: Types.ObjectId | string;
	name: string;
	description: string;
	image: string;
	price: number;
	category: string;
	countInStock: number;
	rating: number;
}

const ProductSchema = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		image: {
			type: String,
			required: true
		},
		price: { type: Number, required: true },
		category: { type: String, required: true },
		countInStock: { type: Number, required: true },
		rating: { type: Number, required: true }
	},
	{
		timestamps: true,
		versionKey: false
	}
);

export default model<IProduct>('Product', ProductSchema);
