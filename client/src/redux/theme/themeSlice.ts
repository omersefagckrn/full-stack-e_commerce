import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ThemeState } from 'types/redux/theme';

const initialState = {
	mode: (window.localStorage.getItem('theme') as string) || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
} as ThemeState;

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<ThemeState>) => {
			window.localStorage.setItem('theme', action.payload.mode);
			state.mode = action.payload.mode;
		}
	}
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
