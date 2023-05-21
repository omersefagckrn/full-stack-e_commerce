import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiHelper } from 'helper/api';
import { IAdminOrdersResponse } from 'types/redux/panel';

export const getAdminOrders = createAsyncThunk('order/getAdminOrders', async (_, thunkAPI) => {
	try {
		const response = await apiHelper.get('/api/orders/admin', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') as string) || ''}`
			}
		});

		if (response.status === 200) {
			return response.data;
		}
	} catch (error: any) {
		const message = (error.response && error.response.data.message) || error.message;
		return thunkAPI.rejectWithValue(message);
	}
});

export const toShippingOrder = createAsyncThunk('order/toShippingOrder', async (orderID: string, thunkAPI) => {
	try {
		const response = await apiHelper.put(`/api/orders/admin/to-shipping/${orderID}`, undefined, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') as string) || ''}`
			}
		});

		if (response.status === 200) {
			return response.data;
		}
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

export const cancelOrder = createAsyncThunk('order/cancelOrder', async (orderID: string, thunkAPI) => {
	try {
		const response = await apiHelper.delete(`/api/orders/admin/cancel/${orderID}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') as string) || ''}`
			}
		});

		if (response.status === 200) {
			return response.data;
		}
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});
const initialState = {
	orders: {} as IAdminOrdersResponse,
	isLoadingGetAdminOrders: false,
	isSuccessGetAdminOrders: false,
	isErrorGetAdminOrders: false,
	errorMessageGetAdminOrders: '',

	isLoadingToShippingOrder: false,
	isSuccessToShippingOrder: false,
	isErrorToShippingOrder: false,
	messageToShippingOrder: '' || {},

	isLoadingCancelOrder: false,
	isSuccessCancelOrder: false,
	isErrorCancelOrder: false,
	messageCancelOrder: '' || {}
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		resetOrderState: (state) => {
			state.isLoadingGetAdminOrders = false;
			state.isSuccessGetAdminOrders = false;
			state.isErrorGetAdminOrders = false;
			state.errorMessageGetAdminOrders = '';

			state.isLoadingToShippingOrder = false;
			state.isSuccessToShippingOrder = false;
			state.isErrorToShippingOrder = false;
			state.messageToShippingOrder = '' || {};

			state.isLoadingCancelOrder = false;
			state.isSuccessCancelOrder = false;
			state.isErrorCancelOrder = false;
			state.messageCancelOrder = '' || {};
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getAdminOrders.pending, (state) => {
			state.isLoadingGetAdminOrders = true;
		});
		builder.addCase(getAdminOrders.fulfilled, (state, { payload }) => {
			state.isLoadingGetAdminOrders = false;
			state.isSuccessGetAdminOrders = true;
			state.orders = payload;
		});
		builder.addCase(getAdminOrders.rejected, (state, { payload }) => {
			state.isLoadingGetAdminOrders = false;
			state.isErrorGetAdminOrders = true;
			state.errorMessageGetAdminOrders = payload as string;
		});

		builder.addCase(toShippingOrder.pending, (state) => {
			state.isLoadingToShippingOrder = true;
		});
		builder.addCase(toShippingOrder.fulfilled, (state, { payload }) => {
			state.isLoadingToShippingOrder = false;
			state.isSuccessToShippingOrder = true;
			state.messageToShippingOrder = payload as string;
		});
		builder.addCase(toShippingOrder.rejected, (state, { payload }) => {
			state.isLoadingToShippingOrder = false;
			state.isErrorToShippingOrder = true;
			state.messageToShippingOrder = payload as string;
		});

		builder.addCase(cancelOrder.pending, (state) => {
			state.isLoadingCancelOrder = true;
		});
		builder.addCase(cancelOrder.fulfilled, (state, { payload }) => {
			state.isLoadingCancelOrder = false;
			state.isSuccessCancelOrder = true;
			state.messageCancelOrder = payload as string;
		});

		builder.addCase(cancelOrder.rejected, (state, { payload }) => {
			state.isLoadingCancelOrder = false;
			state.isErrorCancelOrder = true;
			state.messageCancelOrder = payload as string;
		});
	}
});

export const { resetOrderState } = orderSlice.actions;

export default orderSlice.reducer;
