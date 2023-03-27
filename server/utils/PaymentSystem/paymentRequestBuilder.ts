import { BasketItem, Buyer, IPaymentRequest, PaymentCard, IngAddress } from '../../types/Payment/Payment.types';
import { generateUniqueID } from '../generators';
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
    const request: IPaymentRequest = {
        locale: "tr",
        conversationId: generateUniqueID(),
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