import { IAddress, IBasketItem, IBuyer, IPaymentCard } from '../../models/Order';
import { paymentRequestBuilder } from './paymentRequestBuilder';
import { saveBasket } from './saveBasket';
var Iyzipay = require('iyzipay');

export const createPayment = (
	user_id: string,
	price: Number,
	paidPrice: Number,
	installment: string,
	card: IPaymentCard,
	buyer: IBuyer,
	shipAddress: IAddress,
	billingAddress: IAddress,
	items: IBasketItem[]
): any => {
	let request = {
		user_id,
		price,
		paidPrice,
		installment,
		card,
		buyer,
		shipAddress,
		billingAddress,
		items
	};
	if (request) {
		const paymentInfo = paymentRequestBuilder(request);
		let iyzipay = new Iyzipay({
			apiKey: process.env.IYZICO_API_KEY,
			secretKey: process.env.IYZICO_SECRET_KEY,
			uri: process.env.IYZICO_URI
		});

		iyzipay.payment.create(paymentInfo, function (err: any, result: any) {
			if (result) {
				saveBasket(paymentInfo);
				console.log(result);
				return result;
			}
			console.log(err);
			return err;
		});
	} else return 'error';
};
