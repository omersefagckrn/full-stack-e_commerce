import Product, {IProduct} from '../../models/Product';
import Order,{ OrderFields } from '../../models/Order';
import OrderDetail, {OrderDeatilFields} from '../../models/OrderDetail';
import Payment, { PaymentFields } from '../../models/Payment';
import { BasketItem, IPaymentRequest } from '../../types/Payment/Payment.types';

export const SaveOrder = async(paymentRequest: IPaymentRequest, user_id: string, paymentType: string) => {
	const newOrder:OrderFields = {
		user_id: user_id,
		status: "GETTING_READY",
		payment_type: paymentType,
		payment_id: paymentRequest.conversationId,
	};
	let storedOrder = await Order.create(newOrder);
	paymentRequest.basketItems.forEach(async(item) => {
		let storedItem = await Product.findById(item.id) as IProduct;
		if(storedItem)
		{
			storedItem.countInStock -=1;
			storedItem.save();
		}
		SaveOrderDetails(item, storedOrder._id, paymentRequest.price as unknown as number)
	});
	SavePayment(paymentRequest, user_id, storedOrder._id, paymentType);
	
};
export const SavePayment = async(paymentRequest: IPaymentRequest,user_id: string, order_id: string, payment_type: string) => {
	let newPayment:PaymentFields = {
		_id: paymentRequest.conversationId,
		user_id: user_id,
		order_id: order_id,
		price: paymentRequest.price as unknown as number,
		contact_name: paymentRequest.buyer.name + " " + paymentRequest.buyer.surname,
		billing_address_id: "paymentRequest.billingAddress",
		shipping_address_id: "paymentRequest.shippingAddress",
		payment_type: payment_type
	}
	let savedPayment = await Payment.create(newPayment);
}
export const SaveOrderDetails = (item: BasketItem, order_id: string, total_price: number, discount_amount?: number) => {
	let orderDetail: OrderDeatilFields;
	orderDetail = {
		order_id: order_id,
		product_id: item.id ,
		product_name: item.name,
		quantity: 1,
		unit_price: item.price as unknown as Number,
		discount: discount_amount ? discount_amount : 0,
		total_price: total_price,
	}
	OrderDetail.create(orderDetail);
}
