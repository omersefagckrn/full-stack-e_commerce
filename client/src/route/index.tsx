import * as Component from 'components';
import * as Pages from 'pages';
import { FC } from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route } from 'react-router-dom';
import { useAppSelector } from 'redux/store';

const PrivateRoute: FC = () => {
	const { isAuth } = useAppSelector((state) => state.auth);

	return isAuth ? <Outlet /> : <Navigate to='/' replace />;
};

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='/' element={<Pages.Dashboard />} />
			<Route path='*' element={<Navigate to='/' replace />} />

			<Route path='auth' element={<Component.Auth />}>
				<Route index path='login' element={<Pages.Login />} />
				<Route path='register' element={<Pages.Register />} />
			</Route>

			<Route index path='product/:id' element={<Pages.ProductDetails />} />

			<Route element={<PrivateRoute />}>
				<Route path='user/profile' element={<Component.Profile />}>
					<Route index path='information' element={<Pages.Profile />} />
					<Route path='edit' element={<Pages.EditProfile />} />
				</Route>
				<Route path='user/checkout' element={<Pages.Checkout />} />
			</Route>
		</>
	)
);

export default router;
