import { Container } from 'components';
import { MenuItem } from 'primereact/menuitem';
import { TabMenu } from 'primereact/tabmenu';
import { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Profile: FC = () => {
	const navigate = useNavigate();

	const items: MenuItem[] = [
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
	];

	return (
		<Container>
			<div className='lg:mx-auto lg:max-w-4xl'>
				<div className='flex flex-col mx-4 lg:mx-0'>
					<TabMenu
						activeIndex={
							window.location.pathname === '/user/profile/information'
								? 0
								: window.location.pathname === '/user/profile/edit'
								? 1
								: window.location.pathname === '/user/profile/address'
								? 2
								: window.location.pathname === '/user/profile/orders'
								? 3
								: 0
						}
						className='pt-4'
						model={items}
					/>
					<div className='my-4 w-full'>
						<Outlet />
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Profile;
