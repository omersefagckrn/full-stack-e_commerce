import { Container } from 'components';
import { MenuItem } from 'primereact/menuitem';
import { TabMenu } from 'primereact/tabmenu';
import { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'redux/store';

const Profile: FC = () => {
	const navigate = useNavigate();
	const { isAuth } = useAppSelector((state) => state.auth);

	const items: MenuItem[] = [
		{
			label: 'Profile',
			icon: 'pi pi-user',
			command: () => {
				navigate('/user/profile/information');
			}
		},
		{
			label: 'Edit',
			icon: 'pi pi-user-edit',
			command: () => {
				navigate('/user/profile/edit');
			}
		}
	];

	useEffect(() => {
		if (!isAuth) {
			navigate('/');
		}
	}, [isAuth, navigate]);

	return (
		<Container>
			<div className='lg:mx-auto lg:max-w-4xl'>
				<div className='flex flex-col mx-4 lg:mx-0'>
					<TabMenu className='pt-4' model={items} />
					<div className='rounded-lg border-black border-[1px] my-4 p-4 w-full'>
						<Outlet />
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Profile;
