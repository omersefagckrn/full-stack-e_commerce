import Iyzipay from 'iyzipay-ts';
import { CreatePaymentRequest } from 'iyzipay-ts/dist/resources/models';
import { BasketItem, Buyer, IPaymentFailResponse, IPaymentRequest, IPaymentResponse, IngAddress, PaymentCard } from '../../types/Payment/Payment.types';
import { RequestBuilder } from './paymentRequestBuilder';
import { SaveOrder } from './saveBasket';
import Product, { IProduct } from '../../models/Product';

export const createPayment = async (
	body: {
		price: string;
		paidPrice: string;
		installment: string;
		paymentCard: PaymentCard;
		buyer: Buyer;
		shippingAddress: IngAddress;
		billingAddress: IngAddress;
		basketItems: BasketItem[];
		currency: string;
	},
	user_id: string
): Promise<any> => {
	let paymentController: any = new Iyzipay({
		apiKey: process.env.IYZICO_API_KEY as string,
		secretKey: process.env.IYZICO_SECRET as string,
		uri: process.env.IYZICO_URI as string
	});
	const request: IPaymentRequest = RequestBuilder(body);
	let response = (await paymentController.payment.create(request as CreatePaymentRequest)) as IPaymentResponse | IPaymentFailResponse;
	if (response.status === 'success') {
		try {
			response = response as IPaymentResponse;
			await SaveOrder(request, user_id, response.cardType, response.paymentId, response.itemTransactions);
			return response;
		} catch (err) {
			console.log(err);
			return response;
		}
		paymentController = null;
	} else return response as IPaymentFailResponse;
};
export const productCountChecker = (product: IProduct): boolean => {
	return product.countInStock > 0;
	
}
