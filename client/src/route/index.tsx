import * as Component from 'components';
import * as Pages from 'pages';
import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route } from 'react-router-dom';
import { useAppSelector } from 'redux/store';

const PrivateRoute = () => {
	const { isAuth } = useAppSelector((state) => state.auth);
	return isAuth ? <Outlet /> : <Navigate to='/' replace />;
};

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route element={<PrivateRoute />}>
				<Route path='user' element={<Component.User />}>
					<Route index path='profile' element={<Pages.Profile />} />
				</Route>
			</Route>

			<Route path='/' element={<Pages.Dashboard />} />

			<Route path='auth' element={<Component.Auth />}>
				<Route index path='login' element={<Pages.Login />} />
				<Route path='register' element={<Pages.Register />} />
			</Route>
		</>
	)
);

export default router;
