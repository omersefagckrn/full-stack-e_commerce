import { OrderDeatilFields } from '../../models/OrderDetail';
import { IUser } from '../../models/User';
import { AddressField } from '../../models/address';
import { IPaymentResponse, IPaymentFailResponse, BasketItem, Buyer } from '../Payment/Payment.types';

export interface SubOrdersResponse {
    date: Date;
    order_id: string;
    status: string;
    total_price: number;
    item_count: number;
}
export interface SubDetailResponse {
    item: OrderDeatilFields;
    item_image: string;
}
export interface SubDetailPaymentInfo {
    payment_tpye: string;
    buyer: Buyer;
    total_price: number;
    shipping_address: AddressField;
    billing_address: AddressField;
}
export const defaultDeliveredColorCode: string = "#00FF00";
export const defaultPendingColorCode: string = "#F4CA16";
export const defaultCancelledColorCode: string = "#FF0000";
export interface IUserOrderResponse {
    orders: SubOrdersResponse[];
    colors: {
        delivered: string,
        pending: string,
        cancelled: string,
    },
}
/////////////////////////////////////////////////////////////////////
export interface IAdminOrdersResponse {}
/////////////////////////////////////////////////////////////////////
export interface IGetOrderDetailResponse {
    details: SubDetailResponse[];
    payment_info : SubDetailPaymentInfo | undefined
}
/////////////////////////////////////////////////////////////////////
export interface IOrderToShippingResponse {}
/////////////////////////////////////////////////////////////////////
export interface IDeleteOrderResponse {}
/////////////////////////////////////////////////////////////////////
export interface IRefundOrderResponse {}