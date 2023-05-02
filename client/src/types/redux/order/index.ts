export interface SubOrdersResponse {
	date: Date;
	order_id: string;
	status: string;
	total_price: number;
	item_count: number;
}

export interface IUserOrderResponse {
	orders: SubOrdersResponse[];
	colors: {
		delivered: string;
		pending: string;
		cancelled: string;
		shipping: string;
	};
}

export type orderReduxState = {
	paymentResponse: IPaymentResponse;
	orders: IUserOrderResponse;
	isLoadingCreateOrder: boolean;
	isSuccessCreateOrder: boolean;
	isErrorCreateOrder: boolean;
	errorMessageCreateOrder: string;

	isLoadingGetOrder: boolean;
	isSuccessGetOrder: boolean;
	isErrorGetOrder: boolean;
	errorMessageGetOrder: string;
};

export interface IPaymentResponse {
	status: string;
	message: string;
	requirement: string;
}
