import { Menu as MenuIcon } from 'assets/icons';
import type { MenuItem } from 'primereact/menuitem';
import { TieredMenu } from 'primereact/tieredmenu';
import { FC, useRef } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Header: FC = () => {
	const mobileMenuRef = useRef<TieredMenu>(null);
	const navigate = useNavigate();

	const navRoute = [
		{
			name: 'My Address',
			path: '/user/profile/address'
		},
		{
			name: 'Orders',
			path: '/user/profile/orders'
		},
		{
			name: 'Profile',
			path: '/user/profile/information'
		}
	];

	const navRouteMenu = [
		{
			label: 'Home',
			icon: 'pi pi-fw pi-home',
			command: () => navigate('/')
		},
		{
			label: 'Profile',
			icon: 'pi pi-fw pi-user',
			command: () => navigate('/user/profile/information')
		},
		{
			label: 'Orders',
			icon: 'pi pi-fw pi-shopping-cart',
			command: () => navigate('/user/profile/orders')
		}
	] as MenuItem[];

	return (
		<>
			<TieredMenu model={navRouteMenu} popup ref={mobileMenuRef} />
			<div className='bg-black py-4'>
				<div className='w-full lg:max-w-main lg:mx-auto'>
					<div className='flex items-center justify-between text-white mx-8'>
						<div className='flex items-center space-x-2 cursor-pointer hover:underline' onClick={() => navigate('/')}>
							<FiArrowLeft className='w-4 h-4' />
							<div>Back to Home</div>
						</div>
						<div className='hidden lg:flex items-center space-x-4'>
							{navRoute.map((item, index) => (
								<div
									key={index}
									className='cursor-pointer hover:bg-slate-300 hover:text-black p-1 rounded-md'
									onClick={() => navigate(item.path)}
								>
									{item.name}
								</div>
							))}
						</div>
						<div
							className='cursor-pointer lg:hidden'
							onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => mobileMenuRef.current?.toggle(event)}
						>
							<MenuIcon />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
