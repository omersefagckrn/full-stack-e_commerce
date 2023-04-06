import Product, {IProduct} from '../../models/Product';
import Order,{ OrderFields } from '../../models/Order';
import OrderDetail, {OrderDeatilFields} from '../../models/OrderDetail';
import Payment, { PaymentFields } from '../../models/Payment';
import { BasketItem, IPaymentRequest } from '../../types/Payment/Payment.types';
import Address, { AddressField, IAddress } from '../../models/address';

export const SaveOrder = async(paymentRequest: IPaymentRequest, user_id: string, paymentType: string) => {
	try
	{
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
			SaveOrderDetails(item, storedOrder._id, paymentRequest.paidPrice as unknown as number)
		});
		SavePayment(paymentRequest, user_id, storedOrder._id, paymentType);
	}
	catch(err){
		console.log(err);
	}
	
};
export const SavePayment = async(paymentRequest: IPaymentRequest,user_id: string, order_id: string, payment_type: string) => {
	const billingAddress: AddressField = await Address.findOne({user_id: user_id, zip_code: paymentRequest.billingAddress.zipCode, address: paymentRequest.billingAddress.address}) as AddressField;
	const shippingAddress: AddressField = await Address.findOne({user_id: user_id, zip_code: paymentRequest.shippingAddress.zipCode, address: paymentRequest.shippingAddress.address}) as AddressField;
	if(billingAddress && shippingAddress)
	{
		let newPayment:PaymentFields = {
			_id: paymentRequest.conversationId,
			user_id: user_id,
			order_id: order_id.toString(),
			price: paymentRequest.price as unknown as number,
			buyer: paymentRequest.buyer,
			billing_address_id: billingAddress._id?.toString() as string,
			shipping_address_id: shippingAddress._id?.toString() as string,
			payment_type: payment_type
		}
		let savedPayment = await Payment.create(newPayment);
	}
	
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
