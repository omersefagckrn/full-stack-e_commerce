import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiHelper } from 'helper/api';
import type { IPaymentResponse, orderReduxState } from 'types/redux/order';

export const createOrder = createAsyncThunk('order/createOrder', async (order: any, thunkAPI) => {
	try {
		const response = await apiHelper.post('/api/orders/new-order', order, {
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') as string) || ''}`
			}
		});
		if (response.status === 201) {
			return response.data;
		}
	} catch (error: any) {
		const message = (error.response && error.response.data.message) || error.message;
		return thunkAPI.rejectWithValue(message);
	}
});

const initialState = {
	paymentResponse: {} as IPaymentResponse,
	isLoadingCreateOrder: false,
	isSuccessCreateOrder: false,
	isErrorCreateOrder: false,
	errorMessageCreateOrder: ''
} as orderReduxState;

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		resetCreateOrder: () => initialState
	},
	extraReducers: (builder) => {
		builder.addCase(createOrder.pending, (state) => {
			state.isLoadingCreateOrder = true;
			state.isSuccessCreateOrder = false;
			state.isErrorCreateOrder = false;
			state.errorMessageCreateOrder = '';
		});
		builder.addCase(createOrder.fulfilled, (state, action) => {
			state.isLoadingCreateOrder = false;
			state.isSuccessCreateOrder = true;
			state.isErrorCreateOrder = false;
			state.errorMessageCreateOrder = '';
			state.paymentResponse = action.payload as IPaymentResponse;
		});
		builder.addCase(createOrder.rejected, (state, action) => {
			state.isLoadingCreateOrder = false;
			state.isSuccessCreateOrder = false;
			state.isErrorCreateOrder = true;
			state.errorMessageCreateOrder = action.payload as string;
		});
	}
});

export const { resetCreateOrder } = orderSlice.actions;

export default orderSlice.reducer;
