import { Footer, Navigation } from 'components';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Auth: FC = () => {
	return (
		<div className='flex flex-col justify-between h-screen'>
			<Navigation />
			<div className='lg:max-w-login lg:mx-auto py-10 lg:py-20'>
				<div className='grid lg:grid-cols-2 lg:gap-x-10 gap-y-4 m-4 lg:m-0'>
					<Outlet />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Auth;
