export interface ICancelPaymentRequest {
    locale:         string;
    conversationId: string;
    paymentId:      string;
    ip:             string;
}
export interface ICancelPaymentResponse {
    status:         string;
    locale:         string;
    systemTime:     number;
    conversationId: string;
    paymentId:      string;
    price:          number;
    currency:       string;
}

export interface IRefundPaymentRequest {
    locale: string;
    conversationId: string;
    paymentTransactionId: string;
    price: string;
    ip: string;
}
export interface IRefundPaymentResponse {
    status: string;
    locale: string;
    systemTime: number;
    conversationId: string;
    paymentId: string;
    paymentTransactionId: string;
    price: number;
    currency: string;
}