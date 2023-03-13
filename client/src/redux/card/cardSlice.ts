import { createSlice } from '@reduxjs/toolkit';
import { AppCartStorage } from 'helper/storage';
import { AppToast } from 'helper/toast';
import type { cardReduxState } from 'types/redux/card';

const initialState = {
	cards: JSON.parse(sessionStorage.getItem('card') as string) || [],
	cardTotalQuantity: 0,
	cardTotalPrice: 0
} as cardReduxState;

export const cardSlice = createSlice({
	name: 'card',
	initialState,
	reducers: {
		reset: () => initialState,
		addToCard: (state, action) => {
			const { product, quantity } = action.payload;
			const index = state.cards.findIndex((card) => card.product._id === product._id);
			if (index !== -1) {
				state.cards[index].quantity += quantity;
			} else {
				state.cards.push({ product, quantity });
			}

			AppToast({
				message: 'Added to card',
				type: 'success'
			});
			AppCartStorage.setItem('card', JSON.stringify(state.cards));
		},
		removeFromCard: (state, action) => {
			const { product, quantity } = action.payload;
			const index = state.cards.findIndex((card) => card.product._id === product._id);
			if (index !== -1) {
				state.cards[index].quantity -= quantity;
				if (state.cards[index].quantity <= 0) {
					state.cards.splice(index, 1);
				}
			}
			AppToast({
				message: 'Removed from card',
				type: 'success'
			});
			AppCartStorage.setItem('card', JSON.stringify(state.cards));
		},
		deleteAllItemQuantity: (state, action) => {
			const { product } = action.payload;
			const index = state.cards.findIndex((card) => card.product._id === product._id);
			if (index !== -1) {
				state.cards.splice(index, 1);
			}
			AppToast({
				message: 'Removed from card',
				type: 'success'
			});
			AppCartStorage.setItem('card', JSON.stringify(state.cards));
		},
		getTotals: (state) => {
			let cardTotalQuantity = 0;
			let cardTotalPrice = 0;

			state.cards.forEach((card) => {
				cardTotalQuantity += card.quantity;
				cardTotalPrice += card.quantity * card.product.price;
			});

			state.cardTotalQuantity = cardTotalQuantity;
			state.cardTotalPrice = cardTotalPrice;
		}
	}
});

export const { reset, addToCard, removeFromCard, deleteAllItemQuantity, getTotals } = cardSlice.actions;

export default cardSlice.reducer;
