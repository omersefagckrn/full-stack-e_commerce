import { FC, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';

const Navigation: FC = () => {
	const navigate = useNavigate();
	const appDispatch = useAppDispatch();
	const { isErrorLogout, isSuccessLogout, isAuth } = useAppSelector((state) => state.auth);

	const logoutUser = async () => {
		await appDispatch(logout());
	};

	useEffect(() => {
		if (isErrorLogout) {
			toast.error('Something went wrong!');
		}

		if (isSuccessLogout) {
			toast.success('Logged out successfully!');
			navigate(0);
			appDispatch(reset());
		}
	}, [isErrorLogout, isSuccessLogout, navigate, appDispatch]);

	return (
		<div className='bg-[#d2afff]'>
			<div className='lg:max-w-navigation lg:mx-auto'>
				<nav className='flex items-center justify-between flex-wrap py-4'>
					<div onClick={() => navigate('/')} className='text-black text-3xl font-bold cursor-pointer'>
						Home
					</div>
					<div>
						{isAuth ? (
							<div className='flex items-center space-x-2'>
								<div className='text-black text-lg font-semibold'>Profile</div>
								<div onClick={logoutUser} className='text-black text-lg font-semibold cursor-pointer'>
									Logout
								</div>
							</div>
						) : (
							<div className='flex items-center space-x-2'>
								<div onClick={() => navigate('/login')} className='text-black text-lg font-semibold cursor-pointer'>
									Login
								</div>
								<div onClick={() => navigate('/register')} className='text-black text-lg font-semibold cursor-pointer'>
									Register
								</div>
							</div>
						)}
					</div>
				</nav>
			</div>
		</div>
	);
};

export default Navigation;
