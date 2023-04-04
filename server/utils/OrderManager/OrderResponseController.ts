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

const GetProductImage = async(product_id: string): Promise<string | null> => {
    const product : IProduct = await Product.findById(product_id) as IProduct;
    if(product)
        return product.image;
    else
        return null;
}
export const ManageOrderDetailsByOrderID = async(order: OrderFields):Promise<IUserOrderResponse | null> => {
    const details: OrderDeatilFields[] = await OrderDetail.find({order_id: order._id});
    console.log(details);
    const payment: PaymentFields = await Payment.findById(order.payment_id) as PaymentFields;
    if( details && details.length > 0 && payment )
    {
        let userOrders: IUserOrderResponse = {
            orders: [],
            colors: {
                delivered: defaultDeliveredColorCode,
                pending: defaultPendingColorCode,
                cancelled: defaultCancelledColorCode,
            }
        };
        for(let i = 0; i < details.length; i++) {
                var singleOrder: SubOrdersResponse = {
                contact_name : payment.contact_name,
                order_id : order._id as string,
                date : order.created_at as Date,
                price : details[i].unit_price as number,
                status : order.status as string,
                image : await GetProductImage(details[i].product_id) as string,
                address : await Address.findById(payment.shipping_address_id) as AddressField,
                productName : details[i].product_name,
            };
            userOrders.orders.push(singleOrder);
            i++;
        }
        
        
        return userOrders;
    }
    return null;
}