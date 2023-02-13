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
			<Route path='/' element={<Pages.Dashboard />} />
			<Route path='*' element={<Navigate to='/' replace />} />

			<Route path='auth' element={<Component.Auth />}>
				<Route index path='login' element={<Pages.Login />} />
				<Route path='register' element={<Pages.Register />} />
			</Route>

			<Route element={<PrivateRoute />}>
				<Route path='user/profile' element={<Component.User />}>
					<Route index path='information' element={<Pages.Profile />} />
					<Route path='edit' element={<Pages.EditProfile />} />
				</Route>
			</Route>
		</>
	)
);

export default router;
