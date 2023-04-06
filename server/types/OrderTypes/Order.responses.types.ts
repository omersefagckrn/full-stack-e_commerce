import { AddressField } from '../../models/address';
import { IPaymentResponse, IPaymentFailResponse } from '../Payment/Payment.types';

export interface SubOrdersResponse {
    date: Date;
    order_id: string;
    status: string;
    total_price: number;
    item_count: number;
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
    details:{},
    payment_info: {},
}
/////////////////////////////////////////////////////////////////////
export interface IOrderToShippingResponse {}
/////////////////////////////////////////////////////////////////////
export interface IDeleteOrderResponse {}
/////////////////////////////////////////////////////////////////////
export interface IRefundOrderResponse {}