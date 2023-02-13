import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiHelper } from 'helper/api';
import { IUser, profileReduxState } from 'types/redux/profile';

export const getUserProfile = createAsyncThunk('profile/getUserProfile', async (_, thunkAPI) => {
	try {
		const response = await apiHelper.get('/api/users/profile', {
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') as string) || ''}`,
				'Content-Type': 'application/json'
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
	user: null as IUser | null,
	isLoadingGetUser: false,
	isSuccessGetUser: false,
	isErrorGetUser: false,
	errorMessageGetUser: null as string | null
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
	}
});

export const { reset } = profileSlice.actions;

export default profileSlice.reducer;
