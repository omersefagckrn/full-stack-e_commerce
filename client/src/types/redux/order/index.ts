///////////////////////////PAYMENT REQUEST ////////////////////////////////
export interface IPaymentRequest {
	locale: string; // api set this variable
	conversationId: string; // api set this variable
	price: string; // come from request body
	paidPrice: string; // come from request body
	installment: string; // come from request body
	paymentChannel: string; // api set this variable
	basketId: string; // api set this variable
	paymentGroup: string; // api set this variable
	paymentCard: PaymentCard; // come from request body
	buyer: Buyer; // come from request body
	shippingAddress: IngAddress; // come from request body
	billingAddress: IngAddress; // come from request body
	basketItems: BasketItem[]; // come from request body
	currency: string; // come from request body
}

export interface BasketItem {
	id: string;
	price: string;
	name: string;
	category1: string;
	category2: string;
	itemType: string;
}

export interface IngAddress {
	address: string;
	zipCode: string;
	contactName: string;
	city: string;
	country: string;
}
export type IngAddressType = IngAddress;

export interface Buyer {
	id: string;
	name: string;
	surname: string;
	identityNumber: string;
	email: string;
	gsmNumber: string;
	registrationDate: string;
	lastLoginDate: string;
	registrationAddress: string;
	city: string;
	country: string;
	zipCode: string;
	ip: string;
}

export interface PaymentCard {
	cardHolderName: string;
	cardNumber: string;
	expireYear: string;
	expireMonth: string;
	cvc: string;
	registerCard: string;
}

export type orderReduxState = {
	paymentResponse: IPaymentResponse;
	isLoadingCreateOrder: boolean;
	isSuccessCreateOrder: boolean;
	isErrorCreateOrder: boolean;
	errorMessageCreateOrder: string;
};

export interface IPaymentResponse {
	status: string;
	message: string;
	requirement: string;
}
