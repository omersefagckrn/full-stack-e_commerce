import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeState = {
	mode: 'light' | 'dark' | string;
};

const initialState: ThemeState = {
	mode: (window.localStorage.getItem('theme') as string) || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
};

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
