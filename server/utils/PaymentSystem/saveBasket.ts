import Product, {IProduct} from '../../models/Product';
import Order,{ OrderFields } from '../../models/Order';
import OrderDetail, {OrderDeatilFields} from '../../models/OrderDetail';
import Payment, { PaymentFields } from '../../models/Payment';
import { BasketItem, IPaymentRequest, ItemTransaction } from '../../types/Payment/Payment.types';
import Address, { AddressField, IAddress } from '../../models/address';

export const SaveOrder = async(paymentRequest: IPaymentRequest, user_id: string, paymentType: string, paymentId: string, item_transactions: ItemTransaction[]) => {
	try
	{
		const newOrder:OrderFields = {
		user_id: user_id,
		status: "GETTING_READY",
		payment_type: paymentType,
		payment_id: paymentRequest.conversationId,
		};
		let storedOrder = await Order.create(newOrder);
		let counter = 0; 
		paymentRequest.basketItems.forEach(async(item) => {
			let storedItem = await Product.findById(item.id) as IProduct;
			if(storedItem)
			{
				storedItem.countInStock -=1;
				storedItem.save();
			}
			let paymentTransactionId = item_transactions[counter].paymentTransactionId;
			await SaveOrderDetails(item, storedOrder._id, paymentRequest.paidPrice as unknown as number, paymentTransactionId)
			counter++;
		});
		await SavePayment(paymentRequest, user_id, storedOrder._id, paymentType, paymentId);
	}
	catch(err){
		console.log(err);
	}
	
};
export const SavePayment = async(paymentRequest: IPaymentRequest,user_id: string, order_id: string, payment_type: string, paymentId: string) => {
	const billingAddress: AddressField = await Address.findOne({user_id: user_id, zip_code: paymentRequest.billingAddress.zipCode, address: paymentRequest.billingAddress.address}) as AddressField;
	const shippingAddress: AddressField = await Address.findOne({user_id: user_id, zip_code: paymentRequest.shippingAddress.zipCode, address: paymentRequest.shippingAddress.address}) as AddressField;
	console.log(billingAddress, shippingAddress)
	if(billingAddress && shippingAddress)
	{
		let newPayment:PaymentFields = {
			_id: paymentRequest.conversationId,
			user_id: user_id,
			order_id: order_id.toString(),
			transactionId: paymentId,
			price: paymentRequest.price as unknown as number,
			buyer: paymentRequest.buyer,
			currency: paymentRequest.currency,
			billing_address_id: billingAddress._id?.toString() as string,
			shipping_address_id: shippingAddress._id?.toString() as string,
			payment_type: payment_type
		};
		console.log(newPayment);
		(await Payment.create(newPayment)).save();
	}
	
}
export const SaveOrderDetails = async(item: BasketItem, order_id: string, total_price: number, item_transaction_id: string, discount_amount?: number) => {
	let orderDetail: OrderDeatilFields;
	orderDetail = {
		order_id: order_id,
		product_id: item.id ,
		product_name: item.name,
		item_transaction_id: item_transaction_id,
		quantity: 1,
		unit_price: item.price as unknown as Number,
		discount: discount_amount ? discount_amount : 0,
		total_price: total_price,
	}
	await OrderDetail.create(orderDetail);
}
