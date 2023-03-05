import Logo from 'assets/hero/logo.svg';
import { Facebook, Linkedin, Mail, Menu as MenuIcon, Order, Twitter } from 'assets/icons';
import { AutoComplete, AutoCompleteChangeEvent, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { FC, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { IconType } from 'types/components/Public/Navigation';

import { Button } from 'components/Utils';
import { Menu as MobileMenu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { IProduct } from 'types/redux/product';

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
	const { products: appProducts } = useAppSelector((state) => state.products);

	const mobileMenuRef = useRef<MobileMenu>(null);

	const [selectedProducts, setSelectedProducts] = useState<IProduct[] | null>(null);
	const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

	const search = (event: AutoCompleteCompleteEvent) => {
		let _filteredProducts;

		if (!event.query.trim().length) {
			_filteredProducts = [...appProducts];
		} else {
			_filteredProducts = appProducts.filter((_) => {
				return _.name.toLowerCase().startsWith(event.query.toLowerCase());
			});
		}

		setFilteredProducts(_filteredProducts);
	};

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
			command: async () => {
				await logoutUser();
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
			toast.success('You have successfully logged out, you are being redirected!');
			setTimeout(() => {
				navigate(0);
			}, 2000);
			appDispatch(reset());
		}
	}, [isErrorLogout, isSuccessLogout, navigate, appDispatch]);

	return (
		<>
			<div className='bg-[#131319] select-none'>
				<div className='lg:max-w-main lg:mx-auto'>
					<div className='hidden lg:flex items-center justify-between py-2 px-3'>
						<div className='flex items-center space-x-2'>
							{icons.map(({ icon, url }) => (
								<a target='_blank' rel='noreferrer' href={url}>
									{icon}
								</a>
							))}
						</div>
						<div className='flex items-center space-x-4 text-purple font-medium text-sm cursor-pointer'>
							<div>Introduce</div>
							<div>Partner Incentives</div>
							<div>Promotion</div>
							<div>Contact</div>
							<div>Frequently asked questions</div>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-black select-none'>
				<div className='lg:max-w-main lg:mx-auto'>
					<div className='flex items-center justify-between px-3 py-3 lg:py-2'>
						<img src={Logo} alt='HeroLogo' className='cursor-pointer' onClick={() => navigate('/')} />
						<div className='hidden lg:flex items-center space-x-2'>
							<AutoComplete
								inputStyle={{ width: '300px' }}
								placeholder='Search for products'
								field='name'
								value={selectedProducts}
								suggestions={filteredProducts}
								completeMethod={search}
								onChange={(e: AutoCompleteChangeEvent) => {
									setSelectedProducts(e.target.value);
								}}
							/>
							<Button
								children='Search'
								type='button'
								onClick={() => {
									/* @ts-ignore */
									if (selectedProducts && selectedProducts?._id) {
										/* @ts-ignore */
										navigate(`/product/${selectedProducts?._id}`);
									} else {
										toast.error('You need to select a product first!');
									}
								}}
							/>
						</div>
						<div className='flex items-center space-x-4'>
							<Order
								className='cursor-pointer'
								onClick={() => {
									if (isAuth) {
										navigate('/user/checkout');
									} else {
										toast.error('You need to login first!');
										navigate('/auth/login');
									}
								}}
							/>
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
