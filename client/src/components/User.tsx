import { Container } from 'components';
import { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'redux/store';
import { UserProfileType } from 'types/components/User';

const profileRoute: UserProfileType[] = [
	{
		name: 'Profile',
		path: '/user/profile/information'
	},
	{
		name: 'Edit Profile',
		path: '/user/profile/edit'
	}
];

const User: FC = () => {
	const activeTab: string | undefined = window.location.pathname;
	const navigate = useNavigate();
	const { isAuth } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (!isAuth) {
			navigate('/');
		}
	}, [isAuth, navigate]);
	return (
		<Container>
			<div className='lg:mx-auto lg:max-w-login'>
				<div className='flex flex-col lg:flex-row lg:gap-x-6 pt-6 m-5 space-y-5 lg:space-y-0'>
					<div className='rounded-lg border-black border-[1px] w-full lg:w-1/3 select-none'>
						{profileRoute.map(({ name, path }) => (
							<div
								key={path}
								onClick={() => navigate(path)}
								className={`p-4 font-workSans font-semibold cursor-pointer ${activeTab === path && 'underline'}`}
							>
								{name}
							</div>
						))}
					</div>
					<div className='rounded-lg border-black border-[1px] p-4 w-full'>
						<Outlet />
					</div>
				</div>
			</div>
		</Container>
	);
};

export default User;
