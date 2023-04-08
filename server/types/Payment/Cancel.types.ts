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