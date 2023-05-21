import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';

import authReducer from './auth/authSlice';
import cardReducer from './card/cardSlice';
import orderReducer from './order/orderSlice';
import productReducer from './product/productSlice';
import profileReducer from './profile/profileSlice';
import themeReducer from './theme/themeSlice';

/* Panel */
import panelOrderReducer from './panel/order/orderSlice';
import panelProductReducer from './panel/product/productSlice';

const appReducer = combineReducers({
	theme: themeReducer,
	auth: authReducer,
	profile: profileReducer,
	products: productReducer,
	card: cardReducer,
	order: orderReducer,
	panel: combineReducers({
		products: panelProductReducer,
		orders: panelOrderReducer
	})
});

const store = configureStore({
	reducer: appReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type AppSelector = typeof store.getState;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
