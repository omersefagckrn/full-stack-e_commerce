import { Date, Document, model, mongo, NumberExpression, Schema } from 'mongoose';
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
	user_id: string,
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
	user_id: string,
	basket_id: string,
	orderItems: IBasketItem[],
	billingAddress: IAddress,
	shippingAddress: IAddress,
	taxPrice: Number,
	shippingPrice?:Number,
	totalPrice: Number,
	paidAt?: Date,
	isDelivered: Boolean,
	isDeliveredToShip: Boolean
}

export interface IOrder extends Order, Document {}

const OrderSchema = new Schema(
	{
		user_id: {
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
				id: {
					type: String,
					required: true
				},
				itemType: {
					type: String,
					required: true
				},
				name: {
					type: String,
					required: true
				},
				category1: {
					type: String,
					required: true
				},
				category2: {
					type: String,
					required: false,
					default: ""
				},
				price: {
					type: Number,
					required: true
				}
			}
		],
		billingAddress: {
			contactName: {
				type: String,
				required: true,
			},
			address: {
				type: String,
				required: true
			},
			zipCode: {
				type: String,
				required: true
			},
			city: {
				type: String,
				required: true
			},
			country: {
				type: String,
				required: true
			}
		},
		shippingAddress: {
			contactName: {
				type: String,
				required: true,
			},
			address: {
				type: String,
				required: true
			},
			zipCode: {
				type: String,
				required: true
			},
			city: {
				type: String,
				required: true
			},
			country: {
				type: String,
				required: true
			}
		},
		taxPrice: {
			type: Number,
			required: true
		},
		shippingPrice: {
			type: Number,
			required: false
		},
		totalPrice: {
			type: Number,
			required: true
		},
		paidAt: {
			type: Date,
			required: false,
			default: Date.now()
		},
		isDelivered: {
			type: Boolean,
			required: true,
		},
		isDeliveredToShip: {
			type: Boolean,
			required: true
		}
	},
);

export default model<IOrder>('Orders', OrderSchema);
