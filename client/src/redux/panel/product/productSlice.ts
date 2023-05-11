import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiHelper } from 'helper/api';
import { IProduct } from 'types/redux/product';

export const getProducts = createAsyncThunk('product/getProducts', async (_, thunkAPI) => {
	try {
		const response = await apiHelper.get('/api/products/admin/products', {
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

export const createProduct = createAsyncThunk('product/createProduct', async (product: any, thunkAPI) => {
	try {
		const response = await apiHelper.post('/api/products/admin/products', product, {
			headers: {
				'Content-Type': 'application/json',
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

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id: string, thunkAPI) => {
	try {
		const response = await apiHelper.delete(`/api/products/admin/products/${id}`, {
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

export const editProduct = createAsyncThunk(
	'product/editProduct',
	async (
		{
			id,
			name,
			price,
			category,
			countInStock,
			description,
			rating,
			image
		}: {
			id: string;
			name: string;
			price: number;
			category: string;
			countInStock: number;
			description: string;
			rating: number;
			image: string;
		},
		thunkAPI
	) => {
		try {
			const response = await apiHelper.put(
				`/api/products/admin/products/${id}`,
				{
					name,
					price,
					category,
					countInStock,
					description,
					rating,
					image
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') as string) || ''}`
					}
				}
			);
			if (response.status === 200) {
				return response.data;
			}
		} catch (error: any) {
			const message = (error.response && error.response.data.message) || error.message;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

const initialState = {
	products: [] as IProduct[],
	isLoadingCreateProduct: false,
	isSuccessCreateProduct: false,
	isErrorCreateProduct: false,
	errorMessageCreateProduct: '',

	isLoadingGetProducts: false,
	isSuccessGetProducts: false,
	isErrorGetProducts: false,
	errorMessageGetProducts: '',

	isLoadingDeleteProduct: false,
	isSuccessDeleteProduct: false,
	isErrorDeleteProduct: false,
	errorMessageDeleteProduct: '',

	isLoadingEditProduct: false,
	isSuccessEditProduct: false,
	isErrorEditProduct: false,
	errorMessageEditProduct: ''
};

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		resetCreateProduct: () => initialState,
		resetDeleteProduct: () => initialState,
		resetEditProduct: () => initialState
	},
	extraReducers: (builder) => {
		builder.addCase(createProduct.pending, (state) => {
			state.isLoadingCreateProduct = true;
		});
		builder.addCase(createProduct.fulfilled, (state) => {
			state.isLoadingCreateProduct = false;
			state.isSuccessCreateProduct = true;
		});
		builder.addCase(createProduct.rejected, (state, action) => {
			state.isLoadingCreateProduct = false;
			state.isErrorCreateProduct = true;
			state.errorMessageCreateProduct = action.payload as string;
		});

		builder.addCase(getProducts.pending, (state) => {
			state.isLoadingGetProducts = true;
		});
		builder.addCase(getProducts.fulfilled, (state, action) => {
			state.isLoadingGetProducts = false;
			state.isSuccessGetProducts = true;
			state.products = action.payload;
		});
		builder.addCase(getProducts.rejected, (state, action) => {
			state.isLoadingGetProducts = false;
			state.isErrorGetProducts = true;
			state.errorMessageGetProducts = action.payload as string;
		});

		builder.addCase(deleteProduct.pending, (state) => {
			state.isLoadingDeleteProduct = true;
		});
		builder.addCase(deleteProduct.fulfilled, (state) => {
			state.isLoadingDeleteProduct = false;
			state.isSuccessDeleteProduct = true;
		});
		builder.addCase(deleteProduct.rejected, (state, action) => {
			state.isLoadingDeleteProduct = false;
			state.isErrorDeleteProduct = true;
			state.errorMessageDeleteProduct = action.payload as string;
		});

		builder.addCase(editProduct.pending, (state) => {
			state.isLoadingEditProduct = true;
		});
		builder.addCase(editProduct.fulfilled, (state) => {
			state.isLoadingEditProduct = false;
			state.isSuccessEditProduct = true;
		});
		builder.addCase(editProduct.rejected, (state, action) => {
			state.isLoadingEditProduct = false;
			state.isErrorEditProduct = true;
			state.errorMessageEditProduct = action.payload as string;
		});
	}
});

export const { resetCreateProduct, resetDeleteProduct, resetEditProduct } = productSlice.actions;

export default productSlice.reducer;
