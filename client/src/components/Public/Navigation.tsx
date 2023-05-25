import Logo from 'assets/hero/logo.svg';
import { Facebook, Linkedin, Mail, Menu as MenuIcon } from 'assets/icons';
import { AutoComplete, AutoCompleteChangeEvent, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { FC, useEffect, useRef, useState } from 'react';
import { logout, reset } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import type { IconType } from 'types/components/Public/Navigation';

import { Button } from 'components/Utils';
import { AppToast } from 'helper/toast';
import { MenuItem } from 'primereact/menuitem';
import { TieredMenu } from 'primereact/tieredmenu';
import { useNavigate } from 'react-router-dom';
import type { IProduct } from 'types/redux/product';

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
	}
];

const Navigation: FC = () => {
	const appDispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isErrorLogout, isSuccessLogout, isAuth } = useAppSelector((state) => state.auth);
	const { products: appProducts } = useAppSelector((state) => state.products);

	const mobileMenuRef = useRef<TieredMenu>(null);

	const [selectedProducts, setSelectedProducts] = useState<IProduct | null>(null);
	const [filteredProducts, setFilteredProducts] = useState<IProduct[] | []>([]);

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
			label: 'Cart',
			icon: 'pi pi-shopping-cart',
			command: () => {
				navigate('/user/checkout');
			}
		},
		{
			label: 'Profile',
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
			icon: 'pi pi-user-edit',
			command: () => {
				navigate('/auth/register');
			}
		}
	];

	useEffect(() => {
		if (isErrorLogout) {
			AppToast({
				type: 'error',
				message: 'Something went wrong, please try again!'
			});
		}

		if (isSuccessLogout) {
			AppToast({
				type: 'success',
				message: 'You have successfully logged out, you are being redirected!'
			});

			setTimeout(() => {
				navigate('/');
				navigate(0);
			}, 1500);

			appDispatch(reset());
		}
	}, [isErrorLogout, isSuccessLogout, appDispatch, navigate]);

	return (
		<>
			<TieredMenu ref={mobileMenuRef} popup model={isAuth ? LoggedInUserMenu : notLoggedInUserMenu} />
			{/*  */}
			<div className='bg-black select-none'>
				<div className='lg:max-w-main lg:mx-auto'>
					<div className='hidden lg:flex items-center justify-between py-2 px-3'>
						<div className='flex items-center space-x-2'>
							{icons.map(({ icon, url }) => (
								<a key={url} target='_blank' rel='noreferrer' href={url}>
									{icon}
								</a>
							))}
						</div>
						<div className='flex items-center space-x-4 text-white font-medium text-xs cursor-pointer'>
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
									if (selectedProducts && selectedProducts?._id) {
										navigate(`/product/${selectedProducts?._id}`);
									} else {
										AppToast({
											type: 'error',
											message: 'You need to select a product first!'
										});
									}
								}}
							/>
						</div>
						<div className='cursor-pointer' onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => mobileMenuRef.current?.toggle(event)}>
							<MenuIcon />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navigation;
