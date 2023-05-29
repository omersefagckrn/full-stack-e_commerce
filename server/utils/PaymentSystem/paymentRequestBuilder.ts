import { BasketItem, Buyer, IPaymentRequest, PaymentCard, IngAddress } from '../../types/Payment/Payment.types';
import { generateUniqueID } from '../generators';
import {Types} from 'mongoose';
export const RequestBuilder = (
    body: {
        price:           string,
        paidPrice:       string,
        installment:     string,
        paymentCard:     PaymentCard,
        buyer:           Buyer,
        shippingAddress: IngAddress,
        billingAddress:  IngAddress,
        basketItems:     BasketItem[],
        currency: string,
    }
): IPaymentRequest => {
    let id = new Types.ObjectId();
    const request: IPaymentRequest = {
        locale: "en",
        conversationId: id._id.toString(),
        price: body.price,
        paidPrice: body.paidPrice,
        installment: body.installment,
        paymentChannel: "WEB",
        basketId: generateUniqueID(),
        paymentGroup: "PRODUCT",
        paymentCard: body.paymentCard,
        buyer: body.buyer,
        shippingAddress: body.shippingAddress,
        billingAddress: body.billingAddress,
        basketItems: body.basketItems,
        currency: body.currency,
    }
    return request;
}