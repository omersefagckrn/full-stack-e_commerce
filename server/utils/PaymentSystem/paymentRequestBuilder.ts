import {generateUniqueID} from '../generators';
import { IPaymentRequest, IAddress, IBasketItem, IBuyer, IPaymentCard } from '../../models/Order';
var Iyzipay = require('iyzipay');


export const paymentRequestBuilder = (
    price: Number,
    paidPrice: Number,
    installment: string,
    card: IPaymentCard,
    buyer: IBuyer,
    shipAddress: IAddress,
    billingAddress: IAddress,
    items: IBasketItem[]
): IPaymentRequest => {
    
    const paymentInfo: IPaymentRequest = 
    {
        locale: Iyzipay.LOCALE.TR,
        conversationID: generateUniqueID(),
        price: price,
        paidPrice: paidPrice,
        currency: Iyzipay.CURRENCY.TRY,
        installment: installment,
        basket_id: generateUniqueID(),
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.LISTING,
        paymentCard: card,
        buyer: buyer,
        shippingAddress: shipAddress,
        billingAddress: billingAddress,
        basketItems: items,
    };
    return paymentInfo;
}

