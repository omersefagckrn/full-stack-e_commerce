import Iyzipay from 'iyzipay-ts';
import { BasketItem, Buyer, IngAddress, PaymentCard, IPaymentRequest, IPaymentFailResponse, IPaymentResponse } from '../../types/Payment/Payment.types';
import { RequestBuilder } from './paymentRequestBuilder'

export const createPayment = async(body: {
    price:           string,
    paidPrice:       string,
    installment:     string,
    paymentCard:     PaymentCard,
    buyer:           Buyer,
    shippingAddress: IngAddress,
    billingAddress:  IngAddress,
    basketItems:     BasketItem[],
    currency: string,
}):Promise<IPaymentResponse | IPaymentFailResponse> => {
    const paymentController = new Iyzipay({
        apiKey: process.env.IYZICO_API_KEY as string,
        secretKey: process.env.IYZICO_SECRET as string,
        uri: process.env.IYZICO_URI as string
    });
    const request: IPaymentRequest = RequestBuilder(body);
    console.log(request);
    
    let response = await paymentController.payment.create(request) as (IPaymentResponse | IPaymentFailResponse);
    return response;
    
}