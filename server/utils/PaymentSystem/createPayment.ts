import Iyzipay from 'iyzipay-ts';
import { BasketItem, Buyer, IngAddress, PaymentCard, IPaymentRequest, IPaymentFailResponse, IPaymentResponse, ItemTransaction } from '../../types/Payment/Payment.types';
import { RequestBuilder } from './paymentRequestBuilder'
import { json } from 'stream/consumers';
import { CreatePaymentRequest } from 'iyzipay-ts/dist/resources/models';

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
    // const paymentController = new Iyzipay({
    //     apiKey: (process.env.IYZICO_API_KEY as string),
    //     secretKey: (process.env.IYZICO_SECRET as string),
    //     uri: (process.env.IYZICO_URI as string)
    // });
    const paymentController = new Iyzipay({
        apiKey: "sandbox-in97I8lqIHIM1FVeYSNgWy7ojDhVU02d",
        secretKey: "IK1DA6cNA9Htb3O590aHtVISMQc8gGFj",
        uri: "https://sandbox-api.iyzipay.com"
    });    
    const request: IPaymentRequest = RequestBuilder(body);
    let response = await paymentController.payment.create(request as CreatePaymentRequest) as (IPaymentResponse | IPaymentFailResponse);
    if(response.status === "success")
        response = response as IPaymentResponse;
    else
        response = response as IPaymentFailResponse;
    
    
    return response;
    
}