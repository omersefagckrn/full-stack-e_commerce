import { Document, model, Schema } from 'mongoose';

export interface OrderDetailFields {
	_id?: string;
	order_id: string;
	product_id: string;
	product_name: string;
	item_transaction_id: string;
	quantity: Number;
	unit_price: Number;
	discount: Number;
	total_price: Number;
}

export interface OrderDeatilResponse {
	[key: string]: OrderDetailFields[];
}
export interface IOrderDeatil extends Document {}

const OrderDetailSchema = new Schema({
	order_id: { type: String, required: true },
	product_id: { type: String, required: true },
	product_name: { type: String, required: true },
	item_transaction_id: { type: String, required: true },
	quantity: { type: Number, required: true },
	unit_price: { type: Number, required: true },
	discount: { type: Number, required: true },
	total_price: { type: Number, required: true }
});
export default model<IOrderDeatil>('OrderDetail', OrderDetailSchema);
