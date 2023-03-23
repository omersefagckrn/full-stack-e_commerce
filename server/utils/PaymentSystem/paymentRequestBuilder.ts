import { BasketItem, Buyer, IPaymentRequest, PaymentCard, IngAddress } from '../../types/Payment/Payment.types';
import { generateUniqueID } from '../generators';
import { CURRENCY, PAYMENT_CHANNEL, PAYMENT_GROUP } from 'iyzipay-ts';
export const RequestBuilder = (
    price:           string,
    paidPrice:       string,
    installment:     number,
    PaymentCard:     PaymentCard,
    Buyer:           Buyer,
    ShippingAddress: IngAddress,
    BillingAddress:  IngAddress,
    BasketItems:     BasketItem[],
    currency: string,
): IPaymentRequest => {
    const request: IPaymentRequest = {
        locale: "tr",
        conversationId: generateUniqueID(),
        price: price,
        paidPrice: paidPrice,
        installment: installment,
        paymentChannel: "WEB",
        basketId: generateUniqueID(),
        paymentGroup: "PRODUCT",
        paymentCard: PaymentCard,
        buyer: Buyer,
        shippingAddress: ShippingAddress,
        billingAddress: BillingAddress,
        basketItems: BasketItems,
        currency: CURRENCY.TRY
    }
    return request;
}