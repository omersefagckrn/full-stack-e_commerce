import Iyzipay from 'iyzipay-ts';
import { BasketItem, Buyer, IngAddress, PaymentCard, IPaymentRequest, IPaymentFailResponse, IPaymentResponse, ItemTransaction } from '../../types/Payment/Payment.types';
import { RequestBuilder } from './paymentRequestBuilder'
import { CreatePaymentRequest } from 'iyzipay-ts/dist/resources/models';
import { SaveOrder } from './saveBasket';

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
}, user_id: string):Promise<any> => {
    let paymentController:any = new Iyzipay({
        apiKey: (process.env.IYZICO_API_KEY as string),
        secretKey: (process.env.IYZICO_SECRET as string),
        uri: (process.env.IYZICO_URI as string)
    });    
    const request: IPaymentRequest = RequestBuilder(body);
    let response = await paymentController.payment.create(request as CreatePaymentRequest) as (IPaymentResponse | IPaymentFailResponse);
    if(response.status === "success")
    {
        try
        {
            response = response as IPaymentResponse;
            SaveOrder(request, user_id, response.cardType, response.paymentId);
            return {
                status:"success",
                message: "Ürün ödemesi başarıyla tamamlandı.",
                requirement: "DISPATCH_ORDERS"
            }
        }
        catch(err)
        {
            return {
                status:"error",
                message: err,
                requirement:""
            }
        }
        paymentController = null;
    }
    else
        response = response as IPaymentFailResponse;
    return response;
}