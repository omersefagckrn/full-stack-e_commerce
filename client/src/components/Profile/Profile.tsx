import { Container } from 'components';
import { MenuItem } from 'primereact/menuitem';
import { TabMenu } from 'primereact/tabmenu';
import { FC, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const Profile: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const items: MenuItem[] = useMemo(
		() => [
			{
				label: 'Profile',
				icon: 'pi pi-user',
				command: () => {
					navigate('/user/profile/information');
				}
			},
			{
				label: 'Edit Profile',
				icon: 'pi pi-user-edit',
				command: () => {
					navigate('/user/profile/edit');
				}
			},
			{
				label: 'Address',
				icon: 'pi pi-map-marker',
				command: () => {
					navigate('/user/profile/address');
				}
			},
			{
				label: 'Orders',
				icon: 'pi pi-shopping-cart',
				command: () => {
					navigate('/user/profile/orders');
				}
			}
		],
		[navigate]
	);

	const activeIndexLocation = useMemo(() => location.pathname.split('/').pop(), [location.pathname]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const indexMapping: { [key: string]: number } = {
		information: 0,
		edit: 1,
		address: 2,
		orders: 3
	};

	const activeIndex = useMemo(() => {
		return activeIndexLocation !== undefined ? indexMapping[activeIndexLocation] || 0 : 0;
	}, [activeIndexLocation, indexMapping]);

	return (
		<Container>
			<div className='lg:mx-auto lg:max-w-4xl'>
				<div className='flex flex-col mx-4 lg:mx-0'>
					<TabMenu activeIndex={activeIndex} className='pt-4' model={items} />
					<div className='my-4 w-full'>
						<div className='text-xl text-black font-semibold select-none cursor-pointer mb-2'>
							{activeIndexLocation === 'information'
								? 'Profile Information'
								: activeIndexLocation === 'edit'
								? 'Edit Profile'
								: activeIndexLocation === 'address'
								? 'Your Address'
								: activeIndexLocation === 'orders'
								? 'Your Orders'
								: 'Information'}
						</div>
						<Outlet />
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Profile;
