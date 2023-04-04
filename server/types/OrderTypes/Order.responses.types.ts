import { AddressField } from '../../models/address';
import { IPaymentResponse, IPaymentFailResponse } from '../Payment/Payment.types';

export interface SubOrdersResponse {
    order_id: string;    
    productName: string;
    address: AddressField;
    image: string;
    price: number;
    date: Date;
    status: string;
    contact_name: string;
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
export interface IGetOrderDetailResponse {}
/////////////////////////////////////////////////////////////////////
export interface IOrderToShippingResponse {}
/////////////////////////////////////////////////////////////////////
export interface IDeleteOrderResponse {}
/////////////////////////////////////////////////////////////////////
export interface IRefundOrderResponse {}