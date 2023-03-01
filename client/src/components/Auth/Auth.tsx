import { Container } from 'components';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Auth: FC = () => {
	return (
		<Container>
			<div className='lg:max-w-main lg:mx-auto py-10'>
				<div className='grid lg:grid-cols-2 lg:gap-x-10 m-4 lg:m-0'>
					<Outlet />
				</div>
			</div>
		</Container>
	);
};

export default Auth;
