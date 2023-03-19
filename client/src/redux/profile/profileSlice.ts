import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiHelper } from 'helper/api';
import type { IAddress, IUser, profileReduxState } from 'types/redux/profile';

export const getUserProfile = createAsyncThunk('profile/getUserProfile', async (_, thunkAPI) => {
	try {
		const response = await apiHelper.get('/api/users/profile', {
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

export const updateUserProfile = createAsyncThunk(
	'profile/updateUserProfile',
	async ({ name, surname, email, phone }: { email: string | undefined; name: string | undefined; surname: string | undefined; phone: string | undefined }, thunkAPI) => {
		try {
			const response = await apiHelper.put(
				'/api/users/profile',
				{
					name,
					surname,
					email,
					phone
				},
				{
					headers: {
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

export const getUserAddress = createAsyncThunk('profile/getUserAddress', async (userId: string | undefined, thunkAPI) => {
	try {
		const response = await apiHelper.get(`/api/users/${userId}/get-address`, {
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') as string) || ''}`
			}
		});

		if (response.status === 200) {
			return response.data;
		}

		return thunkAPI.rejectWithValue(response.data.message);
	} catch (error: any) {
		const message = (error.response && error.response.data.message) || error.message;
		return thunkAPI.rejectWithValue(message);
	}
});

export const deleteUserAddress = createAsyncThunk('profile/deleteUserAddress', async (addressId: string | undefined, thunkAPI) => {
	try {
		const response = await apiHelper.delete(`/api/users/${addressId}/delete-address`, {
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') as string) || ''}`
			}
		});

		if (response.status === 200) {
			return response.data;
		}

		return thunkAPI.rejectWithValue(response.data.message);
	} catch (error: any) {
		const message = (error.response && error.response.data.message) || error.message;
		return thunkAPI.rejectWithValue(message);
	}
});

export const editUserAddress = createAsyncThunk(
	'profile/editUserAddress',
	async (
		{
			addressId,
			title,
			address,
			zip_code,
			city_name,
			country_name
		}: {
			addressId: string | undefined;
			title: string | undefined;
			address: string | undefined;
			zip_code: string | undefined;
			city_name: string | undefined;
			country_name: string | undefined;
		},
		thunkAPI
	) => {
		try {
			const response = await apiHelper.put(
				`/api/users/${addressId}/update-address`,
				{
					title,
					address,
					zip_code,
					city_name,
					country_name
				},
				{
					headers: {
						Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') as string) || ''}`
					}
				}
			);

			if (response.status === 201) {
				return response.data;
			}

			return thunkAPI.rejectWithValue(response.data.message);
		} catch (error: any) {
			const message = (error.response && error.response.data.message) || error.message;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const addUserAddress = createAsyncThunk(
	'profile/addUserAddress',
	async (
		{
			title,
			address,
			zip_code,
			city_name,
			country_name
		}: {
			title: string | undefined;
			address: string | undefined;
			zip_code: string | undefined;
			city_name: string | undefined;
			country_name: string | undefined;
		},
		thunkAPI
	) => {
		try {
			const response = await apiHelper.post(
				'/api/users/add-address',
				{
					title,
					address,
					zip_code,
					city_name,
					country_name
				},
				{
					headers: {
						Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') as string) || ''}`
					}
				}
			);

			if (response.status === 201) {
				return response.data;
			}

			return thunkAPI.rejectWithValue(response.data.message);
		} catch (error: any) {
			const message = (error.response && error.response.data.message) || error.message;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

const initialState = {
	user: null as IUser | null,
	address: null as IAddress | null,
	isLoadingGetUser: false,
	isSuccessGetUser: false,
	isErrorGetUser: false,
	errorMessageGetUser: null as string | null,

	isLoadingUpdateUser: false,
	isSuccessUpdateUser: false,
	isErrorUpdateUser: false,
	errorMessageUpdateUser: null as string | null,

	isLoadingGetUserAddress: false,
	isSuccessGetUserAddress: false,
	isErrorGetUserAddress: false,
	errorMessageGetUserAddress: null as string | null,

	isLoadingDeleteUserAddress: false,
	isSuccessDeleteUserAddress: false,
	isErrorDeleteUserAddress: false,
	errorMessageDeleteUserAddress: null as string | null,

	isLoadingEditUserAddress: false,
	isSuccessEditUserAddress: false,
	isErrorEditUserAddress: false,
	errorMessageEditUserAddress: null as string | null,

	isLoadingAddUserAddress: false,
	isSuccessAddUserAddress: false,
	isErrorAddUserAddress: false,
	errorMessageAddUserAddress: null as string | null
} as profileReduxState;

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		reset: () => initialState
	},
	extraReducers: (builder) => {
		builder.addCase(getUserProfile.pending, (state) => {
			state.isLoadingGetUser = true;
			state.isSuccessGetUser = false;
			state.isErrorGetUser = false;
			state.errorMessageGetUser = null;
		});
		builder.addCase(getUserProfile.fulfilled, (state, action) => {
			state.isLoadingGetUser = false;
			state.isSuccessGetUser = true;
			state.isErrorGetUser = false;
			state.errorMessageGetUser = null;
			state.user = action.payload as IUser;
		});
		builder.addCase(getUserProfile.rejected, (state, action) => {
			state.isLoadingGetUser = false;
			state.isSuccessGetUser = false;
			state.isErrorGetUser = true;
			state.errorMessageGetUser = action.payload as string;
		});

		builder.addCase(updateUserProfile.pending, (state) => {
			state.isLoadingUpdateUser = true;
			state.isSuccessUpdateUser = false;
			state.isErrorUpdateUser = false;
			state.errorMessageUpdateUser = null;
		});
		builder.addCase(updateUserProfile.fulfilled, (state, action) => {
			state.isLoadingUpdateUser = false;
			state.isSuccessUpdateUser = true;
			state.isErrorUpdateUser = false;
			state.errorMessageUpdateUser = null;
		});
		builder.addCase(updateUserProfile.rejected, (state, action) => {
			state.isLoadingUpdateUser = false;
			state.isSuccessUpdateUser = false;
			state.isErrorUpdateUser = true;
			state.errorMessageUpdateUser = action.payload as string;
		});

		builder.addCase(getUserAddress.pending, (state) => {
			state.isLoadingGetUserAddress = true;
			state.isSuccessGetUserAddress = false;
			state.isErrorGetUserAddress = false;
			state.errorMessageGetUserAddress = null;
		});

		builder.addCase(getUserAddress.fulfilled, (state, action) => {
			state.isLoadingGetUserAddress = false;
			state.isSuccessGetUserAddress = true;
			state.isErrorGetUserAddress = false;
			state.errorMessageGetUserAddress = null;
			state.address = action.payload as IAddress[];
		});

		builder.addCase(getUserAddress.rejected, (state, action) => {
			state.isLoadingGetUserAddress = false;
			state.isSuccessGetUserAddress = false;
			state.isErrorGetUserAddress = true;
			state.errorMessageGetUserAddress = action.payload as string;
		});

		builder.addCase(deleteUserAddress.pending, (state) => {
			state.isLoadingDeleteUserAddress = true;
			state.isSuccessDeleteUserAddress = false;
			state.isErrorDeleteUserAddress = false;
			state.errorMessageDeleteUserAddress = null;
		});

		builder.addCase(deleteUserAddress.fulfilled, (state, action) => {
			state.isLoadingDeleteUserAddress = false;
			state.isSuccessDeleteUserAddress = true;
			state.isErrorDeleteUserAddress = false;
			state.errorMessageDeleteUserAddress = action.payload as string;
		});

		builder.addCase(deleteUserAddress.rejected, (state, action) => {
			state.isLoadingDeleteUserAddress = false;
			state.isSuccessDeleteUserAddress = false;
			state.isErrorDeleteUserAddress = true;
			state.errorMessageDeleteUserAddress = action.payload as string;
		});

		builder.addCase(editUserAddress.pending, (state) => {
			state.isLoadingEditUserAddress = true;
			state.isSuccessEditUserAddress = false;
			state.isErrorEditUserAddress = false;
			state.errorMessageEditUserAddress = null;
		});

		builder.addCase(editUserAddress.fulfilled, (state, action) => {
			state.isLoadingEditUserAddress = false;
			state.isSuccessEditUserAddress = true;
			state.isErrorEditUserAddress = false;
			state.errorMessageEditUserAddress = action.payload as string;
		});

		builder.addCase(editUserAddress.rejected, (state, action) => {
			state.isLoadingEditUserAddress = false;
			state.isSuccessEditUserAddress = false;
			state.isErrorEditUserAddress = true;
			state.errorMessageEditUserAddress = action.payload as string;
		});

		builder.addCase(addUserAddress.pending, (state) => {
			state.isLoadingAddUserAddress = true;
			state.isSuccessAddUserAddress = false;
			state.isErrorAddUserAddress = false;
			state.errorMessageAddUserAddress = null;
		});

		builder.addCase(addUserAddress.fulfilled, (state, action) => {
			state.isLoadingAddUserAddress = false;
			state.isSuccessAddUserAddress = true;
			state.isErrorAddUserAddress = false;
			state.errorMessageAddUserAddress = action.payload as string;
		});

		builder.addCase(addUserAddress.rejected, (state, action) => {
			state.isLoadingAddUserAddress = false;
			state.isSuccessAddUserAddress = false;
			state.isErrorAddUserAddress = true;
			state.errorMessageAddUserAddress = action.payload as string;
		});
	}
});

export const { reset } = profileSlice.actions;

export default profileSlice.reducer;
