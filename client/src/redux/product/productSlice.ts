import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiHelper } from 'helper/api';
import type { IProduct, productReduxState } from 'types/redux/product';

export const getAllProducts = createAsyncThunk('products/getAllProducts', async (_, thunkAPI) => {
	try {
		const response = await apiHelper.get('/api/products');
		if (response.status === 200) {
			return response.data;
		}
	} catch (error: any) {
		const message = (error.response && error.response.data.message) || error.message;
		return thunkAPI.rejectWithValue(message);
	}
});

export const getProductById = createAsyncThunk('products/getProductById', async (id: string | undefined, thunkAPI) => {
	try {
		const response = await apiHelper.get(`/api/products/${id}`);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error: any) {
		const message = (error.response && error.response.data.message) || error.message;
		return thunkAPI.rejectWithValue(message);
	}
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: string | undefined, thunkAPI) => {
	try {
		const response = await apiHelper.delete(`/api/products/${id}`, {
			headers: {
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

export const createProduct = createAsyncThunk('products/createProduct', async (product: IProduct, thunkAPI) => {
	try {
		const response = await apiHelper.post(`/api/products`, product, {
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

export const updateProduct = createAsyncThunk('products/updateProduct', async (product: any, thunkAPI) => {
	try {
		const response = await apiHelper.put(`/api/products/${product._id as unknown}`, product, {
			headers: {
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

const initialState = {
	products: [] as IProduct[],
	product: null as IProduct | null,
	isLoadingGetAllProduct: false,
	isSuccessGetAllProduct: false,
	isErrorGetAllProduct: false,
	errorMessageGetAllProduct: null as string | null,

	isLoadingGetProductById: false,
	isSuccessGetProductById: false,
	isErrorGetProductById: false,
	errorMessageGetProductById: null as string | null,

	isLoadingDeleteProduct: false,
	isSuccessDeleteProduct: false,
	isErrorDeleteProduct: false,
	errorMessageDeleteProduct: null as string | null,

	isLoadingCreateProduct: false,
	isSuccessCreateProduct: false,
	isErrorCreateProduct: false,
	errorMessageCreateProduct: null as string | null,

	isLoadingUpdateProduct: false,
	isSuccessUpdateProduct: false,
	isErrorUpdateProduct: false,
	errorMessageUpdateProduct: null as string | null
} as productReduxState;

export const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		reset: () => initialState
	},
	extraReducers: (builder) => {
		builder.addCase(getAllProducts.pending, (state) => {
			state.isLoadingGetAllProduct = true;
			state.isSuccessGetAllProduct = false;
			state.isErrorGetAllProduct = false;
			state.errorMessageGetAllProduct = null;
		});
		builder.addCase(getAllProducts.fulfilled, (state, action) => {
			state.isLoadingGetAllProduct = false;
			state.isSuccessGetAllProduct = true;
			state.isErrorGetAllProduct = false;
			state.products = action.payload;
		});
		builder.addCase(getAllProducts.rejected, (state, action) => {
			state.isLoadingGetAllProduct = false;
			state.isSuccessGetAllProduct = false;
			state.isErrorGetAllProduct = true;
			state.errorMessageGetAllProduct = action.payload as string;
		});

		builder.addCase(getProductById.pending, (state) => {
			state.isLoadingGetProductById = true;
			state.isSuccessGetProductById = false;
			state.isErrorGetProductById = false;
			state.errorMessageGetProductById = null;
		});
		builder.addCase(getProductById.fulfilled, (state, action) => {
			state.isLoadingGetProductById = false;
			state.isSuccessGetProductById = true;
			state.isErrorGetProductById = false;
			state.product = action.payload;
		});
		builder.addCase(getProductById.rejected, (state, action) => {
			state.isLoadingGetProductById = false;
			state.isSuccessGetProductById = false;
			state.isErrorGetProductById = true;
			state.errorMessageGetProductById = action.payload as string;
		});
	}
});

export const { reset } = productSlice.actions;

export default productSlice.reducer;
