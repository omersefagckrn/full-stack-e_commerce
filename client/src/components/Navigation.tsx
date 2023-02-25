import Tooltip from '@mui/material/Tooltip';
import { Logo } from 'assets';
import { Facebook, Favorite, Linkedin, Mail, Menu as MenuIcon, Order, Twitter } from 'assets/icons';
import { FC, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { IconType } from 'types/components/Navigation';
import { Button, Input } from './Utils';

import { Menu as MobileMenu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';

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
	const { isErrorLogout, isSuccessLogout, isAuth } = useAppSelector((state) => state.auth);
	const mobileMenuRef = useRef<MobileMenu>(null);

	const logoutUser = async () => {
		await appDispatch(logout());
	};

	const LoggedInUserMenu: MenuItem[] = [
		{
			label: 'User Information',
			icon: 'pi pi-user',
			command: () => {
				navigate('/user/profile/information');
			}
		},
		{
			label: 'Logout',
			icon: 'pi pi-power-off',
			command: () => {
				logoutUser();
			}
		}
	];

	const notLoggedInUserMenu: MenuItem[] = [
		{
			label: 'Login',
			icon: 'pi pi-user',
			command: () => {
				navigate('/auth/login');
			}
		},
		{
			label: 'Register',
			icon: 'pi pi-user',
			command: () => {
				navigate('/auth/register');
			}
		}
	];

	useEffect(() => {
		if (isErrorLogout) {
			toast.error('Something went wrong!');
		}

		if (isSuccessLogout) {
			toast.success('You have successfully logged out, you are being redirected.');
			setTimeout(() => {
				navigate(0);
			}, 2000);
			appDispatch(reset());
		}
	}, [isErrorLogout, isSuccessLogout, navigate, appDispatch]);

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
							<Tooltip color='#ffffff' title='Cart' placement='bottom'>
								<Order className='cursor-pointer' onClick={() => navigate('/cart')} />
							</Tooltip>
							<div
								onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => mobileMenuRef.current?.toggle(event)}
								className='cursor-pointer'
							>
								<MenuIcon />
							</div>
						</div>
					</div>
				</div>
			</div>
			<MobileMenu className='mt-2' ref={mobileMenuRef} popup model={isAuth ? LoggedInUserMenu : notLoggedInUserMenu} />
		</>
	);
};

export default Navigation;
