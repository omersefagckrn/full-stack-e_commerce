import * as Component from 'components';
import * as Pages from 'pages';
import { FC } from 'react';
import { Navigate, Outlet, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { useAppSelector } from 'redux/store';

const PrivateRoute: FC = () => {
	const { isAuth } = useAppSelector((state) => state.auth);

	return isAuth ? <Outlet /> : <Navigate to='/' replace />;
};

const AdminPrivateRoute: FC = () => {
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

			<Route path='product/:id' element={<Pages.ProductDetails />} />

			<Route element={<PrivateRoute />}>
				<Route path='user' element={<Component.Profile />}>
					<Route index path='profile/information' element={<Pages.Profile />} />
					<Route path='profile/edit' element={<Pages.EditProfile />} />
					<Route path='profile/address' element={<Pages.Address />} />
					<Route path='profile/orders' element={<Pages.Orders />} />
				</Route>
				<Route path='user/checkout' element={<Pages.Checkout />} />
			</Route>

			<Route element={<AdminPrivateRoute />}>
				<Route path='panel' element={<Component.Panel />}>
					<Route index path='products' element={<Pages.PanelProducts />} />
					<Route path='orders' element={<Pages.PanelOrders />} />
				</Route>
			</Route>
		</>
	)
);

export default router;
