import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { addToCard, deleteAllItemQuantity, removeFromCard } from 'redux/card/cardSlice';
import { IProduct } from 'types/redux/product';
import { AppToast } from './toast';

export const getStock = (stock: number | undefined) => {
	if (stock === undefined) {
		return {
			stock: 'bg-redsoft',
			text: 'No stock information'
		};
	}
	if (stock === 0) {
		return {
			stock: 'bg-redsoft',
			text: 'Out stock'
		};
	}
	if (stock >= 0 && stock <= 100)
		return {
			stock: 'bg-redsoft',
			text: 'Low'
		};
	if (stock >= 100 && stock <= 200)
		return {
			stock: 'bg-purple',
			text: 'Medium'
		};
	if (stock >= 200)
		return {
			stock: 'bg-green',
			text: 'High'
		};
};

export const formatCurrency = (value: number) => {
	return value.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
};

export const addCard = (product: IProduct | null, dispatch: Dispatch<AnyAction>) => {
	if (localStorage.getItem('user')) {
		dispatch(addToCard({ product }));
	} else {
		return AppToast({
			type: 'error',
			message: 'You must be logged in!'
		});
	}
};

export const removeCard = (product: IProduct, dispatch: Dispatch<AnyAction>) => {
	dispatch(removeFromCard({ product }));
};

export const handleDeleteAllItemQuantity = (product: IProduct, dispatch: Dispatch<AnyAction>) => {
	dispatch(deleteAllItemQuantity({ product }));
};

interface Category {
	name: string;
}

export const categories: Category[] = [
	{
		name: 'Electronics'
	},
	{
		name: 'Man'
	},
	{
		name: 'Household Appliances'
	},
	{
		name: 'Glasses'
	},
	{
		name: 'Health'
	},
	{
		name: 'Woman'
	},
	{
		name: 'Gift'
	}
];
