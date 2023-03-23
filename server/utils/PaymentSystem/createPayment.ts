import { RequestBuilder } from './paymentRequestBuilder'
import { Request } from 'express';

export const createPayment = async(req: Request) => {
    const request = RequestBuilder(
        req.body.price,
        req.body.paidPrice,
        req.body.installment,
        req.body.paymentCard,
        req.body.buyer,
        req.body.shippingAddress,
        req.body.billingAddress,
        req.body.basketItems,
        req.body.currency
    );

}