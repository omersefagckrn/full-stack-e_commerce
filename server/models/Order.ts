import {Document, model, Schema, Types} from 'mongoose';

export interface OrderFields {
	self_id?: Types.ObjectId;
	user_id: Types.ObjectId;
	status: string;
	payment_type: string;
	payment_id: Types.ObjectId;
	created_at: Date
}

export interface IOrder extends Document {}
const OrderSchema = new Schema(
	{
		user_id: {
			type: Types.ObjectId,
			required: true,
            ref: 'User'
		},
		status: {
			type: String,
			required: true,
		},
		payment_type: {
			type: String,
			required: false,
			default:"SINGLE PAYMENT"
		},
		payment_id: {
			type: Types.ObjectId,
            required: true,
		}
	}
);
export default model<IOrder>('Order', OrderSchema);