import { Container } from 'components';
import { MenuItem } from 'primereact/menuitem';
import { TabMenu } from 'primereact/tabmenu';
import { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'redux/store';

const Profile: FC = () => {
	const navigate = useNavigate();
	const { isAuth } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (!isAuth) {
			navigate('/');
		}
	}, [isAuth, navigate]);

	const items: MenuItem[] = [
		{ label: 'Profile', icon: 'pi pi-user', command: () => navigate('/user/profile/information') },
		{ label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => navigate('/user/profile/edit') }
	];

	return (
		<Container>
			<div className='lg:mx-auto lg:max-w-login'>
				<div className='flex flex-col mx-4'>
					<TabMenu className='pt-4' model={items} />
					<div className='py-4'>
						<div className='rounded-lg border-black border-[1px] p-4 w-full'>
							<Outlet />
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Profile;
