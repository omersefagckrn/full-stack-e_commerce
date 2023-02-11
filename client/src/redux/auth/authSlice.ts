import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, registerUser } from './api.services';

type AuthLoginState = {
	user: string | null;

	isErrorLogin: boolean;
	isLoadingLogin: boolean;
	isSuccessLogin: boolean;
	messageLogin: string;

	isLoadingLogout: boolean;
	isErrorLogout: boolean;
	isSuccessLogout: boolean;

	isLoadingRegister: boolean;
	isErrorRegister: boolean;
	isSuccessRegister: boolean;
	messageRegister: string;

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

	isLoadingRegister: false,
	isErrorRegister: false,
	isSuccessRegister: false,
	messageRegister: '',

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

export const register = createAsyncThunk(
	'auth/register',
	async (
		user: {
			name: string;
			surname: string;
			email: string;
			password: string;
		},
		thunkAPI
	) => {
		try {
			return await registerUser(user.name, user.surname, user.email, user.password);
		} catch (error) {
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

		builder.addCase(register.pending, (state) => {
			state.isLoadingRegister = true;
			state.isErrorRegister = false;
			state.isSuccessRegister = false;
		});
		builder.addCase(register.fulfilled, (state, action) => {
			state.isLoadingRegister = false;
			state.isErrorRegister = false;
			state.isSuccessRegister = true;
			state.messageRegister = 'Successfully registered!';
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
