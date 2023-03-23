import { Document, model, Schema, Types } from 'mongoose';

export interface OrderDeatilFields {
    self_id?: string;
    order_id: Types.ObjectId;
    product_id: Types.ObjectId;
    product_name: string;
    product_description: string;
    quantity: Number;
    unit_price: Number;
    discount: Number;
    total_price: Number;
}

export interface IOrderDeatil extends Document {}

const OrderDetailSchema = new Schema(
    {
        order_id: { type: Types.ObjectId, required: true },
        product_id: { type: Types.ObjectId, required: true },
        product_name: { type: String, required: true },
        product_description: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit_price: { type: Number, required: true },
        discount: { type: Number, required: true },
        total_price: { type: Number, required: true },
    }
);
export default model<IOrderDeatil>('OrderDetail', OrderDetailSchema);