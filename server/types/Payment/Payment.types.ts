///////////////////////////PAYMENT REQUEST ////////////////////////////////
export interface IPaymentRequest {
    locale:          string; // api set this variable
    conversationId:  string; // api set this variable
    price:           string; // come from request body
    paidPrice:       string; // come from request body
    installment:     string; // come from request body
    paymentChannel:  string; // api set this variable
    basketId:        string; // api set this variable
    paymentGroup:    string; // api set this variable
    paymentCard:     PaymentCard; // come from request body
    buyer:           Buyer; // come from request body
    shippingAddress: IngAddress; // come from request body
    billingAddress:  IngAddress; // come from request body
    basketItems:     BasketItem[]; // come from request body
    currency:        string; // come from request body
}

export interface BasketItem {
    id:        string;
    price:     string;
    name:      string;
    category1: string;
    category2: string;
    itemType:  string;
}

export interface IngAddress {
    address:     string;
    zipCode:     string;
    contactName: string;
    city:        string;
    country:     string;
}
export type IngAddressType = IngAddress;

export interface Buyer {
    id:                  string;
    name:                string;
    surname:             string;
    identityNumber:      string;
    email:               string;
    gsmNumber:           string;
    registrationDate:    string;
    lastLoginDate:       string;
    registrationAddress: string;
    city:                string;
    country:             string;
    zipCode:             string;
    ip:                  string;
}

export interface PaymentCard {
    cardHolderName: string;
    cardNumber:     string;
    expireYear:     string;
    expireMonth:    string;
    cvc:            string;
    registerCard:   string;
}

//////////////////////////////////// Payment Response ////////////////////////////////
export interface IPaymentFailResponse {
    status:         string;
    errorCode:      string;
    errorGroup:     string;
    errorMessage:   string;
    locale:         string;
    systemTime:     number;
    conversationId: string;
}

export interface IPaymentResponse {
    status:                       string;
    locale:                       string;
    systemTime:                   number;
    conversationId:               string;
    price:                        number;
    paidPrice:                    number;
    installment:                  number;
    paymentId:                    string;
    fraudStatus:                  number;
    merchantCommissionRate:       number;
    merchantCommissionRateAmount: number;
    iyziCommissionRateAmount:     number;
    iyziCommissionFee:            number;
    cardType:                     string;
    cardAssociation:              string;
    cardFamily:                   string;
    binNumber:                    string;
    basketId:                     string;
    currency:                     string;
    itemTransactions:             ItemTransaction[];
}

export interface ItemTransaction {
    itemId:                        string;
    paymentTransactionId:          string;
    transactionStatus:             number;
    price:                         number;
    paidPrice:                     number;
    merchantCommissionRate:        number;
    merchantCommissionRateAmount:  number;
    iyziCommissionRateAmount:      number;
    iyziCommissionFee:             number;
    blockageRate:                  number;
    blockageRateAmountMerchant:    number;
    blockageRateAmountSubMerchant: number;
    blockageResolvedDate:          Date;
    subMerchantPrice:              number;
    subMerchantPayoutRate:         number;
    subMerchantPayoutAmount:       number;
    merchantPayoutAmount:          number;
    convertedPayout:               ConvertedPayout;
}

export interface ConvertedPayout {
    paidPrice:                     number;
    iyziCommissionRateAmount:      number;
    iyziCommissionFee:             number;
    blockageRateAmountMerchant:    number;
    blockageRateAmountSubMerchant: number;
    subMerchantPayoutAmount:       number;
    merchantPayoutAmount:          number;
    iyziConversionRate:            number;
    iyziConversionRateAmount:      number;
    currency:                      string;
}
