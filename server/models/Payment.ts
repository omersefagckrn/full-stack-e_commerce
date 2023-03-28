import {Document, model, Schema, Types} from 'mongoose';
import { types } from 'util';
import { IngAddressType } from '../types/Payment/Payment.types';

export interface PaymentFields {
    _id?: string;
    user_id: string;
    order_id: string;
    price: Number;
    contact_name: string;
    billing_address_id: string;
    shipping_address_id: string;
    payment_date?: Date;
    payment_type: string;
}

export interface IPayment extends Document {};
const PaymentSchema = new Schema(
    {
        user_id: {type: String, required: true, ref: 'User'},
        order_id: {type: String, required: true, ref: 'Order'},
        price: {type: Number, required: true},
        contact_name: {type: String, required: true},
        billing_address_id: {type: String, required: true},
        shipping_address_id: {type: String, required: true},
        payment_date: {type: Date, required: false, default: Date.now()},
        payment_type: {type: String, required: true}
    }
);
export default model<IPayment>('Payment', PaymentSchema);