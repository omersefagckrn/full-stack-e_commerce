import Logo from 'assets/hero/logo.svg';
import { FC, useState } from 'react';
import { BsMenuButtonWideFill } from 'react-icons/bs';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout } from 'redux/auth/authSlice';
import { useAppDispatch } from 'redux/store';
const Panel: FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(window.outerWidth > 1024);
	const navigate = useNavigate();
	const appDispatch = useAppDispatch();
	const route = [
		{
			path: '/panel/products',
			text: 'Products'
		},
		{
			path: '/panel/orders',
			text: 'Orders'
		}
	] as { path: string; text: string }[];

	const logoutUser = async () => {
		await appDispatch(logout());
	};

	return (
		<>
			<div className='flex flex-col lg:flex-row'>
				<div className='flex items-center justify-between p-5 text-black'>
					<div className='font-normal cursor-pointer' onClick={() => navigate('/')}>
						Home
					</div>
					<BsMenuButtonWideFill className='w-6 h-6 cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)} />
				</div>
				{isMenuOpen && (
					<div className='flex flex-col justify-between z-50 fixed left-0 w-64 top-0 h-screen bg-gray-200 overflow-y-scroll bg-black select-none'>
						<div className='flex flex-col'>
							<div className='flex items-center justify-center py-2'>
								<img src={Logo} alt='HeroLogo' className='cursor-pointer' onClick={() => navigate('/')} />
							</div>
							<div className='flex flex-col space-y-2 p-4'>
								{route.map((item, index) => (
									<div
										onClick={() => navigate(item.path)}
										key={index}
										className={`p-2 rounded-md cursor-pointer 
								${window.location.pathname === item.path ? 'bg-white text-black' : 'text-white'}`}
									>
										<div className='font-normal'>{item.text}</div>
									</div>
								))}
							</div>
						</div>
						<div className='w-64 fixed left-0 bottom-0 p-4 bg-black'>
							<div onClick={logoutUser} className='bg-white rounded-md p-2 text-center w-full cursor-pointer'>
								<div className='text-black font-normal'>Logout</div>
							</div>
						</div>
					</div>
				)}
				<div className='w-full h-screen overflow-y-scroll'>
					<div className='lg:mx-auto lg:max-w-3xl m-4'>
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
};

export default Panel;
