import { Date as mongooseDate } from "mongoose"
import Orders, { Order, IPaymentRequest } from "../../models/Order"
export const saveBasket = async(data: IPaymentRequest) => {
    const newOrder: Order = {
        user_id: data.user_id,
        basket_id: data.basket_id,
        orderItems: data.basketItems,
        billingAddress: data.billingAddress,
        shippingAddress: data.shippingAddress,
        taxPrice: ((data.price as number) * 18) / 100,
        shippingPrice: 0,
        totalPrice:data.paidPrice,
        isDelivered: false,
        isDeliveredToShip: false
    }
    Orders.create(newOrder);
}


/*
user_id: string,
	basket_id: string,
	orderItems: IBasketItem[],
	billingAddress: IAddress,
	shippingAddress: IAddress,
	itemsPrice: Number,
	taxPrice: Number,
	shippingPrice?:Number,
	totalPrice: Number,
	paidAt: Date,
	isDelivered: Boolean,
isDeliveredToShip: Boolean
*/