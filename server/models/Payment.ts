import {Document, model, Schema, Types} from 'mongoose';

export interface PaymentFields {
    self_id?: string;
    user_id: Types.ObjectId;
    order_id: Types.ObjectId;
    price: Number;
    contact_name: string;
    billing_address_id: string;
    shipping_address_id: string;
    payment_date: Date;
    payment_type: string;
}

export interface IPayment extends Document {};
const PaymentSchema = new Schema(
    {
        user_id: {type: Types.ObjectId, required: true, ref: 'User'},
        order_id: {type: Types.ObjectId, required: true, ref: 'Order'},
        price: {type: Number, required: true},
        contact_name: {type: String, required: true},
        billing_address_id: {type: Types.ObjectId, required: true, ref: 'Address'},
        shipping_address_id: {type: String, required: true, ref: 'Address'},
        payment_date: {type: Date, required: true},
        payment_type: {type: String, required: true}
    }
);
export default model<IPayment>('Payment', PaymentSchema);