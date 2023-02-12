import Drawer from '@mui/material/Drawer';
import Tooltip from '@mui/material/Tooltip';
import { Logo } from 'assets';
import { Facebook, Favorite, Linkedin, Mail, Menu, Order, Twitter } from 'assets/icons';
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { IconType, RouteProps } from 'types/components/Navigation';
import { Button, Input } from './Utils';

const icons: IconType[] = [
	{
		icon: <Facebook />,
		url: 'https://www.facebook.com/'
	},
	{
		icon: <Linkedin />,
		url: 'https://www.linkedin.com/'
	},
	{
		icon: <Mail />,
		url: 'https://www.gmail.com/'
	},
	{
		icon: <Twitter />,
		url: 'https://www.twitter.com/'
	}
];

const Navigation: FC = () => {
	const navigate = useNavigate();
	const appDispatch = useAppDispatch();
	const [showMenu, setShowMenu] = useState<boolean>(false);
	const { isErrorLogout, isSuccessLogout, isAuth } = useAppSelector((state) => state.auth);

	const logoutUser = async () => {
		await appDispatch(logout());
	};

	useEffect(() => {
		if (isErrorLogout) {
			toast.error('Something went wrong!');
		}

		if (isSuccessLogout) {
			toast.success('You have successfully logged out, you are being redirected.');
			navigate(0);
			setShowMenu(false);
			appDispatch(reset());
		}
	}, [isErrorLogout, isSuccessLogout, navigate, appDispatch]);

	const Route: FC<RouteProps> = ({ path, name }) => {
		return (
			<div
				key={path}
				onClick={async () => {
					if (path) {
						navigate(path);
						setShowMenu(false);
					}
				}}
				className='space-x-12 border-[1px] border-gray_Two p-3 rounded-lg hover:bg-black cursor-pointer w-56'
			>
				<div className='text-white font-semibold font-workSans text-center'>{name}</div>
			</div>
		);
	};

	return (
		<>
			<div className='bg-black select-none'>
				<div className='lg:max-w-navigation lg:mx-auto'>
					<div className='hidden lg:flex items-center justify-between py-3 px-3'>
						<div className='flex items-center space-x-2'>
							{icons.map(({ icon, url }) => (
								<Tooltip key={url} color='#ffffff' title='Follow Us' placement='bottom'>
									<a target='_blank' rel='noreferrer' href={url}>
										{icon}
									</a>
								</Tooltip>
							))}
						</div>
						<div className='flex items-center space-x-4 text-white font-medium text-sm font-workSans cursor-pointer'>
							<div>Introduce</div>
							<div>Partner Incentives</div>
							<div>Promotion</div>
							<div>Contact</div>
							<div>Frequently asked questions</div>
						</div>
					</div>
					<div className='flex items-center justify-between px-3 py-6'>
						<Logo className='cursor-pointer' onClick={() => navigate('/')} />
						<div className='hidden lg:flex items-center justify-center space-x-4 w-full'>
							<Input className='w-1/2' placeholder='What are you looking for?' />
							<Button>Search</Button>
						</div>
						<div className='flex items-center space-x-4'>
							<Tooltip color='#ffffff' title='Favorite' placement='bottom'>
								<Favorite className='cursor-pointer' onClick={() => navigate('/favorite')} />
							</Tooltip>
							<Tooltip color='#ffffff' title='Favorite' placement='bottom'>
								<Order className='cursor-pointer' onClick={() => navigate('/order')} />
							</Tooltip>
							<Tooltip color='#ffffff' title='Menu' placement='bottom'>
								<Menu onClick={() => setShowMenu((prev) => !prev)} className='cursor-pointer' />
							</Tooltip>
						</div>
					</div>
				</div>
			</div>
			<Drawer className='bg-transparent select-none' open={showMenu} onClose={() => setShowMenu((prev) => !prev)}>
				<div className='flex items-center justify-between'>
					<div onClick={() => navigate('/')} className='w-full bg-black p-6 cursor-pointer'>
						<Logo />
					</div>
				</div>
				<div className='h-full bg-green_Five p-6 space-y-4 text-center'>
					{isAuth ? (
						<>
							<Route path='/user/profile' name='Profile' />
							<div
								onClick={logoutUser}
								className='border-black p-3 rounded-lg border-[1px] cursor-pointer font-workSans font-semibold text-black'
							>
								Logout
							</div>
						</>
					) : (
						<>
							<Route path='/auth/login' name='Login' />
							<Route path='/auth/register' name='Register' />
						</>
					)}
				</div>
			</Drawer>
		</>
	);
};

export default Navigation;
