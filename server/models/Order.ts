import {Document, model, Schema, Types} from 'mongoose';

export interface OrderFields {
	_id?: Types.ObjectId | string;
	user_id: string;
	status: string;
	payment_type: string;
	payment_id: string;
	created_at?: Date
}

export interface IOrder extends Document {}
const OrderSchema = new Schema(
	{
		user_id: {
			type: String,
			required: true,
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
			type: String,
            required: true,
		},
		created_at: {
            type: Date,
            required: false,
            default: Date.now
        }
	}
);
export default model<IOrder>('Order', OrderSchema);