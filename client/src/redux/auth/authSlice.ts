import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser } from './api.services';

type AuthLoginState = {
	user: string | null;

	isErrorLogin: boolean;
	isLoadingLogin: boolean;
	isSuccessLogin: boolean;
	messageLogin: string;

	isLoadingLogout: boolean;
	isErrorLogout: boolean;
	isSuccessLogout: boolean;

	isAuth: boolean;
};

const initialState: AuthLoginState = {
	user: JSON.parse(localStorage.getItem('user') as string) || null,

	isLoadingLogin: false,
	isErrorLogin: false,
	isSuccessLogin: false,
	messageLogin: '',

	isLoadingLogout: false,
	isSuccessLogout: false,
	isErrorLogout: false,

	isAuth: JSON.stringify(localStorage.getItem('user')) !== 'null'
};

export const login = createAsyncThunk(
	'auth/login',
	async (
		user: {
			email: string;
			password: string;
		},
		thunkAPI
	) => {
		try {
			return await loginUser(user.email, user.password);
		} catch (error) {
			const message = (error.response && error.response.data.message) || error.message;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const logout = createAsyncThunk('auth/logout', async () => {
	logoutUser();
});

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
			state.user = action.payload.token;
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
	}
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
