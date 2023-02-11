import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route } from 'react-router-dom';

import * as Pages from 'pages';
import { useAppSelector } from 'redux/store';

const PrivateRoute = () => {
	const { isAuth } = useAppSelector((state) => state.auth);
	return isAuth ? <Navigate to='/' replace /> : <Outlet />;
};

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route element={<PrivateRoute />}></Route>

			<Route path='/' element={<Pages.Dashboard />} />
			<Route path='/login' element={<Pages.Login />} />
			<Route path='/register' element={<Pages.Register />} />
		</>
	)
);

export default router;
