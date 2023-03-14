import { IAddress, IBasketItem, IBuyer, IPaymentCard, IPaymentRequest } from '../../models/Order';
import { generateUniqueID } from '../generators';
var Iyzipay = require('iyzipay');

export const paymentRequestBuilder = (
	request: {
		user_id: string,
		price: Number,
		paidPrice: Number,
		installment: string,
		card: IPaymentCard,
		buyer: IBuyer,
		shipAddress: IAddress,
		billingAddress: IAddress,
		items: IBasketItem[]
	}
): IPaymentRequest => {
	const paymentInfo: IPaymentRequest = {
		locale: Iyzipay.LOCALE.TR,
		conversationID: generateUniqueID(),
		user_id: request.user_id,
		price: request.price,
		paidPrice: request.paidPrice,
		currency: Iyzipay.CURRENCY.TRY,
		installment: request.installment,
		basket_id: generateUniqueID(),
		paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
		paymentGroup: Iyzipay.PAYMENT_GROUP.LISTING,
		paymentCard: request.card,
		buyer: request.buyer,
		shippingAddress: request.shipAddress,
		billingAddress: request.billingAddress,
		basketItems: request.items
	};
	return paymentInfo;
};
