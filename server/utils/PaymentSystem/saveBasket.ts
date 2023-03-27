import Product, {IProduct} from '../../models/Product';
import Order,{ IOrder } from '../../models/Order';
import OrderDetail, {IOrderDeatil} from '../../models/OrderDetail';
import Payment, { IPayment } from '../../models/Payment';
import { BasketItem, IPaymentRequest } from '../../types/Payment/Payment.types';
import { generateUniqueID } from '../generators';

// productlardan düşüş yapılacak.
// yeni bir order oluşturulacak.
// saving order and order details
export const SaveOrder = async(paymentRequest: IPaymentRequest, user_id: string) => {
	let newOrderId = generateUniqueID();
	paymentRequest.basketItems.forEach(async(item) => {
		let storedItem = await Product.findById(item.id) as IProduct;
		if(storedItem)
		{
			storedItem.countInStock -=1;
			storedItem.save();
		}
	});
	
};
export const SavePayment = (paymentRequest: IPaymentRequest,user_id: string, order_id: string, payment_type: string) => {

}
export const SaveOrderDetails = (item: BasketItem, order_id: string, total_price: number, discount_amount?: number) => {

}
