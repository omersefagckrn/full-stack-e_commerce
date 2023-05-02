import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiHelper } from 'helper/api';
import type { AuthReduxState } from 'types/redux/auth';

const initialState: AuthReduxState = {
	user: JSON.parse(localStorage.getItem('user') as string) ?? null,

	isLoadingLogin: false,
	isErrorLogin: false,
	isSuccessLogin: false,
	messageLogin: '',

	isLoadingLogout: false,
	isSuccessLogout: false,
	isErrorLogout: false,

	isLoadingRegister: false,
	isErrorRegister: false,
	isSuccessRegister: false,
	messageRegister: '',

	isAuth: JSON.stringify(localStorage.getItem('user')) !== 'null',
	isAdmin: JSON.stringify(localStorage.getItem('isAdmin')) !== 'null',
	id: JSON.parse(localStorage.getItem('id') as string)
};

export const logout = createAsyncThunk('auth/logout', async () => {
	localStorage.removeItem('user');
	localStorage.removeItem('isAdmin');
	localStorage.removeItem('id');
});

export const login = createAsyncThunk(
	'register/register',
	async (
		{
			email,
			password
		}: {
			email: string;
			password: string;
		},
		thunkApi
	) => {
		try {
			const response = await apiHelper.post('/api/users/login', {
				email,
				password
			});
			if (response.data?.token) {
				localStorage.setItem('user', JSON.stringify(response.data?.token));
				localStorage.setItem('id', JSON.stringify(response.data?._id));
				if (response.data?.isAdmin) {
					localStorage.setItem('isAdmin', JSON.stringify(response.data?.isAdmin));
					return response.data;
				}
				return response.data;
			}
		} catch (error: any) {
			const message = (error.response && error.response.data.message) || error.message;
			return thunkApi.rejectWithValue(message);
		}
	}
);

export const register = createAsyncThunk(
	'auth/register',
	async (
		{
			name,
			surname,
			email,
			password,
			phone
		}: {
			name: string;
			surname: string;
			email: string;
			password: string;
			phone: string;
		},
		thunkAPI
	) => {
		try {
			const response = await apiHelper.post('/api/users/register', {
				name,
				surname,
				email,
				password,
				phone
			});
			if (response.status === 201) {
				return response.data;
			}
		} catch (error: any) {
			const message = (error.response && error.response.data.message) || error.message;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: () => initialState
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.isLoadingLogin = true;
			state.isErrorLogin = false;
			state.isSuccessLogin = false;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.isLoadingLogin = false;
			state.isErrorLogin = false;
			state.isSuccessLogin = true;
			state.user = action.payload;
			state.messageLogin = 'Successfully logged in!';
			state.isAuth = true;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.isLoadingLogin = false;
			state.isErrorLogin = true;
			state.isSuccessLogin = false;
			state.messageLogin = action.payload as string;
		});

		builder.addCase(logout.pending, (state) => {
			state.isLoadingLogout = true;
			state.isErrorLogout = false;
			state.isSuccessLogout = false;
		});
		builder.addCase(logout.fulfilled, (state) => {
			state.isLoadingLogout = false;
			state.isErrorLogout = false;
			state.isSuccessLogout = true;
			state.isAuth = false;
			state.user = null;
		});
		builder.addCase(logout.rejected, (state) => {
			state.isLoadingLogout = false;
			state.isErrorLogout = true;
			state.isSuccessLogout = false;
		});

		builder.addCase(register.pending, (state) => {
			state.isLoadingRegister = true;
			state.isErrorRegister = false;
			state.isSuccessRegister = false;
		});
		builder.addCase(register.fulfilled, (state, action) => {
			state.isLoadingRegister = false;
			state.isErrorRegister = false;
			state.isSuccessRegister = true;
			state.messageRegister = action.payload.message as string;
		});
		builder.addCase(register.rejected, (state, action) => {
			state.isLoadingRegister = false;
			state.isErrorRegister = true;
			state.isSuccessRegister = false;
			state.messageRegister = action.payload as string;
		});
	}
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
