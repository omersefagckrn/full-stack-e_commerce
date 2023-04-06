import Order, { OrderFields } from '../../models/Order';
import Product, { IProduct } from '../../models/Product';
import OrderDetail,{ OrderDeatilFields } from '../../models/OrderDetail';
import Address, { AddressField } from '../../models/address';
import {
    SubOrdersResponse, 
    IUserOrderResponse,
    defaultCancelledColorCode,
    defaultDeliveredColorCode,
    defaultPendingColorCode,
    IGetOrderDetailResponse,
    SubDetailPaymentInfo,
    IAdminOrdersResponse,
} from '../../types/OrderTypes/Order.responses.types';
import Payment, { PaymentFields } from '../../models/Payment';
import { SubDetailResponse } from '../../types/OrderTypes/Order.responses.types';
import User, { IUser } from '../../models/User';
import { builtinModules } from 'module';

export const GetUserRecentOrders = async(orders: OrderFields[]) : Promise<IUserOrderResponse> => {
    let userOrderResponse: IUserOrderResponse = {
        orders:[],
        colors: {
            cancelled: defaultCancelledColorCode,
            delivered: defaultDeliveredColorCode,
            pending: defaultPendingColorCode,
        }
    } 
    for(let i = 0; i < orders.length; i++) {
        let currentDetail = await OrderDetail.find({order_id: orders[i]._id}) as OrderDeatilFields[];
        let unitOrderResponse: SubOrdersResponse = {
            date: orders[i].created_at as Date,
            item_count: currentDetail.length,
            order_id: currentDetail[i].order_id,
            status: orders[i].status,
            total_price: currentDetail[i].total_price as number
        }
        userOrderResponse.orders.push(unitOrderResponse);
    }
    return userOrderResponse;
}

export const GetOrderDetails = async(order_id: string, user_id: string) : Promise<IGetOrderDetailResponse | null> => {
    let allDetails:OrderDeatilFields[] = await OrderDetail.find({order_id: order_id}) as OrderDeatilFields[];
    let user: IUser = await User.findById(user_id) as IUser;
    let payment: PaymentFields = await Payment.findOne({order_id: order_id, user_id: user_id}) as PaymentFields;
    let payment_info:SubDetailPaymentInfo;
    if(user && payment && allDetails && allDetails.length > 0) {
        let detailResponse:IGetOrderDetailResponse = {details: [], payment_info: undefined};
        payment_info = {
            buyer: payment.buyer,
            payment_tpye: payment.payment_type,
            total_price: payment.price as number,
            shipping_address: await Address.findById(payment.shipping_address_id) as AddressField,
            billing_address: await Address.findById(payment.billing_address_id) as AddressField,
        };
        detailResponse.payment_info = payment_info;
        for(let i = 0; i < allDetails.length; i++) {
            let current_product:IProduct = await Product.findById(allDetails[i].product_id) as IProduct;
            let currentDetail: SubDetailResponse = {
                item: allDetails[i],
                item_image: current_product.image
            };
            detailResponse.details?.push(currentDetail);   
        }
        return detailResponse;
    }

    return null;
}
export const GetAllOrdersForAdmin = async(): Promise<IAdminOrdersResponse | null> => {

    let orders:OrderFields[] = await Order.find({}) as OrderFields[];
    if(orders)
    {
        let allOrdersResponse: IAdminOrdersResponse = {
            orders:[],
            colors: {
                cancelled: defaultCancelledColorCode,
                delivered: defaultDeliveredColorCode,
                pending: defaultPendingColorCode,
            }
        } 
        for(let i = 0; i < orders.length; i++) {
            let currentDetail = await OrderDetail.find({order_id: orders[i]._id}) as OrderDeatilFields[];
            let unitOrderResponse: SubOrdersResponse = {
                date: orders[i].created_at as Date,
                item_count: currentDetail.length,
                order_id: currentDetail[i].order_id,
                status: orders[i].status,
                total_price: currentDetail[i].total_price as number
            }
            allOrdersResponse.orders.push(unitOrderResponse);
        }

        return allOrdersResponse;
    }
    return null;
}
export const GetOrderDetailAdmin = async(order_id: string): Promise<IGetOrderDetailResponse | null> => {
    let currentOrder = await Order.findById(order_id) as OrderFields;
    let allDetails:OrderDeatilFields[] = await OrderDetail.find({order_id: order_id}) as OrderDeatilFields[];
    let user: IUser = await User.findById(currentOrder.user_id) as IUser;
    let payment: PaymentFields = await Payment.findOne({order_id: order_id, user_id: currentOrder.user_id}) as PaymentFields;
    let payment_info:SubDetailPaymentInfo;
    if(user && payment && allDetails && allDetails.length > 0) {
        let detailResponse:IGetOrderDetailResponse = {details: [], payment_info: undefined};
        payment_info = {
            buyer: payment.buyer,
            payment_tpye: payment.payment_type,
            total_price: payment.price as number,
            shipping_address: await Address.findById(payment.shipping_address_id) as AddressField,
            billing_address: await Address.findById(payment.billing_address_id) as AddressField,
        };
        detailResponse.payment_info = payment_info;
        for(let i = 0; i < allDetails.length; i++) {
            let current_product:IProduct = await Product.findById(allDetails[i].product_id) as IProduct;
            let currentDetail: SubDetailResponse = {
                item: allDetails[i],
                item_image: current_product.image
            };
            detailResponse.details?.push(currentDetail);   
        }
        return detailResponse;
    }

    return null;
}
