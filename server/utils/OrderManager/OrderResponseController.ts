import { OrderFields } from '../../models/Order';
import Product, { IProduct } from '../../models/Product';
import OrderDetail,{ OrderDeatilFields } from '../../models/OrderDetail';
import Address, { AddressField } from '../../models/address';
import {
    SubOrdersResponse, 
    IUserOrderResponse,
    defaultCancelledColorCode,
    defaultDeliveredColorCode,
    defaultPendingColorCode,
} from '../../types/OrderTypes/Order.responses.types';
import Payment, { PaymentFields } from '../../models/Payment';

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

