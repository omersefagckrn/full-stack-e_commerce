import { Document, model, Schema, Types } from 'mongoose';

export interface IOrder extends Document {
	user: Types.ObjectId;
	orderItems: {
		product: Types.ObjectId;
		quantity: number;
	}[];
	shippingAddress: {
		address: string;
		city: string;
		postalCode: string;
		country: string;
	};
	paymentMethod: string;
	paymentResult: {
		id: string;
		status: string;
		update_time: string;
		email_address: string;
	};
	itemsPrice: number;
	taxPrice: number;
	shippingPrice: number;
	totalPrice: number;
	isPaid: boolean;
	paidAt: Date;
	isDelivered: boolean;
	deliveredAt: Date;
}

const OrderSchema = new Schema(
	{
		user: {
			type: Types.ObjectId,
			required: true,
			ref: 'User'
		},
		orderItems: [
			{
				product: {
					type: Types.ObjectId,
					required: true,
					ref: 'Product'
				},
				quantity: {
					type: Number,
					required: true,
					default: 0
				}
			}
		],
		shippingAddress: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			postalCode: { type: String, required: true },
			country: { type: String, required: true }
		},
		paymentMethod: {
			type: String,
			required: true
		},
		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_time: { type: String },
			email_address: { type: String }
		},
		itemsPrice: {
			type: Number,
			required: true,
			default: 0.0
		},
		taxPrice: {
			type: Number,
			required: true,
			default: 0.0
		},
		shippingPrice: {
			type: Number,
			required: true,
			default: 0.0
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false
		},
		paidAt: {
			type: Date
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false
		},
		deliveredAt: {
			type: Date
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
);

export default model<IOrder>('Order', OrderSchema);
