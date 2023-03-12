import { Document, model, Schema } from 'mongoose';
import { IProduct } from './Product';
export interface IPaymentCard
{
    cardHolderName: string,
    cardNumber: string,
    expireMonth: string,
    expireYear: string,
    cvc: string,
    registerCard: string,
}
export interface IBuyer
{
    id: string,
    name: string,
    surname: string,
    identityNumber: string,
    city: string,
    country: string,
    email: string,
    ip: string,
    registrationAddress: string,
    zipCode: string
}
export interface IAddress
{
    contactName: string,
    address: string,
    zipCode: string,
    city: string,
    country: string
}
export interface IBasketItem
{
    id: string,
    itemType: string,
    name: string,
    category1: string,
    category2?: string,
    price: Number
}
export interface IPaymentRequest 
{
    locale: string,
    conversationID: string,
    price: Number,
    paidPrice: Number,
    currency: string,
    installment: string,
    basket_id: string,
    paymentChannel: string,
    paymentGroup: string,
    paymentCard: IPaymentCard,
    buyer: IBuyer,
    shippingAddress: IAddress,
    billingAddress: IAddress,
    basketItems: IBasketItem[];
}

export interface Order {
	user_id: string;
	basket_id: string,
	orderItems: IBasketItem[];
	shippingAddress: IAddress;
	paymentMethod: string;
	itemsPrice: number;
	taxPrice: number;
	shippingPrice: number;
	totalPrice: number;
	isPaid: boolean;
	paidAt: number;
	isDelivered: boolean;
	deliveredAt: number;
}

export interface IOrder extends Order, Document {}

const OrderSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		basket_id: {
			type: String,
			required: true,
		},
		orderItems: [
			{
				name: {
					type: String,
					required: true
				},
				qty: {
					type: Number,
					required: true
				},
				image: {
					type: String,
					required: true
				},
				price: {
					type: Number,
					required: true
				},
				product: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: 'Product'
				}
			}
		],
		billingAddress: {
			address: {
				type: String,
				required: true
			},
			city: {
				type: String,
				required: true
			},
			postalCode: {
				type: String,
				required: true
			},
			country: {
				type: String,
				required: true
			}
		},
		shippingAddress: {
			address: {
				type: String,
				required: true
			},
			city: {
				type: String,
				required: true
			},
			postalCode: {
				type: String,
				required: true
			},
			country: {
				type: String,
				required: true
			}
		},
		itemsPrice: {
			type: Number,
			required: true,
			default: 0.0
		},
		taxPrice: {
			type: Number,
			required: true,
			default: 0.0
		},
		shippingPrice: {
			type: Number,
			required: false,
			default: 0.0
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0
		},
		paidAt: {
			type: Date
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false
		},
		isDeliveredToShip:{
			type:Boolean,
			required: true,
			default: false
		}
	},
	{
		timestamps: true,
		versiyonKey: false
	}
);

export default model<IOrder>('Order', OrderSchema);
