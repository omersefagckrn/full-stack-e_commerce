import { Container } from 'components';
import { MenuItem } from 'primereact/menuitem';
import { TabMenu } from 'primereact/tabmenu';
import { FC } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const Profile: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

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

	const activeIndexLocation = location.pathname.split('/').pop();

	console.log(activeIndexLocation);

	return (
		<Container>
			<div className='lg:mx-auto lg:max-w-4xl'>
				<div className='flex flex-col mx-4 lg:mx-0'>
					<TabMenu
						activeIndex={
							activeIndexLocation === 'information'
								? 0
								: activeIndexLocation === 'edit'
								? 1
								: activeIndexLocation === 'address'
								? 2
								: activeIndexLocation === 'orders'
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
